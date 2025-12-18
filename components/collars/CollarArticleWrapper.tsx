'use client';

import { useState, useEffect } from 'react';
import useInView from '@/app/providers/useInView';
import CollarArticle from '@/components/collars/CollarArticle';

interface CollarArticleWrapperProps {
  backgroundSrc: string;
  titleImageSrc: string;
  titleAlt?: string;
  description: string;
  subDescription: string;
  innerImageSrc: string;
  readMoreHref: string;
}

const CollarArticleWrapper: React.FC<CollarArticleWrapperProps> = props => {
  const [ref, isInView] = useInView();
  const [started, setStarted] = useState(false);

  // ✅ Only update `started` after render when it comes into view
  useEffect(() => {
    if (isInView && !started) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStarted(true);
    }
  }, [isInView, started]);

  return (
    <div ref={ref} className="w-full sm:w-[50%]">
      <CollarArticle {...props} isInView={started} />
    </div>
  );
};

export default CollarArticleWrapper;
