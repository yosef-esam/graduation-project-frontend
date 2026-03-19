"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFarm } from "@/app/actions/superAdminActions";

export default function AddFarmPage() {
    const router = useRouter();
    const [farmName, setFarmName] = useState("");
    const [ownerUserId, setOwnerUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!farmName || !ownerUserId) {
            setError("Farm Name and Owner User ID are required.");
            return;
        }

        try {
            setIsLoading(true);
            await createFarm({
                farmName,
                ownerUserId: Number(ownerUserId)
            });

            // Hard redirect to ensure new data is fully loaded and navigation completes
            window.location.href = "/superdashboard";
        } catch (err: any) {
            setError(err.message || "Failed to create farm.");
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Add New Farm</h1>

            <div className="bg-white shadow rounded-xl border p-6">
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Farm Name
                        </label>
                        <input
                            type="text"
                            value={farmName}
                            onChange={(e) => setFarmName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter farm name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Owner User ID
                        </label>
                        <input
                            type="number"
                            value={ownerUserId}
                            onChange={(e) => setOwnerUserId(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter owner user ID"
                            required
                        />
                    </div>

                    <div className="flex gap-3 justify-end mt-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? "Creating..." : "Create Farm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
