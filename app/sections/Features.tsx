'use client'
import GridDistortionWithInView from '@/components/ui/GridDistortionWithView';
import { Suspense } from 'react';

import dynamic from 'next/dynamic';
import CanvasLoader from '@/app/utils/CanvasLoader';
import Image from 'next/image';

// Lazy-load FeaturesSwiper with no SSR (client-only)
const FeaturesSwiper = dynamic(
  () => import('@/components/features/FeatureSwiper'),
  { ssr: false } // optional: disables server-side rendering
);
const Features = () => {
  return (
    <section className="min-h-100 relative isolate flex flex-col gap-16 overflow-hidden py-20">
      <figure className="bg-linear-to-b absolute inset-0 -z-10 m-auto h-full w-full bg-black">
       <Image width={100} height={100} className='w-full h-full object-cover opacity-20' alt='features overlay' src='/images/landingPage/overlay.png'/>
      </figure>

      <h2 className="pointer-events-none px-4 text-center text-3xl font-semibold text-white md:text-5xl">
        Features and Capabilities
      </h2>

<Suspense fallback={<CanvasLoader/>}>

      <FeaturesSwiper />
</Suspense>
    </section>
  );
};

export default Features;
