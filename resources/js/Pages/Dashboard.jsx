import FIleDropzone from '@/Components/Dashboard/FIleDropzone';
import SubjectsTable from '@/Components/Dashboard/SubjectsTable';
import { UpdateSubjectModal } from '@/Components/Dashboard/UpdateSubjectModal';
import UploadBtn from '@/Components/Dashboard/UploadBtn';
import Header from '@/Components/Header';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard({ auth }) {
    // States
    const [subjects, setSubjects] = useState([]);

    // Ref
    const updateModalRef = useRef(null);

    // Open update modal
    const openUpdateModal = (subject, index) => updateModalRef.current?.openModal(subject, index);

    // Update subject
    const updateSubject = (values, index) => {
        // Create a new array from the current subjects
        const updatedSubjects = [...subjects];

        // Update the subject at the specified index
        updatedSubjects[index] = {
            ...updatedSubjects[index],
            ...values
        };

        // Set the updated subjects array back to the state
        setSubjects(updatedSubjects);
    }

    // Delete subject
    const deleteSubject = (index) => {
        toast.success("Deleted subject");
        // Create new array 
        const updatedSubjects = subjects.filter((_, i) => i !== index);
        // Update state
        setSubjects(updatedSubjects);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Header title={"Import Data"} />}
        >
            <Head title="Dashboard" />

            {/* Import file */}
            {subjects.length === 0 
            ? <FIleDropzone setSubjects={setSubjects} />
            : <SubjectsTable subjects={subjects} setSubjects={setSubjects} openUpdateModal={openUpdateModal} deleteSubject={deleteSubject} />}
            
            <UpdateSubjectModal ref={updateModalRef} updateSubject={updateSubject} />

        </AuthenticatedLayout>
    );
}
