'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { setThreeProgressListener } from '@/lib/threeLoadingManager';

interface ThreeLoaderContextValue {
  progress: number;
  done: boolean;
}

const ThreeLoaderContext = createContext<ThreeLoaderContextValue>({
  progress: 0,
  done: false,
});

export const useThreeLoader = () => useContext(ThreeLoaderContext);

export const ThreeLoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setThreeProgressListener(setProgress);
  }, []);

  return (
    <ThreeLoaderContext.Provider
      value={{
        progress,
        done: progress >= 100,
      }}
    >
      {children}
    </ThreeLoaderContext.Provider>
  );
};
