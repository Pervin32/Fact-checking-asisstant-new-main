import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import enter from '@/assets/img/enter.svg';


const Text_Input = () => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage-dan məlumatları alaq
    const userEmail = localStorage.getItem('userEmail');
    const facebookProfile = localStorage.getItem('facebookProfile');
    
    console.log('Raw localStorage data:', {
      userEmail,
      facebookProfile
    });
  
    // null string-ini yoxlayaq
    if (facebookProfile && facebookProfile !== 'null') {
      setUsername(facebookProfile);
    } else if (userEmail && userEmail !== 'null') {
      const extractedUsername = userEmail.split('@')[0];
      setUsername(extractedUsername);
    } else {
      setUsername('');  // və ya default dəyər
    }
  }, []);

  const handleSearch = async () => {
    if (searchText.trim() === '') return;

    try {
      setIsLoading(true);

      const mockApiResponse = {
        score: 0,
        sources: [
          { title: 'API', score: 0, description: 'Simulyasiya edilmiş fakt yoxlama nəticəsi' },
        ],
        recommendations: [
          'Digər etibarlı mənbələrlə çarpaz yoxlayın',
          'Ekspert rəylərini axtarın',
        ],
      };

      setTimeout(() => {
        const loadingData = {
          searchText,
          score: mockApiResponse.score,
          sources: mockApiResponse.sources,
          recommendations: mockApiResponse.recommendations,
        };

        navigate('/result', { state: loadingData });
      }, 3000);
    } catch (error) {
      console.error('API-də xəta:', error);

      const loadingData = {
        searchText,
        score: 50,
        sources: [
          { title: 'Error', score: 0, description: 'Faktı yoxlamaq mümkün deyil' },
        ],
        recommendations: [
          'İnternet bağlantınızı yoxlayın',
          'Daha sonra yenidən cəhd edin',
          'Məlumatı əl ilə yoxlayın',
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
      navigate('/loading');
    }
  };

  return (
    <div className="min-h-screen w-full px-4 md:px-6 lg:px-8">
      {/* Header Section */}
      <header className="flex justify-end items-center gap-4 md:gap-6 pt-4 md:pt-10">
        <div className="bg-blue rounded-full px-4 py-2 md:px-6 md:py-2.5">
          <span className="text-white text-sm md:text-base whitespace-nowrap">
            {username || 'İstifadəçi'}
          </span>
        </div>
        <Link 
          to="/registration" 
          className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9"
        >
           <img src={enter} alt="enter" className="w-8 h-8 md:w-9 md:h-9" />
        </Link>
      </header>

      {/* Search Section */}
      <main className="flex items-center justify-center w-full mt-16 md:mt-32 lg:mt-40">
        <div className="w-full max-w-2xl mx-auto">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="İnformasiya və ya keçid linkini bura daxil edin!"
              className="w-full h-12 md:h-14 px-4 md:px-6 py-2 md:py-3 
                         text-sm md:text-base lg:text-lg
                         border border-gray-300 rounded-lg md:rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition-all duration-200 ease-in-out
                         disabled:bg-gray-50 disabled:cursor-not-allowed"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            
            <button
              className={`absolute right-2 md:right-3 
                         w-8 h-8 md:w-10 md:h-10
                         flex items-center justify-center
                         bg-gray-600 hover:bg-gray-700
                         rounded-full transition-colors
                         ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={!isLoading ? handleSearch : undefined}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin">
                  <svg 
                    className="w-4 h-4 md:w-5 md:h-5 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              ) : (
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Text_Input;