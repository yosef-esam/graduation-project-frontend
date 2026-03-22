"use client";

import { useState } from "react";
import { updateUserAction } from "@/app/actions/usersAction";
import toast from "react-hot-toast";

export default function EditUserRoleButton({ user }: any) {
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [role, setRole] = useState(user.userRole);
    const [loading, setLoading] = useState(false);

    async function handleUpdate() {
        try {
            setLoading(true);

            await updateUserAction(user.userId, {
                fullName,
                email,
                phoneNumber,
                userRole: role,
            });

            toast.success("User updated successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">

            <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="Full Name"
                autoCapitalize="none"
            />

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="Email"
                autoCapitalize="none"
            />

            <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="Phone"
                autoCapitalize="none"
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded px-2 py-1"
            >
                <option value="Admin">Admin</option>
                <option value="SysAdmin">SystemAdmin</option>
                <option value="Worker">Worker</option>
            </select>

            <button
                onClick={handleUpdate}
                disabled={loading}
                className="text-yellow-600"
            >
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
}