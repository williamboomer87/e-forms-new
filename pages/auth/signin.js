import Head from 'next/head'
import React, { useState } from 'react'
import Header from '../../components/header'
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";


const SignIn = (props) => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if (res.error) {
      console.log(res.error)
    } else {
      router.push('/');
    }

    // console.log(res);
  };



  return (
    <div className='background_grey'>
      <Head>
        <title>Sign In</title>
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
                    <form onSubmit={handleSubmit}>
                      <h3 className="mb-2">Access Your Document</h3>
                      <small>Log in to your account to access your document.</small>

                      <div className="form-outline mt-4">
                        <input type="email" id="typeEmailX-2"
                          placeholder='contact@opendocs.com'
                          className="form-control form-control-md mb-4"
                          value={userInfo.email}
                          onChange={({ target }) =>
                            setUserInfo({ ...userInfo, email: target.value })
                          } />
                      </div>

                      <div className="form-outline">
                        <input type="password" id="typePasswordX-2"
                          placeholder="********"
                          className="form-control form-control-md"
                          value={userInfo.password}
                          onChange={({ target }) =>
                            setUserInfo({ ...userInfo, password: target.value })
                          } />
                      </div>
                      <div className='mb-5 text-start text-danger'>
                        {errorMessage && <span>{errorMessage}</span>}
                      </div>


                      <button className="btn signinbtn btn-md btn-block" type="submit">Continue</button>
                    </form>
                    <div className='mt-2'>Don’t have an account? <a className='signupspan' href="#">Sign up for free</a></div>


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

export default SignIn