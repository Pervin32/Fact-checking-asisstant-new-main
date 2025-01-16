import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoComponent from "./VideoComponent";
import down from "../assets/img/down.svg";

const Main = () => {
    const navigate = useNavigate();
    const prinsiplerimizRef = useRef(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const checkAuth = () => {
            const userEmail = localStorage.getItem('userEmail');
            setIsAuthenticated(!!userEmail);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePrinsiplerimizClick = () => {
        if (prinsiplerimizRef.current) {
            prinsiplerimizRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleButtonClick = () => {
        const userEmail = localStorage.getItem('userEmail');
        navigate(userEmail ? "/textinput" : "/registration");
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-120px)] md:mt-[69px]">
                    {/* Video container */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <div className="w-full h-full">
                            <VideoComponent />
                        </div>
                    </div>

                    {/* Text Overlay */}
                    <div className="relative h-full flex items-center justify-center">
                        <div className="max-w-[800px] w-full mx-auto text-center px-4">
                            <h1 className="text-2xl sm:text-3xl md:text-[48px] leading-tight md:leading-[78px] 
                                         mb-4 sm:mb-6 md:mb-9 font-medium transition-all duration-300">
                                Fact Checking Assistant
                            </h1>
                            <p className="text-base sm:text-lg md:text-[24px] leading-relaxed md:leading-[36px] 
                                        mb-4 sm:mb-6 md:mb-9 transition-all duration-300">
                                Faktın dəqiqliyini hesabla
                            </p>
                            <button
                                onClick={handleButtonClick}
                                className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-md 
                                         text-sm sm:text-base md:text-[16px] leading-[24px] 
                                         transition-all duration-300 hover:scale-105 
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Bura kliklə!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           
            {/* Scroll Button with reduced margins */}
            <button 
                onClick={handlePrinsiplerimizClick} 
                className="cursor-pointer flex items-center justify-center mx-auto 
                         -mt-32  mb-2 md:mb-8 transition-transform duration-300 
                         hover:scale-110 focus:outline-none"
                aria-label="Scroll to principles"
            >
                <img 
                    src={down} 
                    alt="Scroll down"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" 
                />
            </button>

            {/* Reference div */}
            <div ref={prinsiplerimizRef} className="md:min-h-0"></div>
        </div>
    );
};

export default Main;