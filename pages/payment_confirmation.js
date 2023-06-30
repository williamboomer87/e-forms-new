import Head from 'next/head'
import React, { useEffect } from 'react'
import Header from '../components/header'
import Image from 'next/image'
import { useRouter } from 'next/router'

const PaymentConfirmation = () => {

    const router = useRouter();

    useEffect(() => {
        var inputValue = localStorage.getItem('inputValue');
        

        const redirectTimeout = setTimeout(() => {
            if(inputValue){
                router.push('/chatgbt_p1'); 
            }else{
                router.push('/'); 
            }
            
        }, 0.5 * 60 * 1000); // 30 seconds in milliseconds

        // return () => {
        //     clearTimeout(redirectTimeout);
        // };
    }, []);



    return (
        <div className='background_grey'>
            <Head>
                <title>Payment Confirmation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="container max814">
                <section className="" >
                    <div className="container py-5 paddingt6">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8">
                                <div className="rounded darkgrey">
                                    <div className="card-body px-5 py-4 text-center">
                                        <Image src="/images/icons/circle-outline-rounded.svg" alt="My Image" width={40} height={40} className='mb-4 mt-1' />
                                        <h3 className="mb-4">Payment Successful</h3>
                                        <p>We have sent you a receipt to you email.</p>
                                        <div className='mt-2'></div>
                                        <div className='mt-4'>Made a spelling mistake?
                                            <a className='signupspan ms-2' href="#">Edit Email</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default PaymentConfirmation