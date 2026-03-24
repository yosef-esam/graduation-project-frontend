'use client';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa] relative isolate overflow-hidden">
        {/* Subtle background nodes for depth */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 blur-[120px] rounded-full" />
        </div>

        <section className="w-full max-w-[1700px] p-4 md:p-12 relative z-10 flex items-center justify-center">
            {children}
        </section>
    </main>
  );
}
