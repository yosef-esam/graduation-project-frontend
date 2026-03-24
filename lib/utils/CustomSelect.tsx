"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdExpandMore, MdCheck } from "react-icons/md";
import ScrollableWrapper from "@/components/Dashboard/ScrollableWrapper";

interface Option {
  id: string | number;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select Option",
  className = "",
  label = ""
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(o => o.id === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && <label className="block text-[10px] font-black uppercase tracking-widest text-emerald-800/40 mb-2 ml-4">{label}</label>}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-8 pr-14 flex items-center cursor-pointer transition-all hover:bg-gray-100 focus-within:ring-8 focus-within:ring-emerald-500/5 group shadow-inner relative"
      >
        <span className={`font-black text-sm uppercase tracking-widest ${selectedOption ? 'text-gray-900' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <MdExpandMore size={28} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 right-0 top-[110%] z-[100] overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-2xl backdrop-blur-3xl"
          >
            <div className="p-3">
              <ScrollableWrapper maxHeight="240px" className="space-y-1">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      onChange(option.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-6 py-4 rounded-2xl cursor-pointer transition-all ${
                      value === option.id 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="font-black text-xs uppercase tracking-widest">{option.label}</span>
                    {value === option.id && <MdCheck size={20} className="text-emerald-600" />}
                  </div>
                ))}
              </ScrollableWrapper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
