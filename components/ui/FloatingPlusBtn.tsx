import Image from "next/image";
import Link from "next/link";

const FloatingPlusBtn = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="fixed right-6 bottom-10 rounded-xl! btn btn-primary md:hidden! w-14 h-14 p-0!"
    >
      <Image src="/icons/plus.svg" alt="plus" width={14} height={14} />
    </Link>
  );
};

export default FloatingPlusBtn;
