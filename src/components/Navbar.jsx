// React və routing komponentlərini idxal edirik
import React from 'react';
import { Link } from 'react-router-dom';
// Logo şəklini idxal edirik
import logo from '@/assets/img/logo.svg';

// Navbar komponenti - kliklənmə hadisələrini props kimi qəbul edir
const Navbar = ({ onPrinsiplerimizClick, onAboutClick, onWhoWeAreClick }) => {
    return (
        // Əsas navbar konteyneri
        <div className="flex flex-wrap items-center justify-between w-full  mt-4 lg:mt-12 gap-4 md:gap-8 px-4 md:px-8 text-sm border-b pb-4">
            {/* Logo hissəsi - ana səhifəyə yönləndirir */}
            <Link to="/" className="bg-[#DEDEDE] w-40 h-9 flex items-center mx-auto md:mx-0 pl-8">
                <img src={logo} alt="logo" />
            </Link>

            {/* Əsas naviqasiya linkləri */}
            <div className="flex justify-between items-center gap-16 md:gap-40 sm:gap-20 font-medium whitespace-nowrap">
                <button onClick={onPrinsiplerimizClick} className="cursor-pointer">
                    Prinsiplərimiz
                </button>
                <button onClick={onAboutClick} className="cursor-pointer">
                    Haqqımızda
                </button>
                <button onClick={onWhoWeAreClick} className="cursor-pointer">
                    Biz kimik?
                </button>
            </div>

            {/* Giriş və qeydiyyat düymələri */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8 whitespace-nowrap">
                <nav>
                    <Link to="/login" className="text-gray-700">
                        Daxil ol
                    </Link>
                </nav>
                <Link to="/registration" className="bg-blue font-bold text-white w-24 h-9 rounded-md flex items-center justify-center font-montserrat">
                    Qeydiyyat
                </Link>
            </div>
        </div>
    );
};

export default Navbar;