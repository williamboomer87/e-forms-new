import Head from 'next/head';
// import styles from '../styles/Home.module.css';


import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import HomeFooter from '../components/homefooter';
import { useRouter } from 'next/router';
// import { connect } from 'react-redux';
// import { setInputValue, fetchResult } from '../redux/store';

const Home = () => {
  const router = useRouter();
  const [promptQuestion, setPromptQuestion] = useState('')

  const submitPrompt = () => {
    const encodedQuestion = encodeURIComponent(promptQuestion);
    window.location.href = `/chatgbt_p1?question=${encodedQuestion}`;
  }

  const handlePromptChange = (event) => {
    setPromptQuestion(event.target.value);
  };

  return (
    <div className='background_grey'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="container max814">
        <div className="row">
          <div className="col text-center">
            <h1 className='text-white my-5'>What form are you looking to create?</h1>
            <div className='position-relative'>
              <input type="text" className="form-control lh-lg ps-5"
                placeholder="Enter the name of a form (e.g., “Oregon Lease Agreement”)"
                value={promptQuestion} onChange={handlePromptChange} />
              <FontAwesomeIcon icon={faSearch} className='position-absolute search_icon' />
            </div>
            <button type="button"
              className="btn btn-success my-5 home_btn"
              onClick={submitPrompt}>
              <span>
                <Image src="/images/icons/Comment.png" alt="My Image" width={16} height={10} className='me-2' />
                Begin
              </span>
            </button>
            <div className='d-flex'>
              <hr className='example_hr' />
              <span className='example_span mb-4'>Examples</span>
              <hr className='example_hr' />
            </div>



            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 g-lg-3">
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "California residential lease agreement"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    {/* <span className='me-2'>Use</span> */}
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=California residential lease agreement">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "Vermont motor vehicle bill of sale"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=Vermont motor vehicle bill of sale">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "Living will document specific to oklahoma"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=Living will document specific to oklahoma">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "Connecticut LLC operating agreement"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=Connecticut LLC operating agreement">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "Texas power of attorney form"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=Texas power of attorney form">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "Roommate agreement template"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=Roommate agreement template">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "Simple, single page rental application"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=Simple, single page rental application">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "New hampshire non-disclosure agreement"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=New hampshire non-disclosure agreement">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
              <div className="col">
                <div className="dark_gray text-white p-2 rounded homegriditem">
                  <span className='d-flex pb-3'>
                    <Image src="/images/icons/Comment-notfil.png" alt="My Image" width={16}
                      height={10} className='me-2 cment_nofill' />
                    <div className='text-start'>
                      "Carpet cleaning invoice with 3 line items"
                    </div>
                  </span>
                  <div className='float-end me-2 usediv rounded'>
                    <span className="me-2 use_question">
                      <a href="/chatgbt_p1?question=Carpet cleaning invoice with 3 line items">Use</a>
                    </span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  )
}

export default Home

// const mapStateToProps = (state) => ({
//   inputValue: state.input.inputValue,
//   result: state.input.result,
//   loading: state.input.loading,
//   error: state.input.error,
// });

// const mapDispatchToProps = { setInputValue, fetchResult };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);