import React from 'react'
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t, toggleLanguage, language } = useLanguage();
  return (
    <>
   <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold">QVRS</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t('footer_description')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@qvrs.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/tfaser" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {t('tafseer')}
                </Link>
              </li>
              <li>
                <Link to="/CorrectReading" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {t('correct_read')}
                </Link>
              </li>
              <li>
                <Link to="/FAQ" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Language & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('language')}</h3>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:text-primary-400 transition-colors mb-4"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 QVRS. {t('all_rights_reserved') || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer;
