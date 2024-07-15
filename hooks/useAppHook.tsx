'use client';

import { useLenisRegister } from '@/hooks/useLenis';
import { useScrollBar } from '@/hooks/useScrollBar';

export const UseAppHook = () => {
  useLenisRegister();
  useScrollBar();
  return null;
};
