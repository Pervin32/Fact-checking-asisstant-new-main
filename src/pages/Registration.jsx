// Əsas React kitabxanasından və state idarəetməsi üçün useState hook-unu idxal edirik
import React, { useState } from 'react';

// Bildiriş göstərmək üçün react-toastify komponentlərini idxal edirik
import { ToastContainer, toast } from 'react-toastify';

// Səhifələr arası keçid üçün routing komponentlərini idxal edirik
import { Link, useNavigate } from 'react-router-dom';

// Firebase autentifikasiya metodlarını idxal edirik
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';

// Toast bildirişləri üçün CSS stillərini idxal edirik
import 'react-toastify/dist/ReactToastify.css';

// Sosial media düymələri üçün şəkil ikonlarını idxal edirik
import google from '../assets/img/gmail.svg';
import facebook from '../assets/img/face.svg';

// Firebase-i inicializasiya etmək üçün lazımi funksiyaları idxal edirik
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase quraşdırma parametrləri
const firebaseConfig = {
  apiKey: "AIzaSyAqsWZ5_ri2DBim6cgtMn2ir9w8t3XXa-8",
  authDomain: "fact-checking-asisstant.firebaseapp.com",
  projectId: "fact-checking-asisstant",
  storageBucket: "fact-checking-asisstant.firebasestorage.app",
  messagingSenderId: "543735020388",
  appId: "1:543735020388:web:dc0521ea65838e9f271871",
  measurementId: "G-BLQXDLD0PP"
};

// Firebase tətbiqini və analitikanı inicializasiya edirik
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Registration = () => {
  // İstifadəçi məlumatları üçün state-lər yaradırıq
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Səhifələr arası naviqasiya üçün hook
  const navigate = useNavigate();

  // Firebase autentifikasiya və sosial media provider obyektlərini yaradırıq
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Email/parol ilə qeydiyyat funksiyası
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Bütün sahələrin doldurulmasını yoxlayırıq
    if (!email || !password || !confirmPassword) {
      toast.warn('Zəhmət olmasa bütün sahələri doldurun.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Parolların uyğunluğunu yoxlayırıq
    if (password !== confirmPassword) {
      toast.error('Parollar uyğun gəlmir.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Parol uzunluğunu yoxlayırıq
    if (password.length < 6) {
      toast.error('Parol ən azı 6 simvol olmalıdır.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Firebase-də yeni istifadəçi yaradırıq
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Köhnə məlumatları təmizləyirik
      localStorage.clear();
      
      // Email-dən istifadəçi adını əldə edirik
      const emailUsername = email.split('@')[0];
      
      // İstifadəçi məlumatlarını lokalda saxlayırıq
      localStorage.setItem('authType', 'email');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', emailUsername);

      // Uğurlu qeydiyyat bildirişi göstəririk
      toast.success('Qeydiyyat uğurla tamamlandı!', {
        position: "top-right",
        autoClose: 3000,
      });

      // İstifadəçini əsas səhifəyə yönləndiririk
      setTimeout(() => {
        navigate('/textinput');
      }, 1000);

    } catch (error) {
      // Xətaları emal edirik və müvafiq bildirişlər göstəririk
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

  // Google ilə giriş funksiyası
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        
        // İstifadəçi məlumatlarını lokalda saxlayırıq
        localStorage.clear();
        localStorage.setItem('authType', 'google');
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);

        // Uğurlu giriş bildirişi göstəririk
        toast.success('Google ilə qeydiyyatdan keçdiniz!', {
          position: "top-right",
          autoClose: 2000,
        });

        // İstifadəçini əsas səhifəyə yönləndiririk
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

  // Facebook ilə giriş funksiyası
  const handleFacebookSignIn = () => {
    setIsLoading(true);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        
        // İstifadəçi məlumatlarını lokalda saxlayırıq
        localStorage.clear();
        localStorage.setItem('authType', 'facebook');
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.displayName);

        // Uğurlu giriş bildirişi göstəririk
        toast.success('Facebook ilə qeydiyyatdan keçdiniz!', {
          position: "top-right",
          autoClose: 2000,
        });

        // İstifadəçini əsas səhifəyə yönləndiririk
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

  // Komponentin UI hissəsini render edirik
  return (
    // Əsas container
    <div className='w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[0px] sm:mt-[130px]'>
      <div className='flex flex-col items-center justify-center w-full sm:w-[361px]'>
        {/* Səhifə başlığı */}
        <h1 className="text-center text-black text-2xl font-semibold font-montserrat leading-normal mb-4">
          Hesabınızı yaradın
        </h1>

        {/* Qeydiyyat forması */}
        <form onSubmit={handleRegister} className="w-full">
          {/* Email sahəsi */}
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

          {/* Parol sahəsi */}
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

          {/* Parol təsdiqi sahəsi */}
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

          {/* Qeydiyyat düyməsi */}
          <button
            type="submit"
            disabled={isLoading}
            className='py-[19px] w-full sm:w-[361px] bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px] disabled:opacity-50'
          >
            {isLoading ? 'Qeydiyyatdan keçilir...' : 'Qeydiyyatdan keç'}
          </button>
        </form>

        {/* Sosial media ilə giriş bölməsi */}
        <div className='flex items-center justify-center w-full sm:w-[494px] mb-6'>
          <p className="flex-grow h-px bg-gray-300"></p>
          <p className='font-medium text-sm leading-5 mx-2 whitespace-nowrap'>Digər hesablar ilə qeydiyyatdan keçin</p>
          <p className="flex-grow h-px bg-gray-300"></p>
        </div>

        {/* Sosial media düymələri */}
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

        {/* Giriş səhifəsinə keçid linki */}
        <p className="mt-6 text-center">
          Artiq hesabiniz var? <Link to='/login' className='text-[#7B7DCF]'>Daxil olun</Link>
        </p>

        {/* Toast bildirişləri üçün container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Registration;