import { useEffect } from "react";
import TableHeader from "../Users/TableHeader";
import SubjectData from "./SubjectData";
import UploadBtn from "./UploadBtn";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function SubjectsTable({ subjects, setSubjects, openUpdateModal, deleteSubject }) {
    // Upload subjects to API
    const uploadSubjects = () => {
        // Loading
        const loading = toast.loading("Uploading to server");
        // Call API
        router.post(route('subject.store'), {subjects}, {
            // Error
            onError: (error) => {
                console.log(error);
                toast.error("Something went wrong.")
            },
            // Success
            onSuccess: () => {
                setSubjects([]);
            },
            onFinish: () => toast.dismiss(loading)
        })
    }

  return (
    <div className="w-10/12 mx-auto py-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-gray-400">
            <thead className="uppercase bg-gray-700 text-gray-400">
                <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                    <input
                        id="checkbox-all"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="checkbox-all" className="sr-only">
                        checkbox
                    </label>
                    </div>
                </th>
                <TableHeader title="Form" />
                <TableHeader title="Subject" />
                <TableHeader title="Teacher" />
                <TableHeader title="Topic" />
                <TableHeader title="Action" />
                </tr>
            </thead>
            {/* Results */}
            <tbody>
                {subjects.length > 0 && subjects.map((subject) => 
                    <SubjectData key={subject.id} subject={subject} openUpdateModal={openUpdateModal} deleteSubject={deleteSubject} />
                )}
            </tbody>
        </table>

        {/* Upload button */}
        <UploadBtn onClick={uploadSubjects} />
    </div>
  )
}