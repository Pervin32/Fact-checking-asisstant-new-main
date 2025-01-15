import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoComponent from "./VideoComponent";
import down from "../assets/img/down.svg";

const Main = () => {
    const navigate = useNavigate();
    const prinsiplerimizRef = useRef(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status on component mount and localStorage changes
        const checkAuth = () => {
            const userEmail = localStorage.getItem('userEmail');
            setIsAuthenticated(!!userEmail);
        };

        checkAuth();
        // Listen for localStorage changes
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handlePrinsiplerimizClick = () => {
        if (prinsiplerimizRef.current) {
            prinsiplerimizRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleButtonClick = () => {
        // Yoxla ki, istifadəçinin email-i localStorage-də varmı
        const userEmail = localStorage.getItem('userEmail');
        
        if (userEmail) {
            // İstifadəçi daxil olubsa, TextInput səhifəsinə yönləndir
            navigate("/textinput");
        } else {
            // İstifadəçi daxil olmayıbsa, qeydiyyat səhifəsinə yönləndir
            navigate("/registration");
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 md:mt-[69px] px-4 md:px-8">
                <div className="font-medium flex flex-col justify-center items-start">
                    <h1 className="text-3xl md:text-[48px] leading-tight md:leading-[78px] md:w-[361px] mb-6 md:mb-9">
                        Fact Checking Assistant
                    </h1>
                    <p className="text-lg md:text-[24px] leading-relaxed md:leading-[36px] mb-6 md:mb-9">
                        Faktın dəqiqliyini hesabla
                    </p>
                    <button
                        onClick={handleButtonClick}
                        className="bg-blue text-white px-6 py-3 md:py-4 rounded-md text-base md:text-[16px] leading-[24px] transition-transform transform hover:scale-105"
                    >
                        Bura kliklə!
                    </button>
                </div>

                <div className="flex justify-center md:justify-end -mt-[50px] -mb-[80px] md:mt-2 md:mb-2">
                    <VideoComponent />
                </div>
            </div>
           
            <button 
                onClick={handlePrinsiplerimizClick} 
                className="cursor-pointer flex items-center justify-center mx-auto mt-9"
            >
                <img src={down} alt="Scroll down" />
            </button>

            <div ref={prinsiplerimizRef} className=""></div>
        </div>
    );
};

export default Main;