import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function PrimaryButton({ className = '', disabled, children, isSubmitting=false, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`flex items-center gap-3 bg-gray-800 px-5 py-2 text-white rounded-lg 
                duration-300 ${isSubmitting || disabled && 'opacity-45'}`}
        >
            {children}
            {isSubmitting && 
                <div className="animate-spin">
                    <AiOutlineLoading3Quarters />
                </div>
            }
        </button>
    );
}
