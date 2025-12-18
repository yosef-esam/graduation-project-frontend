import { LenisProvider } from '@/app/providers/LenisProvider';
// import Articles from '@/app/sections/Articles';
import Collars from '@/app/sections/Collars';
import Explanation from '@/app/sections/Explanation';
import ExplanationTwo from '@/app/sections/ExplanationTwo';
import Features from '@/app/sections/Features';
import Footer from '@/app/sections/Footer';
import Hero from '@/app/sections/Hero';
import Statistics from '@/app/sections/Statistics';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <LenisProvider>
      {/* <Hero /> */}
      <Collars />
      <Explanation />
      <Features />
      {/* <Articles/> */}
      <ExplanationTwo />
      <Statistics/>
      <Footer/>
      </LenisProvider>
    </main>
  );
}
