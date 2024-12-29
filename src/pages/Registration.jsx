// React və React kitabxanasından lazımlı funksiyaları idxal edirik.
import React, { useState } from 'react';

// react-toastify kitabxanasından ToastContainer və toast funksiyasını idxal edirik.
import { ToastContainer, toast } from 'react-toastify';

// react-router-dom kitabxanasından Link və useNavigate funksiyalarını idxal edirik.
import { Link, useNavigate } from 'react-router-dom';

// firebase kitabxanasından lazımlı autentifikasiya funksiyalarını idxal edirik.
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';

// Toastify kitabxanasının CSS faylını idxal edirik.
import 'react-toastify/dist/ReactToastify.css';

// Google və Facebook üçün şəkilləri idxal edirik.
import google from '../assets/img/gmail.svg';
import facebook from '../assets/img/face.svg';

// Firebase tətbiqetməsini işə salmaq üçün lazımlı funksiyaları idxal edirik.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase konfiqurasiyasını təyin edirik.
const firebaseConfig = {
  apiKey: "AIzaSyAqsWZ5_ri2DBim6cgtMn2ir9w8t3XXa-8",
  authDomain: "fact-checking-asisstant.firebaseapp.com",
  projectId: "fact-checking-asisstant",
  storageBucket: "fact-checking-asisstant.firebasestorage.app",
  messagingSenderId: "543735020388",
  appId: "1:543735020388:web:dc0521ea65838e9f271871",
  measurementId: "G-BLQXDLD0PP"
};

// Firebase tətbiqini başladırıq.
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Registration komponentini yaradırıq.
const Registration = () => {
  // İstifadəçi məlumatları üçün state dəyişənləri təyin edirik.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Naviqasiya funksiyası üçün useNavigate hook-unu istifadə edirik.
  const navigate = useNavigate();

  // Firebase autentifikasiya obyektini və provider-ləri yaradırıq.
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // İstifadəçi qeydiyyatını idarə edən funksiya.
  // handleRegister funksiyasını bu şəkildə yeniləyirik
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
    
    // Köhnə məlumatları təmizləyirik
    localStorage.clear();
    
    // Email-dən istifadəçi adını əldə edirik
    const emailUsername = email.split('@')[0];
    
    // Məlumatları localStorage-da saxlayırıq
    localStorage.setItem('authType', 'email');
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userName', emailUsername);

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

// Google signin funksiyasını yeniləyirik
const handleGoogleSignIn = () => {
  setIsLoading(true);
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      
      localStorage.clear();
      localStorage.setItem('authType', 'google');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);

      toast.success('Google ilə qeydiyyatdan keçdiniz!', {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/textinput');
      }, 2000);
    })
    .catch((error) => {
      console.error("Google login error:", error);
      toast.error('Google ilə qeydiyyat zamanı xəta baş verdi.', { position: "top-right" });
    })
    .finally(() => {
      setIsLoading(false);
    });
};

// Facebook signin funksiyasını yeniləyirik
const handleFacebookSignIn = () => {
  setIsLoading(true);
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      
      localStorage.clear();
      localStorage.setItem('authType', 'facebook');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.displayName);

      toast.success('Facebook ilə qeydiyyatdan keçdiniz!', {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/textinput');
      }, 2000);
    })
    .catch((error) => {
      console.error("Facebook login error:", error);
      toast.error('Facebook ilə qeydiyyat zamanı xəta baş verdi.', { position: "top-right" });
    })
    .finally(() => {
      setIsLoading(false);
    });
};
  // Komponentin render hissəsi.
  return (
    <div className='w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[0px] sm:mt-[130px]'>
      <div className='flex flex-col items-center justify-center w-full sm:w-[361px]'>
        <h1 className="text-center text-black text-2xl font-semibold font-montserrat leading-normal mb-4">
          Hesabınızı yaradın
        </h1>

        {/* Qeydiyyat formu */}
        <form onSubmit={handleRegister} className="w-full">
          <div className='grid grid-rows gap-[6px] mb-[12px]'>
            <label className="text-black text-sm font-medium font-montserrat">E-mail</label>
            <div className="w-full sm:w-[361px] px-2.5 py-[13px] rounded-md border border-[#d9d9d9]">
              <input
                type='email'
                placeholder='E-poçtunuzu bura daxil edin'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal w-full focus:outline-none focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className='grid grid-rows gap-[6px] mb-4'>
            <label className="text-black text-sm font-medium font-montserrat">Parol</label>
            <div className="w-full sm:w-[361px] px-2.5 py-[13px] rounded-md border">
              <input
                type='password'
                placeholder='************'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal w-full focus:outline-none focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className='grid grid-rows gap-[6px] mb-[34px]'>
            <label className="text-black text-sm font-medium font-montserrat">Parolu təkrar yaz</label>
            <div className="w-full sm:w-[361px] px-2.5 py-[13px] rounded-md border">
              <input
                type='password'
                placeholder='************'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal w-full focus:outline-none focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className='py-[19px] w-full sm:w-[361px] bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px] disabled:opacity-50'
          >
            {isLoading ? 'Qeydiyyatdan keçilir...' : 'Qeydiyyatdan keç'}
          </button>
        </form>

        <div className='flex items-center justify-center w-full sm:w-[494px] mb-6'>
          <p className="flex-grow h-px bg-gray-300"></p>
          <p className='font-medium text-sm leading-5 mx-2 whitespace-nowrap'>Digər hesablar ilə qeydiyyatdan keçin</p>
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