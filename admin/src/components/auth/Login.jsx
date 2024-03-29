/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Login() {

    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const logout = params.get('logout');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMsg(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMsg(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@') || password.length < 5) {
            setErrorMsg('Invalid email or password');
        } else {
            try {
                const response = await fetch('http://127.0.0.1:3030/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        console.log(response);
                        throw new Error('Invalid email or password');
                    } else if (response.status === 404) {
                        throw new Error('Invalid email or password');
                    } else if (response.status === 500) {
                        throw new Error('An error has occurred. Please try again in a few moments.');
                    } else {
                        throw new Error('Login failed');
                    }
                }

                const data = await response.json();
                // Rediriger l'utilisateur vers la page d'accueil
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data));

                window.location.href = '/Dashboard?connect=success';

            } catch (error) {
                setErrorMsg(error.message);
            }
        }
    };

    if (error === 'connect') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'You must login to access this page.',
            timer: 5000
        }).then(() => {
            window.history.replaceState(null, null, window.location.pathname);
        });
    }

    if (logout === "success") {
        Swal.fire({
            icon: 'success',
            title: 'Logged out',
            text: 'You have successfully logged out.',
            timer: 5000
        }).then(() => {
            window.history.replaceState(null, null, window.location.pathname);
        });
    }

    return (
        <div className="bg-gradient-dark">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image">
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form onSubmit={handleSubmit} className="user">
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        id="email"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..."
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="password"
                                                        placeholder="Password"
                                                        required
                                                        minLength={5}
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                    </div>
                                                </div>

                                                {errorMsg && (
                                                    <>
                                                        <div style={{ textAlign: "center", color: "Red" }} role="alert">
                                                            {errorMsg}
                                                        </div>
                                                        <br />
                                                    </>
                                                )}

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-user btn-block"
                                                    disabled={!email || !password}
                                                >
                                                    Login
                                                </button>

                                                <hr />
                                                <a href="#" className="btn btn-google btn-user btn-block">
                                                    <i className="fab fa-google fa-fw"></i> Login with Google
                                                </a>
                                                <a href="#" className="btn btn-facebook btn-user btn-block">
                                                    <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                </a>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="#">
                                                    Forgot Password?
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
