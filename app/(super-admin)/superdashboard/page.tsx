import {
    getFarms,
    getFarmsCount,
    deleteFarm
} from "@/app/actions/superAdminActions";

export default async function SuperAdminDashboard() {

    const [farms, farmsCount] = await Promise.all([
        getFarms(),
        getFarmsCount()
    ]);
    console.log(farms)
    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Super Admin Dashboard
            </h1>

            {/* Farms Count */}
            <div className="flex justify-between items-center mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white shadow rounded-xl p-6 border">
                        <h2 className="text-gray-500 text-sm">
                            Total Farms
                        </h2>

                        <p className="text-3xl font-bold text-green-600">
                            {farmsCount}
                        </p>
                    </div>

                </div>

                <div className="flex justify-between items-center mb-4">

                    <a
                        href="/dashboard"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold transition-colors"
                    >
                        return to Dashboard
                    </a>
                </div>
            </div>


            {/* Farms Table */}

            <div className="bg-white shadow rounded-xl border p-6">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Farms List
                    </h2>
                    <a
                        href="/superdashboard/add"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold transition-colors"
                    >
                        + Add Farm
                    </a>
                </div>

                <table className="w-full">

                    <thead className="border-b">
                        <tr>
                            <th className="text-left py-2">ID</th>
                            <th className="text-left py-2">Farm Name</th>
                            <th className="text-left py-2">Location</th>
                            <th className="text-left py-2">Owner</th>
                            <th className="text-left py-2">Status</th>
                            <th className="text-left py-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {farms?.map((farm: any) => (

                            <tr key={farm.id} className="border-b">

                                <td className="py-2">{farm.id}</td>

                                <td className="py-2 font-semibold">
                                    {farm.name}
                                </td>

                                <td className="py-2">
                                    {farm.location}
                                </td>

                                <td className="py-2">
                                    {farm.ownerName}
                                </td>

                                <td className="py-2">
                                    {farm.isActive ? (
                                        <span className="text-green-600 font-semibold">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">
                                            Inactive
                                        </span>
                                    )}
                                </td>

                                <td className="py-2 flex gap-2">

                                    <a
                                        href={`/superdashboard/farms/${farm.id}`}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </a>

                                    <form action={deleteFarm.bind(null, farm.id)}>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </form>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}