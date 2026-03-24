'use client';
import { Suspense } from 'react';

import CanvasLoader from '@/utils/CanvasLoader';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Lazy-load FeaturesSwiper with no SSR (client-only)
const FeaturesSwiper = dynamic(
  () => import('@/components/features/FeatureSwiper'),
  { ssr: false } // optional: disables server-side rendering
);
const Features = () => {
  return (
    <section id='features' className="min-h-100 relative isolate flex flex-col gap-16 overflow-hidden py-24">
      <figure className="bg-linear-to-b absolute inset-0 -z-10 m-auto h-full w-full bg-black">
        <Image
          width={100}
          height={100}
          className="h-full w-full object-cover opacity-20"
          alt="features overlay"
          src="/images/landingPage/overlay.png"
        />
      </figure>

      <div className="container mx-auto px-4 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pointer-events-none text-center text-5xl font-black uppercase tracking-tighter text-white md:text-7xl mb-12"
        >
          Features & <span className="text-emerald-500">Capabilities</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <FeaturesSwiper />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
