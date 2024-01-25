import TableHeader from "@/Components/Users/TableHeader";
import SubjectData from "./SubjectData";

export default function SubjectsTable({ subjects, openUpdateModal }) {
  return (
    <div className="w-full mx-auto py-5 relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    <SubjectData key={subject.id} subject={subject} openUpdateModal={openUpdateModal} />
                )}
            </tbody>
        </table>
    </div>
  )
}