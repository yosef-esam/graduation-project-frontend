'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const featureData = [
  {
    title: 'Accurate Heat Detection',
    description:
      'Smart technology for heat detection and fertility management. Sensitive, Proven, Smart algorithms for heifers and cows in open barns, free-stalls, and grazing regimes.',
    imageSrc: '/images/landingPage/features.jpg',
  },
  {
    title: 'Reliable and Durable',
    description:
      'Leverage 40 years of experience and development. Mechanical design made to last and withstand harsh farm conditions.',
    imageSrc: '/images/landingPage/features.webp',
  },
  {
    title: '24/7 Wireless Reading Tag',
    description:
      'Monitor your animals wherever they are located. Tags connect via farm WiFi, reading every few minutes. No need to bring animals to a reading station.',
    imageSrc: '/images/landingPage/pic-brochure.jpg',
  },
  {
    title: 'Animal Wellbeing',
    description:
      'Monitor resting time, health, and comfort. Detect sick animals, track restless groups, and manage overcrowding.',
    imageSrc: '/images/landingPage/calf.jpg',
  },
  {
    title: 'Optimize Farm Management',
    description:
      'Smart management system adapts to versatile farm practices. Optimize work routines and always have latest cow data.',
    imageSrc: '/images/landingPage/featuresOverlay.jpg',
  },
  {
    title: 'Increased Productivity',
    description:
      'A rested, comfortable cow is productive. 1 lost hour of resting time = 1.7kg/2.2lb of milk lost. Use AfiAct II with AfiFarm software.',
    imageSrc: '/images/landingPage/p6.jpg',
  },
  {
    title: 'Reliable and Durable',
    description:
      'Leverage 40 years of experience and development. Mechanical design made to last and withstand harsh farm conditions.',
    imageSrc: '/images/landingPage/wireless.png',
  },
  {
    title: 'Animal Wellbeing',
    description:
      'Monitor resting time, health, and comfort. Detect sick animals, track restless groups, and manage overcrowding.',
    imageSrc: '/images/landingPage/cowBaby.avif',
  },
];

const FeaturesSwiper = () => {
  return (
    <div className="container mx-auto ">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {/* Pyramid Slide */}
        <SwiperSlide>
          <div className="flex flex-col items-center gap-6">
            {/* Row 1 → 2 items */}
            <div className="grid grid-cols-2 gap-6">
              {featureData.slice(0, 2).map((f, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded border border-black/15 bg-white p-6"
                >
                  <Image
                    src={f.imageSrc}
                    alt={f.title}
                    width={300}
                    height={200}
                    className="mb-4 w-full rounded object-cover"
                  />
                  <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm">{f.description}</p>
                </div>
              ))}
            </div>

            {/* Row 2 → 3 items */}
            <div className="grid grid-cols-3 gap-6">
              {featureData.slice(2, 5).map((f, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded border border-black/15 bg-white p-6"
                >
                  <Image
                    src={f.imageSrc}
                    alt={f.title}
                    width={300}
                    height={200}
                    className="mb-4 w-full rounded object-cover"
                  />
                  <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm">{f.description}</p>
                </div>
              ))}
            </div>

            {/* Row 3 → 2 items */}
            <div className="grid grid-cols-2 gap-6">
              {featureData.slice(5, 7).map((f, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded border border-black/15 bg-white p-6"
                >
                  <Image
                    src={f.imageSrc}
                    alt={f.title}
                    width={300}
                    height={200}
                    className="mb-4 w-full rounded object-cover"
                  />
                  <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>

        {/* Duplicate slides to cycle all 8 features */}
        <SwiperSlide>
          <div className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-2 gap-6">
              {featureData.slice(1, 3).map((f, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded border border-black/15 bg-white p-6"
                >
                  <Image
                    src={f.imageSrc}
                    alt={f.title}
                    width={300}
                    height={200}
                    className="mb-4 w-full rounded object-cover"
                  />
                  <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm">{f.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
              {featureData.slice(3, 6).map((f, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded border border-black/15 bg-white p-6"
                >
                  <Image
                    src={f.imageSrc}
                    alt={f.title}
                    width={300}
                    height={200}
                    className="mb-4 w-full rounded object-cover"
                  />
                  <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm">{f.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              {featureData.slice(6, 8).map((f, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded border border-black/15 bg-white p-6"
                >
                  <Image
                    src={f.imageSrc}
                    alt={f.title}
                    width={300}
                    height={200}
                    className="mb-4 w-full rounded object-cover"
                  />
                  <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FeaturesSwiper;
