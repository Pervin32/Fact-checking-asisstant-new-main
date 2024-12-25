import React, { useState } from 'react';
import enter from '@/assets/img/enter.svg';
import search from '@/assets/img/search.svg';
import { Link, useNavigate } from 'react-router-dom';

const Text_Input = ({ addSearchToHistory, username }) => {
  const [searchText, setSearchText] = useState(''); // Axtarış mətni üçün state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchText.trim() === '') return; // Boş mətni yoxlayır

    try {
      setIsLoading(true);

      // Mock API response ( data)
      const mockApiResponse = {
        score: 0,
        sources: [
          { title: 'API', score: 0, description: 'Simulated fact-check result' },
        ],
        recommendations: [
          'Cross-check with other trusted sources',
          'Look for expert opinions',
        ],
      };

      // Simulate delay to mimic real API call
      setTimeout(() => {
        // Hazırlanan məlumatlar API cavabına əsasən
        const loadingData = {
          searchText,
          score: mockApiResponse.score,
          sources: mockApiResponse.sources,
          recommendations: mockApiResponse.recommendations,
        };

        // Axtarışı tarixçəyə əlavə etmək
        addSearchToHistory(searchText);

        // Yönləndirmə /result səhifəsinə
        navigate('/result', { state: loadingData });
      }, 3000); // Simulate a 1-second delay
    } catch (error) {
      console.error('Error in mock API:', error);

      // Fallback error handling
      const loadingData = {
        searchText,
        score: 50, // Neutral score for failed requests
        sources: [
          { title: 'Error', score: 0, description: 'Unable to verify fact' },
        ],
        recommendations: [
          'Check your internet connection',
          'Try again later',
          'Verify information manually',
        ],
      };

      navigate('/result', { state: loadingData });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
      navigate('/loading'); // Enter düyməsinə basıldıqda handleSearch funksiyası çağırılır
    }
  };

  return (
    <div>
      {/* Üst butonlar */}
      <div className="flex justify-end gap-6 pt-10 pr-8">
        {username ? (
          <div className="bg-blue w-[100px] sm:w-[168px] h-9 text-white rounded-full text-center text-sm sm:text-base leading-[30px] flex items-center justify-center">
            {username}
          </div>
        ) : (
          <Link
            to="/loading"
            className="bg-blue w-[100px] sm:w-[168px] h-9 text-white rounded-full text-center text-sm sm:text-base leading-[30px] flex items-center justify-center"
          >
            A
          </Link>
        )}
        <Link to="/registration">
          <img src={enter} alt="enter" className="size-8 md:size-9" />
        </Link>
      </div>

      {/* Axtarış */}
      <div className="max-w-[744px] w-full h-12 sm:h-[52px] flex items-center justify-between mx-auto mt-[150px] sm:mt-[375px] border px-4 sm:px-6 rounded-lg sm:rounded-[16px] text-[#8D8D8D]">
        <input
          type="text"
          placeholder="İnformasiya və ya keçid linkini bura daxil edin!"
          className="w-full text-sm sm:text-lg leading-6 outline-none"
          value={searchText} // Axtarış mətni
          onChange={(e) => setSearchText(e.target.value)} // Mətni dəyişdikdə yeniləyir
          onKeyDown={handleKeyPress} // Enter basıldıqda handleKeyPress çağırılır
          disabled={isLoading}
        />
        <div
          className={`bg-[#959595] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
          onClick={!isLoading ? handleSearch : undefined} // Axtarış düyməsinə basıldıqda handleSearch çağırılır
        >
          {isLoading ? (
            <div className="animate-spin">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <img src={search} alt="search" className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Text_Input;
