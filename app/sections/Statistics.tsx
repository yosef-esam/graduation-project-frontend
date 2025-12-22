'use client';

import useInView from '@/app/providers/useInView';
import Counter from '@/components/ui/Counter';
import CountUp from '@/components/ui/CountUp';
import PixelCard from '@/components/ui/PixelCard';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

// Dynamically import Globe so SSR won’t break
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

// Use a proper type for the Globe ref
type GlobeRef = {
  controls: () => {
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableZoom: boolean;
    enablePan: boolean;
    enableDamping: boolean;
  };
};

const Statistics = () => {
  const [ref, inView] = useInView();
  const globeRef = useRef<GlobeRef | null>(null);

  // Media queries
  const mediumDevice = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const smallDevice = useMediaQuery({ maxWidth: 480, minWidth: 0 }); // TS wants both

  useEffect(() => {
    if (!inView) return;
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableZoom = false;
    controls.enablePan = true;
    controls.enableDamping = true;
  }, [inView]);

  return (
    <section ref={ref} id="statis" className="pb-20">
      <figure className="relative isolate flex h-fit w-full items-center justify-center overflow-hidden rounded-3xl drop-shadow-[0px_0px_100px_#1788df] sm:h-[326px]">
        <Globe
          ref={globeRef}
          width={mediumDevice ? 300 : 475}
          height={mediumDevice ? 400 : smallDevice ? 250 : 475}
          showAtmosphere
          showGraticules
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-day.jpg"
          backgroundColor="rgba(0,0,0,0)"
          labelsData={[
            {
              lat: 40,
              lng: -100,
              text: 'Im Here!',
              color: 'white',
              size: 200,
            },
          ]}
        />
      </figure>

      <h2 className="pointer-events-none my-10 px-4 text-center text-3xl font-semibold text-gray-900 md:text-7xl">
        {' '}
        world wide statistics
      </h2>

      <div className="container flex flex-wrap items-center justify-center gap-8 md:justify-around">
        <PixelCard
          colors="#a3e635,#d9f99d,#f0fdf4,#bef264"
          className="max-h-65 xs:max-w-75 flex w-full flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <CountUp
            from={0}
            to={120}
            separator=","
            duration={1.5}
            className="font-mono text-7xl font-bold text-green-800"
          />
          <h3 className="text-center text-xl mt-2 font-medium text-gray-700">
            Cows Monitored
          </h3>
        </PixelCard>

        <PixelCard
          colors="#0ea5e9,#7dd3fc,#e0f2fe,#38bdf8"
          className="max-h-65 xs:max-w-75 flex w-full flex-col items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <CountUp
            from={0}
            to={95}
            separator=","
            duration={1.5}
            className="font-mono text-7xl font-bold text-blue-800"
          />
          <h3 className="text-center text-xl mt-2 font-medium text-gray-700">
            Sensors Active
          </h3>
        </PixelCard>

        <PixelCard
          variant="yellow"
          className="max-h-65 xs:max-w-75 flex w-full flex-col items-center justify-center rounded-2xl border border-yellow-200 bg-yellow-50 p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <CountUp
            from={0}
            to={30}
            separator=","
            duration={1.5}
            className="font-mono text-7xl font-bold text-yellow-800"
          />
          <h3 className="text-center text-xl mt-2 font-medium text-gray-700">
            AI Alerts Sent
          </h3>
        </PixelCard>
      </div>
    </section>
  );
};

export default Statistics;
