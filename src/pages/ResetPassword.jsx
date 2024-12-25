import React, { useState, useEffect } from 'react';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const oobCode = new URLSearchParams(window.location.search).get('oobCode');  // URL-dən kodu alırıq

    useEffect(() => {
        if (oobCode) {
            // Firebase-dən linki doğrulayırıq
            verifyPasswordResetCode(auth, oobCode)
                .then(() => {
                    // Link doğru olduqda reset parol səhifəsinə yönləndiririk
                    console.log('Link doğrudur, parol sıfırlamağa davam edin.');
                })
                .catch((error) => {
                    console.error('Səhv oldu:', error);
                    setError('Parol sıfırlama linki səhvdir və ya vaxtı bitib.');
                    navigate('/login'); // Xəta varsa login səhifəsinə yönləndiririk
                });
        }
    }, [oobCode, auth, navigate]);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!newPassword) {
            setError('Zəhmət olmasa yeni parol daxil edin.');
            return;
        }

        try {
            // Firebase ilə yeni parolu sıfırlayırıq
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage('Parol uğurla sıfırlandı!');
            navigate('/login');  // Giriş səhifəsinə yönləndiririk
        } catch (error) {
            setError('Parol sıfırlanarkən xəta baş verdi.');
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto pt-10 pb-16 px-4">
            <h2 className="text-center text-2xl font-semibold">Yeni Parolunuzu Daxil Edin</h2>
            <form onSubmit={handlePasswordReset}>
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder="Yeni parol"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {message && <p className="text-green-500 text-sm">{message}</p>}

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md"
                >
                    Parolu Sıfırla
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
