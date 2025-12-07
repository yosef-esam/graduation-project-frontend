'use client';
import React from 'react';

interface BtnProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string; // optional extra Tailwind classes
}

const Btn: React.FC<BtnProps> = ({
  text,
  type = 'button',
  onClick,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-3 border-(--secondary_color) bg-(--secondary_color) hover:text-(--secondary_color) w-full rounded-full p-2 text-center text-[1rem] font-bold text-white hover:bg-transparent md:p-4 md:text-lg lg:text-xl ${className}`}
    >
      {text}
    </button>
  );
};

export default Btn;
