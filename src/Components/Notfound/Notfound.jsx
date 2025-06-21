import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeftCircle } from 'lucide-react';

export default function Notfound() {
  const { t, language } = useLanguage();
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-600 via-green-700 to-green-500 text-white py-20 px-4">
      <div className="text-center">
        <div className="text-[7rem] font-extrabold drop-shadow-lg mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('notfound_title')}</h1>
        <p className="text-lg mb-8 text-white/80 max-w-xl mx-auto">{t('notfound_message')}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {language === 'ar' ? <ArrowLeftCircle className="w-6 h-6" /> : null}
          <span>{t('back_home')}</span>
          {language === 'en' ? <ArrowLeftCircle className="w-6 h-6" /> : null}
        </Link>
      </div>
    </section>
  );
}
