'use client';

import { useLenisContext } from '@/app/providers/LenisProvider';
import ScrollFocus from '@/app/utils/ScrollFocus';
import GridDistortion from '@/components/ui/GridDistortion';
import Image from 'next/image';
import { useState } from 'react';

type CollarArticleProps = {
  /** Background image used in GridDistortion */
  backgroundSrc: string;

  /** Product title / logo image */
  titleImageSrc: string;
  titleAlt?: string;

  /** Main description */
  description: string;

  /** Sub description (generated / secondary text) */
  subDescription: string;

  /** Inner collar/product image */
  innerImageSrc: string;
  innerImageAlt?: string;

  /** Read more link */
  readMoreHref: string;

  isInView: boolean;

  /** Optional distortion controls */
  grid?: number;
  mouse?: number;
  strength?: number;
  relaxation?: number;
};

const CollarArticle = ({
  backgroundSrc,
  titleImageSrc,
  titleAlt = 'product title',
  description,
  subDescription,
  innerImageSrc,
  innerImageAlt = 'product image',
  readMoreHref,
  isInView,
  grid = 10,
  mouse = 0.1,
  strength = 0.15,
  relaxation = 0.9,
}: CollarArticleProps) => {
  const lenis = useLenisContext();
  const [open, setOpen] = useState(false);

  return (
    <article className="relative isolate flex min-h-[450px] w-full flex-[1_1_450px] overflow-hidden">
      <div
        className={`flex-2 pointer-events-none flex w-full flex-col items-center justify-center gap-2 bg-black/60 px-4 text-center text-white transition-opacity duration-500 ${open ? 'opacity-0' : 'opacity-100'}`}
      >
        {' '}
        <Image
          src={titleImageSrc}
          alt={titleAlt}
          width={240}
          height={240}
          className="h-15 w-full max-w-[200px]"
          loading="lazy"
          decoding="async"
        />
        <p className="max-w-100 mb-5 text-base font-semibold leading-relaxed md:text-lg">
          {description}
        </p>
      </div>
      <button
        onClick={() => setOpen(true)}
        className={`buttonStyles absolute inset-x-0 bottom-20 m-auto w-fit ${open ? 'opacity-0' : 'opacity-100'}`}
      >
        Read More
      </button>

      {/* Background distortion */}
      <figure className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`h-full w-full transition-transform duration-700 ease-out ${open ? 'scale-125' : 'scale-100'}`}
        >
          <GridDistortion
            imageSrc={backgroundSrc}
            grid={grid}
            mouse={mouse}
            strength={strength}
            relaxation={relaxation}
          />
        </div>
      </figure>

      {/* Foreground content */}
      <ScrollFocus
        className={`bg-linear-to-b from-(--secondary_color)/60 to-(--primary_color) absolute z-10 flex h-full w-full flex-wrap items-stretch p-6 transition-opacity duration-500 max-sm:gap-8 max-sm:overflow-x-auto ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        {/* Left content */}
        <div
          className={`sm:flex-2 flex w-full flex-[1_1_250px] flex-col justify-center gap-4 px-4 text-white transition-all duration-700 ease-out ${
            open ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          } `}
        >
          <Image
            src={titleImageSrc}
            alt={titleAlt}
            width={240}
            height={240}
            className="h-auto w-full max-w-[150px]"
            loading="lazy"
            decoding="async"
          />

          <p
            className={`text-base font-semibold leading-relaxed transition-all delay-100 duration-700 md:text-lg ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `}
          >
            {description}
          </p>

          <p
            className={`text-sm font-light leading-relaxed opacity-90 transition-all delay-150 duration-700 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `}
          >
            {subDescription}
          </p>

          <button
            onClick={() => {
              setOpen(false);
              lenis?.scrollTo(readMoreHref);
            }}
            className="buttonStyles w-fit"
          >
            Get Into Details
          </button>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="z-100 absolute right-6 top-6 select-none text-sm text-white/70 hover:text-white"
        >
          ✕ Close
        </button>

        {/* Right image */}
        <div
          className={`flex w-full items-center justify-center transition-all delay-200 duration-700 ease-out sm:flex-1 ${
            open
              ? 'translate-x-0 scale-100 opacity-100'
              : 'translate-x-10 scale-75 opacity-0'
          } `}
        >
          <Image
            src={innerImageSrc}
            alt={innerImageAlt}
            width={400}
            height={400}
            className="max-w-100 h-full max-h-[300px] w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </ScrollFocus>
    </article>
  );
};

export default CollarArticle;
