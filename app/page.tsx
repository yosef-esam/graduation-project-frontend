import Navbar from '@/components/nav/Navbar';
import Articles from '@/components/sections/Articles';
import Collars from '@/components/sections/Collars';
import Explanation from '@/components/sections/Explanation';
import ExplanationTwo from '@/components/sections/ExplanationTwo';
import FAQ from '@/components/sections/FAQ';
import Features from '@/components/sections/Features';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Newsletter from '@/components/sections/Newsletter';
import Offerings from '@/components/sections/Offerings';
import Reviews from '@/components/sections/Reviews';
import Statistics from '@/components/sections/Statistics';
import Vision from '@/components/sections/Vision';
import { LenisProvider } from '@/providers/LenisProvider';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <LenisProvider>
        <Navbar />
        <Hero />
        <Collars />
        <Explanation />
        <Features />
        <Offerings />
        <Vision />
        <Articles />
        <ExplanationTwo />
        <Statistics />
        <FAQ />
        <Reviews />
        <Newsletter />
        <Footer />
      </LenisProvider>
    </main>
  );
}
