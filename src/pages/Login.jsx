import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/img/gmail.svg';
import facebook from '../assets/img/face.svg';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAqsWZ5_ri2DBim6cgtMn2ir9w8t3XXa-8",
    authDomain: "fact-checking-asisstant.firebaseapp.com",
    projectId: "fact-checking-asisstant",
    storageBucket: "fact-checking-asisstant.firebasestorage.app",
    messagingSenderId: "543735020388",
    appId: "1:543735020388:web:dc0521ea65838e9f271871",
    measurementId: "G-BLQXDLD0PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Zəhmət olmasa e-poçtunuzu və parolunuzu daxil edin.');
            return;
        }

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            const user = users.find((user) => user.email === email);

            if (user) {
                localStorage.setItem('authToken', `fake-token-for-${user.email}`);
                alert('Daxil olma uğurlu oldu!');
                navigate('/textinput');
            } else {
                throw new Error('İstifadəçi tapılmadı. E-poçtunuzu yoxlayın.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Google ilə daxil olma funksiyası
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            alert('Google ilə daxil oldunuz!');
            navigate('/textinput');
        } catch (error) {
            setError(error.message);
        }
    };

    // Facebook ilə daxil olma funksiyası
    const handleFacebookSignIn = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            alert('Facebook ilə daxil oldunuz!');
            navigate('/textinput');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[130px]'>
            <div className='flex flex-col items-center justify-center w-[361px]'>
                <div className="w-full">
                    <h1 className="text-center text-black text-2xl sm:text-3xl font-semibold font-montserrat leading-normal mb-4">Xoş gəlmişsiniz</h1>

                    <form onSubmit={handleLogin} className="w-full">
                        {/* E-mail */}
                        <div className='grid grid-rows gap-2 mb-3'>
                            <label className="text-black text-sm font-medium font-montserrat">E-mail</label>
                            <div className="w-full px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type='email'
                                    placeholder='E-poçtunuzu bura daxil edin'
                                    className="w-full text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Parol */}
                        <div className='grid grid-rows gap-2'>
                            <label className="text-black text-sm font-medium font-montserrat">Parol</label>
                            <div className="w-full px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type='password'
                                    placeholder='************'
                                    className="w-full text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm my-2">{error}</p>}
                        <Link to='/forgetpassword'><p className='font-medium text-base leading-normal my-6 text-center font-montserrat'>Parolu unutmusan?</p></Link>

                        <button
                            type="submit"
                            className='py-[19px] w-full bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px]'
                        >
                            Daxil ol
                        </button>
                    </form>
                </div>

                <div className='flex items-center justify-center w-full mb-6'>
                    <p className="flex-grow h-px bg-gray-300"></p>
                    <p className='font-medium text-sm leading-5 mx-2'>Digər hesablar ilə daxil olun</p>
                    <p className="flex-grow h-px bg-gray-300"></p>
                </div>

                <div className='flex items-center justify-center gap-4'>
                    <a
                        className='flex items-center justify-center'
                        href="#"
                        onClick={handleGoogleSignIn}
                    >
                        <img className='size-[48px]' src={google} alt="google" />
                    </a>
                    <a
                        className='flex items-center justify-center'
                        href="#"
                        onClick={handleFacebookSignIn}
                    >
                        <img className='size-[48px]' src={facebook} alt="facebook" />
                    </a>
                </div>

                <p className="mt-6 text-center">Hesabınız yoxdur? <Link to='/registration' className='text-[#7B7DCF]'>Qeydiyyatdan keçin</Link></p>
            </div>
        </div>
    );
};

export default Login;
