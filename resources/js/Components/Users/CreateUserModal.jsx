import { Formik } from "formik";
import CreateUserBtn from "../CreateUserBtn";
import CreateUserInput from "./CreateUserInput";
import * as Yup from 'yup';
import { router } from "@inertiajs/react";
import CloseButton from "../CloseButton";
import toast from "react-hot-toast";

export default function CreateUserModal({setUserModalOpen}) {
    // Initial values
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    // Validation scheme
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    // Handle error
    const handleError = (error, setErrors, setSubmitting) => {
        setErrors(error);
        setSubmitting(false);
        toast.error("You have errors"); // show error toast
    }

    // After success create
    // Reset form & close modal
    const handleSuccess = (resetForm) => {
        resetForm();    
        setUserModalOpen(false);
    }

    // Submit
    const onSubmit = (values, {setErrors, resetForm, setSubmitting}) => {
        const loading = toast.loading("Creating user")
        router.post(route('user.store'), values, {
            onError: (error) => handleError(error, setErrors, setSubmitting),
            onSuccess: () => handleSuccess(resetForm),
            onFinish: () => toast.dismiss(loading)
        });
        
    }

return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm">       
        {/* Formik */}
        <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({handleSubmit, isSubmitting}) => (
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
                        <h1 className="text-center text-xl font-semibold">Create User</h1>
                    <CloseButton onClick={() => setUserModalOpen(false)} />
                </div>
                {/* Name */}
                <CreateUserInput 
                    name="name"
                    title="Name"
                    type="text"
                    className="w-full" 
                />
                {/* Email */}
                <CreateUserInput 
                    name="email"
                    title="Email"
                    type="email"
                    className="w-full" 
                />
                {/* Password */}
                <div>
                    <CreateUserInput 
                        name="password"
                        title="Password"
                        type="password"
                        placeholder="**************"
                        className="w-full" 
                    />
                    <p className="text-gray-400 text-sm mt-1">Minimum 8 password length</p>
                </div>
                {/* Confirm Password */}
                <CreateUserInput 
                    name="confirmPassword"
                    title="Confirm Password"
                    type="password"
                    className="w-full" 
                />

                {/* Submit */}
                <div className="flex justify-end">
                    <CreateUserBtn 
                        type="submit"
                        onClick={handleSubmit} 
                        isSubmitting={isSubmitting} 
                        className="text-black" 
                    />
                </div>
            </form>
            )}
        </Formik>
    </div>
  )
}