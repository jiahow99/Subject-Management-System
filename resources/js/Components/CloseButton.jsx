import { IoClose } from "react-icons/io5";

export default function CloseButton({className, onClick}) {
  return (
    <div onClick={onClick} className={`${className} text-3xl hover:text-slate-300 cursor-pointer`}>
        <IoClose />
    </div>
  )
}