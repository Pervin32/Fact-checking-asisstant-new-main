// Lazımi modulları import edirik
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import google from '../assets/img/gmail.svg';
import facebook from '../assets/img/face.svg';
// Firebase modullarını import edirik
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithEmailAndPassword,
    signInWithPopup, 
    GoogleAuthProvider, 
    FacebookAuthProvider 
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase konfiqurasiyası
const firebaseConfig = {
    apiKey: "AIzaSyAqsWZ5_ri2DBim6cgtMn2ir9w8t3XXa-8",
    authDomain: "fact-checking-asisstant.firebaseapp.com",
    projectId: "fact-checking-asisstant",
    storageBucket: "fact-checking-asisstant.firebasestorage.app",
    messagingSenderId: "543735020388",
    appId: "1:543735020388:web:dc0521ea65838e9f271871",
    measurementId: "G-BLQXDLD0PP"
};

// Firebase-i inizializasiya edirik
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const Login = () => {
    // State-ləri təyin edirik
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Email/Parol ilə giriş funksiyası
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        // Validasiya
        if (!email || !password) {
            toast.warn('Zəhmət olmasa e-poçtunuzu və parolunuzu daxil edin.');
            setIsLoading(false);
            return;
        }
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Local storage-i təmizləyib yeni məlumatları saxlayırıq
            localStorage.clear();
            localStorage.setItem('authType', 'email');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', email.split('@')[0]);
            
            toast.success('Daxil olma uğurlu oldu!');
            setTimeout(() => navigate('/textinput'), 2000);
        } catch (error) {
            // Xəta mesajlarını idarə edirik
            console.error('Login error:', error);
            handleLoginError(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Google ilə giriş funksiyası
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            
            const result = await signInWithPopup(auth, provider);
            
            // Məlumatları saxlayırıq
            localStorage.clear();
            localStorage.setItem('authType', 'google');
            localStorage.setItem('userEmail', result.user.email);
            localStorage.setItem('userName', result.user.displayName);
    
            toast.success('Google ilə daxil oldunuz!');
            setTimeout(() => navigate('/textinput'), 2000);
        } catch (error) {
            console.error('Xəta:', error);
            toast.error(`Xəta: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Facebook ilə giriş funksiyası
    const handleFacebookSignIn = async () => {
        setIsLoading(true);
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            // Məlumatları saxlayırıq
            localStorage.clear();
            localStorage.setItem('authType', 'facebook');
            localStorage.setItem('userEmail', result.user.email);
            localStorage.setItem('userName', result.user.displayName);
            
            toast.success('Facebook ilə daxil oldunuz!');
            setTimeout(() => navigate('/textinput'), 2000);
        } catch (error) {
            console.error('Facebook login error:', error);
            toast.error('Facebook ilə daxil olma zamanı xəta baş verdi.');
        } finally {
            setIsLoading(false);
        }
    };

    // JSX strukturu
    return (
        <div className='w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[0px] sm:mt-[130px]'>
            <div className='flex flex-col items-center justify-center w-[361px]'>
                <div className="w-full">
                    {/* Başlıq */}
                    <h1 className="text-center text-black text-2xl sm:text-3xl font-semibold font-montserrat leading-normal mb-4">
                        Xoş gəlmişsiniz
                    </h1>

                    {/* Giriş forması */}
                    <form onSubmit={handleLogin} className="w-full">
                        {/* Email sahəsi */}
                        <div className='grid grid-rows gap-2 mb-3'>
                            <label className="text-black text-sm font-medium font-montserrat">E-mail</label>
                            <div className="w-full px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type='email'
                                    placeholder='E-poçtunuzu bura daxil edin'
                                    className="w-full text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        {/* Parol sahəsi */}
                        <div className='grid grid-rows gap-2'>
                            <label className="text-black text-sm font-medium font-montserrat">Parol</label>
                            <div className="w-full px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type='password'
                                    placeholder='************'
                                    className="w-full text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        {/* Parol bərpası linki */}
                        <Link to='/forgetpassword'>
                            <p className='font-medium text-base leading-normal my-6 text-center font-montserrat'>
                                Parolu unutmusan?
                            </p>
                        </Link>

                        {/* Giriş düyməsi */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className='py-[19px] w-full bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px] disabled:opacity-50'
                        >
                            {isLoading ? 'Daxil olunur...' : 'Daxil ol'}
                        </button>
                    </form>

                    {/* Alternativ giriş bölməsi */}
                    <div className='flex items-center justify-center w-full mb-6'>
                        <p className="flex-grow h-px bg-gray-300"></p>
                        <p className='font-medium text-sm leading-5 mx-2'>Digər hesablar ilə daxil olun</p>
                        <p className="flex-grow h-px bg-gray-300"></p>
                    </div>

                    {/* Sosial şəbəkə düymələri */}
                    <div className='flex items-center justify-center gap-4'>
                        <button
                            className='flex items-center justify-center'
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <img className='size-[48px]' src={google} alt="google" />
                        </button>
                        <button
                            className='flex items-center justify-center'
                            onClick={handleFacebookSignIn}
                            disabled={isLoading}
                        >
                            <img className='size-[48px]' src={facebook} alt="facebook" />
                        </button>
                    </div>

                    {/* Qeydiyyat linki */}
                    <p className="mt-6 text-center">
                        Hesabınız yoxdur? <Link to='/registration' className='text-[#7B7DCF]'>Qeydiyyatdan keçin</Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;