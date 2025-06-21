import { useLanguage } from '../../context/LanguageContext';

const LazyLoading = ({ size = 'medium', text = '' }) => {
  const { t } = useLanguage();
  
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-4 border-primary-200 border-t-primary-600 rounded-full"></div>
      </div>
      {text && (
        <p className="text-gray-600 text-sm">
          {text || t('loading_please_wait')}
        </p>
      )}
    </div>
  );
};

export default LazyLoading;