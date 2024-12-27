import React from 'react';
import about from '@/assets/img/about.svg';

const About = () => {
    return (
        <div className="montserrat grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-4">
            <div>
                <section id="about">
                    <h1 className="text-blue font-semibold text-3xl md:text-5xl mt-[-80px]  text-center md:text-start">
                        Haqqımızda
                    </h1>
                </section>
                <p className="text-lg md:text-2xl leading-8 md:leading-[42px] md:w-[634px] md:mt-10">
                    Fakt Checking Assistant dezinformasiya ilə mübarizədə innovativ həll təqdim edir. Bununla jurnalistlər, media korporasiyalar və vətəndaşları dəqiqliyi yoxlanmış məlumatları təqdim edir. Məlumatların doğruluğunu qısa zamanda yoxlamaq, istifadəçiləri doğru və etibarlı informasiya ilə təmin etmək əsas məqsədimizdir.
                    Gələcəkdə yalan məlumatların minimuma endirildiyi və doğru xəbərlərin tirajlanmasında əsas rol almaq istəyirik.  Məqsədimiz ictimaiyyətin mediaya və xəbərə olan olan inamını bərpa etməkdir.

                </p>
            </div>
            <div className="flex justify-center md:justify-end items-center">
                <img className="size-[475px] md:mt-[-50px]  object-cover" src={about} alt="About" />
            </div>
        </div>
    );
};

export default About;
