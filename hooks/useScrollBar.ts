import { useEffect } from 'react';

const updateScrollBarWidth = () => {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);
};

const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timerId: NodeJS.Timeout;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const useScrollBar = () => {
  useEffect(() => {
    const debouncedUpdate = debounce(updateScrollBarWidth, 250);

    window.addEventListener('load', updateScrollBarWidth);
    window.addEventListener('resize', debouncedUpdate);

    updateScrollBarWidth();

    return () => {
      window.removeEventListener('load', updateScrollBarWidth);
      window.removeEventListener('resize', debouncedUpdate);
    };
  }, []);

  return null;
};
