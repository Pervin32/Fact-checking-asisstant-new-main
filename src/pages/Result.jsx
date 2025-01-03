// Lazımi React komponentlərini və routing funksionallığını import edirik
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
// Statik şəkilləri import edirik
import logo from '@/assets/img/logo_dashboard.svg';
import pen from '@/assets/img/pen.svg';
import enter from '@/assets/img/enter.svg';

// Balın rəngini təyin edən funksiya
const getCategoryScore = (score) => {
    if (score === 0) return 'text-black';
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
};

// Balın arxa fon rəngini təyin edən funksiya
const getCategoryBackgroundColor = (score) => {
    if (score === 0) return 'bg-black';
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
};

// Tarix kateqoriyasını təyin edən funksiya
const getDateCategory = (date) => {
    const today = new Date();
    const searchDate = new Date(date);
    const daysDiff = (today - searchDate) / (1000 * 60 * 60 * 24);

    if (daysDiff <= 7) return 'Son 7 gün';
    if (daysDiff <= 30) return 'Son 30 gün';
    return `${searchDate.toLocaleString('default', { month: 'long' })} ${searchDate.getFullYear()}`;
};

// Əsas Result komponenti
const Result = ({ searchHistory = [] }) => {
    // Router və state dəyişənlərinin təyin edilməsi
    const location = useLocation();
    const [groupedHistory, setGroupedHistory] = useState({});
    const [latestSearch, setLatestSearch] = useState({ text: null, url: null });
    const [score, setScore] = useState(() => 
        parseInt(localStorage.getItem('currentScore')) || location.state?.score || 0
    );
    const [apiResponse, setApiResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [currentSearchText, setCurrentSearchText] = useState(() => 
        localStorage.getItem('currentSearchText') || location.state?.searchText || ''
    );
    const [isNewSearch, setIsNewSearch] = useState(true);

    // İstifadəçi adını lokaldan yükləyən effect
    useEffect(() => {
        const storedUsername = localStorage.getItem('userName');
        
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const extractedUsername = userEmail.split('@')[0];
                setUsername(extractedUsername);
            } else {
                setUsername('İstifadəçi');
            }
        }
    }, []);

    // Faktları yoxlayan API sorğusu effecti
    useEffect(() => {
        const fetchFactCheck = async () => {
            if (!currentSearchText) return;

            setIsLoading(true);
            setError(null);

            try {
                // Mövcud axtarış tarixçəsini yoxlayırıq
                const existingHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
                const searchExists = existingHistory.some(item => item.text === currentSearchText);

                // API sorğusu göndəririk
                const response = await fetch('https://fact-checking-assistant.onrender.com/factcheck', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fact: currentSearchText }),
                });
                
                if (!response.ok) {
                    throw new Error(`API xətası: ${response.status}`);
                }

                // Cavabı emal edirik
                const data = await response.json();
                setApiResponse(data);
                
                const newScore = data.score || 0;
                setScore(newScore);
                localStorage.setItem('currentScore', newScore.toString());

                // Yeni axtarışı tarixçəyə əlavə edirik
                if (isNewSearch && !searchExists) {
                    const newSearch = {
                        text: currentSearchText,
                        date: new Date().toISOString(),
                        score: newScore
                    };

                    const updatedHistory = [newSearch, ...existingHistory];
                    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
                }

                loadSearchHistory();

            } catch (error) {
                setError(error.message);
                setScore(0);
                localStorage.setItem('currentScore', '0');
                console.error('Xəta:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentSearchText) {
            fetchFactCheck();
        }
        loadSearchHistory();
    }, [currentSearchText, isNewSearch]);

    // Axtarış tarixçəsini yükləyən funksiya
    const loadSearchHistory = () => {
        const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        
        // Tarixçəni tarixə görə sıralayırıq
        const sortedHistory = savedHistory.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        // Tarixçəni kateqoriyalara görə qruplaşdırırıq
        const grouped = sortedHistory.reduce((acc, item) => {
            const category = getDateCategory(item.date);
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {});

        setGroupedHistory(grouped);

        // Son axtarışı təyin edirik
        if (sortedHistory.length > 0) {
            setLatestSearch({ text: sortedHistory[0].text, url: sortedHistory[0].url });
        }
    };

    // Tarixçəni təmizləyən funksiya
    const clearHistory = () => {
        localStorage.removeItem('searchHistory');
        setGroupedHistory({});
        setLatestSearch({ text: null, url: null });
    };

    // Komponentin JSX strukturu
    return (
        <div className="grid grid-cols-1 md:grid-cols-[268px_1fr] min-h-screen">
            {/* Yan panel */}
            <aside className="p-4 md:p-9 border md:border-r border-[#C8C8C8] h-auto md:h-screen">
                <div className="flex items-center justify-between mb-6 md:mb-12">
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-[100px] md:w-[129px] h-[35px] md:h-[45px]" />
                    </Link>
                    <Link to="/textinput">
                        <img src={pen} alt="pen" className="w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                </div>

                {/* Axtarış tarixçəsi */}
                <div className="pr-2 md:pr-[23px] overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-180px)]">
                    {Object.keys(groupedHistory).length ? (
                        Object.keys(groupedHistory)
                            .sort((a, b) => {
                                const order = { 'Son 7 gün': 3, 'Son 30 gün': 2 };
                                return (order[b] || 1) - (order[a] || 1);
                            })
                            .map((category, index) => (
                                <div key={index}>
                                    <h3 className="font-bold mb-2 text-xs md:text-sm">{category}</h3>
                                    <ul className="space-y-2 mb-4 md:mb-6">
                                        {groupedHistory[category].map((item, idx) => (
                                            <li 
                                                key={idx} 
                                                className="p-2 rounded-md cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setIsNewSearch(false);
                                                    setCurrentSearchText(item.text);
                                                    localStorage.setItem('currentSearchText', item.text);
                                                }}
                                            >
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
                            {currentSearchText || "Hələ axtarış yoxdur."}
                        </p>
                    )}
                </div>
            </aside>

            {/* Əsas məzmun */}
            <div className="flex flex-col min-h-full">
                {/* Başlıq paneli */}
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

                {/* Nəticə bölməsi */}
                <div className="flex flex-col text-center flex-grow p-4 md:p-6">
                    {isLoading && (
                        <div className="mt-4 text-center">Yüklənir...</div>
                    )}
                    {error && (
                        <div className="mt-4 text-red-500 text-center">{error}</div>
                    )}
                    {/* Bal göstəricisi */}
                    <div className={`mt-[30px] md:mt-[53px] text-center w-[200px] md:w-[246px] h-[27px] rounded-[17px] mx-auto ${getCategoryBackgroundColor(score)}`}></div>
                    <div className="mb-8 md:mb-12 mt-[30px] md:mt-[53px] flex flex-col justify-center items-center text-center">
                        <div className={`font-semibold border-t border-black w-[200px] md:w-[234px] text-4xl md:text-5xl leading-[60px] md:leading-[72px] mx-auto pt-[19px] ${getCategoryScore(score)}`}>
                            {score}
                        </div>
                        <h2 className="text-lg md:text-xl font-semibold mb-2">Ümumi bal</h2>
                    </div>
                    {/* Axtarış mətni */}
                    <div className="mt-4 p-2 rounded-md text-center">
                        <p className="text-sm md:text-[15px] leading-6 w-full md:w-[576px] mx-auto px-4 md:px-0">
                            {currentSearchText || latestSearch.text || "Hələ axtarış yoxdur."}
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
    );
};

export default Result;