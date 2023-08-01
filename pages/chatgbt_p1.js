import Head from 'next/head';


import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/header';
import Image from 'next/image';

import Question from '../components/question';
import Answer from '../components/answer';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { updateUpdateAnswerId } from '../redux/actions/index';


const ChatgbtP1 = ({ }) => {

  const router = useRouter();
  const [chatBoxLoader, setChatBoxLoader] = useState(false);
  const qdivRef = useRef(null);
  const [appendedComponents, setAppendedComponents] = useState([]);
  const [promptQuestion, setPromptQuestion] = useState('')
  const [questionCount, setQuestionCount] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [questions, setQuestions] = useState([])
  const [questionkeys, setQuestionkeys] = useState([])
  const [documentLoad, setDocumentLoad] = useState(false);

  const textareaRef = useRef(null);

  const [firstQuestion, setFirstQuestion] = useState('')
  const [apiMessages, setApiMessages] = useState('')

  useEffect(() => {
    const { question } = router.query;

    if (question) {
      setChatBoxLoader(true)
      fetchResult(question)
    }

  }, [router.query]);

  const setInitialValues = (emptychatline) => {
    setQuestionkeys(JSON.parse(localStorage.getItem('questionkeys')))

    var tempquestionCount = parseInt(localStorage.getItem('questionCount'), 10)
    var tempanswered = parseInt(localStorage.getItem('answered'), 10)

    setPromptQuestion(localStorage.getItem('promptQuestion'))
    setQuestionCount(tempquestionCount)
    setAnswered(tempanswered)

    const parsedData = JSON.parse(localStorage.getItem('questions'));
    setQuestions(parsedData?.completion);

    if (!emptychatline) {
      var chatline = JSON.parse(localStorage.getItem('chatLine'));
      chatline?.forEach(line => {
        if (line.type == 'question') {
          handleAppendComponent('question', line.value)
        }

        if (line.type == 'answer') {
          handleAppendComponent('answer', line.value, false, line)
        }
      });
    } else {
      setAppendedComponents([])
    }
  }

  useEffect(() => {
    setInitialValues(false)
  }, [])

  const scrollToBottom = () => {
    if (qdivRef.current) {
      qdivRef.current.scrollTop = qdivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [appendedComponents])

  function hasAllKeys(obj, keys) {
    return keys.every(key => obj.hasOwnProperty(key));
  }

  const handleAppendComponent = async (type, content, withEffect = false) => {
    if (type == 'question') {
      var componentToAppend = await <Question text={content} withEffect={withEffect} />;
    }

    if (type == 'answer') {
      var componentToAppend = await <Answer text={content} />;
    }

    setAppendedComponents(prevComponents => [...prevComponents, componentToAppend]);
  };



  const submitAnswer = async () => {
    const answer = textareaRef.current.value;

    handleAppendComponent('answer', answer)

    textareaRef.current.value = '';

    var tempapiMessages = apiMessages;
    var tempObj = {
      role: "user",
      content: answer
    }

    tempapiMessages.push(tempObj)
    // setApiMessages(tempapiMessages)

    getQuestion(tempapiMessages);

  }

  const extractDocumentContent = (text) => {
    const startTag = "[DOCUMENT GENERATING STARTS]";
    const endTag = "[DOCUMENT GENERATING ENDS]";

    const startIndex = text.indexOf(startTag);
    const endIndex = text.indexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1) {
        const content = text.substring(startIndex + startTag.length, endIndex).trim();
        return content;
    }

    return null;
  }

  const getQuestion = async (messages) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'api/chat/ask_questions', {
      method: 'POST',
      body: JSON.stringify({
        "messages": messages
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    var requiredKeys = ["response", "messages"];
    if (response.ok && data && hasAllKeys(data, requiredKeys)) {
      var rdata = data.response;
      if(extractDocumentContent(rdata)){
        localStorage.setItem('formdata', extractDocumentContent(rdata));
        localStorage.setItem('finishanswering', true);
        router.push('/document_preview');
      }else{
        handleAppendComponent('question', data.response.replace(/\n/g, '<br/>'), true)
      }      
    }

    setApiMessages(data.messages)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitAnswer()
    }
  };

  var count = 0;

  const fetchResult = async (question) => {
    count++;
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'api/chat/first', {
        method: 'POST',
        body: JSON.stringify({
          "prompt": question
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      var requiredKeys = ["response", "messages"];



      if (response.ok && data && hasAllKeys(data, requiredKeys)) {
        setChatBoxLoader(false)

        setFirstQuestion(data.response)
        setApiMessages(data.messages)

        localStorage.setItem('promptQuestion', question);
        localStorage.setItem('finishanswering', false);

        // const completion = Object.keys(data.data).map(key => data.data[key]);
        // const result = { Id: data.Id, completion };
        // const content = data.chat_responst_1;

        // const qkeys = Object.keys(data.data);

        // localStorage.setItem('promptQuestion', question);
        // localStorage.setItem('questions', JSON.stringify(result));
        // localStorage.setItem('answered', 0); // answer count only update when answer addded
        // localStorage.setItem('answers', JSON.stringify([]));
        // localStorage.setItem('questionkeys', JSON.stringify(qkeys));
        // localStorage.setItem('questionCount', data.respons.number_of_questions);
        // localStorage.setItem('chatLine', JSON.stringify([])) // Update when item added to chat

        // var tempsubmitArray = { Id: data.Id };

        // localStorage.setItem('submitArray', JSON.stringify(tempsubmitArray));

        // var messages = {
        //   "messages": [
        //     { "role": "system", "content": "You are a helpful assistant." },
        //     { "role": "user", "content": "Create a document for " + question + " with dummy data" },
        //     {
        //       "role": "user",
        //       "content": content
        //     },
        //     {
        //       "role": "assistant",
        //       "content": JSON.stringify(completion)
        //     }
        //   ]
        // }

        // localStorage.setItem('messages', JSON.stringify(messages));

        // setInitialValues(true)
      } else {
        // Run three times and redirect to home
        if (count < 3) {
          fetchResult(question)
        } else {
          router.push('/?error=backend_error');
        }
      }
    } catch (error) {

      // Run three times and redirect to home
      if (count < 3) {
        fetchResult(question)
      } else {
        router.push('/?error=backend_error');
      }
      // console.error('Error:', error);
    }
  }




  return (

    <div className='background_grey'>
      <Head>
        <title>Payment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="container max991">
        {chatBoxLoader ? (
          <div className="row mt-5">
            <div className="col text-center">
              <div className="row row-cols-12 g-4 g-lg-4">
                <div className="col-md-12">
                  <div className="dark_gray text-white p-4 pe-3 rounded height200 mb-3 position-relative">
                    <p>Please wait while we load your questions</p>
                    <div className="loader-container">
                      <div className="loader"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mt-5">
              <h3 className="lh-lg">
                {promptQuestion}
              </h3>
              <p className="lh-lg mb-3">
                We’re going to ask you a series of step by step questions to build
                your agreement.
              </p>
              {/* <p className="lh-lg mb-3">
                {answered} of {questionCount} questions answered
              </p> */}
            </div>
            <div className="row">
              <div className="col text-center">

                <div className="row row-cols-12 g-4 g-lg-4">
                  <div className="col-md-12">
                    {documentLoad ? (
                      <div className="dark_gray text-white p-4 pe-3 rounded height200 mb-3 position-relative">
                        <p>Please wait while we build your document.</p>
                        <div className="loader-container">
                          <div className="loader"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="dark_gray text-white p-4 pe-3 rounded height600 mb-3 position-relative">
                        <div className='qdiv pe-2' ref={qdivRef}>
                          <div className="middle-content-box-section-1  p-3 rounded-3">
                            <div className="row">
                              <div className="col-1">
                                <Image src="/images/chat-symbol-Group.svg" alt="My Image" width={30}
                                  height={30} />
                                {/* // <img src="chat-symbol-Group.svg" /> */}
                              </div>
                              <div className="col-11">
                                <p className="text-start">
                                  {firstQuestion.split('\n').map((text, index) => (
                                    <React.Fragment key={index}>
                                      {text}
                                      <br />
                                    </React.Fragment>
                                  ))}
                                </p>
                              </div>
                            </div>
                          </div>


                          {appendedComponents.map((component, index) => (
                            <div key={index}>{component}</div>
                          ))}
                        </div>


                        <div className="middle-content-box-3 bottom-0 position-absolute tempmargin">
                          <div className='position-relative'>
                            <Image onClick={submitAnswer} className='position-absolute answer_clk' src="/images/icons/Send.png" alt="My Image" width={20}
                              height={20} />
                            <textarea
                              className="form-control pe-5"
                              placeholder="Please type your annswer"
                              id="floatingTextarea"
                              ref={textareaRef}
                              onKeyDown={handleKeyDown}
                            >
                              {/* Please type your annswer */}
                            </textarea>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>


                </div>



              </div>
            </div>
          </div>
        )}
      </div>

    </div >
  );
};

export default ChatgbtP1;

