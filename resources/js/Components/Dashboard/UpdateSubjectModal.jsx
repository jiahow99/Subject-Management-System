import { Formik } from "formik";
import * as Yup from 'yup';
import CloseButton from "../CloseButton";
import CreateUserInput from "../Users/CreateUserInput";
import CreateUserBtn from "../CreateUserBtn";
import UpdateBtn from "./UpdateBtn";
import { forwardRef, useImperativeHandle, useState } from "react";
import toast from "react-hot-toast";

export const UpdateSubjectModal = forwardRef(({ updateSubject }, ref) => {
    // States
    const [subject, setSubject] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Export function for parent 
    useImperativeHandle(ref, () => ({
        openModal : (selectedSubject, index=0) => {
            setSubject(selectedSubject);
            setActiveIndex(index);
            setModalOpen(true);
        }
    }))

    // Close modal & reset states
    const closeModal = () => {
        setSubject(null);
        setModalOpen(false);
    }

    // Initial value
    const initialValues = {
        form: subject?.form,
        subject: subject?.subject,
        teacher: subject?.teacher,
        topic: subject?.topic
    };

    // Validation scheme
    const validationSchema = Yup.object().shape({
        form: Yup.string().required(),
        subject: Yup.string().required(),
        teacher: Yup.string().required(),
        topic: Yup.string().required()
    }) 

    // When submit, update subject 
    const onSubmit = (values) => {
        updateSubject(values, activeIndex);
        toast.success("Updated subject")
        setModalOpen(false);
    }

    return modalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm">       
            {/* Formik */}
            <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({handleSubmit}) => (
                <form 
                    autoComplete="off"
                    onSubmit={handleSubmit} 
                    onKeyDown={() => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }} 
                    className="w-full max-w-lg bg-gray-800 p-8 text-white rounded-xl flex flex-col gap-5"
                >
                    {/* Close button */}
                    <div className="flex justify-between items-center">
                        <CloseButton className="opacity-0" />
                            <h1 className="text-center text-xl font-semibold">Update Subject</h1>
                        <CloseButton onClick={() => closeModal()} />
                    </div>
                    {/* Name */}
                    <CreateUserInput 
                        name="form"
                        title="Form"
                        type="text"
                        className="w-full" 
                    />
                    {/* Email */}
                    <CreateUserInput 
                        name="subject"
                        title="Subject"
                        type="text"
                        className="w-full" 
                    />
                    {/* Password */}
                    <div>
                        <CreateUserInput 
                            name="teacher"
                            title="Teacher"
                            type="text"
                            className="w-full" 
                        />
                        <p className="text-gray-400 text-sm mt-1">Minimum 8 password length</p>
                    </div>
                    {/* Confirm Password */}
                    <CreateUserInput 
                        name="topic"
                        title="Topic"
                        type="text"
                        className="w-full" 
                    />

                    {/* Submit */}
                    <div className="flex justify-end">
                        <UpdateBtn onClick={handleSubmit} />
                    </div>
                </form>
                )}
            </Formik>
        </div>
    )
})