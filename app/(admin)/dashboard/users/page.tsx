import { getUsersPaginatedAction } from "@/actions/usersAction";
import UsersContent from "./_components/UsersContent";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function UsersPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const users = await getUsersPaginatedAction();

  return (
    <div className="min-h-screen font-poppins">
      <div className="mx-auto max-w-screen-2xl">
        <UsersContent initialUsers={users} currentPage={currentPage} />
      </div>
    </div>
  );
}
