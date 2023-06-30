import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Head from 'next/head';


import Header from '../components/header';
import Image from 'next/image';

import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {

    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem('user');

        if (!user) {
            router.push('/');
        }
    }, []);

    const [clientSecret, setClientSecret] = React.useState("");

    React.useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
        variables: {
            // colorText: '#e0e0e0',
            // See all possible variables below
        },
        rules: {
            '.Label': {
                color: 'white',
                marginTop: '10px'
            },
        }
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className='background_grey'>
            <Head>
                <title>Payment</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="container max991">
                <div className="row">
                    <div className="col text-center mb-5">
                        <h2 className='text-white my-5'>Payment</h2>

                        <div className="row row-cols-1 row-cols-md-12 g-4 g-lg-4">
                            <div className="col-md-5">
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
                            <div className="col-md-7">
                                <div className="dark_gray text-white p-4 rounded">
                                    {/* <form className='mb-3'>
                                        <div className="form-group text-start mb-3">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control form-control-lg" id="name" />
                                        </div>
                                        <div className="form-group text-start mb-3">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control form-control-lg" id="email" />
                                        </div>
                                        <div className="form-group text-start mb-4">
                                            <label htmlFor="card_info">Card Information</label>
                                            <div className='position-relative'>
                                                <input placeholder='1234 1234 1234 1234' type="text"
                                                    className="form-control card_number form-control-lg" />
                                                <Image src="/images/cards.png" alt="My Image" width={80} height={25} className='me-2 position-absolute cardtypes' />
                                                <div className="row">
                                                    <div className='col-8 pe-0'>
                                                        <input type="text" placeholder='MM / YY'
                                                            className="form-control form-control-lg no_top_border card_expire" />
                                                    </div>
                                                    <div className='col-4 ps-0'>
                                                        <input type="text" placeholder='CVC'
                                                            className="form-control form-control-lg no_top_border card_cvv" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn signinbtn btn-md btn-block btn-lg" type="submit">Subscribe</button>
                                    </form> */}
                                    {clientSecret && (
                                        <Elements options={options} stripe={stripePromise}>
                                            <CheckoutForm />
                                        </Elements>
                                    )}
                                    <div className="mt-4"></div>
                                    <small className='text-center'>
                                        By confirming your subscription, you allow Forms.ai to charge your card
                                        for this payment and future payments in accordance with their terms. You
                                        can always cancel your subscription.
                                    </small>
                                </div>
                            </div>

                        </div>



                    </div>
                </div>
            </div>

        </div>
    );
}