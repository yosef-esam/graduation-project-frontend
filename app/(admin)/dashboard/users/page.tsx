import { deleteUserAction, getUsersPaginatedAction } from "@/app/actions/usersAction";
import EditUserRoleButton from "./_components/EditUserRoleButton";
import AddWorkerForm from "./_components/AddWorkerForm";

export default async function UsersPage() {
  const users = await getUsersPaginatedAction(1, 30);
  console.log(users);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Users</h1>

      <AddWorkerForm />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user: any) => (
              <tr key={user.userId} className="border-t">
                <td className="p-3">{user.userId}</td>
                <td className="p-3">{user.fullName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phoneNumber}</td>
                <td className="p-3">{user.userRole}</td>

                <td className="p-3 flex gap-3">
                  <EditUserRoleButton user={user} />

                  <form action={deleteUserAction.bind(null, user.userId)}>
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