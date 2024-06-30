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
//         initial={{ opacity: 0, y: '40svh' }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: '-40svh' }}
//         transition={{ duration: 0.5 }}
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

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import {
  ElementRef,
  ReactNode,
  forwardRef,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface ChildProps {
  children: ReactNode;
}

const usePreviousValue = <T,>(value: T): T | undefined => {
  const prevValue = useRef<T>();

  useLayoutEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue.current;
};

const Child = forwardRef<ElementRef<typeof motion.div>, ChildProps>(
  ({ children }, ref) => {
    const context = useContext(LayoutRouterContext ?? {});
    const prevContext = usePreviousValue(context) || null;

    const segment = usePathname();
    const prevSegment = usePreviousValue(segment);

    const changed =
      segment !== prevSegment &&
      segment !== undefined &&
      prevSegment !== undefined;

    return (
      <>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: '40svh' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-40svh' }}
          transition={{ duration: 0.5 }}
        >
          <LayoutRouterContext.Provider value={changed ? prevContext : context}>
            {children}
          </LayoutRouterContext.Provider>
        </motion.div>
      </>
    );
  },
);

Child.displayName = 'Child';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const segment = usePathname();
  const [beforeScrollTop, setBeforeScrollTop] = useState(0);
  const [isBackOrForward, setIsBackOrForward] = useState(false);

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handlePopState = () => setIsBackOrForward(true);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useLayoutEffect(() => {
    setBeforeScrollTop(window.scrollY);
    // console.log('現在のスクロール位置をコンソールに出力:', window.scrollY);
  }, [segment]);

  const handleExitComplete = () => {
    // console.log('遷移前のスクロール位置をコンソールに出力:', beforeScrollTop);
    window.scrollTo({
      top: isBackOrForward ? beforeScrollTop : 0,
      behavior: 'auto',
    });
    setIsBackOrForward(false);
    // console.log('scrollTo呼び出し後のスクロール位置をコンソールに出力:', window.scrollY);
  };

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <Child key={segment}>{children}</Child>
      </AnimatePresence>
    </>
  );
};
