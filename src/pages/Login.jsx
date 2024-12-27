import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import google from '../assets/img/gmail.svg';
import facebook from '../assets/img/face.svg';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithEmailAndPassword,
    signInWithPopup, 
    GoogleAuthProvider, 
    FacebookAuthProvider 
} from 'firebase/auth';
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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // ... [keeping all the existing handler functions unchanged]
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email || !password) {
            toast.warn('Zəhmət olmasa e-poçtunuzu və parolunuzu daxil edin.', {
                position: "top-right",
                autoClose: 3000,
            });
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('userEmail', user.email);
            
            toast.success('Daxil olma uğurlu oldu!', {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                navigate('/textinput');
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
            
            switch (error.code) {
                case 'auth/user-not-found':
                    toast.error('Bu email ilə istifadəçi tapılmadı.', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    break;
                case 'auth/wrong-password':
                    toast.error('Yanlış parol.', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    break;
                case 'auth/invalid-email':
                    toast.error('Düzgün email formatı deyil.', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    break;
                default:
                    toast.error('Daxil olma zamanı xəta baş verdi.', {
                        position: "top-right",
                        autoClose: 3000,
                    });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem('userEmail', result.user.email);
            toast.success('Google ilə daxil oldunuz!', {
                position: "top-right",
                autoClose: 2000,
            });
            setTimeout(() => {
                navigate('/textinput');
            }, 2000);
        } catch (error) {
            toast.error('Google ilə daxil olma zamanı xəta baş verdi.', {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookSignIn = async () => {
        setIsLoading(true);
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem('userEmail', result.user.email);
            toast.success('Facebook ilə daxil oldunuz!', {
                position: "top-right",
                autoClose: 2000,
            });
            setTimeout(() => {
                navigate('/textinput');
            }, 2000);
        } catch (error) {
            toast.error('Facebook ilə daxil olma zamanı xəta baş verdi.', {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen w-full px-4 sm:px-6 py-6 sm:py-10 flex items-center justify-center'>
            <div className='w-full max-w-[361px] sm:max-w-lg mx-auto mt-[60px] sm:mt-[130px]'>
                <div className="w-full">
                    <h1 className="text-center text-black text-xl sm:text-2xl md:text-3xl font-semibold font-montserrat leading-normal mb-4">
                        Xoş gəlmişsiniz
                    </h1>

                    <form onSubmit={handleLogin} className="w-full space-y-3 sm:space-y-4">
                        <div className='space-y-2'>
                            <label className="text-black text-xs sm:text-sm font-medium font-montserrat">E-mail</label>
                            <div className="w-full px-2 sm:px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type='email'
                                    placeholder='E-poçtunuzu bura daxil edin'
                                    className="w-full text-xs sm:text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <label className="text-black text-xs sm:text-sm font-medium font-montserrat">Parol</label>
                            <div className="w-full px-2 sm:px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type='password'
                                    placeholder='************'
                                    className="w-full text-xs sm:text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <Link to='/forgetpassword'>
                            <p className='font-medium text-sm sm:text-base leading-normal my-4 sm:my-6 text-center font-montserrat'>
                                Parolu unutmusan?
                            </p>
                        </Link>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className='py-3 sm:py-[19px] w-full bg-blue text-white rounded-[24px] text-sm sm:text-base leading-[19px] font-semibold font-montserrat mb-6 sm:mb-[43px] disabled:opacity-50'
                        >
                            {isLoading ? 'Daxil olunur...' : 'Daxil ol'}
                        </button>
                    </form>

                    <div className='flex items-center justify-center w-full mb-4 sm:mb-6'>
                        <p className="flex-grow h-px bg-gray-300"></p>
                        <p className='font-medium text-xs sm:text-sm leading-5 mx-2'>Digər hesablar ilə daxil olun</p>
                        <p className="flex-grow h-px bg-gray-300"></p>
                    </div>

                    <div className='flex items-center justify-center gap-4'>
                        <button
                            className='flex items-center justify-center'
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <img className='w-10 h-10 sm:w-12 sm:h-12' src={google} alt="google" />
                        </button>
                        <button
                            className='flex items-center justify-center'
                            onClick={handleFacebookSignIn}
                            disabled={isLoading}
                        >
                            <img className='w-10 h-10 sm:w-12 sm:h-12' src={facebook} alt="facebook" />
                        </button>
                    </div>

                    <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base">
                        Hesabınız yoxdur? <Link to='/registration' className='text-[#7B7DCF]'>Qeydiyyatdan keçin</Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;