'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  MdSearch,
  MdEmail,
  MdPhone,
  MdAdminPanelSettings,
  MdDelete,
  MdChevronLeft,
  MdChevronRight
} from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import { deleteUserAction } from "@/actions/usersAction";
import EditUserRoleButton from "./EditUserRoleButton";
import AddWorkerForm from "./AddWorkerForm";
import Swal from 'sweetalert2';
import { PageHeader } from '@/components/Dashboard/PageHeader';
import { useRouter, useSearchParams } from 'next/navigation';

interface User {
  userId: number | string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userRole: string;
  farmId: number | string;
}

interface UsersContentProps {
  initialUsers: User[];
  currentPage: number;
}

const ITEMS_PER_PAGE = 8;

export default function UsersContent({ initialUsers, currentPage }: UsersContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [users, setUsers] = useState<User[]>(initialUsers || []);

  const roles = ['All', ...new Set(users.map(u => u.userRole))];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.phoneNumber || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'All' || user.userRole === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleDelete = async (userId: number) => {
    const result = await Swal.fire({
      title: 'DRASTIC SYSTEM OVERRIDE',
      text: "PERMANENTLY REMOVE THIS USER FROM THE PERSONNEL MATRIX?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#023b26',
      cancelButtonColor: '#e11d48',
      confirmButtonText: 'CONFIRM DE-PROVISION',
      cancelButtonText: 'ABORT',
      background: '#ffffff',
      backdrop: `rgba(2, 59, 38, 0.4)`,
      customClass: {
        popup: 'rounded-[2rem] border-4 border-emerald-500/10 shadow-2xl font-black',
        title: 'text-2xl tracking-tighter uppercase',
        confirmButton: 'rounded-xl px-8 py-4 uppercase tracking-widest text-xs',
        cancelButton: 'rounded-xl px-8 py-4 uppercase tracking-widest text-xs'
      }
    });

    if (result.isConfirmed) {
        try {
            await deleteUserAction(userId);
            setUsers(prev => prev.filter(u => u.userId !== userId));
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'success',
              title: 'Personnel Matrix Updated',
              text: 'Identity de-provisioned successfully',
              background: '#023b26',
              color: '#ffffff',
            });
        } catch {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'error',
              title: 'Sync Authority Failure',
              text: 'Failed to remove user from matrix',
              background: '#e11d48',
              color: '#ffffff'
            });
        }
    }
  };

  return (
    <div className="space-y-10 ">
      <PageHeader
        title="Personnel Matrix"
        subtitle="Manage farm owners, authorized administrators, and field personnel across your synchronized infrastructure."
      />

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white/40 p-10 rounded-[2.5rem] border border-white/20 backdrop-blur-2xl shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 w-full flex-1 items-center">
            {/* Search - Growing to fill space */}
            <div className="relative flex-1 group">
              <MdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/50 transition-colors group-focus-within:text-emerald-500" size={24} />
              <input
                  type="text"
                  placeholder="Search personnel infrastructure..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-gray-100 bg-white/50 pl-14 pr-6 font-bold text-sm text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-inner"
              />
            </div>

            {/* Role Filter (Chip/Bullet Style) */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Filter:</span>
              <div className="flex flex-wrap gap-2">
                {roles.slice(0, 4).map(role => (
                   <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      roleFilter === role
                      ? 'bg-[#023b26] text-white shadow-lg shadow-emerald-900/20'
                      : 'bg-white border border-gray-100 text-gray-400 hover:border-emerald-200 hover:text-emerald-600'
                    }`}
                   >
                     {role}
                   </button>
                ))}
              </div>
            </div>
        </div>

        <div className="shrink-0">
          <AddWorkerForm />
        </div>
      </div>

      {/* Users Matrix */}
      <div className="rounded-[3rem] border border-white/20 bg-white/40 overflow-hidden backdrop-blur-3xl shadow-2xl relative">
        <div className="flex flex-col">
          {/* Desktop Table Layout (>= 1024px) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100/50 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-800/40 bg-gray-50/30">
                  <th className="py-8 pl-10">System ID</th>
                  <th className="py-8">Personnel Identity</th>
                  <th className="py-8">Operational Links</th>
                  <th className="py-8">Access Level</th>
                  <th className="py-8 text-right pr-10">Matrix Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                <AnimatePresence mode='popLayout'>
                  {paginatedUsers.map((user, index) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ delay: index * 0.05 }}
                      key={user.userId}
                      className="group hover:bg-emerald-50/30 transition-all duration-300"
                    >
                      <td className="py-6 pl-10">
                        <span className="text-[10px] font-mono font-black text-gray-400 bg-gray-100/50 rounded-lg px-2 py-1">
                          #{user.userId.toString().slice(0, 8)}
                        </span>
                      </td>
                      <td className="py-6">
                        <div className="flex items-center gap-5">
                          <div className="relative">
                              <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-linear-to-br from-emerald-500 to-teal-600 text-white font-black text-xl shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3">
                                  {user.fullName.charAt(0).toUpperCase()}
                              </div>
                              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-white bg-green-500 shadow-sm" />
                          </div>
                          <div>
                              <span className="block font-black text-gray-900 uppercase tracking-tighter text-base group-hover:text-emerald-700 transition-colors leading-none mb-1.5">{user.fullName}</span>
                              <div className="flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Node: {user.farmId}</span>
                              </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3 text-xs font-bold text-gray-600 group-hover:translate-x-1 transition-transform">
                            <div className="h-8 w-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                               <MdEmail size={16} />
                            </div>
                            {user.email}
                          </div>
                          <div className="flex items-center gap-3 text-xs font-bold text-gray-600 group-hover:translate-x-1 transition-transform delay-75">
                            <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                               <MdPhone size={16} />
                            </div>
                            {user.phoneNumber || 'NO_COMMS_VLD'}
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className={`flex items-center gap-3 rounded-[1rem] px-4 py-2 w-fit border ${
                          user.userRole === 'Farm Owner'
                          ? 'bg-purple-50 border-purple-100 text-purple-700'
                          : user.userRole === 'Worker'
                          ? 'bg-blue-50 border-blue-100 text-blue-700'
                          : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                        }`}>
                          <MdAdminPanelSettings size={18} />
                          <span className="text-[10px] font-black uppercase tracking-[0.15em]">{user.userRole}</span>
                        </div>
                      </td>
                      <td className="py-6 pr-10">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <EditUserRoleButton user={user} />
                          <button
                            onClick={() => handleDelete(Number(user.userId))}
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 transition-all hover:bg-rose-500 hover:text-white shadow-sm hover:shadow-rose-200"
                          >
                            <MdDelete size={22} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards Layout (< 1024px) */}
          <div className="lg:hidden flex flex-col divide-y divide-gray-100/50">
            <AnimatePresence mode="popLayout">
              {paginatedUsers.map((user, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  key={`mobile-${user.userId}`}
                  className="flex flex-col gap-4 p-6 hover:bg-emerald-50/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-linear-to-br from-emerald-500 to-teal-600 text-white font-black shadow-lg">
                              {user.fullName.charAt(0).toUpperCase()}
                          </div>
                      </div>
                      <div className="min-w-0">
                          <span className="block font-black text-gray-900 uppercase tracking-tighter truncate text-lg leading-none mb-1">{user.fullName}</span>
                          <span className="font-mono text-[9px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                            #{user.userId.toString().slice(0, 8)}
                          </span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0 border ${
                      user.userRole === 'Farm Owner'
                      ? 'bg-purple-50 border-purple-100 text-purple-700'
                      : user.userRole === 'Worker'
                      ? 'bg-blue-50 border-blue-100 text-blue-700'
                      : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                    }`}>
                      <MdAdminPanelSettings size={14} />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] hidden sm:block">{user.userRole}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                      <div className="h-6 w-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                         <MdEmail size={12} />
                      </div>
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                      <div className="h-6 w-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                         <MdPhone size={12} />
                      </div>
                      <span>{user.phoneNumber || 'NO_COMMS'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100/50">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Node:</span>
                        <span className="text-xs font-black text-gray-700">{user.farmId}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <EditUserRoleButton user={user} />
                      <button
                        onClick={() => handleDelete(Number(user.userId))}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-all hover:bg-rose-500 hover:text-white"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32">
                <div className="h-24 w-24 rounded-[2.5rem] bg-gray-50 flex items-center justify-center text-gray-200 mb-6">
                    <MdSearch size={48} />
                </div>
                <p className="text-2xl font-black text-gray-300 uppercase tracking-tighter">Negative Biometric Match</p>
                <p className="mt-2 font-bold text-gray-400">The personnel matrix contains no records matching your query.</p>
            </div>
          )}
        </div>

        {/* Pagination Footbar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-10 py-8 bg-gray-50/50 border-t border-gray-100/50">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Showing <span className="text-emerald-600">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-emerald-600">{Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}</span> of <span className="text-emerald-600">{filteredUsers.length}</span> Records
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 hover:text-emerald-600 hover:border-emerald-200 transition-all"
              >
                <MdChevronLeft size={24} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-10 w-10 rounded-xl font-black text-xs transition-all ${
                      page === currentPage
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white text-gray-400 border border-gray-100 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 hover:text-emerald-600 hover:border-emerald-200 transition-all"
              >
                <MdChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
