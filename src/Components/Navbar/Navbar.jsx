import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import style from './Navbar.module.css';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [navBackGround, setNavBackGround] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const navigate = useNavigate();

  // Demo user/auth for now
  const isAuthenticated = !!localStorage.getItem('Token');
  const user = { name: 'mh9250871' };
  const logout = () => { localStorage.removeItem('Token'); navigate('/'); setIsUserMenuOpen(false); };

  useEffect(() => {
    if (!isHome) {
      setNavBackGround(true);
      return;
    }
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavBackGround(true);
      } else {
        setNavBackGround(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/tfaser', label: t('tafseer') },
    { path: '/correctReading', label: t('correctReading') },
    { path: '/FAQ', label: t('faq') }
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-[9999999998] transition-opacity duration-300" onClick={() => setSidebarOpen(false)}></div>
      )}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold text-gray-900">QVRS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-semibold transition pb-1 ${isActivePath(item.path)
                    ? 'text-green-600 border-b-2 border-green-500'
                    : 'text-gray-700 hover:text-green-600'}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 rtl:space-x-reverse text-gray-600 hover:text-green-600 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'EN' : 'AR'}
                </span>
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <i className="fa-regular fa-user text-xl"></i>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2`}>
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-green-600 font-medium"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button (keep your sidebar logic) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-100"
            >
              <i className={`fa-solid ${sidebarOpen ? 'fa-xmark' : 'fa-bars'} w-6 h-6`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar for mobile */}
      <div className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-72 ${style.mobileSidebar} shadow-2xl z-[9999999999] transform ${sidebarOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'} transition-transform duration-500 ease-in-out flex flex-col p-6 gap-6 md:hidden`}>
        <div className="flex items-center justify-between mb-6">
          <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => setSidebarOpen(false)}>
            <img className='w-[120px] h-[50px]' alt='Quran Logo' src='https://res.cloudinary.com/dnmwmrxmr/image/upload/f_auto,q_auto/ojcyfciwu7v8bqordr57' />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-red-300 text-3xl focus:outline-none">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <ul className="flex flex-col gap-4 text-lg font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg font-semibold transition pb-1 ${isActivePath(item.path)
                ? 'text-green-600 border-b-2 border-green-500'
                : 'text-gray-700 hover:text-green-600'}`}
            >
              {item.label}
            </Link>
          ))}
        </ul>
        <div className="flex flex-col gap-3 mt-auto">
          {isAuthenticated ? (
            <>
              <Link className={`${style.sidebarBtn}`} to={"/userProfile"}>{t('userProfile')}</Link>
              <button onClick={logout} className={`${style.sidebarBtn}`}>{t('logout')}</button>
            </>
          ) : (
            <>
              <Link to="register" className={`${style.sidebarBtn}`}>{t('register')}</Link>
              <Link to={"/login"} className={`${style.sidebarBtn}`}>{t('login')}</Link>
            </>
          )}
          <button onClick={toggleLanguage} className={`${style.switcherBtn} w-full justify-center`} aria-label="تغيير اللغة">
            <span className="lang-icon">
              <i className={language === 'ar' ? 'fa-solid fa-globe' : 'fa-regular fa-globe'}></i>
            </span>
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </>
  );
}
