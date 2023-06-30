import React from "react";
import HeaderBar from "../components/header";
// import styles from '../styles/Home.module.css';

const ChatgbtP1 = () => {
  return (
    <>
      <HeaderBar />

      {/* body-content */}
      {/* bg= > #353541 */}

      <div className="text-center mt-5">
        <h2 className="lh-lg">Create: California lease agreement</h2>
        <p className="h3 lh-lg">
          We’re going to ask you a series of step by step questions to build
          your agreement.
        </p>
        <p className="h6 lh-lg">1 of 23 questions answered</p>
      </div>

      <div className="middle-content-box-1 container text-center p-1 rounded-3 d-flex align-content-between flex-wrap">

        <div className="header-set-collections">
        <div className="middle-content-box-section-1  m-3 p-3 rounded-3">
          <div className="row">
            <div className="col-1">
              <img src="chat-symbol-Group.svg" />
            </div>
            <div className="col-11">
              <p className="text-left">
                Great! I will guide you through the process of creating a
                California lease agreement by asking you a series of questions.
                Please provide accurate and detailed information as you respond
                to the questions. Once we have collected all the necessary
                information, I'll help you create the lease agreement. Let's
                start with the first question. What is the full legal name of
                the landlord or property management company?
              </p>
            </div>
          </div>
        </div>

        <div className="middle-content-box-section-1 m-3 p-3 rounded-3">
          <div className="row">
            <div className="col-1">
              <img src="chat-symbol-Group.svg" />
            </div>
            <div className="col-11">
              <p className="text-left">
              The name of the landlord is John Smith.
              </p>
            </div>
          </div>
        </div>
        </div>

        {/* <div className="middle-content-box-2"></div> */}

        <div className="middle-content-box-3  m-3">
          <textarea
            className="form-control"
            placeholder="Please type your annswer"
            id="floatingTextarea"
          >
            Please type your annswer
          </textarea>
        </div>
      </div>
    </>
  );
};

export default ChatgbtP1;
