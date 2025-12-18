import React from 'react';
import { IoArrowRedo } from 'react-icons/io5';

interface BenefitProps {
  text: string;
}

const Benefit: React.FC<BenefitProps> = ({ text }) => {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <IoArrowRedo className="text-(--secondary_color) text-xl min-w-6" />
      <p className='max-w-prose text-balance'>{text}</p>
    </div>
  );
};

export default Benefit;
