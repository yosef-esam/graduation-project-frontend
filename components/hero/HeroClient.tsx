'use client';

import dynamic from 'next/dynamic';
import CanvasLoader from '@/utils/CanvasLoader';

const Hero = dynamic(() => import('@/sections/Hero'), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

export default function HeroClient() {
  return <Hero />;
}
