import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import { useRouter } from 'next/router';


const VerificationProcess = () => {
    const router = useRouter();
    const { query } = router;
    const emailParam = query.email;

    const [email, setEmail] = useState('');

    useEffect(() => {
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [emailParam]);


    return (
        <div className='background_grey'>
            <Head>
                <title>Verification Required</title>
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

                                        <h3 className="mb-4">Verification Required</h3>
                                        <p>We have sent you a verification email to {email}.</p>
                                        <div className='mt-2'></div>
                                        <p>Please click the link in the email to complete the
                                            sign up process. </p>
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

export default VerificationProcess;