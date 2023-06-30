import Head from 'next/head'
import React, { useState } from 'react'
import Header from '../components/header'
import { useRouter } from 'next/router';
import axios from 'axios';


const SignUp = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {

            const data = {
                "username": email,
                password,
            };

            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            
            if (response.ok) {
                router.push('/verification_process?email=' + email);
            } else if (response.status === 409) {
                setErrorMessage('User already exists');
            } else {
                setErrorMessage('Error happend please contact admin');
            }
        } catch (error) {
            console.log(error)
            alert('dsd')
            setErrorMessage('Error happend please contact admin');
        }

    }

    return (
        <div className='background_grey'>
            <Head>
                <title>Sign Up</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="container max814">
                <section className="" >
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8">
                                <div className="rounded darkgrey">
                                    <div className="card-body px-5 py-4 text-center">
                                        <form onSubmit={handleSubmit}>
                                            <h3 className="mb-2">Access Your Document</h3>
                                            <small>
                                                Create a free account to access your document. <br />
                                                No credit card or payment required.
                                            </small>

                                            <div className="form-floating mb-3 mt-4">
                                                <input type="email" className="form-control form-control-md"
                                                    id="floatingInput" placeholder="name@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                                <label className='signuplabel' htmlFor="floatingInput">Email address</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control form-control-md"
                                                    id="floatingInput" placeholder=""
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <label className='signuplabel' htmlFor="floatingInput">Password</label>
                                            </div>

                                            <div className="form-floating ">
                                                <input type="password" className="form-control form-control-md"
                                                    id="floatingInput" placeholder="name@example.com"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                                                <label className='signuplabel' htmlFor="floatingInput">Confirm Password</label>
                                            </div>
                                            <div className='mb-5 text-start text-danger'>
                                                {errorMessage && <span>{errorMessage}</span>}
                                            </div>

                                            <button className="btn signinbtn btn-md btn-block" type="submit">Continue</button>
                                        </form>
                                        <div className='mt-2'>Already have an account? <a className='signupspan' href="#">Log In</a></div>


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

export default SignUp