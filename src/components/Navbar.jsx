import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import logo from '@/assets/img/logo.svg';
import enter from '@/assets/img/enter.svg';

const Navbar = ({ onPrinsiplerimizClick, onAboutClick, onWhoWeAreClick }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
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

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUsername(user.displayName || user.email.split('@')[0]);
                localStorage.setItem('userEmail', user.email);
                if (user.displayName) {
                    localStorage.setItem('userName', user.displayName);
                }
            } else {
                setIsLoggedIn(false);
                setUsername('');
            }
        });

        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            unsubscribe();
        };
    }, [auth]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            setIsLoggedIn(false);
            setUsername('');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between w-full mt-4 lg:mt-12 gap-4 md:gap-8 text-sm border-b pb-4">
                <Link to="/" className="bg-[#DEDEDE] w-32 md:w-40 h-9 flex items-center justify-center md:justify-start md:pl-8">
                    <img src={logo} alt="logo" className="h-6 md:h-auto" />
                </Link>

                {/* Mobile menu button */}
                <button 
                    className="md:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="w-6 h-0.5 bg-black mb-1"></div>
                    <div className="w-6 h-0.5 bg-black mb-1"></div>
                    <div className="w-6 h-0.5 bg-black"></div>
                </button>

                {/* Navigation links - desktop */}
                <div className={`w-full md:w-auto md:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row justify-between items-center gap-4 md:gap-16 lg:gap-40 text-base font-medium whitespace-nowrap`}>
                    <button onClick={onPrinsiplerimizClick} className="w-full md:w-auto py-2 md:py-0 cursor-pointer hover:text-blue">
                        Prinsiplərimiz
                    </button>
                    <button onClick={onAboutClick} className="w-full md:w-auto py-2 md:py-0 cursor-pointer hover:text-blue">
                        Haqqımızda
                    </button>
                    <button onClick={onWhoWeAreClick} className="w-full md:w-auto py-2 md:py-0 cursor-pointer hover:text-blue">
                        Biz kimik?
                    </button>
                </div>

                {/* Auth buttons */}
                <div className={`w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex items-center justify-center md:justify-end gap-4`}>
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            <div className="bg-blue rounded-full px-4 md:px-6 py-2">
                                <span className="text-white font-medium text-sm md:text-base">
                                    {username}
                                </span>
                            </div>
                            <button onClick={handleLogout}>
                                <img src={enter} alt="Çıxış" className="w-4 md:w-5 h-4 md:h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 font-semibold">
                            <Link to="/login" className="text-gray-700 hover:text-blue text-sm md:text-base">
                                Daxil ol
                            </Link>
                            <Link to="/registration" className="bg-blue text-white px-4 md:px-6 py-2 rounded-full hover:bg-blue-600 text-sm md:text-base">
                                Qeydiyyat
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;