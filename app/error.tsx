'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdReportProblem, MdRefresh, MdLock, MdErrorOutline, MdWarning } from 'react-icons/md';

type ErrorConfig = {
  code: string;
  title: string;
  message: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  btnColor: string;
  btnHoverColor: string;
  btnShadow: string;
  blurColor: string;
  gradientFrom: string;
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const getErrorConfig = (): ErrorConfig => {
    const errMessage = error.message.toLowerCase();
    
    if (errMessage.includes('auth') || errMessage.includes('token') || errMessage.includes('unauthorized') || errMessage.includes('401')) {
      return {
        code: '401',
        title: 'Unauthorized Access',
        message: 'Your access credentials could not be verified. Please authenticate to complete the request.',
        icon: <MdLock size={72} />,
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-500',
        btnColor: 'bg-amber-600',
        btnHoverColor: 'hover:bg-amber-700',
        btnShadow: 'shadow-amber-900/10',
        blurColor: 'bg-amber-500/10',
        gradientFrom: 'from-amber-500/5',
      };
    } else if (errMessage.includes('not found') || errMessage.includes('404')) {
      return {
        code: '404',
        title: 'Data Not Found',
        message: 'The requested resource could not be located in the current database index.',
        icon: <MdErrorOutline size={72} />,
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-500',
        btnColor: 'bg-blue-600',
        btnHoverColor: 'hover:bg-blue-700',
        btnShadow: 'shadow-blue-900/10',
        blurColor: 'bg-blue-500/10',
        gradientFrom: 'from-blue-500/5',
      };
    } else if (errMessage.includes('forbidden') || errMessage.includes('403')) {
      return {
        code: '403',
        title: 'Access Forbidden',
        message: 'You lack the required authorization levels to interact with this module.',
        icon: <MdWarning size={72} />,
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-500',
        btnColor: 'bg-orange-600',
        btnHoverColor: 'hover:bg-orange-700',
        btnShadow: 'shadow-orange-900/10',
        blurColor: 'bg-orange-500/10',
        gradientFrom: 'from-orange-500/5',
      };
    } else if (errMessage.includes('timeout') || errMessage.includes('504')) {
      return {
         code: '504',
         title: 'Gateway Timeout',
         message: 'The server interface took too long to respond. The communication relay has been aborted.',
         icon: <MdReportProblem size={72} />,
         bgColor: 'bg-purple-50',
         textColor: 'text-purple-500',
         btnColor: 'bg-purple-600',
         btnHoverColor: 'hover:bg-purple-700',
         btnShadow: 'shadow-purple-900/10',
         blurColor: 'bg-purple-500/10',
         gradientFrom: 'from-purple-500/5',
      };
    }

    return {
      code: '500',
      title: 'Critical Failure',
      message: 'An unexpected system error occurred. Diagnostics indicate a critical malfunction in the execution parameters.',
      icon: <MdReportProblem size={72} />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-500',
      btnColor: 'bg-red-600',
      btnHoverColor: 'hover:bg-red-700',
      btnShadow: 'shadow-red-900/10',
      blurColor: 'bg-red-500/10',
      gradientFrom: 'from-red-500/5',
    };
  };

  const config = getErrorConfig();

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden isolate">
      {/* Decorative Blur Elements */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${config.blurColor} blur-[120px] rounded-full pointer-events-none transition-colors duration-500`} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col items-center justify-center w-full max-w-3xl overflow-hidden rounded-[3.5rem] bg-white shadow-2xl border border-white p-12 md:p-20 text-center z-10"
      >
        <div className={`absolute top-0 right-0 w-full h-1/2 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] ${config.gradientFrom} via-transparent to-transparent opacity-50 pointer-events-none transition-colors duration-500`} />

        <div className={`w-24 h-24 rounded-3xl ${config.bgColor} ${config.textColor} flex items-center justify-center mb-8 shadow-inner border border-black/5 transition-colors duration-500`}>
           {config.icon}
        </div>

        <h1 className="text-8xl md:text-9xl font-black tracking-tighter uppercase mb-2 text-transparent bg-clip-text bg-linear-to-b from-gray-900 to-gray-400">
          {config.code}
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase mb-6">
          {config.title}
        </h2>
        
        <p className="text-gray-500 font-bold max-w-md mx-auto mb-10 text-sm">
          {config.message}
        </p>

        <button
          onClick={() => reset()}
          className={`group relative flex h-16 w-full max-w-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] ${config.btnColor} text-white transition-all ${config.btnHoverColor} shadow-xl ${config.btnShadow}`}
        >
          <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent transition-transform group-hover:translate-x-full duration-700" />
          <div className="relative z-10 flex items-center gap-3 font-black uppercase tracking-[0.2em] text-xs">
            <MdRefresh size={20} className="transition-transform group-hover:rotate-180" />
            RESTART SEQUENCE
          </div>
        </button>
      </motion.div>
    </div>
  );
}
