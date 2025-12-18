'use client';

import dynamic from 'next/dynamic';
import CanvasLoader from '@/app/utils/CanvasLoader';
import Wave from '@/components/ui/Wave';
import Image from 'next/image';
import Link from 'next/link';

const HeroCanvas = dynamic(() => import('@/components/hero/HeroCanvas'), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

const PixelBlast = dynamic(() => import('@/components/ui/PixelBlast'), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

export default function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col items-center justify-start bg-gray-900 pt-10 text-white">
      <figure className="absolute inset-0 top-10 m-auto h-full w-full">
        <PixelBlast
          variant="square"
          pixelSize={6}
          color="#18B772"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </figure>

      <figure className="absolute inset-0 z-20 h-screen w-full">
        <HeroCanvas />
      </figure>

      <article className="pointer-events-none relative z-30 flex max-w-3xl flex-col items-center justify-center px-6 text-center sm:px-12">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-full max-w-[200px]"
          priority
        />
        <h1 className="shine mb-4 inline-block bg-clip-text text-4xl font-bold text-[#b5b5b5a4] drop-shadow-lg sm:text-6xl">
          Welcome To Farm IQ
        </h1>
        <p className="mb-6 text-lg drop-shadow-md sm:text-xl">
          AI-powered collars delivering real-time insights into cow health,
          behavior, and productivity — so farmers can act faster and care
          smarter.
        </p>
      </article>

      <div className="absolute top-80 z-40 flex flex-wrap items-center justify-center gap-6">
        <Link
          href="/register"
          className="bg-(--secondary_color) rounded-lg border-2 border-transparent px-6 py-3 font-semibold shadow-lg transition hover:border-white hover:bg-transparent"
        >
          Get Started
        </Link>
        <Link
          href="#"
          className="hover:bg-(--secondary_color) rounded-lg border-2 border-white px-6 py-3 font-semibold transition hover:border-transparent"
        >
          Learn More
        </Link>
      </div>

      <Wave />
    </header>
  );
}
