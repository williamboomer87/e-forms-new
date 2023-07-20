import Head from "next/head";

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Image from "next/image";

import Question from "../components/question";
import Answer from "../components/answer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateUpdateAnswerId } from "../redux/actions/index";

const ChatgbtP1 = ({}) => {
  const router = useRouter();
  const [chatBoxLoader, setChatBoxLoader] = useState(false);
  const qdivRef = useRef(null);
  const [appendedComponents, setAppendedComponents] = useState([]);
  const [promptQuestion, setPromptQuestion] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionkeys, setQuestionkeys] = useState([]);
  const [documentLoad, setDocumentLoad] = useState(false);

  const textareaRef = useRef(null);

  const updateAnswer = useSelector((state) => state.updateAnswer);
  const updateAnswerId = useSelector((state) => state.updateAnswerId);

  useEffect(() => {
    if (updateAnswer) {
      textareaRef.current.focus();
      console.log(updateAnswerId);
    }
  }, [updateAnswer]);

  useEffect(() => {
    const { question } = router.query;
    var tempq = localStorage.getItem("promptQuestion");

    if (question && question != tempq) {
      setChatBoxLoader(true);
      fetchResult(question);
    } else {
      // Here is the perfect place for redirect
      if (question) {
        var tempquestionCount = parseInt(
          localStorage.getItem("questionCount"),
          10
        );
        var tempanswered = parseInt(localStorage.getItem("answered"), 10);

        if (tempquestionCount <= tempanswered) {
          sendForm();
        }
      }
    }
  }, [router.query]);

  const setInitialValues = (emptychatline) => {
    setQuestionkeys(JSON.parse(localStorage.getItem("questionkeys")));

    var tempquestionCount = parseInt(localStorage.getItem("questionCount"), 10);
    var tempanswered = parseInt(localStorage.getItem("answered"), 10);

    setPromptQuestion(localStorage.getItem("promptQuestion"));
    setQuestionCount(tempquestionCount);
    setAnswered(tempanswered);

    const parsedData = JSON.parse(localStorage.getItem("questions"));
    setQuestions(parsedData?.completion);

    if (!emptychatline) {
      var chatline = JSON.parse(localStorage.getItem("chatLine"));
      chatline?.forEach((line) => {
        if (line.type == "question") {
          handleAppendComponent("question", line.value);
        }

        if (line.type == "answer") {
          handleAppendComponent("answer", line.value, false, line);
        }
      });
    } else {
      setAppendedComponents([]);
    }
  };

  useEffect(() => {
    setInitialValues(false);
  }, []);

  const scrollToBottom = () => {
    if (qdivRef.current) {
      qdivRef.current.scrollTop = qdivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [appendedComponents]);

  const handleAppendComponent = async (
    type,
    content,
    withEffect = false,
    object = null
  ) => {
    if (type == "question") {
      var componentToAppend = await (
        <Question text={content} withEffect={withEffect} />
      );
    }

    if (type == "answer") {
      var componentToAppend = await (<Answer text={content} object={object} />);
    }

    setAppendedComponents((prevComponents) => [
      ...prevComponents,
      componentToAppend,
    ]);
  };

  const generateUniqueId = () => {
    return Date.now();
  };

  const submitAnswer = async () => {
    const answer = textareaRef.current.value;

    if (updateAnswer) {
      // Update the answer after button clicked
      // Update answer section
      var chatLine = JSON.parse(localStorage.getItem("chatLine"));
      const updatedData = chatLine.map((item) => {
        if (item.id == updateAnswerId) {
          return { ...item, value: answer };
        }
        return item;
      });

      setAppendedComponents([]);

      updatedData?.forEach((line) => {
        if (line.type == "question") {
          handleAppendComponent("question", line.value);
        }

        if (line.type == "answer") {
          handleAppendComponent("answer", line.value, false, line);
        }
      });

      localStorage.setItem("chatLine", JSON.stringify(updatedData));
      // console.log(chatLine)
      // alert('update')
    } else {
      var uid = generateUniqueId();
      var chtObj = {
        id: uid,
        type: "answer",
        value: answer,
        editable: !answer.endsWith("?"),
      };

      handleAppendComponent("answer", answer, false, chtObj);
      textareaRef.current.value = "";
      var chatLine = JSON.parse(localStorage.getItem("chatLine"));
      chatLine.push(chtObj);

      if (answer.endsWith("?")) {
        // User ask a question
        var messages = JSON.parse(localStorage.getItem("messages"));
        messages.messages.push({ role: "user", content: answer });
        var updatedMessagesString = JSON.stringify(messages);
        localStorage.setItem("messages", updatedMessagesString);

        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "api/generate/chat",
          {
            method: "POST",
            body: updatedMessagesString,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const rdata = await response.json();

        if (response.ok) {
          handleAppendComponent("question", rdata.chat, true);

          chtObj = {
            id: uid,
            type: "question",
            value: rdata.chat,
          };

          chatLine.push(chtObj);
        }
      } else {
        //
        setAnswered(answered + 1);
        localStorage.setItem("answered", answered + 1);

        handleAppendComponent("question", questions[answered + 1], true);
        chtObj = {
          id: generateUniqueId(),
          type: "question",
          value: questions[answered + 1],
        };
        chatLine.push(chtObj);

        var tempsubmitArray = JSON.parse(localStorage.getItem("submitArray"));

        // Create the second form API input
        if (!tempsubmitArray.qa) {
          tempsubmitArray.qa = {};
        }

        tempsubmitArray.qa[questionkeys[answered]] = answer;
        localStorage.setItem("submitArray", JSON.stringify(tempsubmitArray));

        // create question and answer json
        let json_array = [];
        let questionList = JSON.parse(localStorage.getItem("questions")).completion;
        let answerList = JSON.parse(localStorage.getItem("submitArray"));
        questionList.forEach((q, index) => {
          json_array.push({ question: q, answer: answerList.qa[index] });
        });

        localStorage.setItem("qanda", JSON.stringify(json_array));

        if (answered == questionCount - 1) {
          sendForm();
          var data = await createDocument();
        }
      }
      localStorage.setItem("chatLine", JSON.stringify(chatLine));
    }

    //
  };

  const sendForm = async () => {
    setDocumentLoad(true);

    try {
      // const response = await fetch(
      //   process.env.NEXT_PUBLIC_API_URL + "api/form",
      //   {
      //     method: "POST",
      //     body: localStorage.getItem("submitArray"),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      let data = {prompt: localStorage.getItem("promptQuestion"), data: localStorage.getItem("qanda")}; 

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "api/form/generate",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      var rdata = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        // console.log(rdata)
        localStorage.setItem("formdata", JSON.stringify(rdata));
        router.push("/document_preview");
      }
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  const createDocument = async () => {
    try {
      let data = {prompt: localStorage.getItem("promptQuestion"), data: localStorage.getItem("qanda")}; 
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "api/form/generate",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitAnswer();
    }
  };

  var count = 0;

  const fetchResult = async (question) => {
    count++;
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "api/generate/input",
        {
          method: "POST",
          body: JSON.stringify({
            prompt: question,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("data", data);

      if (response.ok && data) {
        setChatBoxLoader(false);

        // const completion = Object.keys(data.data.questions).map(
        //   (key) => data.data[key]
        // );
        var questionsArray = data.data.questions;
        let completion = questionsArray.map(function (question) {
          return question.question;
        });

        console.log("question", question);

        const result = { Id: 1, completion };
        const content = data.chat_responst_1;

        const qkeys = Object.keys(data.data.questions);

        localStorage.setItem("promptQuestion", question);
        localStorage.setItem("questions", JSON.stringify(result));
        localStorage.setItem("answered", 0); // answer count only update when answer addded
        localStorage.setItem("answers", JSON.stringify([]));
        localStorage.setItem("questionkeys", JSON.stringify(qkeys));
        localStorage.setItem("questionCount", qkeys.length);
        localStorage.setItem("chatLine", JSON.stringify([])); // Update when item added to chat

        var tempsubmitArray = { Id: data.Id };

        localStorage.setItem("submitArray", JSON.stringify(tempsubmitArray));

        var messages = {
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: "Create a document for " + question + " with dummy data",
            },
            {
              role: "user",
              content: content,
            },
            {
              role: "assistant",
              content: JSON.stringify(completion),
            },
          ],
        };

        localStorage.setItem("messages", JSON.stringify(messages));

        setInitialValues(true);
      } else {
        // Run three times and redirect to home
        if (count < 3) {
          fetchResult(question);
        } else {
          router.push("/?error=backend_error");
        }
      }
    } catch (error) {
      // Run three times and redirect to home
      if (count < 3) {
        fetchResult(question);
      } else {
        router.push("/?error=backend_error");
      }
      // console.error('Error:', error);
    }
  };

  return (
    <div className="background_grey">
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
              <h3 className="lh-lg">{promptQuestion}</h3>
              <p className="lh-lg mb-3">
                We’re going to ask you a series of step by step questions to
                build your agreement.
              </p>
              <p className="lh-lg mb-3">
                {answered} of {questionCount} questions answered
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
                        <div className="qdiv pe-2" ref={qdivRef}>
                          <div className="middle-content-box-section-1  p-3 rounded-3">
                            <div className="row">
                              <div className="col-1">
                                <Image
                                  src="/images/chat-symbol-Group.svg"
                                  alt="My Image"
                                  width={30}
                                  height={30}
                                />
                                {/* // <img src="chat-symbol-Group.svg" /> */}
                              </div>
                              <div className="col-11">
                                <p className="text-start">
                                  Great! I will guide you through the process of
                                  creating a by asking you a series of
                                  questions. Please provide accurate and
                                  detailed information as you respond to the
                                  questions. Once we have collected all the
                                  necessary information, I'll help you create
                                  the lease agreement. Let's start with the
                                  first question.{" "}
                                  {questions && questions.length
                                    ? questions[0]
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </div>

                          {appendedComponents.map((component, index) => (
                            <div key={index}>{component}</div>
                          ))}
                        </div>

                        <div className="middle-content-box-3 bottom-0 position-absolute tempmargin">
                          <div className="position-relative">
                            <Image
                              onClick={submitAnswer}
                              className="position-absolute answer_clk"
                              src="/images/icons/Send.png"
                              alt="My Image"
                              width={20}
                              height={20}
                            />
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
    </div>
  );
};

export default ChatgbtP1;
