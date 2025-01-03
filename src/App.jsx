// React və state idarəetməsi üçün əsas komponentləri idxal edirik
import React, { useState } from 'react';
// Routing üçün lazımi komponentləri idxal edirik
import { Route, Routes, useLocation } from 'react-router-dom';

// Bütün səhifə komponentlərini idxal edirik
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Princip from './pages/Princip';
import About from './pages/About';
import WhoWeAre from './pages/WhoWeAre';
import Footer from './components/Footer';
import MaybeFooter from './components/MaybeFooter';
import Text_Input from './pages/Text_Input.jsx';
import Loading from './pages/Loading.jsx';
import Forget_Password from './pages/Forget_Password.jsx';
import Result from './pages/Result';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  // Axtarış tarixçəsi üçün state yaradırıq
  const [searchHistory, setSearchHistory] = useState([]);

  // Cari route-u əldə edirik
  const location = useLocation();

  // Yeni axtarışı tarixçəyə əlavə edən funksiya
  const addSearchToHistory = (searchText) => {
    const newSearch = {
      text: searchText,
      date: new Date().toISOString().split('T')[0], // Tarixi YYYY-MM-DD formatında alırıq
    };
    setSearchHistory([newSearch, ...searchHistory]); // Yeni axtarışı tarixçənin əvvəlinə əlavə edirik
  };

  return (
    // Əsas tətbiq container-i
    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
      <main>
        {/* Routing sistemini qururuq */}
        <Routes>
          {/* Hər bir səhifə üçün route təyin edirik */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/princip" element={<Princip />} />
          <Route path="/about" element={<About />} />
          <Route path="/whowhereare" element={<WhoWeAre />} />
          {/* Text_Input səhifəsinə axtarış əlavə etmə funksiyasını ötürürük */}
          <Route
            path="/textinput"
            element={<Text_Input addSearchToHistory={addSearchToHistory} />}
          />
          {/* Result səhifəsinə axtarış tarixçəsini ötürürük */}
          <Route path="/result" element={<Result searchHistory={searchHistory} />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/forgetpassword" element={<Forget_Password />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </main>
      {/* Şərti footer komponenti */}
      <MaybeFooter>
        <Footer />
      </MaybeFooter>
    </div>
  );
};

export default App;