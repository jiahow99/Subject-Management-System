import CreateUserBtn from "@/Components/CreateUserBtn";
import Header from "@/Components/Header";
import CreateUserModal from "@/Components/Users/CreateUserModal";
import TableHeader from "@/Components/Users/TableHeader";
import UserData from "@/Components/Users/UserData";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {  useState } from "react";

export default function Users({ auth, users }) {
  // States
  const [userModalOpen, setUserModalOpen] = useState(false);

  return (
    <Authenticated user={auth.user} header={<Header title="Users" />}>
      <div className="w-10/12 mx-auto">
        {/* Create user button */}
        <CreateUserBtn onClick={() => setUserModalOpen(true)} />

        {/* Table */}
        <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <TableHeader title="Name" />
                <TableHeader title="Email" />
                <TableHeader title="Email Verified At" />
                <TableHeader title="Action" />
              </tr>
            </thead>
            {/* Results */}
            <tbody>
                {users.map(user => <UserData key={user.id} user={user} />)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create user modal */}
      {userModalOpen && 
        <CreateUserModal setUserModalOpen={setUserModalOpen} />
      }
    </Authenticated>
  );
}
