import {
    getFarms,
    getFarmsCount
} from "@/actions/superAdminActions";
import SuperAdminContent from "./_components/SuperAdminContent";

export default async function SuperAdminDashboard() {
    const [farms, farmsCount] = await Promise.all([
        getFarms(),
        getFarmsCount()
    ]);

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 font-poppins md:p-12 lg:p-16">
            <div className="mx-auto max-w-screen-2xl">
                <SuperAdminContent initialFarms={farms} farmsCount={farmsCount} />
            </div>
        </div>
    );
}
