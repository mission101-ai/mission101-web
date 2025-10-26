import { useEffect, useState } from 'react';

interface TypewriterListProps {
  items: string[];
  speed?: number;
  delay?: number;
  className?: string;
  itemClassName?: string;
}

export const TypewriterList = ({ 
  items, 
  speed = 30, 
  delay = 0,
  className = '',
  itemClassName = ''
}: TypewriterListProps) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [delay]);

  useEffect(() => {
    if (!isTyping || currentItemIndex >= items.length) return;

    const currentItem = items[currentItemIndex];

    if (currentCharIndex < currentItem.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentItem[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Current item is complete, move to next item
      const timeout = setTimeout(() => {
        setCompletedItems(prev => [...prev, displayedText]);
        setDisplayedText('');
        setCurrentCharIndex(0);
        setCurrentItemIndex(prev => prev + 1);
      }, 200); // Short pause between items

      return () => clearTimeout(timeout);
    }
  }, [isTyping, currentItemIndex, currentCharIndex, items, speed, displayedText]);

  return (
    <ul className={className}>
      {completedItems.map((item, index) => (
        <li key={index} className={itemClassName}>
          {item}
        </li>
      ))}
      {isTyping && currentItemIndex < items.length && (
        <li className={itemClassName}>
          {displayedText}
          <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 animate-pulse" />
        </li>
      )}
    </ul>
  );
};

