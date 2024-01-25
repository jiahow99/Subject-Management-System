import { Head, router, usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import FormInput from "@/Components/FormInput";
import { Formik } from "formik";
import * as Yup from 'yup';
import PrimaryButton from "@/Components/PrimaryButton";
import toast from "react-hot-toast";

export default function Edit({ auth, user }) {
    // Session values
    const { session } = usePage().props;

    // Handle error from API & display error
    const handleError = (error, setErrors) => {
        toast.error("You have error");
        setErrors(error);   
        // console.log(error);
    }
    
    // Initial values
    const initialValues = {
        name: user.name ?? '',
        email: user.email ?? '',
        password: '',
        confirmPassword: ''    
    }
    // Validation
    const validationScheme = Yup.object().shape({
        name: Yup.string().min(3).required(),
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')    
    });

    // Submit
    const onSubmit = (values, {setSubmitting, setErrors, resetForm}) => {
        router.put(route('user.update', user), values, {
            onError: (error) => handleError(error, setErrors),
            onFinish: () => setSubmitting(false),
            onSuccess: () => resetForm({name: user.name, email: user.email})
        });
    }

return (    
    <Authenticated
        user={auth.user}
        header={<Header title="Edit User" />}
    >
        <Head title="Profile" />
        <div className="py-12">
            <div className="w-10/12 mx-auto bg-white rounded-xl p-5">
                {/* Title */}
                <h1 className="font-medium text-lg">Profile Information</h1>
                <p className="text-sm text-gray-500 mb-5">Update your account's profile information and email address.</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationScheme}
                    onSubmit={onSubmit}
                >
                    {({handleSubmit, isSubmitting, dirty}) => (
                        <form onSubmit={handleSubmit} onKeyDown={e => e.key === 'Enter' && handleSubmit}>
                            {/* Name */}
                            <FormInput name="name" title="Name" />
                            <FormInput name="email" title="Email" />
                            <FormInput name="password" title="Password" type="password" />
                            <FormInput name="confirmPassword" title="Confirm Password" type="password" />
                            {/* Submit */}
                            <PrimaryButton disabled={!dirty} isSubmitting={isSubmitting} type="submit" onClick={handleSubmit}>
                                Submit
                            </PrimaryButton>
                        </form>
                    )}
                </Formik>
                {session.success && 
                    <p className="text-green-600 mt-2">Saved Success</p>
                }
            </div>
        </div>

    </Authenticated>
);
}
