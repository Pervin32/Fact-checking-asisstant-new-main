import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Firebase importu

const Forget_Password = () => {
    // State-lər
    const [email, setEmail] = useState('');  // E-poçt dəyəri üçün state
    const [error, setError] = useState('');  // Xəta mesajı üçün state
    const [message, setMessage] = useState('');  // Uğurlu mesaj üçün state

    // Firebase Auth instance
    const auth = getAuth();

    // Parol sıfırlama formunun submit funksiyası
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  // Hər dəfə formu göndərməzdən əvvəl xətaları təmizləyirik
        setMessage(''); // Hər dəfə formu göndərməzdən əvvəl mesajı təmizləyirik

        if (!email) {
            setError('Zəhmət olmasa e-poçt daxil edin.');  // E-poçt daxil edilməyibsə xətanı göstəririk
            return;
        }

        try {
            // Firebase ilə parol sıfırlama e-poçtunu göndəririk
            await sendPasswordResetEmail(auth, email);
            setMessage('E-poçt göndərildi! Xahiş edirik e-poçtunuza baxın və parolunuzu sıfırlayın.');
        } catch (error) {
            setError('Parol sıfırlanarkən xəta baş verdi. Xahiş edirik yenidən cəhd edin.');
            console.error('Error sending password reset email: ', error.message);
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
                        {/* E-mail */}
                        <div className="grid grid-rows gap-5 mb-5">
                            <label className="text-black text-sm font-medium font-montserrat"></label>
                            <div className="w-full px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type="email"
                                    placeholder="E-poçtunuzu bura daxil edin"
                                    className="w-full text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Xəta mesajı */}
                        {error && <p className="text-red-500 text-sm my-2">{error}</p>}

                        {/* Uğurlu mesaj */}
                        {message && <p className="text-green-500 text-sm my-2">{message}</p>}

                        {/* Giriş düyməsi */}
                        <button
                            type="submit"
                            className="py-[19px] w-full bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px]"
                        >
                            Gönder
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Forget_Password;
