

import { useState } from 'react';
import { Send, MessageCircle, Bot } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Lazyloading/Loader';
import TypingEffect from './TypingEffect';

const Tafseer = () => {
  const baseUrl="https://brings-ht-pace-properties.trycloudflare.com"
  const { t, isRTL } = useLanguage();
  const [activeBot, setActiveBot] = useState('muyasser');
  const [conversations, setConversations] = useState({
    muyasser: [],
    saadi: []
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { type: 'user', content: input, timestamp: new Date() };
    
    setConversations(prev => ({
      ...prev,
      [activeBot]: [...prev[activeBot], userMessage]
    }));

    const userInput = input;
    setInput('');
    setLoading(true);

    try {
      const endpoint = activeBot === 'muyasser' 
        ? `${baseUrl}/chatbot/Tafser-al-Muyassar`
        : `${baseUrl}/chatbot/Tafser-al-Saadi`;

      const response = await axios.post(endpoint, { prompt: userInput });
      
      const botMessage = {
        type: 'bot',
        content: response.data.response || response.data.message || 'لم يتم العثور على إجابة',
        timestamp: new Date()
      };

      setConversations(prev => ({
        ...prev,
        [activeBot]: [...prev[activeBot], botMessage]
      }));

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'bot',
        content: t('error_occurred'),
        timestamp: new Date()
      };
      
      setConversations(prev => ({
        ...prev,
        [activeBot]: [...prev[activeBot], errorMessage]
      }));
      
      toast.error(t('error_occurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="pt-32 pb-8 min-h-screen bg-gray-50">
      <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t('tafseer_title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t('tafseer_description')}
          </p>
        </div>

        {/* Bot Selection */}
        <div className="flex justify-center mb-8">
          <div className="p-1 bg-white rounded-lg shadow-md">
            <button
              onClick={() => setActiveBot('muyasser')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeBot === 'muyasser'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {t('muyasser_title')}
            </button>
            <button
              onClick={() => setActiveBot('saadi')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeBot === 'saadi'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {t('saadi_title')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white rounded-xl shadow-lg">
              {/* Chat Header */}
              <div className="p-4 text-white bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Bot className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold">
                      {activeBot === 'muyasser' ? t('muyasser_title') : t('saadi_title')}
                    </h3>
                    <p className="text-sm text-primary-100">
                      {isRTL ? 'مساعد التفسير الذكي' : 'AI Tafseer Assistant'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="overflow-y-auto p-4 space-y-4 h-96">
                {conversations[activeBot].length === 0 ? (
                  <div className="mt-8 text-center text-gray-500">
                    <MessageCircle className="mx-auto mb-4 w-12 h-12 opacity-50" />
                    <p>{isRTL ? 'ابدأ محادثة جديدة' : 'Start a new conversation'}</p>
                  </div>
                ) : (
                  conversations[activeBot].map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-primary-600 text-white rounded-br-none rtl:rounded-br-2xl rtl:rounded-bl-none'
                            : 'bg-gray-200 text-gray-800 rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">
                          {msg.type === 'bot' && index === conversations[activeBot].length - 1 ? (
                            <TypingEffect text={msg.content} />
                          ) : (
                            msg.content
                          )}
                        </p>
                        <p className={`text-xs mt-2 ${
                          msg.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                        } ${isRTL ? 'text-left' : 'text-right'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <LoadingSpinner size="small" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('type_question')}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent arabic-text"
                    rows={2}
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || loading}
                    className="px-4 py-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About Active Bot */}
            <div className="card">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {activeBot === 'muyasser' ? t('muyasser_title') : t('saadi_title')}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 arabic-text">
                {activeBot === 'muyasser' 
                  ? 'التفسير الميسر هو تفسير معاصر للقرآن الكريم يهدف إلى تبسيط المعاني وتوضيحها بأسلوب سهل ومفهوم.'
                  : 'تفسير السعدي هو تفسير مختصر وواضح للقرآن الكريم للشيخ عبد الرحمن السعدي رحمه الله.'
                }
              </p>
            </div>

            {/* Sample Questions */}
            {/* Sample Questions */}
            <div className="card">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {isRTL ? 'أمثلة على الأسئلة' : 'Sample Questions'}
              </h3>
              <div className="space-y-2">
                {[
                  isRTL ? ' ما معنى الايه الاولي من سوره الفاتحه؟' : ' ما معنى الايه الاولي من سوره الفاتحه؟',
                  isRTL ? ' ما معنى الايه الثانيه من سوره الفاتحه؟' : ' ما معنى الايه الثانيه من سوره الفاتحه؟',
                  isRTL ? ' ما معنى الايه الخامسه من سوره الفاتحه؟' : ' ما معنى الايه الخامسه من سوره الفاتحه؟'
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="p-2 w-full text-sm text-gray-600 rounded transition-colors text-start hover:text-primary-600 hover:bg-primary-50 arabic-text"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tafseer;
