"use client";

import { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import AdminHeader from "./dashboard/_components/AdminHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 md:p-10 lg:p-12 ">
        {/* Centered container for both Sidebar and Content */}
        <div className="max-w-[1700px] mx-auto w-full flex flex-col xl:flex-row gap-6 md:gap-10 relative">
             {/* Left Column: Sidebar */}
             <Sidebar isOpen={isSidebarOpen} setIsOpenAction={setIsSidebarOpen} />

             {/* Right Column: Dynamic Content Area */}
             <main className="flex-1 min-w-0 flex flex-col">
                <AdminHeader onMenuClickAction={() => setIsSidebarOpen(!isSidebarOpen)} />
                <section className="relative z-0">
                  {children}
                </section>
             </main>
        </div>
    </div>
  );
}
