'use client';

import { useState, useEffect } from 'react';
import useInView from '@/app/providers/useInView';
import GridDistortion from '@/components/ui/GridDistortion';

interface Props {
  imageSrc: string;
  grid?: number;
  mouse?: number;
  strength?: number;
  relaxation?: number;
  className?: string;
}

const GridDistortionWithInView: React.FC<Props> = ({
  imageSrc,
  grid,
  mouse,
  strength,
  relaxation,
  className,
}) => {
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
    <div ref={ref} className="h-full w-full">
      <GridDistortion
        imageSrc={imageSrc}
        grid={grid}
        mouse={mouse}
        strength={strength}
        relaxation={relaxation}
        className={className}
      />
    </div>
  );
};

export default GridDistortionWithInView;
