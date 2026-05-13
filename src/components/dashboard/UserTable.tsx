import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useGetUsersQuery, useCheckInUserMutation } from '../../services/supabaseApi';

interface UserRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  position?: string;
  department?: string;
  check_in_status: boolean;
  check_in_date?: string;
  check_in_by?: string;
}

export default function UserTable() {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [checkIn] = useCheckInUserMutation();
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const rawUser = localStorage.getItem("mock_user");
      if (!rawUser) return;

      const user = JSON.parse(rawUser);
      const profileName = user.profile?.first_name || user.first_name || "Admin";
      setAdminName(profileName);
    } catch (error) {
      console.error("Unable to parse admin name:", error);
    }
  }, []);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Registered Users
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {users.length} user{users.length === 1 ? "" : "s"} from the registration table.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            View all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Check-in Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.map((user: UserRow) => (
              <TableRow key={user.id} className="">
                <TableCell className="py-3">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {user.first_name} {user.last_name}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      {user.position || "No position"} • {user.department || "No department"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.email}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={user.user_type === "admin" ? "primary" : "light"}
                  >
                    {user.user_type || "participant"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={user.check_in_status ? "success" : "warning"}
                  >
                    {user.check_in_status ? "Checked-in" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  {!user.check_in_status ? (
                    <button
                      onClick={() => checkIn({ userId: user.id, adminName })}
                      className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      Check-in
                    </button>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">{user.check_in_by || "—"}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
