import React from 'react';
import instagram from '@/assets/img/instagram.svg';
import facebook from '@/assets/img/facebook.svg';
import telegram from '@/assets/img/telegram.svg';
import whatsapp from '@/assets/img/whatsapp.svg';
import youtube from '@/assets/img/youtube.svg';



const Footer = () => {
    return (
        <div className="border-t border-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 pt-6 pb-12 md:pb-[63px] px-4">
            {/* Contact Information */}
            <div className="text-base md:text-[16px] leading-[32px] text-center md:text-left">
                <p className="ml-2 md:ml-3">
                    <strong>Bizimlə əlaqə.</strong>
                </p>
                <p className="ml-2 md:ml-3">
                    <strong>E-mail:</strong>  <a href="mailto:yourasisstant@gmail.com"> yourasisstant@gmail.com</a>
                </p>
                <p className="ml-2 md:ml-3">
                    <strong>Telefon:</strong> 
                    <a href="tel:+99451 762 25 24"> +994 51 762 25 24</a>
                   
                </p>

            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end gap-4 md:gap-6">
                <a href="#"><img src={facebook} alt="Facebook" className="w-6 h-6 md:w-auto md:h-auto" /></a>
                <a href="#"><img src={instagram} alt="Instagram" className="w-6 h-6 md:w-auto md:h-auto" /></a>
                <a href="#"><img src={telegram} alt="Telegram" className="w-6 h-6 md:w-auto md:h-auto" /></a>
                <a href="#"><img src={whatsapp} alt="WhatsApp" className="w-6 h-6 md:w-auto md:h-auto" /></a>
                <a href="#"><img src={youtube} alt="YouTube" className="w-6 h-6 md:w-auto md:h-auto" /></a>
            </div>
        </div>
    );
};

export default Footer;
