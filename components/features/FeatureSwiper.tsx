'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const featureData = [
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
      'A rested, comfortable cow is productive. 1 lost hour of resting time = 1.7kg/2.2lb of milk lost. Use farmIqAct II with farmIqFarm software.',
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
  const renderSlides = (data: typeof featureData) =>
    data.map((f, idx) => (
      <SwiperSlide key={idx}>
        <div className="flex h-full flex-col  rounded border border-black/15 bg-white p-4">
          <Image
            src={f.imageSrc}
            alt={f.title}
            width={300}
            height={200}
            className="mb-2 w-full rounded object-cover"
          />
          <h3 className="text-lg font-semibold">{f.title}</h3>
          <p className="text-sm">{f.description}</p>
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="container mx-auto">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1} // mobile-first default
        breakpoints={{
          640: { slidesPerView: 2 }, // ≥640px → 2 slides
          1024: { slidesPerView: 3 }, // ≥1024px → 3 slides
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={1000}
      >
        {renderSlides(featureData)}
      </Swiper>

      {/* Middle Swiper → 2 slides default, responsive */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1} // mobile-first default
        breakpoints={{
          640: { slidesPerView: 2 }, // ≥640px → 2 slides
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          reverseDirection: true,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={1200}
      >
        {renderSlides(featureData)}
      </Swiper>

      {/* Bottom Swiper → 3 slides default, responsive */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1} // mobile-first default
        breakpoints={{
          640: { slidesPerView: 2 }, // ≥640px → 2 slides
          1024: { slidesPerView: 3 }, // ≥1024px → 3 slides
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={1100}
      >
        {renderSlides(featureData)}
      </Swiper>
    </div>
  );
};

export default FeaturesSwiper;
