'use client';
import gsap from 'gsap';
import Image from 'next/image';
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  overlayImage?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, overlayImage, children, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`backface-hidden transform-3d group absolute left-1/2 top-1/2 overflow-hidden rounded-xl border border-white bg-black p-6 will-change-transform ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    >
      {/* 🔹 Overlay Image */}
      {overlayImage && (
        <Image
          width={200}
          height={200}
          src={overlayImage}
          alt="overlay article image"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-30 duration-300 group-hover:scale-110 group-hover:opacity-60"
          draggable={false}
          loading='lazy'
          decoding='async'
        />
      )}

      {/* 🔹 Content */}
      <div className="relative z-10 h-full ">{children}</div>
    </div>
  )
);

Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () =>
      Children.map(children, child =>
        isValidElement<CardProps>(child) ? child : null
      ) ?? [],
    [children]
  );

  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr]
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  const placeAll = () => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(
        r.current!,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount
      )
    );
  };

  const swap = () => {
    if (order.current.length < 2) return;

    const [front, ...rest] = order.current;
    const elFront = refs[front].current!;
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });
    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);

    rest.forEach((idx, i) => {
      const el = refs[idx].current!;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease,
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = makeSlot(
      refs.length - 1,
      cardDistance,
      verticalDistance,
      refs.length
    );
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease,
      },
      'return'
    );
    tl.call(() => {
      order.current = [...rest, front];
    });
  };

  const goToCard = (index: number) => {
    if (index === order.current[0]) return;
    const newOrder = order.current.filter(i => i !== index);
    order.current = [index, ...newOrder];
    placeAll(); // instant reposition, or you can animate here if desired
  };

  useEffect(() => {
    placeAll();
    intervalRef.current = window.setInterval(swap, delay);
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, skewAmount, easing]);

  const rendered = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs
      childArr.map((child, i) =>
        cloneElement(child, {
          key: i,
          ref: refs[i], // just pass the ref, don't read .current here
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            child.props.onClick?.(e);
            goToCard(i); // animate or snap clicked card to front
            onCardClick?.(i);
          },
        } as CardProps & { ref: React.Ref<HTMLDivElement> })
      ),
    [childArr, refs, width, height, onCardClick, goToCard]
  );

  return (
    <div
      ref={container}
      className="perspective-[900px] absolute bottom-0 right-0 origin-bottom-right translate-x-[5%] translate-y-[20%] transform overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
