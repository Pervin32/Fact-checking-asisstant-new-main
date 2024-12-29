import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '@/assets/img/logo_dashboard.svg';
import pen from '@/assets/img/pen.svg';
import enter from '@/assets/img/enter.svg';

const getCategoryScore = (score) => {
    if (score === 0) return 'text-black';
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
};

const getDateCategory = (date) => {
    const today = new Date();
    const searchDate = new Date(date);
    const daysDiff = (today - searchDate) / (1000 * 60 * 60 * 24);

    if (daysDiff <= 7) return 'Son 7 gün';
    if (daysDiff <= 30) return 'Son 30 gün';

    return `${searchDate.toLocaleString('default', { month: 'long' })} ${searchDate.getFullYear()}`;
};

const Result = ({ searchHistory = [] }) => {
    const location = useLocation();
    const [groupedHistory, setGroupedHistory] = useState({});
    const [latestSearch, setLatestSearch] = useState({ text: null, url: null });
    const [score, setScore] = useState(location.state?.score || 0);
    const [apiResponse, setApiResponse] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // localStorage-dan userName-i alırıq
        const storedUsername = localStorage.getItem('userName');
        const authType = localStorage.getItem('authType');
        
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            // Əgər userName yoxdursa, email-dən istifadə edirik
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const extractedUsername = userEmail.split('@')[0];
                setUsername(extractedUsername);
            } else {
                // Heç bir məlumat yoxdursa default olaraq 'A' hərfini göstəririk
                setUsername('İstifadəçi');
            }
        }
    }, []);
    useEffect(() => {
        const fetchFactCheck = async () => {
            try {
                const searchText = location.state?.searchText || "";

                const response = await fetch('https://fact-checking-assistant.onrender.com/factcheck', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fact: searchText }),
                });
                
                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                setApiResponse(data);
                setScore(data.score || 0);
            } catch (error) {
                console.error('Full error details:', error);
                setScore(0);
            }
        };

        if (Array.isArray(searchHistory) && searchHistory.length > 0) {
            const grouped = searchHistory.reduce((acc, item) => {
                const category = getDateCategory(item.date);
                acc[category] = acc[category] || [];
                acc[category].push(item);
                return acc;
            }, {});
            setGroupedHistory(grouped);

            const allSearches = Object.values(grouped).flat();
            const latest = allSearches[allSearches.length - 1];
            setLatestSearch({ text: latest.text, url: latest.url });
        }

        
    }, [searchHistory, location.state]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[268px_1fr] min-h-screen">
            <aside className="p-4 md:p-9 border md:border-r border-[#C8C8C8] h-auto md:h-screen">
                <div className="flex items-center justify-between mb-6 md:mb-12">
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-[100px] md:w-[129px] h-[35px] md:h-[45px]" />
                    </Link>
                    <Link to="/textinput">
                        <img src={pen} alt="pen" className="w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                </div>

                <div className="pr-2 md:pr-[23px] overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-180px)]">
                    {Object.keys(groupedHistory).length ? (
                        Object.keys(groupedHistory).map((category, index) => (
                            <div key={index}>
                                <h3 className="font-bold mb-2 text-xs md:text-sm">{category}</h3>
                                <ul className="space-y-2 mb-4 md:mb-6">
                                    {groupedHistory[category].map((item, idx) => (
                                        <li key={idx} className="p-2 rounded-md cursor-pointer">
                                            <p className="text-xs md:text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                                                {item.text}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs md:text-sm">
                            {location.state?.searchText || "Hələ axtarış yoxdur."}
                        </p>
                    )}
                </div>
            </aside>

            <div className="flex flex-col min-h-full">
                <section className="flex justify-end gap-4 p-4 md:pt-10 md:pr-8 bg-white">
                    <div className="bg-blue rounded-full px-4 py-2 md:px-6 md:py-2.5">
                        <span className="text-white text-sm md:text-base whitespace-nowrap">
                            {username}
                        </span>
                    </div>
                    <Link to="/registration">
                        <img src={enter} alt="enter" className="w-8 h-8 md:w-9 md:h-9" />
                    </Link>
                </section>

                <div className="flex flex-col text-center flex-grow p-4 md:p-6">
                    <div className="mt-[50px] md:mt-[74px] text-center w-[200px] md:w-[246px] h-[27px] rounded-[17px] mx-auto bg-red-400"></div>
                    <div className="mb-8 md:mb-12 mt-[30px] md:mt-[53px] flex flex-col justify-center items-center text-center">
                        <div className={`font-semibold border-t border-black w-[200px] md:w-[234px] text-4xl md:text-5xl leading-[60px] md:leading-[72px] mx-auto pt-[19px] ${getCategoryScore(score)}`}>
                            {score}
                        </div>
                        <h2 className="text-lg md:text-xl font-semibold mb-2">Ümumi bal</h2>
                        <div className="mt-4 p-2 rounded-md text-center">
                            <p className="text-sm md:text-[15px] leading-6 w-full md:w-[576px] mx-auto px-4 md:px-0">
                                {location.state?.searchText || latestSearch.text || "Hələ axtarış yoxdur."}
                            </p>
                            {latestSearch.url && (
                                <a href={latestSearch.url} className="text-blue-500 text-xs md:text-sm mt-1 block break-all">
                                    {latestSearch.url}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;