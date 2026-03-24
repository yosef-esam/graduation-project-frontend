"use client";

import React, { createContext, useContext, useState } from 'react';

interface PreloaderContextType {
  isLoaded: boolean;
  isExiting: boolean;
  setIsLoaded: (val: boolean) => void;
  setIsExiting: (val: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoaded: false,
  isExiting: false,
  setIsLoaded: () => {},
  setIsExiting: () => {},
});

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isLoaded, isExiting, setIsLoaded, setIsExiting }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
