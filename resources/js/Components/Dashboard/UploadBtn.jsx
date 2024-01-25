import { IoMdAdd } from "react-icons/io";

export default function UploadBtn({ onClick, isSubmitting=false, ...props }) {
  return (
    <button 
      onClick={onClick} 
      className="px-16 ml-auto mt-5 py-2 rounded-lg bg-white active:translate-y-1 duration-200 flex
      gap-3 items-center text-black hover:bg-gray-400"
    >
        Upload
        {isSubmitting && 
            <div className="text-xl animate-spin">
                <AiOutlineLoading3Quarters />
            </div>
        }
        
    </button>
  )
}