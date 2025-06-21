import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FAQ = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const faqData = [
    {
      question: {
        ar: 'ما هو نظام QVRS؟',
        en: 'What is the QVRS system?'
      },
      answer: {
        ar: 'QVRS هو نظام متقدم لتصحيح تلاوة القرآن الكريم باستخدام تقنيات الذكاء الاصطناعي المتطورة، وتحديداً نموذج HuBERT المُدرب مسبقاً.',
        en: 'QVRS is an advanced system for correcting Quran recitation using cutting-edge artificial intelligence techniques, specifically the pre-trained HuBERT model.'
      }
    },
    {
      question: {
        ar: 'كيف يعمل نظام تصحيح التلاوة؟',
        en: 'How does the recitation correction system work?'
      },
      answer: {
        ar: 'يستخدم النظام نموذج HuBERT لتحليل التسجيل الصوتي ومقارنته بالنطق الصحيح للآيات، ثم يقدم تغذية راجعة مفصلة حول الأخطاء والتحسينات المطلوبة.',
        en: 'The system uses the HuBERT model to analyze audio recordings and compare them with correct pronunciation of verses, then provides detailed feedback on errors and required improvements.'
      }
    },
    {
      question: {
        ar: 'هل يدعم النظام جميع أنواع التلاوة؟',
        en: 'Does the system support all types of recitation?'
      },
      answer: {
        ar: 'نعم، يدعم النظام مختلف أساليب التلاوة ويركز على القواعد الأساسية للتجويد والنطق الصحيح.',
        en: 'Yes, the system supports different recitation styles and focuses on basic Tajweed rules and correct pronunciation.'
      }
    },
    {
      question: {
        ar: 'ما مدى دقة النظام في تصحيح الأخطاء؟',
        en: 'How accurate is the system in correcting errors?'
      },
      answer: {
        ar: 'يتمتع النظام بدقة عالية في اكتشاف الأخطاء الشائعة في التلاوة، وهو مصمم للتحسن المستمر من خلال التعلم الآلي.',
        en: 'The system has high accuracy in detecting common recitation errors and is designed to continuously improve through machine learning.'
      }
    },
    {
      question: {
        ar: 'هل يمكن استخدام النظام للمبتدئين؟',
        en: 'Can beginners use the system?'
      },
      answer: {
        ar: 'بالطبع، النظام مصمم ليناسب جميع المستويات من المبتدئين إلى المتقدمين، مع واجهة سهلة الاستخدام.',
        en: 'Absolutely, the system is designed to suit all levels from beginners to advanced, with an easy-to-use interface.'
      }
    },
    {
      question: {
        ar: 'ما هي متطلبات النظام التقنية؟',
        en: 'What are the system\'s technical requirements?'
      },
      answer: {
        ar: 'يحتاج النظام إلى متصفح ويب حديث مع إمكانية الوصول للميكروفون، واتصال إنترنت مستقر.',
        en: 'The system requires a modern web browser with microphone access and a stable internet connection.'
      }
    },
    {
      question: {
        ar: 'هل البيانات الصوتية آمنة ومحمية؟',
        en: 'Are audio data safe and protected?'
      },
      answer: {
        ar: 'نعم، نحن نلتزم بأعلى معايير الأمان وحماية البيانات، ولا نحتفظ بالتسجيلات الصوتية بعد المعالجة.',
        en: 'Yes, we adhere to the highest security and data protection standards, and we do not retain audio recordings after processing.'
      }
    },
    {
      question: {
        ar: 'كيف يمكنني الحصول على حساب؟',
        en: 'How can I get an account?'
      },
      answer: {
        ar: 'يمكنك إنشاء حساب مجاني من خلال الضغط على زر التسجيل وإدخال بياناتك الأساسية.',
        en: 'You can create a free account by clicking the register button and entering your basic information.'
      }
    },
    {
      question: {
        ar: 'ما هي خدمة التفسير المتاحة؟',
        en: 'What is the available Tafseer service?'
      },
      answer: {
        ar: 'نوفر خدمة تفسير تفاعلية بالذكاء الاصطناعي تعتمد على تفسير الميسر وتفسير السعدي.',
        en: 'We provide an interactive AI-powered Tafseer service based on Al-Muyassar and Al-Saadi interpretations.'
      }
    },
    {
      question: {
        ar: 'هل يمكن استخدام النظام بدون إنترنت؟',
        en: 'Can the system be used without internet?'
      },
      answer: {
        ar: 'لا، النظام يتطلب اتصال إنترنت للوصول إلى خدمات الذكاء الاصطناعي والمعالجة السحابية.',
        en: 'No, the system requires an internet connection to access AI services and cloud processing.'
      }
    },
    {
      question: {
        ar: 'كم يستغرق تحليل التسجيل الصوتي؟',
        en: 'How long does audio analysis take?'
      },
      answer: {
        ar: 'عادة ما يستغرق التحليل بضع ثوانٍ إلى دقيقة واحدة حسب طول التسجيل وجودة الاتصال.',
        en: 'Analysis usually takes a few seconds to one minute depending on recording length and connection quality.'
      }
    },
    {
      question: {
        ar: 'هل يمكن تصحيح تلاوة السور الطويلة؟',
        en: 'Can long Surahs be corrected?'
      },
      answer: {
        ar: 'نعم، يمكن تصحيح تلاوة جميع السور، لكن ننصح بتقسيم السور الطويلة إلى أجزاء أصغر للحصول على أفضل النتائج.',
        en: 'Yes, all Surahs can be corrected, but we recommend dividing long Surahs into smaller parts for best results.'
      }
    },
    {
      question: {
        ar: 'ما هي أنواع الأخطاء التي يكتشفها النظام؟',
        en: 'What types of errors does the system detect?'
      },
      answer: {
        ar: 'يكتشف النظام أخطاء النطق، والتجويد، والمد، والغنة، وأخطاء مخارج الحروف.',
        en: 'The system detects pronunciation errors, Tajweed mistakes, elongation (Madd), nasalization (Ghunna), and articulation point errors.'
      }
    },
    {
      question: {
        ar: 'هل يمكن تتبع التقدم في التعلم؟',
        en: 'Can learning progress be tracked?'
      },
      answer: {
        ar: 'نعم، النظام يحفظ سجل التسجيلات والتحسن مع الوقت لمساعدتك في متابعة تطورك.',
        en: 'Yes, the system saves a record of recordings and improvement over time to help you track your progress.'
      }
    },
    {
      question: {
        ar: 'هل النظام مجاني الاستخدام؟',
        en: 'Is the system free to use?'
      },
      answer: {
        ar: 'النظام يوفر خدمات أساسية مجانية مع إمكانية الترقية للحصول على ميزات متقدمة.',
        en: 'The system provides basic free services with the option to upgrade for advanced features.'
      }
    },
    {
      question: {
        ar: 'كيف يمكنني تحسين جودة التسجيل؟',
        en: 'How can I improve recording quality?'
      },
      answer: {
        ar: 'استخدم بيئة هادئة، ميكروفون جيد، واحرص على النطق الواضح والبطيء.',
        en: 'Use a quiet environment, good microphone, and ensure clear and slow pronunciation.'
      }
    },
    {
      question: {
        ar: 'هل يدعم النظام لغات أخرى غير العربية؟',
        en: 'Does the system support languages other than Arabic?'
      },
      answer: {
        ar: 'واجهة النظام متاحة بالعربية والإنجليزية، لكن التلاوة تتم باللغة العربية فقط.',
        en: 'The system interface is available in Arabic and English, but recitation is in Arabic only.'
      }
    },
    {
      question: {
        ar: 'ما هو الحد الأقصى لطول التسجيل؟',
        en: 'What is the maximum recording length?'
      },
      answer: {
        ar: 'الحد الأقصى للتسجيل الواحد هو 5 دقائق للحصول على أفضل جودة في التحليل.',
        en: 'The maximum length for a single recording is 5 minutes to ensure the best analysis quality.'
      }
    },
    {
      question: {
        ar: 'كيف يمكنني الإبلاغ عن مشكلة تقنية؟',
        en: 'How can I report a technical issue?'
      },
      answer: {
        ar: 'يمكنك الإبلاغ عن المشاكل التقنية من خلال نموذج الاتصال أو البريد الإلكتروني.',
        en: 'You can report technical issues through the contact form or email.'
      }
    },
    {
      question: {
        ar: 'هل يمكن استخدام النظام على الهاتف المحمول؟',
        en: 'Can the system be used on mobile phones?'
      },
      answer: {
        ar: 'نعم، النظام متوافق مع الهواتف الذكية والأجهزة اللوحية.',
        en: 'Yes, the system is compatible with smartphones and tablets.'
      }
    }
  ];

  const filteredFAQ = faqData.filter(item => {
    const question = item.question[isRTL ? 'ar' : 'en'].toLowerCase();
    const answer = item.answer[isRTL ? 'ar' : 'en'].toLowerCase();
    const search = searchTerm.toLowerCase();
    return question.includes(search) || answer.includes(search);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('faq_title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('faq_description')}
          </p>
        </div>

        {/* Search */}
        <div className="card mb-8">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('search_faq')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">
                {t('faq_no_results')}
              </p>
            </div>
          ) : (
            filteredFAQ.map((item, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full text-left rtl:text-right flex items-center justify-between focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4 rtl:pr-0 rtl:pl-4 arabic-text">
                    {item.question[isRTL ? 'ar' : 'en']}
                  </h3>
                  {expandedItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedItems.has(index) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed arabic-text">
                      {item.answer[isRTL ? 'ar' : 'en']}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Additional Help */}
        <div className="card mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('faq_not_found_title')}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('faq_not_found_desc')}
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span>{t('contact_title')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 