import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Head from "@/components/ui/Head";
import Button from "@/components/ui/Button";
import { MembersContent } from "@/features/projects/components/MembersContent";
import Image from "next/image";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectMembersPage({ params }: PageProps) {
  const { projectId } = await params;

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <Breadcrumbs />
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center w-full mb-8 pt-8">
          <Head
            head="Project Members"
            sub="Manage and view all members of this project"
            className="pt-4 pb-0"
            headClassName="text-[36px] leading-10 tracking-[-0.9px]"
          />
          <Button className="py-3">
            <Image
              src="/icons/addMember.svg"
              alt="Invite Member"
              width={18.33}
              height={13.33}
              className="mr-2"
            />
            Invite Members
          </Button>
        </div>

        <MembersContent projectId={projectId} />
      </div>
    </div>
  );
}
