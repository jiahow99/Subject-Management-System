import { IoMdAdd } from "react-icons/io";
import { Link } from "@inertiajs/react";

export default function ImportBtn() {
  return (
    <Link 
        href='/'
        as="button"
        className="w-fit mt-5 px-5 py-2 rounded-lg bg-white active:translate-y-1 duration-200 flex
        gap-3 items-center text-black hover:bg-gray-400"
    >
        Import subject
        <IoMdAdd />
        
    </Link>
  )
}