import { useField } from "formik";

export default function CreateUserInput({title, name, className, ...props}) {
    const [field, meta, helpers] = useField(name);

    return (
        <div className={`${className}`}>
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                {title}
            </label>
            <input 
                type="text" 
                {...field}
                {...props}
                className={`w-full ${meta.value ? 'bg-white' : 'bg-gray-400'} rounded py-2 px-4 leading-tight 
                focus:outline-none focus:bg-white duration-300 ease-in-out text-black`}
            />
            {/* Error message */}
            {meta.touched && meta.error && (
                <p className="text-sm text-red-500">* {meta.error}</p>
            )}
        </div>
    )
}