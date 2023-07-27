import Head from 'next/head';
// import styles from '../styles/Home.module.css';


import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import HomeFooter from '../components/homefooter';
import react from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { setInputValue, fetchResult } from '../redux/store';
// 


const Home = ({ inputValue, setInputValue, fetchResult, result, loading, error }) => {
  const [inputQuestion, setInputQuestion] = useState('');

  const [questionCount, setQuestionCount] = useState(0);

  const router = useRouter();
  
  useEffect(() => {
    const { question } = router.query;
    if (question) {
      localStorage.setItem('inputValue', question);
      setInputQuestion(question)
      fetchResult(question).then(() => {
        if (!error && !loading) {
  
        }
      });
    }
  }, [router.query]);

  useEffect(() => {
    
  }, [questionCount])


  useEffect(() => {
    if (result) {
      localStorage.setItem('questrionArr', JSON.stringify(result));
      localStorage.setItem('qcount', 0);
      localStorage.setItem('answers', JSON.stringify([]));

      router.push('/chatgbt_p1');
    }
  }, [result])



  const handleQuestionChange = (event) => {
    setInputQuestion(event.target.value);
    setInputValue(event.target.value);
  };


  const handleBeginClick = () => {
    // console.log(inputQuestion);
    console.log('Input value:', inputValue);

    localStorage.setItem('inputValue', inputValue);

    fetchResult(inputValue).then(() => {
      if (!error && !loading) {

        // router.push('/chatgbt_p1');
      }
    });
  };



  return (
    <div className='background_grey'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />


      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>} {/* Update error rendering */}
      <div className="container max814">
        <div className="row">
          <div className="col text-center">
            <h1 className='text-white my-5'>What form are you looking to create?</h1>
            <div className='position-relative'>
              <input type="text" className="form-control lh-lg ps-5"
                placeholder="Enter the name of a form (e.g., “Oregon Lease Agreement”)"
                value={inputQuestion} onChange={handleQuestionChange} />
              <FontAwesomeIcon icon={faSearch} className='position-absolute search_icon' />
            </div>
            <button type="button"
              className="btn btn-success my-5 home_btn"
              onClick={handleBeginClick}>
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
                    <span className='me-2'>Use</span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
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
                    <span className='me-2'>Use</span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
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
                    <span className='me-2'>Use</span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
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
                    <span className='me-2'>Use</span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
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
                    <span className='me-2'>Use</span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
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
                    <span className='me-2'>Use</span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
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
                    <span className='me-2'>Use</span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
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
                    <span className='me-2'>Use</span>
                    <FontAwesomeIcon height={13} icon={faAngleRight} /></div>
                </div>
              </div>
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
                    <span className='me-2'>Use</span>
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

// export default Home

const mapStateToProps = (state) => ({
  inputValue: state.input.inputValue,
  result: state.input.result,
  loading: state.input.loading,
  error: state.input.error,
});

const mapDispatchToProps = { setInputValue, fetchResult };

export default connect(mapStateToProps, mapDispatchToProps)(Home);