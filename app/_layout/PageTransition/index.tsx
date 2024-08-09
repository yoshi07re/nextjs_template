'use client';

import { AnimatePresence, motion, useWillChange } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import {
  ElementRef,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useLenis } from '@/hooks/useLenis';
interface ChildProps {
  children: ReactNode;
  disableAnimations: boolean;
}

const perspectiveVariants = {
  initial: {
    y: 0,
    opacity: 0,
    filter: 'brightness(100%) contrast(100%) blur(8px)',
  },
  animate: {
    y: 0,
    opacity: 1,
    filter: 'brightness(100%) contrast(100%) blur(0px)',
    transition: { delay: 0.2, duration: 0.6, ease: 'easeIn' },
  },
  exit: {
    y: '-12vh',
    opacity: [1, 1, 0],
    filter: 'brightness(60%) contrast(135%) blur(0px)',
    transition: { delay: 0.1, duration: 1, ease: 'easeInOut' },
  },
};

// const Child = forwardRef<ElementRef<typeof motion.div>, ChildProps>(
//   ({ disableAnimations, children }, ref) => {
//     const willChange = useWillChange();

//     const context = useContext(LayoutRouterContext);
//     const frozen = useRef(context).current;

//     const disableScroll = () => {
//       const elements = document.querySelectorAll('body *');
//       elements.forEach((element) => {
//         if (element instanceof HTMLElement) {
//           element.style.pointerEvents = 'none';
//         }
//       });
//     };

//     const enableScroll = () => {
//       const elements = document.querySelectorAll('body *');
//       elements.forEach((element) => {
//         if (element instanceof HTMLElement) {
//           element.style.pointerEvents = '';
//         }
//       });
//     };

//     return (
//       <>
//         <motion.div
//           className="min-h-screen"
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           style={{ willChange }}
//           variants={disableAnimations ? {} : perspectiveVariants}
//           onAnimationStart={(definition) => {
//             if (definition === 'exit') disableScroll();
//           }}
//           onAnimationComplete={(definition) => {
//             if (definition === 'animate') enableScroll();
//           }}
//         >
//           <LayoutRouterContext.Provider value={frozen}>
//             {children}
//           </LayoutRouterContext.Provider>
//         </motion.div>
//       </>
//     );
//   },
// );
const Child = forwardRef<ElementRef<typeof motion.div>, ChildProps>(
  ({ disableAnimations, children }, ref) => {
    const willChange = useWillChange();

    const context = useContext(LayoutRouterContext);
    const frozen = useRef(context).current;

    // Lenisのインスタンスをzustandから取得
    const lenis = useLenis((state) => state.lenis);

    const disableScroll = () => {
      const elements = document.querySelectorAll('body *');
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.pointerEvents = 'none';
        }
      });
    };

    const enableScroll = () => {
      const elements = document.querySelectorAll('body *');
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.pointerEvents = '';
        }
      });
    };

    return (
      <>
        <motion.div
          className="min-h-screen"
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ willChange }}
          variants={disableAnimations ? {} : perspectiveVariants}
          onAnimationStart={(definition) => {
            if (definition === 'exit') {
              disableScroll();
              lenis?.stop(); // lenisのスクロールを停止
            }
          }}
          onAnimationComplete={(definition) => {
            if (definition === 'animate') {
              enableScroll();
              lenis?.start(); // lenisのスクロールを再開
            }
          }}
        >
          <LayoutRouterContext.Provider value={frozen}>
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => setIsBackOrForward(true);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    setBeforeScrollTop(window.scrollY);
  }, [segment]);

  const handleExitComplete = useCallback(() => {
    window.scrollTo({
      top: isBackOrForward ? beforeScrollTop : 0,
      behavior: 'auto',
    });
    setIsBackOrForward(false);
  }, [isBackOrForward, beforeScrollTop]);

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <Child key={segment} disableAnimations={isBackOrForward}>
        {children}
      </Child>
    </AnimatePresence>
  );
};
