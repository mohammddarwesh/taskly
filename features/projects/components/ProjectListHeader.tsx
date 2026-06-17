import Head from "@/components/ui/Head";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export function ProjectListHeader() {
  return (
    <div className="flex justify-between items-center  gap-8 w-full mb-8 md:pt-8">
      <Head
        head="Projects"
        sub="Manage and curate your projects"
        className="pt-4 pb-0"
        headClassName="text-[36px] leading-10 tracking-[-0.9px]"
      />
      <Link href="/project/add" className="hidden md:block">
        <Button className="py-3">
          <Image
            src="/icons/plus.svg"
            alt="add Member"
            width={18.33}
            height={13.33}
            className="mr-2"
          />{" "}
          Create New Project
        </Button>
      </Link>
    </div>
  );
}
