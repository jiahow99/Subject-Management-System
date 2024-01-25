import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function SubjectData({ subject, openUpdateModal }) {
    // Delete subject from API
    const handleDelete = () => {
        // Loading
        const loading = toast.loading("Deleting subject");
        router.delete(route('subject.destroy', subject.id), {
            onError: (error) => {
                console.log(error);
            },
            onFinish: () => {
                toast.dismiss(loading);
            }
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
            {/* Form */}
            <th
                scope="row"
                className="px-6 py-4 font-medium text-white whitespace-nowrap"
            >
                {subject.form}
            </th>
            <td className="px-6 py-4">{subject.subject}</td>
            <td className="px-6 py-4">{subject.teacher}</td>
            <td className="px-6 py-4">{subject.topic}</td>
            <td className="px-6 py-4 flex gap-5">
                {/* Edit */}
                <button
                    onClick={() => openUpdateModal(subject)}
                    as="button"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Edit
                </button>
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