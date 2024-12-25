import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import ResetPassword from './pages/ResetPassword'; // ResetPassword komponentini import etdik

const App = () => {
  const [searchHistory, setSearchHistory] = useState([]); // Search history state

  const location = useLocation(); // Get the current route

  const addSearchToHistory = (searchText) => {
    const newSearch = {
      text: searchText,
      date: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD' format
    };
    setSearchHistory([newSearch, ...searchHistory]); // Add new search to the beginning of the history
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/princip" element={<Princip />} />
          <Route path="/about" element={<About />} />
          <Route path="/whowhereare" element={<WhoWeAre />} />
          <Route
            path="/textinput"
            element={<Text_Input addSearchToHistory={addSearchToHistory} />}
          />
          {/* Pass searchHistory as prop only for the Result page */}
          <Route path="/result" element={<Result searchHistory={searchHistory} />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/forgetpassword" element={<Forget_Password />} />
          <Route path="/resetpassword" element={<ResetPassword />} /> {/* ResetPassword üçün yeni route */}
        </Routes>
      </main>
      <MaybeFooter>
        <Footer />
      </MaybeFooter>
    </div>
  );
};

export default App;
