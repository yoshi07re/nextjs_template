import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { create } from 'zustand';

// LenisStoreの型定義
type LenisStore = {
  lenis: Lenis | null;
  setLenis: (value: Lenis) => void;
};

// Zustandを用いたLenisStoreの作成
export const useLenis = create<LenisStore>((set) => ({
  lenis: null,
  setLenis: (value: Lenis) => set({ lenis: value }),
}));

// Lenisの登録を行うカスタムフック
export const useLenisRegister = () => {
  const lenis = useRef<Lenis | null>(null);
  const setLenis = useLenis((state) => state.setLenis);

  useEffect(() => {
    // Lenisのインスタンスを作成
    lenis.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenis(lenis.current);

    // gsapとScrollTriggerを登録
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    // アロー関数でwrapしてScrollTrigger.updateを呼び出し
    const onScroll = () => ScrollTrigger.update();
    lenis.current.on('scroll', onScroll);

    // gsapのtickerを用いてLenisのrafを更新
    const update = (time: number) => {
      lenis.current?.raf(time * 1000);
    };
    gsap.ticker.add(update as (this: void, time: number) => void);
    gsap.ticker.lagSmoothing(0);

    // コンポーネントのクリーンアップ時にLenisとgsapの設定を解除
    return () => {
      lenis.current?.destroy();
      gsap.ticker.remove(update as (this: void, time: number) => void);
    };
  }, [setLenis]);

  return lenis;
};
