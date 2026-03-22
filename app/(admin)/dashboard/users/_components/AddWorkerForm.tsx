"use client";

import { useState } from "react";
import { createWorkerAction } from "@/app/actions/usersAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputField from "@/app/utils/InputField";

export default function AddWorkerForm() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);

            await createWorkerAction({
                fullName,
                email,
                phoneNumber,
            });

            toast.success("Worker added successfully");
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            router.refresh(); // Refresh the page to show the new worker
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to add worker");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <InputField
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="jony worker"
                />
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <InputField
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="yosefkhadr11@gmail.com"
                />
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <InputField
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="01025847410"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? "Adding..." : "Add Worker"}
            </button>
        </form>
    );
}
