import { IoMdAdd } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CreateUserBtn({ onClick, isSubmitting=false, ...props }) {
  return (
    <button 
      onClick={onClick} 
      className="w-fit mt-5 px-5 py-2 rounded-lg bg-white active:translate-y-1 duration-200 flex
      gap-3 items-center text-black hover:bg-gray-400"
    >
        Create User
        {isSubmitting
        ? <div className="text-xl animate-spin">
            <AiOutlineLoading3Quarters />
          </div>
        : <IoMdAdd />}
        
    </button>
  )
}