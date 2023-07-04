import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Header = () => {
    const router = useRouter();
    const { query } = router;
    const tokenParam = query.token;
    const loggedParam = query.logged;
    const error = query.error;
    const [logged, setLogged] = useState(false);

    const logOut = () => {
        sessionStorage.removeItem("user");
        setLogged(false)
        router.push('/');
    }

    const setSession = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'api/verifytoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: tokenParam
            }),
        }).then((response) => {
            const statusCode = response.status;
            if (statusCode === 200) {
                (async () => {
                    const data = await response.json();
                    const user = data.userData;
                    // console.log(user);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    setLogged(true)
                    toast('Looged in succcessfully', { hideProgressBar: false, autoClose: 5000, type: 'success' })
                })();
            } else if (statusCode === 401) {
                console.log('invalid token')
            } else {
                console.log('Internal server error')
            }

            return response;
        });
    }

    useEffect(() => {
        if (tokenParam) {
            setSession()
        }

        if (loggedParam) {
            toast('Looged in succcessfully', { hideProgressBar: false, autoClose: 5000, type: 'success' })
        }
    }, [tokenParam])

    useEffect(() => {
        if(error){
            toast('Error ocured. Try again later or contact our admin', 
            { hideProgressBar: false, autoClose: 5000, type: 'error' })
        }
    }, [error])

    useEffect(() => {
        // sessionStorage.removeItem("user");
        const user = sessionStorage.getItem('user');
        if (user) {
            setLogged(true)
        }
    }, [])

    return (
        <nav className='menu_black'>
            <div className='container py-3 d-flex justify-content-between'>
                <h2 className='text-white align-self-center'>Forms.ai</h2>
                <div className="float-right d-flex justify-content-between">
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary menu_black border-0 dropdown-toggle text-secondary
                            me-5 mt-1 fw-bold"
                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Broswe Forms
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    {logged ?
                        (<a className='text-white mt-2 header-login' onClick={logOut}>Logout</a>) :
                        (
                            <span className="text-white mt-2 header-login">
                                <Link href="/sign_up">Sign up</Link> / <Link href="/sign_in">Login</Link>
                            </span>
                        )
                    }


                </div>
            </div>
        </nav>
    )
}

export default Header;
