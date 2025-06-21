import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import useSurahNames from '../../Hooks/useSurahNames';
import { motion } from 'framer-motion'
import Marquee from "../Slider/Slider"
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import About from '../About/About';

export default function Home() {
  const { data, isLoading } = useSurahNames();
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, isRTL } = useLanguage();
  const isAuthenticated = !!localStorage.getItem('Token');
  
 

  // State for search query
  const lineStyle={
    background : 'linear-gradient(to right, #fff, #0d3d2f)',
    width: '80px',
    height: '5px',
    margin: '0 20px',
    marginRight: '40px',
    padding: '0px',
    display:' inline-block',
    transform: 'translateY(-20px)',
    borderRadius: '0',
       }
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  // Ensure `data` is always an array
  const displayedData = showAll ? data || [] : (data || []).slice(0, 15);

  // Filter `displayedData` based on search query
  const filteredData = displayedData.filter((surah) =>
    surah.surahNameArabic.toLowerCase().includes(searchQuery.toLowerCase())
  );




  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query as the user types
  };



  return (
    <>

<section className="relative g-no-repeat bg-[url('https://res.cloudinary.com/dnmwmrxmr/image/upload/f_auto,q_auto/cayzt5zecsl3r1ftojuq')]  bg-cover bg-center text-white py-20 overflow-hidden">
  <div className="absolute inset-0 bg-black opacity-10"></div>
  <div className="absolute inset-0" style={{
    backgroundImage: `url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
  }}></div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
        {t('hero_title')}
      </h1>
      <p className="text-xl md:text-2xl mb-4 text-white/80 animate-slide-up">
        {t('hero_subtitle')}
      </p>
      <p className="text-lg mb-8 text-white/70 max-w-3xl mx-auto leading-relaxed animate-slide-up">
        {t('hero_description')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
        <Link
          to={isAuthenticated ? "/correctReading" : "/register"}
          className="bg-white text-green-700 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg hover:shadow-xl"
        >
          <span>{t('get_started')}</span>
          {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </Link>
        <a
          href="#about"
          className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
        >
          {t('learn_more')}
        </a>
      </div>
    </div>
  </div>
</section>
   <About/>
      <section id='SwarElQuraan' className='py-10 bg-[#fffbec] '>
        {isLoading ? (
          <div className='flex justify-center h-full items-center '>
            <FallingLines
              color='white'
              width="200"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          </div>
        ) : (
          <div id='surahname' className='sm:w-[80%] w-[95%] m-auto'>
<div data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000" className="flex items-center justify-center mb-10 ">

            <h2  className='font-semibold text-center text-5xl text-green-600 md:text-7xl ayah ' > <i className ="fa-solid fa-book-quran md:fa-lg fa-sm "></i>{t('allSurahs')}</h2>

</div>
            {/* Search Input */}
            <form className="max-w-md mx-auto my-5 "  data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-transparent focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="ماذا تريد ان تقرأ؟"
                  value={searchQuery}
                  onChange={handleSearchChange} // Update search query on input change
                  required
                />
                <button
                  type="submit"
                  className="absolute end-2.5 bottom-2.5 bg-[#ffbb01] text-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm hover:text-white px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  ابحث
                </button>
              </div>
            </form>

            {/* Display Filtered Data */}
            <div className='flex flex-wrap'>
              {filteredData.map((surah, index) => (
                <div  data-aos="zoom-left" data-aos-duration="1000" data-aos-delay="50" key={uuidv4()} className={`lg:w-4/12 md:w-6/12 w-full py-2`}>
                  <Link
                    to={`surahDetails/${index + 1}`}
                    className='flex items-center justify-around hover:border-white hover:cursor-pointer hover:shadow-2xl hover:bg-white hover:w-full duration-100 hover:transition hover:duration-1000 group border-green-600 rounded-full border-soild border-2 p-1 mx-2'
                  >
                    <div className="w-11 h-11 mx-3 bg-cover bg-transparent bg-center bg-no-repeat rounded-lg border border-green-500 group-hover:border-none group-hover:bg-[url('https://res.cloudinary.com/dnmwmrxmr/image/upload/f_auto,q_auto/cayzt5zecsl3r1ftojuq')] flex justify-center items-center rotate-45">
                      <span className="-rotate-45 text-green-700 noto text-[20px] group-hover:text-white">
                        {index + 1}
                      </span>
                    </div>
                    <h2 className='surahName text-[40px] text-green-600'>{surah.surahNameArabic}</h2>
                    <h3 className='noto text-[20px] text-green-600 group-hover:text-green-700'>
                      {surah.totalAyah} آيات
                    </h3>
                  </Link>
                </div>
              ))}
            </div>

            {/* Show All Button */}
        <div className="flex justify-center ">

        <button
              onClick={handleShowAll}
              className=' bg-[#ffbb01] rounded-full border surahName md:text-2xl text-green-600 px-7 py-2 font-bold my-5 hover:bg-white hover:text-green-700 hover:transition hover:duration-300 shadow-lg hover:shadow-2xl'
            >
              {showAll ? t('showSelected') : t('showAll')}
            </button>
        </div>
          </div>
        )}
      </section>
    </>
  );
}