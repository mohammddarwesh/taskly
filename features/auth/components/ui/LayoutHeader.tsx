import Image from "next/image";
import React from "react";

const LayoutHeader = () => {
  return (
    <div className="h-20 p-10  flex items-center justify-start gap-2">
      <Image src="/icons/logo.svg" width={18} height={20} alt="Taskly Logo" />
      <span className="font-bold text-xl">TASKLY</span>
    </div>
  );
};

export default LayoutHeader;
