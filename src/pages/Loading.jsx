import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
    const [loading, setLoading] = useState(true); // Başlangıçta loading true olarak ayarlanır
    const navigate = useNavigate();

    useEffect(() => {
       // 5 saniyə sonra loading dayandırılır və result səhifəsinə yönləndirilir
        const timer = setTimeout(() => {
            setLoading(false);
            navigate('/result');
        }, 10000);

        // Komponent ayrıldıqda taymeri təmizləmək üçün təmizləmə funksiyası
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div>
                {loading && <BeatLoader size={35} color={'#4BDB2B'} />}
            </div>


            <h2 className="">Verifying sources…</h2>
        </div>
    );
};

export default Loading;