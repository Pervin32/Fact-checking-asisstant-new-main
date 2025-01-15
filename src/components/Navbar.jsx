import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import logo from '@/assets/img/logo.svg';
import enter from '@/assets/img/enter.svg';

const Navbar = ({ onPrinsiplerimizClick, onAboutClick, onWhoWeAreClick }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        // Check authentication status on component mount and localStorage changes
        const checkAuth = () => {
            const storedUsername = localStorage.getItem('userName');
            const userEmail = localStorage.getItem('userEmail');
            
            if (userEmail) {
                setIsLoggedIn(true);
                setUsername(storedUsername || userEmail.split('@')[0]);
            } else {
                setIsLoggedIn(false);
                setUsername('');
            }
        };

        checkAuth();
        // Listen for localStorage changes
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="flex flex-wrap items-center justify-between w-full mt-4 lg:mt-12 gap-4 md:gap-8 px-4 md:px-8 text-sm border-b pb-4">
            <Link to="/" className="bg-[#DEDEDE] w-40 h-9 flex items-center mx-auto md:mx-0 pl-8">
                <img src={logo} alt="logo" />
            </Link>

            <div className="flex justify-between items-center gap-16 md:gap-40 sm:gap-20 text-base font-medium whitespace-nowrap">
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

            {isLoggedIn ? (
                <div className="flex items-center gap-2">
                    <div className="bg-blue rounded-full px-6 py-2">
                        <span className="text-white font-medium">
                            {username}
                        </span>
                    </div>
                    <button onClick={handleLogout}>
                        <img src={enter} alt="Çıxış" className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-gray-700">
                        Daxil ol
                    </Link>
                    <Link to="/registration" className="bg-blue font-bold text-white px-6 py-2 rounded-full">
                        Qeydiyyat
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;