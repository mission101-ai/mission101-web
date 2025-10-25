import { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText = ({ 
  text, 
  speed = 30, 
  delay = 0,
  className = '',
  onComplete 
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [isTyping, currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && currentIndex < text.length && (
        <span className="inline-block w-0.5 h-5 bg-accent ml-0.5 animate-pulse" />
      )}
    </span>
  );
};
