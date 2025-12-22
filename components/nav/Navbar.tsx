'use client';

import { useEffect, useState } from 'react';
import Dock from '@/components/ui/Dock';
import { AiOutlineHome } from 'react-icons/ai';
import { RiSlideshowLine } from 'react-icons/ri';
import { FaChartBar } from 'react-icons/fa';
import { RiArticleLine } from 'react-icons/ri';
import { lenis } from '@/lib/lenis';
const Navbar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    {
      icon: <AiOutlineHome size={18} />,
      label: 'Home',
      onClick: () => lenis?.scrollTo('#home'),
    },
    {
      icon: <RiSlideshowLine size={18} />,
      label: 'Features',
      onClick: () => lenis?.scrollTo('#features'),
    },
    {
      icon: <RiArticleLine size={18} />,
      label: 'articles',
      onClick: () => lenis?.scrollTo('#articles'),
    },
    {
      icon: <FaChartBar size={18} />,
      label: 'Statistics',
      onClick: () => lenis?.scrollTo('#statis'),
    },
  ];

  return (
    <nav
      className={`fixed bottom-0 text-white left-0 right-0 z-1000 transition-transform duration-500 ease-out ${visible ? 'translate-y-0' : 'translate-y-[120%]'} `}
    >
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </nav>
  );
};

export default Navbar;
