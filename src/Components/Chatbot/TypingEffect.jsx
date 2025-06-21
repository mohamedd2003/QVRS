import { useState, useEffect } from 'react';

const TypingEffect = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset on new text
    if (text) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 20); // Adjust speed here (milliseconds)
      
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [text, onComplete]);

  return <>{displayedText}</>;
};

export default TypingEffect; 