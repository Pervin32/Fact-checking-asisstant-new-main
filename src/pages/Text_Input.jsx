// Lazımi React komponentlərini və hook-ları import edirik
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Giriş ikonunu import edirik
import enter from '@/assets/img/enter.svg';

// TextInput komponenti
const TextInput = () => {
  // State-ləri təyin edirik
  const [searchText, setSearchText] = useState(''); // Axtarış mətni
  const [isLoading, setIsLoading] = useState(false); // Yüklənmə statusu
  const [username, setUsername] = useState('İstifadəçi'); // İstifadəçi adı
  const navigate = useNavigate(); // Səhifələr arası naviqasiya üçün hook

  // İstifadəçi məlumatlarını lokaldan yükləyən effect
  useEffect(() => {
    const storedData = ['userName', 'facebookProfile', 'userEmail']
      .map(key => localStorage.getItem(key))
      .filter(value => value && value !== 'null');

    if (storedData.length > 0) {
      const [userName, facebookProfile, userEmail] = storedData;
      setUsername(
        userName ||
        facebookProfile ||
        (userEmail ? userEmail.split('@')[0] : 'İstifadəçi')
      );
    }
  }, []);

  // Axtarış əməliyyatını həyata keçirən funksiya
  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsLoading(true);

    try {
      // Axtarış tarixçəsini yeniləyirik
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const newSearch = { text: searchText, date: new Date().toISOString() };
      localStorage.setItem('searchHistory', JSON.stringify([...searchHistory, newSearch]));

      // API sorğusu göndəririk
      const response = await fetch('https://fact-checking-assistant.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchText }),
      });

      if (!response.ok) throw new Error('API ilə problem baş verdi.');

      // API cavabını emal edirik
      const apiData = await response.json();
      navigate('/result', {
        state: {
          searchText,
          score: apiData.score || 0,
          sources: apiData.sources || [],
          recommendations: apiData.recommendations || [],
        },
      });
    } catch (error) {
      // Xəta halında əməliyyatları idarə edirik
      console.error('API error:', error);
      navigate('/result', {
        state: {
          searchText,
          score: 0,
          sources: [{ title: 'Xəta', description: 'Fakt yoxlanılmadı.' }],
          recommendations: ['Bağlantınızı yoxlayın', 'Sonra yenidən cəhd edin.'],
        },
      });
    } finally {
      // Yüklənmə statusunu sıfırlayırıq
      setIsLoading(false);
      setSearchText('');
    }
  };

  // Enter düyməsi hadisəsini idarə edən funksiya
  const handleKeyPress = event => {
    if (event.key === 'Enter') handleSearch();
  };

  // Mətn dəyişikliyi hadisəsini idarə edən funksiya
  const handleTextChange = event => {
    setSearchText(event.target.value);
  };

  // Komponentin JSX strukturu
  return (
    <div className="min-h-screen w-full px-4 md:px-6 lg:px-8">
      {/* Başlıq paneli */}
      <header className="flex justify-end items-center gap-4 md:gap-6 pt-4 md:pt-10">
        <div className="bg-blue rounded-full px-4 py-2 md:px-6 md:py-2.5">
          <span className="text-white text-sm md:text-base whitespace-nowrap">
            {username}
          </span>
        </div>
        <Link
          to="/registration"
          className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9"
        >
          <img src={enter} alt="Enter" className="w-8 h-8 md:w-9 md:h-9" />
        </Link>
      </header>

      {/* Əsas məzmun */}
      <main className="flex items-center justify-center w-full mt-16 md:mt-32 lg:mt-40">
        <div className="w-full max-w-2xl mx-auto">
          {/* Mətn daxiletmə sahəsi */}
          <textarea
            placeholder="İnformasiya və ya keçid linkini bura daxil edin!"
            className="w-full h-32 md:h-36 px-4 md:px-6 py-2 md:py-3
              text-sm md:text-base lg:text-lg
              border border-gray-300 rounded-lg md:rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-all duration-200 ease-in-out
              disabled:bg-gray-50 disabled:cursor-not-allowed"
            value={searchText}
            onChange={handleTextChange}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default TextInput;