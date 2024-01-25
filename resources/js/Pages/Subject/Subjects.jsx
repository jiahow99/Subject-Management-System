import CreateUserBtn from "@/Components/CreateUserBtn";
import Header from "@/Components/Header";
import CreateUserModal from "@/Components/Users/CreateUserModal";
import TableHeader from "@/Components/Users/TableHeader";
import UserData from "@/Components/Users/UserData";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {  useRef, useState } from "react";
import NoSubject from "./NoSubject";
import SubjectsTable from "@/Components/Subjects/API/SubjectsTable";
import { UpdateSubjectModal } from "@/Components/Subjects/API/UpdateSubjectModa";
import ImportBtn from "@/Components/Subjects/API/ImportBtn";

export default function Users({ auth, subjects }) {
    // States
    const [modalOpen, setModalOpen] = useState(false);

    // Ref
    const updateModalRef = useRef(null);

    // Open update modal
    const openUpdateModal = (subject) => {
        updateModalRef.current?.openModal(subject);
    }

    return (
        <Authenticated user={auth.user} header={<Header title="Users" />}>
        <div className="w-10/12 mx-auto">
            {/* Import button */}
            <ImportBtn />

            {/* Table */}
            {subjects.length === 0 
                ? <NoSubject />
                : <SubjectsTable subjects={subjects} openUpdateModal={openUpdateModal} />}
        </div>

        {/* Create user modal */}
        {updateModalRef && 
            <UpdateSubjectModal ref={updateModalRef} />
        }
        </Authenticated>
    );
}
