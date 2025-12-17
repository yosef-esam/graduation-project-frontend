'use client';

import { useThreeLoader } from '@/app/contexts/ThreeLoaderContext';
import { motion } from 'motion/react';
import Image from 'next/image';

const ThreeLoader = () => {
  const { progress, done } = useThreeLoader();

  if (done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-6 text-white">
         <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={300}
                  height={300}
                  className="w-full max-w-[200px]"
                  priority
                />
        <span className="text-sm uppercase tracking-widest">
          Loading experience
        </span>

        <div className="h-1 w-64 overflow-hidden rounded bg-white/20">
          <motion.div
            className="h-full bg-[#18B772]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <span className="text-xs opacity-70">{progress}%</span>
      </div>
    </motion.div>
  );
};

export default ThreeLoader;
