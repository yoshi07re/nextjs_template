import { useEffect } from 'react';

export const useFillHeight = () => {
  useEffect(() => {
    const setFillHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    const resizeObserver = new ResizeObserver(() => {
      setFillHeight();
    });

    resizeObserver.observe(document.documentElement);

    setFillHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return null;
};

// import { useEffect } from 'react';

// export const useFillHeight = () => {
//   useEffect(() => {
//     const setFillHeight = () => {
//       const vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty('--vh', `${vh}px`);
//     };

//     setFillHeight();

//     window.addEventListener('resize', setFillHeight);

//     const resizeObserver = new ResizeObserver(() => {
//       setFillHeight();
//     });

//     resizeObserver.observe(document.documentElement);

//     return () => {
//       window.removeEventListener('resize', setFillHeight);
//       resizeObserver.disconnect();
//     };
//   }, []);

//   return null;
// };
