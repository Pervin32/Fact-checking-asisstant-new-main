import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forget_Password = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email) {
            toast.warn('Zəhmət olmasa e-poçt daxil edin.', {
                position: "top-right",
                autoClose: 3000,
            });
            setIsLoading(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Parol sıfırlama linki e-poçtunuza göndərildi!', {
                position: "top-right",
                autoClose: 3000,
            });
            
            // 3 saniyə sonra login səhifəsinə yönləndir
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
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

    return (
        <div className="w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[130px]">
            <div className="flex flex-col items-center justify-center w-[361px]">
                <div className="w-full">
                    <h1 className="text-center text-black text-2xl sm:text-3xl font-semibold font-montserrat leading-normal mb-4">
                        Parolunuzu unutmusuz?
                    </h1>

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
            <ToastContainer />
        </div>
    );
};

export default Forget_Password;