import Head from 'next/head';


import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/header';
import Image from 'next/image';

import Question from '../components/question';
import Answer from '../components/answer';
import { useRouter } from 'next/router';


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

  useEffect(() => {
    const { question } = router.query;
    var tempq = localStorage.getItem('promptQuestion');

    if (question && question != tempq) {
      setChatBoxLoader(true)
      fetchResult(question)
    } else {
      // Here is the perfect place for redirect
      if (question) {
        var tempquestionCount = parseInt(localStorage.getItem('questionCount'), 10)
        var tempanswered = parseInt(localStorage.getItem('answered'), 10)

        if (tempquestionCount <= tempanswered) {
          sendForm()
        }
      }
    }

  }, [router.query]);

  const setInitialValues = (emptychatline) => {
    setQuestionkeys(JSON.parse(localStorage.getItem('questionkeys')))

    var tempquestionCount = parseInt(localStorage.getItem('questionCount'), 10)
    var tempanswered = parseInt(localStorage.getItem('answered'), 10)

    setPromptQuestion(localStorage.getItem('promptQuestion'))
    setQuestionCount(tempquestionCount)
    setAnswered(tempanswered)

    // if (tempquestionCount <= tempanswered) {
    //   sendForm()
    // }

    const parsedData = JSON.parse(localStorage.getItem('questions'));
    setQuestions(parsedData?.completion);

    if (!emptychatline) {
      var chatline = JSON.parse(localStorage.getItem('chatLine'));
      chatline?.forEach(line => {
        if (line.type == 'question') {
          handleAppendComponent('question', line.value)
        }

        if (line.type == 'answer') {
          handleAppendComponent('answer', line.value)
        }
      });
    }else{
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

  const handleAppendComponent = (type, content) => {
    if (type == 'question') {
      var componentToAppend = <Question text={content} />;
    }

    if (type == 'answer') {
      var componentToAppend = <Answer text={content} />;
    }

    setAppendedComponents(prevComponents => [...prevComponents, componentToAppend]);
  };

  const submitAnswer = async () => {
    const answer = textareaRef.current.value;
    handleAppendComponent('answer', answer)
    textareaRef.current.value = '';
    var chatLine = JSON.parse(localStorage.getItem('chatLine'))
    var chtObj = {
      "type": "answer",
      "value": answer
    }
    chatLine.push(chtObj)

    if (answer.endsWith("?")) {
      var messages = JSON.parse(localStorage.getItem('messages'));
      messages.messages.push({ "role": "user", "content": answer });
      var updatedMessagesString = JSON.stringify(messages);
      localStorage.setItem('messages', updatedMessagesString);

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'api/generate/chat', {
        method: 'POST',
        body: updatedMessagesString,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const rdata = await response.json();

      if (response.ok) {
        handleAppendComponent('question', rdata.chat)

        chtObj = {
          "type": "question",
          "value": rdata.chat
        }

        chatLine.push(chtObj)
      }

    } else {
      setAnswered(answered + 1);
      localStorage.setItem('answered', answered + 1);

      handleAppendComponent('question', questions[answered + 1])
      chtObj = {
        "type": "question",
        "value": questions[answered + 1]
      }
      chatLine.push(chtObj)

      var tempsubmitArray = JSON.parse(localStorage.getItem('submitArray'));
      // console.log(questionkeys[answered])

      // Create the second form API input
      if (!tempsubmitArray.qa) {
        tempsubmitArray.qa = {};
      }

      tempsubmitArray.qa[questionkeys[answered]] = answer;
      localStorage.setItem('submitArray', JSON.stringify(tempsubmitArray));

      if (answered == (questionCount - 1)) {
        sendForm();
      }
    }

    localStorage.setItem('chatLine', JSON.stringify(chatLine));
  }

  const sendForm = async () => {
    setDocumentLoad(true)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'api/form', {
        method: 'POST',
        body: localStorage.getItem('submitArray'),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      var rdata = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        // console.log(rdata)
        localStorage.setItem('formdata', JSON.stringify(rdata));
        router.push('/document_preview');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitAnswer()
    }
  };

  const fetchResult = async (question) => {

    localStorage.setItem('promptQuestion', question);


    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'api/generate/input', {
        method: 'POST',
        body: JSON.stringify({
          "prompt": question
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data) {
        setChatBoxLoader(false)

        const completion = Object.keys(data.data).map(key => data.data[key]);
        const result = { Id: data.Id, completion };
        const content = data.chat_responst_1;

        const qkeys = Object.keys(data.data);

        localStorage.setItem('questions', JSON.stringify(result));
        localStorage.setItem('answered', 0); // answer count only update when answer addded
        localStorage.setItem('answers', JSON.stringify([]));
        localStorage.setItem('questionkeys', JSON.stringify(qkeys));
        localStorage.setItem('questionCount', qkeys.length);
        localStorage.setItem('chatLine', JSON.stringify([])) // Update when item added to chat

        var tempsubmitArray = { Id: data.Id };

        localStorage.setItem('submitArray', JSON.stringify(tempsubmitArray));

        var messages = {
          "messages": [
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": "Create a document for " + question + " with dummy data" },
            {
              "role": "user",
              "content": content
            },
            {
              "role": "assistant",
              "content": JSON.stringify(completion)
            }
          ]
        }

        localStorage.setItem('messages', JSON.stringify(messages));

        setInitialValues(true)
      }
    } catch (error) {
      console.error('Error:', error);
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
              <p className="lh-lg mb-3">{answered} of {questionCount} questions answered
              </p>
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
                                  Great! I will guide you through the process of creating a by asking you a series of questions.
                                  Please provide accurate and detailed information as you respond
                                  to the questions. Once we have collected all the necessary
                                  information, I'll help you create the lease agreement. Let's
                                  start with the first question. {(questions && questions.length) ? questions[0] : ''}
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

