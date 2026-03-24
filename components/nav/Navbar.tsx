'use client';

import { useEffect, useState } from 'react';
import Dock from '@/components/ui/Dock';
import { AiOutlineHome } from 'react-icons/ai';
import { RiSlideshowLine } from 'react-icons/ri';
import { FaChartBar } from 'react-icons/fa';
import { RiArticleLine, RiDashboardLine } from 'react-icons/ri';
import useLenis from '@/lib/lenis';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Navbar = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const lenisRef = useLenis(); // useRef<Lenis | null>

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (selector: string) => {
    if (lenisRef.current) {
      const element = document.querySelector(selector);
      if (element instanceof HTMLElement) lenisRef.current.scrollTo(element);
    }
  };

  const handleDashboardClick = () => {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (accessToken) {
      router.push('/dashboard');
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Access Denied',
        text: 'Login is required first',
        background: '#e11d48',
        color: '#ffffff'
      });
      router.push('/login');
    }
  };

  const items = [
    {
      icon: <AiOutlineHome size={18} />,
      label: 'Home',
      onClick: () => scrollTo('#home'),
    },
    {
      icon: <RiSlideshowLine size={18} />,
      label: 'Features',
      onClick: () => scrollTo('#features'),
    },
    {
      icon: <RiArticleLine size={18} />,
      label: 'Articles',
      onClick: () => scrollTo('#articles'),
    },
    {
      icon: <FaChartBar size={18} />,
      label: 'Statistics',
      onClick: () => scrollTo('#statis'),
    },
    {
      icon: <RiDashboardLine size={18} />,
      label: 'Dashboard',
      onClick: handleDashboardClick,
    },
  ];

  return (
    <nav
      className={`z-1000 fixed bottom-0 left-0 right-0 text-white transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-[120%]'
      }`}
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
