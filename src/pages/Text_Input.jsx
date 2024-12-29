import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import enter from '@/assets/img/enter.svg';

const Text_Input = () => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Component mounted, checking auth data...');
    
    // Get auth data
    const facebookProfile = localStorage.getItem('facebookProfile');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    console.log('Auth data from localStorage:', {
      facebookProfile,
      userName,
      userEmail
    });
  
    // Priority order: userName (from Google) > facebookProfile > email > default
    if (userName && userName !== 'null') {
      console.log('Using stored userName:', userName);
      setUsername(userName);
    }
    else if (facebookProfile && facebookProfile !== 'null') {
      console.log('Using Facebook profile:', facebookProfile);
      setUsername(facebookProfile);
    }
    else if (userEmail && userEmail !== 'null') {
      console.log('Using email as fallback:', userEmail);
      const extractedUsername = userEmail.split('@')[0];
      setUsername(extractedUsername);
    }
    else {
      console.log('No valid auth data found, using default');
      setUsername('İstifadəçi');
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
            {username}
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
          <textarea
  placeholder="İnformasiya və ya keçid linkini bura daxil edin!"
  className="w-full h-32 md:h-36 px-4 md:px-6 py-2 md:py-3 
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

            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Text_Input;