import React from 'react';
import whoweare from '@/assets/img/whoweare.svg';

const WhoWeAre = () => {
  return (
    <div className='mb-[232px]'>
      <div className='montserrat grid grid-cols-1 lg:grid-cols-2 gap-8'>
        

        <div className='flex items-center justify-center lg:justify-start'>
          <img
            className='w-full h-auto max-w-[457px] lg:h-[492px] object-cover mt-[-150px] '
            src={whoweare}
            alt='Who We Are'
          />
        </div>

        <div>
          <h1 className='text-blue font-semibold text-4xl lg:text-5xl mb-5 '>
            Biz kimik?
          </h1>
          <p className='text-[18px] lg:text-[24px] leading-[32px] lg:leading-[42px]'>
          Biz, mediada vaxt və maliyyə itkilərini azaltmağa yönəlmiş data analiz və hesablama platformasıyıq. Media məlumatlarının təhlili üçün prinsip və metodologiyalar üzərində çalışan komandamızda xaricdəki prestijli universitetlərdən məzun olan gənc media mütəxəssisləri, təcrübəli media ekspertləri və universitet müəllimləri iştirak edir. Onlar tətbiq olunan alqoritmlərin peşəkar standartlara uyğun olmasına nəzarət edir və təhlil prosesinin təkmilləşdirilməsi üçün mütəmadi olaraq tövsiyələr verirlər.


          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
