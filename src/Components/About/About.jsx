import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BookOpen, Mic, Brain, ShieldCheck } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-green-600" />,
      title: t('about_feature1_title'),
      description: t('about_feature1_desc'),
    },
    {
      icon: <Mic className="w-10 h-10 text-green-600" />,
      title: t('about_feature2_title'),
      description: t('about_feature2_desc'),
    },
    {
      icon: <Brain className="w-10 h-10 text-green-600" />,
      title: t('about_feature3_title'),
      description: t('about_feature3_desc'),
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
      title: t('about_feature4_title'),
      description: t('about_feature4_desc'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('about_title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about_description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center hover:scale-105 transition-transform duration-200">
              <div className="text-primary-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 