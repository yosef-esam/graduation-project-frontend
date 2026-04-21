'use client';

import { createFarm } from '@/actions/superAdminActions';
import { PageHeader } from '@/components/Dashboard/PageHeader';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    MdArrowForward,
    MdBusiness,
    MdChevronLeft,
    MdLocationOn,
    MdPerson,
} from 'react-icons/md';
import Swal from 'sweetalert2';

export default function AddFarmPage() {
    const router = useRouter();
    const [farmName, setFarmName] = useState('');
    const [ownerUserId, setOwnerUserId] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!farmName || !ownerUserId) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'warning',
                title: 'Validation Failed',
                text: 'Farm Name and Owner User ID are required.',
                background: '#023b26',
                color: '#ffffff',
            });
            return;
        }

        try {
            setIsLoading(true);
            await createFarm({
                farmName,
                ownerUserId: Number(ownerUserId),
                location
            });
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'success',
                title: 'Provisioning Authorized',
                text: 'Infrastructure node provisioned to matrix.',
                background: '#023b26',
                color: '#ffffff',
            });
            setTimeout(() => {
                window.location.href = '/superdashboard';
            }, 1000);
        } catch (err: any) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'error',
                title: 'Provisioning Refused',
                text: err.message || 'Failed to create farm.',
                background: '#e11d48',
                color: '#ffffff',
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="font-poppins space-y-10">
            <div className="mx-auto max-w-4xl">
                <button
                    onClick={() => router.back()}
                    className="group mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600/60 transition-colors hover:text-emerald-600"
                >
                    <MdChevronLeft
                        size={20}
                        className="transition-transform group-hover:-translate-x-1"
                    />{' '}
                    Return to FarmIQ
                </button>

                <PageHeader
                    title="Node Provisioning"
                    subtitle="Deploy a new farm infrastructure node into the global monitoring matrix. Authorization required for all new environment deployments."
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-2xl overflow-hidden rounded-[3rem] border border-white/20 bg-white/40 p-10 shadow-2xl backdrop-blur-3xl"
            >
                <div className="mb-10 flex items-center gap-4">
                    <div className="bg-linear-to-br flex h-16 w-16 items-center justify-center rounded-2xl from-[#023b26] to-[#011a11] text-emerald-400 shadow-xl shadow-[#023b26]/20">
                        <MdBusiness size={32} />
                    </div>
                    <div>
                        <h2 className="mb-1 text-3xl font-black uppercase leading-none tracking-tighter text-gray-900">
                            Deployment Phase
                        </h2>
                        <p className="text-sm font-bold text-gray-400">
                            Infrastructure synchronization details.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="pl-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                            Infrastructure Identity
                        </label>
                        <div className="relative">
                            <MdBusiness
                                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                value={farmName}
                                onChange={e => setFarmName(e.target.value)}
                                className="h-14 w-full rounded-2xl border border-gray-50 bg-gray-50/50 pl-12 pr-6 font-bold text-gray-900 shadow-inner outline-none transition-all focus:ring-2 focus:ring-emerald-500"
                                placeholder="Farm Operational Name"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="pl-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                            Owner Assignment (User ID)
                        </label>
                        <div className="relative">
                            <MdPerson
                                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="number"
                                value={ownerUserId}
                                onChange={e => setOwnerUserId(e.target.value)}
                                className="h-14 w-full rounded-2xl border border-gray-50 bg-gray-50/50 pl-12 pr-6 font-bold text-gray-900 shadow-inner outline-none transition-all focus:ring-2 focus:ring-emerald-500"
                                placeholder="Entity ID Reference"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="pl-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                            Location
                        </label>
                        <div className="relative">
                            <MdLocationOn
                                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className="h-14 w-full rounded-2xl border border-gray-50 bg-gray-50/50 pl-12 pr-6 font-bold text-gray-900 shadow-inner outline-none transition-all focus:ring-2 focus:ring-emerald-500"
                                placeholder="Location"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="h-16 flex-1 rounded-2xl bg-gray-100 font-black uppercase tracking-widest text-gray-500 shadow-sm transition-all hover:bg-gray-200 active:scale-95"
                        >
                            Abort
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative h-16 flex-[2] overflow-hidden rounded-2xl bg-[#023b26] text-white shadow-xl transition-all hover:bg-[#012217] active:scale-95 disabled:opacity-50"
                        >
                            <div className="bg-linear-to-r absolute inset-0 from-emerald-500/10 to-transparent transition-transform group-hover:translate-x-full" />
                            <div className="relative z-10 flex items-center justify-center gap-3 font-black uppercase tracking-widest">
                                {isLoading ? 'COMMITTING...' : 'AUTHORIZE DEPLOYMENT'}
                                <MdArrowForward
                                    size={20}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </div>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}