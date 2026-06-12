import Head from "@/components/ui/Head";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AddProjectForm } from "@/features/projects/components/AddProjectForm";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function AddProjectPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8">
        {/* Breadcrumb + Page Title using Head */}
        {/* <div className="flex justify-between flex-col items-start mb-8"> */}
        <Breadcrumbs />
        <div className="flex justify-between w-full mb-8">
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
        {/* </div> */}

        {/* Form Card */}
        <div className="flex justify-center pb-16">
          <AddProjectForm />
        </div>
      </div>
    </div>
  );
}
