import { Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function UserData({ user }) {
    // format email verified in "Jan 14 2023"
    const email_verified_at = user.email_verified_at 
        ? format(new Date(user.email_verified_at), "MMM dd yyyy")
        : "Not verified";

    // Delete user
    const handleDelete = () => {
        const loading = toast.loading("Deleting user");
        router.delete(route('user.destroy', user.id), {
            onFinish: () => toast.dismiss(loading)
        });
    }

  return (
    <tr className="bg-gray-800 border-b hover:bg-gray-600">
        {/* Checkbox */}
        <td className="w-4 p-4">
            <div className="flex items-center">
                <input
                id="checkbox-table-1"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="checkbox-table-1" className="sr-only">
                checkbox
                </label>
            </div>
        </td>
        {/* Name */}
        <th
            scope="row"
            className="px-6 py-4 font-medium text-white whitespace-nowrap"
        >
            {user.name}
        </th>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">{email_verified_at}</td>
        <td className="px-6 py-4 flex gap-5">
            {/* Edit */}
            <Link
                href={route('user.edit', user.id)}
                as="button"
                className="font-medium text-blue-600 hover:underline"
            >
                Edit
            </Link>
            {/* Delete */}
            <button onClick={handleDelete} className="font-medium text-red-400 hover:underline">
                Delete
            </button>
            {/* <Link
                href={route('user.destroy', user.id)}
                method="delete"
                as="button"
                className="font-medium text-red-400 hover:underline"
            >
                
            </Link> */}
        </td>
    </tr>
  )
}