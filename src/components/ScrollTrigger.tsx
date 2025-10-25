import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollTriggerProps {
  children: ReactNode;
  onEnterViewport?: () => void;
  threshold?: number;
  className?: string;
}

export const ScrollTrigger = ({ 
  children, 
  onEnterViewport, 
  threshold = 0.2,
  className = '' 
}: ScrollTriggerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          if (onEnterViewport) {
            onEnterViewport();
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible, onEnterViewport, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
