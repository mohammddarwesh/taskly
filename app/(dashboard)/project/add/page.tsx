import Head from "@/components/ui/Head";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AddProjectForm } from "@/features/projects/components/AddProjectForm";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function AddProjectPage() {
  return (
    <div className=" bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <Breadcrumbs />
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center  w-full  mb-8 pt-8">
          <Head
            head="Add New Project"
            className="pt-4 pb-0"
            headClassName="text-[36px] leading-10 tracking-[-0.9px]"
          />
          <Button className="py-3 w-45 h-11">
            <Image
              src="/icons/addMember.svg"
              alt="add Member"
              width={18.33}
              height={13.33}
              className="mr-2 "
            />{" "}
            Invite Member{" "}
          </Button>
        </div>

        <div className="flex justify-center pb-16">
          <AddProjectForm />
        </div>
      </div>
    </div>
  );
}
