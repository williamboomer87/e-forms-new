import Head from 'next/head';


import React from 'react'
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import HomeFooter from '../components/homefooter';

const Plans = () => {
    return (
        <div className='background_grey'>
            <Head>
                <title>Plans</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="container max991">
                <div className="row">
                    <div className="col text-center">
                        <h2 className='text-white my-5'>Plans</h2>

                        <div className="row row-cols-1 row-cols-md-12 g-4 g-lg-4 justify-content-center">
                            <div className="col-md-4">
                                <div className="dark_gray text-white p-4 rounded">
                                    <h4 className='mb-4'>PRO</h4>
                                    <div className='text-start'>
                                        - 1,000 forms / month
                                    </div>
                                    <div className='text-start'>
                                        - Priority email support
                                    </div>
                                    <button className="btn signinbtn btn-md btn-block btn-lg mt-4" type="submit">Upgrade</button>
                                </div>
                            </div>

                            {/* <div className="col-md-4">
                                <div className="dark_gray text-white p-4 rounded">
                                    <h4 className='text-start'>Subscribe to Forms.ai</h4>
                                    <h4 className='text-start greenfont'>$8 / month</h4>
                                    <div className='text-start'>
                                        By paying you agree to the terms and conditions outlined
                                        here on our website: https://www.forms.ai/ <br />
                                        terms-and-conditions
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="dark_gray text-white p-4 rounded">
                                    <h4 className='text-start'>Subscribe to Forms.ai</h4>
                                    <h4 className='text-start greenfont'>$8 / month</h4>
                                    <div className='text-start'>
                                        By paying you agree to the terms and conditions outlined
                                        here on our website: https://www.forms.ai/ <br />
                                        terms-and-conditions
                                    </div>
                                </div>
                            </div> */}
                        </div>



                    </div>
                </div>
            </div>

        </div>
    )
}

export default Plans