import React from 'react'
import image1 from '@/assets/img/image 1.svg'
import image2 from '@/assets/img/image.svg'
import image3 from '@/assets/img/image 3.svg'
import { Link } from 'react-router-dom'


const Princip = () => {
    return (
        <div className='font-poppins font-semibold'>
            <section id='prinsiplərimiz'>
                <h1 className='text-blue font-semibold text-3xl md:text-5xl mb-5 text-center md:text-start'>Prinsiplərimiz</h1>
            </section>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                {/* İlk Sütun */}
                <div className='text-base md:text-lg leading-6 md:leading-8 border border-black rounded pb-9 flex flex-col items-center'>
                    <p className='pt-9 w-full md:w-80 text-justify  h-auto md:h-[417px]'>Jurnalistikanın ilk vəzifəsi həqiqətə uyğun, dəqiq və təsdiqlənmiş məlumatlar verməkdir. Bu, vətəndaşların düzgün qərarlar qəbul etməsinə kömək etmək üçün faktları toplamaq və onları mənalı bir kontekstdə təqdim etmək deməkdir. Dəqiqlik jurnalistikanın etibarlılığı üçün əsas şərtdir.</p>
                    <div className='flex items-center justify-center mt-6'><img className='w-12 h-12 object-cover' src={image1} alt="" /></div>
                </div>

                {/* İkinci Sütun */}
                <div className='text-base md:text-lg leading-6 md:leading-8 border border-black rounded pb-9 flex flex-col items-center'>
                    <p className='pt-9 w-full md:w-80 text-justify  h-auto md:h-[417px]'>Jurnalistlər, məlumat verdikləri şəxslərdən müstəqil qalmalıdırlar. Bu, hadisələr və ya münaqişələrdə tərəf tutmadan, qərəzsiz məlumat verməyi nəzərdə tutur. “Reuters”in yanaşmasında, neytrallıq və qərəzsizlik xəbər təqdimatında əsas keyfiyyətlərdir və dünyanın hər yerində bu prinsiplərə uyğun olaraq işləmək vacibdir.
                    </p>
                    <div className='flex items-center justify-center mt-6'><img className='w-12 h-12 object-cover' src={image2} alt="" /></div>
                </div>

                {/* Üçüncü Sütun */}
                <div className='text-base md:text-lg leading-6 md:leading-8 border border-black rounded pb-9 flex flex-col items-center'>
                    <p className='pt-9 w-full md:w-80 text-justify  h-auto md:h-[417px]'>Jurnalistlər ictimai maraqlara xidmət etməlidirlər. Onların birinci sadiqliyi reklamçılar və ya siyasi qurumlara deyil, vətəndaşlara yönəlik olmalıdır. Bu prinsip, jurnalistikanın etibarlılığını qorumaq və ictimaiyyətlə etibarlı əlaqələr qurmaq üçün həyati əhəmiyyət daşıyır.</p>
                    <div className='flex items-center justify-center mt-6'><img className='w-12 h-12 object-cover' src={image3} alt="" /></div>
                </div>

            </div>
        </div>
    )
}

export default Princip;
