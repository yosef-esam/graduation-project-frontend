'use client';

import dynamic from 'next/dynamic';
import CanvasLoader from '@/app/utils/CanvasLoader';

const Hero = dynamic(() => import('@/app/sections/Hero'), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

export default function HeroClient() {
  return <Hero />;
}
