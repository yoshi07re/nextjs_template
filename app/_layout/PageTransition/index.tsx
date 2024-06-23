// 'use client';

// import { AnimatePresence, motion } from 'framer-motion';
// import { usePathname } from 'next/navigation';
// import {
//   ElementRef,
//   ReactNode,
//   forwardRef,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// import { LenisContext } from '@/app/_layout/LenisLayout';
// import { FrozenRouter } from '@/app/_layout/PageTransition/frozenRouter';

// interface ChildProps {
//   children: ReactNode;
// }

// const Child = forwardRef<ElementRef<typeof motion.div>, ChildProps>(
//   (props, ref) => {
//     return (
//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -40 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//       >
//         <FrozenRouter>{props.children}</FrozenRouter>
//       </motion.div>
//     );
//   },
// );

// Child.displayName = 'Child';

// interface PageTransitionProps {
//   children: ReactNode;
// }

// export const PageTransition = (props: PageTransitionProps) => {
//   const segment = usePathname();
//   const lenis = useContext(LenisContext);
//   const [beforeScrollTop, setBeforeScrollTop] = useState(0);
//   const [isBackOrForward, setIsBackOrForward] = useState(false);

//   useEffect(() => {
//     if ('scrollRestoration' in history) {
//       history.scrollRestoration = 'manual';
//     }

//     const handlePopState = () => {
//       setIsBackOrForward(true);
//     };

//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//   return (
//     <>
//       <AnimatePresence
//         mode="wait"
//         onExitComplete={() => {
//           if (isBackOrForward) {
//             const currentScrollY = window.scrollY;
//             lenis?.scrollTo(beforeScrollTop, { immediate: true });
//             setBeforeScrollTop(currentScrollY);
//             console.log('ブラウザの戻る/進む', currentScrollY);
//           } else {
//             const currentScrollY = window.scrollY;
//             setBeforeScrollTop(currentScrollY);
//             lenis?.scrollTo(0, { immediate: true });
//             console.log('通常のページ遷移', currentScrollY);
//           }
//           setIsBackOrForward(false);
//         }}
//       >
//         <Child key={segment}>{props.children}</Child>
//       </AnimatePresence>
//     </>
//   );
// };

// 'use client';

// import { AnimatePresence, motion } from 'framer-motion';
// import { usePathname } from 'next/navigation';
// import {
//   ElementRef,
//   ReactNode,
//   forwardRef,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// import { LenisContext } from '@/app/_layout/LenisLayout';
// import { FrozenRouter } from '@/app/_layout/PageTransition/frozenRouter';

// interface ChildProps {
//   children: ReactNode;
//   isBackOrForward: boolean;
// }

// const Child = forwardRef<ElementRef<typeof motion.div>, ChildProps>(
//   ({ children, isBackOrForward }, ref) => {
//     const initial = isBackOrForward ? { opacity: 0 } : { opacity: 0, y: 40 };
//     const animate = isBackOrForward ? { opacity: 1 } : { opacity: 1, y: 0 };
//     const exit = isBackOrForward ? { opacity: 0 } : { opacity: 0, y: -40 };

//     return (
//       <motion.div
//         ref={ref}
//         initial={initial}
//         animate={animate}
//         exit={exit}
//         transition={{ duration: 0.5, delay: 0.1 }}
//       >
//         <FrozenRouter>{children}</FrozenRouter>
//       </motion.div>
//     );
//   },
// );

// Child.displayName = 'Child';

// interface PageTransitionProps {
//   children: ReactNode;
// }

// export const PageTransition = (props: PageTransitionProps) => {
//   const segment = usePathname();
//   const lenis = useContext(LenisContext);
//   const [beforeScrollTop, setBeforeScrollTop] = useState(0);
//   const [isBackOrForward, setIsBackOrForward] = useState(false);

//   useEffect(() => {
//     if ('scrollRestoration' in history) {
//       history.scrollRestoration = 'manual';
//     }

//     const handlePopState = () => {
//       setIsBackOrForward(true);
//     };

//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//   return (
//     <>
//       <AnimatePresence
//         mode="wait"
//         onExitComplete={() => {
//           if (isBackOrForward) {
//             const currentScrollY = window.scrollY;
//             lenis?.scrollTo(beforeScrollTop, { immediate: true });
//             setBeforeScrollTop(currentScrollY);
//             console.log('ブラウザの戻る/進む', currentScrollY);
//           } else {
//             const currentScrollY = window.scrollY;
//             setBeforeScrollTop(currentScrollY);
//             lenis?.scrollTo(0, { immediate: true });
//             console.log('通常のページ遷移', currentScrollY);
//           }
//           setIsBackOrForward(false);
//         }}
//       >
//         <Child key={segment} isBackOrForward={isBackOrForward}>
//           {props.children}
//         </Child>
//       </AnimatePresence>
//     </>
//   );
// };

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  ElementRef,
  ReactNode,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';

import { LenisContext } from '@/app/_layout/LenisLayout';
import { FrozenRouter } from '@/app/_layout/PageTransition/frozenRouter';

interface ChildProps {
  children: ReactNode;
  isBackOrForward: boolean;
}

const perspective = {
  initial: {
    scale: 1,
    y: 0,
  },
  enter: {
    scale: 1,
    y: 0,
  },
  exit: {
    scale: 0.9,
    y: -150,
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const slide = {
  initial: {
    y: '100vh',
  },
  animate: {
    y: '100vh',
  },
  exit: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const opacity = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 1,
  },
};

const Child = forwardRef<ElementRef<typeof motion.div>, ChildProps>(
  ({ children, isBackOrForward }, ref) => {
    const animation = isBackOrForward
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5, delay: 0.1 },
        }
      : {};

    return isBackOrForward ? (
      <motion.div ref={ref} {...animation}>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    ) : (
      <>
        <motion.div
          className="fixed inset-0 z-10 h-screen w-full"
          initial={slide.initial}
          animate={slide.animate}
          exit={slide.exit}
        />
        <motion.div
          initial={perspective.initial}
          animate={perspective.enter}
          exit={perspective.exit}
        >
          <motion.div
            className="absolute inset-0"
            initial={opacity.initial}
            animate={opacity.animate}
            exit={opacity.exit}
          >
            <FrozenRouter>{children}</FrozenRouter>
          </motion.div>
        </motion.div>
      </>
    );
  },
);

Child.displayName = 'Child';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = (props: PageTransitionProps) => {
  const segment = usePathname();
  const lenis = useContext(LenisContext);
  const [beforeScrollTop, setBeforeScrollTop] = useState(0);
  const [isBackOrForward, setIsBackOrForward] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      setIsBackOrForward(true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (isBackOrForward) {
            const currentScrollY = window.scrollY;
            lenis?.scrollTo(beforeScrollTop, { immediate: true });
            setBeforeScrollTop(currentScrollY);
            console.log('ブラウザの戻る/進む', currentScrollY);
          } else {
            const currentScrollY = window.scrollY;
            setBeforeScrollTop(currentScrollY);
            lenis?.scrollTo(0, { immediate: true });
            console.log('通常のページ遷移', currentScrollY);
          }
          setIsBackOrForward(false);
        }}
      >
        <Child key={segment} isBackOrForward={isBackOrForward}>
          {props.children}
        </Child>
      </AnimatePresence>
    </>
  );
};
