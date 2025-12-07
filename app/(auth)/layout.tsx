// app/(auth)/layout.tsx
'use client';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen grid-cols-1 sm:grid-cols-[50%_50%] lg:grid-cols-[40%_60%]">
      {/* Left side: welcome section */}
      <section className="bg-(--primary_color) sticky top-0 h-dvh hidden sm:flex flex-col items-center justify-between gap-4 overflow-hidden py-8 md:py-12">
        <div className="flex flex-col items-center justify-center gap-4 px-4 text-center">
          <h2 className="text-4xl font-bold text-white">Welcome to</h2>
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={300}
            height={300}
            className="w-full max-w-[300px]"
          />
          <p className="text-(--offwhite_color) text-balance text-[14px] leading-6">
            FarmIQ gives you real-time insights into your cattle’s health,
            helping you track temperature, monitor activity, receive instant
            alerts, and manage your entire herd effortlessly from one simple
            dashboard.
          </p>
        </div>

        <div className="relative isolate flex w-full items-center justify-center">
          <span className="-z-1 pointer-events-none absolute inset-0 m-auto flex h-full w-[110%] items-center justify-center">
            <Image
              src="/images/Ellipse.svg"
              alt="oval overlay"
              width={500}
              height={500}
              className="mx-auto w-[110%]"
            />
          </span>
          <Image
            src="/images/cowWifi.png"
            alt="cow wifi device"
            width={250}
            height={250}
            className="w-full max-w-[250px]"
          />
        </div>
      </section>

      {/* Right side: page content */}
      <section className="flex items-center justify-center">{children}</section>
    </main>
  );
}
