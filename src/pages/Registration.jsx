import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import 'react-toastify/dist/ReactToastify.css';

import google from '../assets/img/gmail.svg';
import facebook from '../assets/img/face.svg';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.warn('Zəhmət olmasa bütün sahələri doldurun.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Parollar uyğun gəlmir.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (password.length < 6) {
      toast.error('Parol ən azı 6 simvol olmalıdır.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // İstifadəçi məlumatlarını localStorage-də saxlayırıq
      localStorage.setItem('userEmail', user.email);

      toast.success('Qeydiyyat uğurla tamamlandı!', {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate('/textinput');
      }, 1000);

    } catch (error) {
      console.error('Registration error:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('Bu email artıq istifadə olunub.', {
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
          toast.error('Qeydiyyat zamanı xəta baş verdi.', {
            position: "top-right",
            autoClose: 3000,
          });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem('userEmail', user.email);
        toast.success('Google ilə qeydiyyatdan keçdiniz!', { position: "top-right" });
        navigate('/textinput');
      })
      .catch((error) => {
        toast.error('Google ilə qeydiyyat zamanı xəta baş verdi.', { position: "top-right" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFacebookSignIn = () => {
    setIsLoading(true);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem('userEmail', user.email);
        toast.success('Facebook ilə qeydiyyatdan keçdiniz!', { position: "top-right" });
        navigate('/textinput');
      })
      .catch((error) => {
        toast.error('Facebook ilə qeydiyyat zamanı xəta baş verdi.', { position: "top-right" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[130px]'>
      <div className='flex flex-col items-center justify-center w-[361px]'>
        <h1 className="text-center text-black text-2xl font-semibold font-montserrat leading-normal mb-4">
          Hesabınızı yaradın
        </h1>

        <form onSubmit={handleRegister} className="w-full">
          <div className='grid grid-rows gap-[6px] mb-[12px]'>
            <label className="text-black text-sm font-medium font-montserrat">E-mail</label>
            <div className="w-[361px] px-2.5 py-[13px] rounded-md border border-[#d9d9d9]">
              <input
                type='email'
                placeholder='E-poçtunuzu bura daxil edin'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal size-full focus:outline-none focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className='grid grid-rows gap-[6px] mb-4'>
            <label className="text-black text-sm font-medium font-montserrat">Parol</label>
            <div className="w-[361px] px-2.5 py-[13px] rounded-md border">
              <input
                type='password'
                placeholder='************'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal size-full focus:outline-none focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className='grid grid-rows gap-[6px] mb-[34px]'>
            <label className="text-black text-sm font-medium font-montserrat">Parolu təkrar yaz</label>
            <div className="w-[361px] px-2.5 py-[13px] rounded-md border">
              <input
                type='password'
                placeholder='************'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal size-full focus:outline-none focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className='py-[19px] w-[361px] bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px] disabled:opacity-50'
          >
            {isLoading ? 'Qeydiyyatdan keçilir...' : 'Qeydiyyatdan keç'}
          </button>
        </form>

        <div className='flex items-center justify-center w-[494px] mb-6'>
          <p className="flex-grow h-px bg-gray-300"></p>
          <p className='font-medium text-sm leading-5 mx-2'>Digər hesablar ilə qeydiyyatdan keçin</p>
          <p className="flex-grow h-px bg-gray-300"></p>
        </div>

        <div className='flex items-center justify-center gap-4'>
          <button 
            onClick={handleGoogleSignIn} 
            className='flex items-center justify-center'
            disabled={isLoading}
          >
            <img className='size-[48px]' src={google} alt="google" />
          </button>
          <button 
            onClick={handleFacebookSignIn} 
            className='flex items-center justify-center'
            disabled={isLoading}
          >
            <img className='size-[48px]' src={facebook} alt="facebook" />
          </button>
        </div>

        <p className="mt-6 text-center">
          Artiq hesabiniz var? <Link to='/login' className='text-[#7B7DCF]'>Daxil olun</Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Registration;