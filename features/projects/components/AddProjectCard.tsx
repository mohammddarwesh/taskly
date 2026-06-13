import Image from "next/image";
import Link from "next/link";

const AddProjectCard = () => {
  return (
    <Link
      href="/project/add"
      className=" flex flex-col justify-center items-center min-h-55 p-6 gap-7 
                                  bg-white rounded-lg border-2 border-dashed border-[slate-300/20 ]
                                  shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-center bg-surface-low rounded-xl w-12 h-12 text-center">
        <Image src="icons/plusCircled.svg" width={20} height={20} alt="add" />
      </div>
      <p className="font-bold text-slate-900 uppercase">ADD PROJECT</p>
    </Link>
  );
};

export default AddProjectCard;
