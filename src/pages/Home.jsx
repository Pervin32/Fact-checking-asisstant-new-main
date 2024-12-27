import React, { useRef } from 'react';
import Main from '@/components/Main';
import Princip from './Princip';
import About from './About';
import WhoWeAre from './WhoWeAre';
import Navbar from '@/components/Navbar';
import MaybeNavbar from '@/components/MaybeNavbar';
import Text_Input from './Text_Input';

const Home = () => {
  const prinsiplerimizRef = useRef(null);
  const aboutRef = useRef(null);
  const whoWeAreRef = useRef(null);

  // Ümumi sürüşdürmə funksiyası
  const scrollToSection = (ref) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - (window.innerWidth < 768 ? 60 : 100); // Mobil üçün uyğunlaşdırılmış ofset
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen w-full">
      <MaybeNavbar>
        <Navbar
          onPrinsiplerimizClick={() => scrollToSection(prinsiplerimizRef)}
          onAboutClick={() => scrollToSection(aboutRef)}
          onWhoWeAreClick={() => scrollToSection(whoWeAreRef)}
        />
      </MaybeNavbar>

      <section className="space-y-8 md:space-y-16 px-4 md:px-6 lg:px-8">
        <Main />

        <section 
          ref={prinsiplerimizRef} 
          id="prinsiplerimiz" 
          className="pt-8 md:pt-16">
          <Princip />
        </section>

        <section 
          ref={aboutRef} 
          id="about" 
          className="pt-8 md:pt-16">
          <About />
        </section>

        <section 
          ref={whoWeAreRef} 
          id="who-we-are" 
          className="pt-8 md:pt-16">
          <WhoWeAre />
        </section>
      </section>
    </div>
  );
};

export default Home;