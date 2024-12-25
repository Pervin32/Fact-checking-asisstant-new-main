import React, { useState } from 'react';
import enter from '@/assets/img/enter.svg';
import search from '@/assets/img/search.svg';
import { Link, useNavigate } from 'react-router-dom';

const Text_Input = ({ addSearchToHistory, username }) => {
  const [searchText, setSearchText] = useState(''); // Axtarış mətni üçün state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim() === '') return; // Mətni boşdursa, axtarış etmə
    setLoading(true);

    addSearchToHistory(searchText); // Axtarış tarixçəsinə əlavə et
    
    // Keçid ediləcək məlumatlar
    const loadingData = {
      searchText,
      score: 85,
      sources: [
        { title: 'Rəsmi Qurumlar', score: 30, description: 'Rəsmi dövlət qurumlarına istinad edilmişdir.' },
        { title: 'Ekspert Rəyi', score: 18, description: 'Etibarlı ekspertlərin rəyi mövcuddur.' },
        { title: 'Statistika', score: 16, description: 'Etibarlı statistika istifadə olunmuşdur.' },
      ],
      recommendations: [
        'Daha etibarlı mənbələr istifadə edin.',
        'Şəxslərin rəylərinə diqqət yetirin.',
        'Sosial mediadan məlumatları ehtiyatla istifadə edin.'
      ]
    };

    // `/result` səhifəsinə yönləndirmə, loadingData ilə birlikdə
    navigate('/result', { state: loadingData });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate('/loading'); // Navigate to loading page when Enter is pressed
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
        <Link to="/registration" >
        <img src={enter} alt="enter" className="size-8 md:size-9" /> </Link>
      </div>
      {/* Search */}
      <div className="max-w-[744px] w-full h-12 sm:h-[52px] flex items-center justify-between mx-auto mt-[150px] sm:mt-[375px] border px-4 sm:px-6 rounded-lg sm:rounded-[16px] text-[#8D8D8D]">
        <input
          type="text"
          placeholder="İnformasiya və ya keçid linkini bura daxil edin!"
          className="w-full text-sm sm:text-lg leading-6 outline-none"
          value={searchText} // Axtarış mətni state-ə bağlı
          onChange={(e) => setSearchText(e.target.value)} // Mətni dəyişdikdə yeniləyir
          onKeyDown={handleKeyPress} // Enter düyməsinə basıldıqda loading page-ə keçir
        />
        <div
          className="bg-[#959595] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleSearch} // Axtarış düyməsinə basıldıqda handleSearch çağırılır
        >
          <img src={search} alt="search" className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
};


export default Text_Input;