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

  // Common scroll function
  const scrollToSection = (ref) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - 100; // Offset for 100px top margin
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <MaybeNavbar>
        <Navbar
          onPrinsiplerimizClick={() => scrollToSection(prinsiplerimizRef)}
          onAboutClick={() => scrollToSection(aboutRef)}
          onWhoWeAreClick={() => scrollToSection(whoWeAreRef)}
        />
      </MaybeNavbar>

      <section className="space-y-16">
        <Main />

        <section ref={prinsiplerimizRef} id="prinsiplerimiz" className="pt-16">

          <Princip />
        </section>

        <section ref={aboutRef} id="about" className="pt-16">

          <About />
        </section>

        <section ref={whoWeAreRef} id="who-we-are" className="pt-16">

          <WhoWeAre />
        </section>
      </section>
    </div>
  );
};

export default Home;
