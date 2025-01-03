// React və lazımi hook-ları idxal edirik
import React, { useState } from 'react';
// Firebase-dən parol sıfırlama funksiyalarını idxal edirik
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
// Səhifələr arası keçid üçün hook idxal edirik
import { useNavigate } from 'react-router-dom';
// Bildiriş sistemi üçün komponentləri idxal edirik
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forget_Password = () => {
    // Email və yükləmə statusu üçün state-lər
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // Naviqasiya və autentifikasiya obyektlərini yaradırıq
    const navigate = useNavigate();
    const auth = getAuth();

    // Parol sıfırlama prosesini idarə edən funksiya
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Email daxil edilməsini yoxlayırıq
        if (!email) {
            toast.warn('Zəhmət olmasa e-poçt daxil edin.', {
                position: "top-right",
                autoClose: 3000,
            });
            setIsLoading(false);
            return;
        }

        try {
            // Parol sıfırlama linkini göndəririk
            await sendPasswordResetEmail(auth, email);
            toast.success('Parol sıfırlama linki e-poçtunuza göndərildi!', {
                position: "top-right",
                autoClose: 3000,
            });
            
            // Login səhifəsinə yönləndiririk
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            // Xətaları emal edirik
            console.error('Password reset error:', error);
            
            switch (error.code) {
                case 'auth/user-not-found':
                    toast.error('Bu email ilə istifadəçi tapılmadı.', {
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
                    toast.error('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.', {
                        position: "top-right",
                        autoClose: 3000,
                    });
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Komponentin UI hissəsi
    return (
        // Əsas container
        <div className="w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[130px]">
            <div className="flex flex-col items-center justify-center w-[361px]">
                <div className="w-full">
                    {/* Səhifə başlığı */}
                    <h1 className="text-center text-black text-2xl sm:text-3xl font-semibold font-montserrat leading-normal mb-4">
                        Parolunuzu unutmusuz?
                    </h1>

                    {/* Email forması */}
                    <form onSubmit={handleLogin} className="w-full">
                        <div className="grid grid-rows gap-5 mb-5">
                            <label className="text-black text-sm font-medium font-montserrat"></label>
                            <div className="w-full px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type="email"
                                    placeholder="E-poçtunuzu bura daxil edin"
                                    className="w-full text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        {/* Göndərmə düyməsi */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="py-[19px] w-full bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px] disabled:opacity-50"
                        >
                            {isLoading ? 'Göndərilir...' : 'Göndər'}
                        </button>
                    </form>
                </div>
            </div>
            {/* Toast bildirişləri üçün container */}
            <ToastContainer />
        </div>
    );
};

export default Forget_Password;