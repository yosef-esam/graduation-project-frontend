// app/sections/Collars.tsx (server component)

import CollarArticleWrapper from "@/components/collars/CollarArticleWrapper";

const Collars = async () => {
  const collarsData = [
    {
      backgroundSrc: '/images/landingPage/collarOneGrid.jpg',
      titleImageSrc: '/images/landingPage/aficollar.svg',
      titleAlt: 'AfiCollar',
  description:"AfiCollar provides accurate heat detection and continuous health monitoring, helping farmers improve fertility, animal welfare, and operational efficiency.",
      subDescription: `Using advanced motion ...`,
      innerImageSrc: '/images/landingPage/collarOne.png',
      readMoreHref: '#collarOne',
    },
    {
      backgroundSrc: '/images/landingPage/collarTwoGrid.jpg',
      titleImageSrc: '/images/landingPage/afiact.svg',
      titleAlt: 'AfiAct II',
  description:"AfiAct II delivers real-time behavior insights, calving alerts, and wellbeing indicators for smarter herd management.",
       subDescription: `Designed for high-precision activity ...`,
      innerImageSrc: '/images/landingPage/collarTwo.png',
      readMoreHref: '#collarTwo',
    },
  ];

  return (
    <section className="flex flex-wrap items-center justify-center bg-gray-900 pt-20">
      {collarsData.map((collar, index) => (
        <CollarArticleWrapper key={index} {...collar} />
      ))}
    </section>
  );
};

export default Collars;
