'use client'
import GridDistortionWithInView from '@/components/ui/GridDistortionWithView';
import { Suspense } from 'react';

import dynamic from 'next/dynamic';
import CanvasLoader from '@/app/utils/CanvasLoader';

// Lazy-load FeaturesSwiper with no SSR (client-only)
const FeaturesSwiper = dynamic(
  () => import('@/components/features/FeatureSwiper'),
  { ssr: false } // optional: disables server-side rendering
);
const Features = () => {
  return (
    <section className="min-h-100 relative isolate flex flex-col gap-16 overflow-hidden py-20">
      <figure className="bg-linear-to-b absolute inset-0 -z-10 m-auto h-full w-full bg-black">
        <GridDistortionWithInView
          imageSrc="/images/landingPage/overlay.png"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="opacity-20"
        />
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
