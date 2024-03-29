// 'use client';

// import { AnimatePresence, motion } from 'framer-motion';
// import { useSelectedLayoutSegment } from 'next/navigation';
// import {
//   ElementRef,
//   ReactNode,
//   forwardRef,
//   useContext,
//   useEffect,
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
//   const segment = useSelectedLayoutSegment();
//   const lenis = useContext(LenisContext);

//   useEffect(() => {
//     if ('scrollRestoration' in history) {
//       history.scrollRestoration = 'manual';
//     }
//   }, []);

//   return (
//     <>
//       <AnimatePresence
//         mode="wait"
//         onExitComplete={() => {
//           lenis?.scrollTo(0, { immediate: true });
//         }}
//       >
//         <Child key={segment}>{props.children}</Child>
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
}

const Child = forwardRef<ElementRef<typeof motion.div>, ChildProps>(
  (props, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <FrozenRouter>{props.children}</FrozenRouter>
      </motion.div>
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
        <Child key={segment}>{props.children}</Child>
      </AnimatePresence>
    </>
  );
};
