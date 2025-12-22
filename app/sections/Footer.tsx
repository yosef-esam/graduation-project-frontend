'use client';

import Image from 'next/image';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="container mx-auto flex flex-col flex-wrap items-start justify-between gap-10 px-6 md:flex-row md:items-center">
        {/* Logo and Description */}
        <article className="flex flex-[1_1_250px] flex-col items-start">
          <Image
            src="/images/logo.svg"
            alt="Farm AI Logo"
            width={200}
            height={100}
            className="max-w-50 mb-4 h-auto w-full"
          />

          <p className="max-w-xs text-gray-400">
            Smart farm solutions powered by AI. Monitor your cows, track
            sensors, and optimize farm productivity .
          </p>
        </article>

        {/* Quick Links */}
        <article className="flex flex-[1_1_250px] flex-col gap-10 md:flex-row">
          <div className="flex flex-col gap-2">
            <h3 className="mb-2 font-semibold text-white">Farm Links</h3>
            <a href="#" className="text-gray-400 transition hover:text-white">
              Dashboard
            </a>
            <a href="#" className="text-gray-400 transition hover:text-white">
              Cow Tracker
            </a>
            <a href="#" className="text-gray-400 transition hover:text-white">
              Sensor Data
            </a>
            <a href="#" className="text-gray-400 transition hover:text-white">
              AI Alerts
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="mb-2 font-semibold text-white">Company</h3>
            <a href="#" className="text-gray-400 transition hover:text-white">
              About Us
            </a>
            <a href="#" className="text-gray-400 transition hover:text-white">
              Careers
            </a>
            <a href="#" className="text-gray-400 transition hover:text-white">
              Contact
            </a>
            <a href="#" className="text-gray-400 transition hover:text-white">
              Blog
            </a>
          </div>
        </article>

        {/* Social Links */}
        <article className="flex max-h-fit flex-[1_1_250px] flex-col gap-4">
          <h3 className="mb-2 font-semibold text-white">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="rounded-full bg-gray-700 p-2 transition hover:bg-[#1877F2]"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="rounded-full bg-gray-700 p-2 transition hover:bg-black"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="rounded-full bg-gray-700 p-2 transition hover:bg-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="rounded-full bg-gray-700 p-2 transition hover:bg-blue-700"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </article>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Collar Cow AI Farm. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
