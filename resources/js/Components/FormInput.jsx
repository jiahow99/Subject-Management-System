import { useField } from "formik";

export default function FormInput({name, title, ...props }) {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="mb-3">
        <h1>{title}</h1>
        <input 
          {...field}
          {...props}
          className="rounded-xl w-1/2 border-2 border-gray-300"
        />
        {meta.touched && meta.error && (
          <p className="text-red-500">{meta.error}</p>
       )}
    </div>
  )
}