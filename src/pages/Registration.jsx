import React, { useState } from 'react'; // React və useState funksiyasını daxil edirik
import { ToastContainer, toast } from 'react-toastify'; // Toast bildirişləri üçün import
import { Link, useNavigate } from 'react-router-dom'; // Link və navigate (yönləndirmə) funksiyaları
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'; // Firebase ilə əlaqə yaratmaq üçün lazım olan funksiyalar

import 'react-toastify/dist/ReactToastify.css'; // React-toastify stilini daxil edirik

import google from '../assets/img/gmail.svg'; // Google şəkli
import facebook from '../assets/img/face.svg'; // Facebook şəkli

/// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const [email, setEmail] = useState(''); // E-mail üçün state
  const [password, setPassword] = useState(''); // Parol üçün state
  const [confirmPassword, setConfirmPassword] = useState(''); // Parolun təkrarı üçün state
  
  const navigate = useNavigate(); // Yönləndirmə üçün navigate funksiyası
  const auth = getAuth(); // Firebase autentifikasiya
  const googleProvider = new GoogleAuthProvider(); // Google ilə autentifikasiya üçün provider
  const facebookProvider = new FacebookAuthProvider(); // Facebook ilə autentifikasiya üçün provider

  // Qeydiyyat funksiyası
  const handleRegister = (e) => {
    e.preventDefault(); // Formanın təkrardan yüklənməsinin qarşısını alır

    // E-mail, parol və təkrarı boş olmamalıdır
    if (!email || !password || !confirmPassword) {
      toast.warn('Zəhmət olmasa bütün sahələri doldurun.', {
        position: "top-right", // Bildirişin yeri
        autoClose: 3000, // Bildirişin 3 saniyə sonra yox olması
      });
      return;
    }

    // Parollar uyğun gəlməlidir
    if (password !== confirmPassword) {
      toast.error('Parollar uyğun gəlmir.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // E-poçtu qeydiyyatdan keçmiş siyahıya əlavə edin
    toast.success('Qeydiyyat uğurla tamamlandı!', {
      position: "top-right",
      autoClose: 3000,
    });

    // 1 saniyə sonra axtarış səhifəsinə yönləndirin
    setTimeout(() => {
      navigate('/textinput');
    }, 1000);
  };

  // Google ilə daxil olma funksiyası
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toast.success('Google ilə qeydiyyatdan keçdiniz!', { position: "top-right" });
        navigate('/textinput'); // Google ilə uğurlu daxil olma sonrası yönləndirmə
      })
      .catch((error) => {
        toast.error('Google ilə qeydiyyat zamanı xəta baş verdi.', { position: "top-right" });
      });
  };

  // Facebook ilə daxil olma funksiyası
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        toast.success('Facebook ilə qeydiyyatdan keçdiniz!', { position: "top-right" });
        navigate('/textinput'); // Facebook ilə uğurlu daxil olma sonrası yönləndirmə
      })
      .catch((error) => {
        toast.error('Facebook ilə qeydiyyat zamanı xəta baş verdi.', { position: "top-right" });
      });
  };

  return (
    <div className='w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[130px]'>
      <div className='flex flex-col items-center justify-center w-[361px]'>
        <h1 className="text-center text-black text-2xl font-semibold font-montserrat leading-normal mb-4">Hesabınızı yaradın</h1>

        {/* Qeydiyyat Forması */}
        <form onSubmit={handleRegister} className="w-full">
          {/* E-mail */}
          <div className='grid grid-rows gap-[6px] mb-[12px]'>
            <label className="text-black text-sm font-medium font-montserrat">E-mail</label>
            <div className="w-[361px] px-2.5 py-[13px] rounded-md border border-[#d9d9d9]">
              <input
                type='email'
                placeholder='E-poçtunuzu bura daxil edin'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal size-full focus:outline-none focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // E-maili state-ə qeyd etmək
              />
            </div>
          </div>

          {/* Parol */}
          <div className='grid grid-rows gap-[6px] mb-4'>
            <label className="text-black text-sm font-medium font-montserrat">Parol</label>
            <div className="w-[361px] px-2.5 py-[13px] rounded-md border">
              <input
                type='password'
                placeholder='************'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal size-full focus:outline-none focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Parolu state-ə qeyd etmək
              />
            </div>
          </div>

          {/* Parol təkrarı */}
          <div className='grid grid-rows gap-[6px] mb-[34px]'>
            <label className="text-black text-sm font-medium font-montserrat">Parolu təkrar yaz</label>
            <div className="w-[361px] px-2.5 py-[13px] rounded-md border">
              <input
                type='password'
                placeholder='************'
                className="pl-[10px] text-sm font-medium font-['Inter'] leading-normal size-full focus:outline-none focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Parol təkrarı state-ə qeyd etmək
              />
            </div>
          </div>

          {/* Qeydiyyat düyməsi */}
          <button
            type="submit"
            className='py-[19px] w-[361px] bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px]'
          >
            Qeydiyyatdan keç
          </button>
        </form>

        {/* Sosial şəbəkələr ilə qeydiyyat */}
        <div className='flex items-center justify-center w-[494px] mb-6'>
          <p className="flex-grow h-px bg-gray-300"></p>
          <p className='font-medium text-sm leading-5 mx-2'>Digər hesablar ilə qeydiyyatdan keçin</p>
          <p className="flex-grow h-px bg-gray-300"></p>
        </div>

        {/* Google və Facebook ilə daxil olma düymələri */}
        <div className='flex items-center justify-center gap-4'>
          <button onClick={handleGoogleSignIn} className='flex items-center justify-center'>
            <img className='size-[48px]' src={google} alt="google" />
          </button>
          <button onClick={handleFacebookSignIn} className='flex items-center justify-center'>
            <img className='size-[48px]' src={facebook} alt="facebook" />
          </button>
        </div>

        {/* Qeydiyyat linki */}
        <p className="mt-6 text-center">Artiq hesabiniz var? <Link to='/login' className='text-[#7B7DCF]'>Daxil olun</Link></p>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Registration; 
