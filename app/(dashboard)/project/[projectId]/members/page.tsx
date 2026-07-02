"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Head from "@/components/ui/Head";
import Button from "@/components/ui/Button";
import { MembersContent } from "@/features/projects/components/MembersContent";
import { InviteMemberModal } from "@/features/invite/components/InviteMemberModal";
import Image from "next/image";

export default function ProjectMembersPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  const pathname = usePathname();

  const handleInviteClick = () => {
    router.push(`${pathname}?invite=true`);
  };

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
          <Button className="py-3" onClick={handleInviteClick}>
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

        <InviteMemberModal projectId={projectId} />
      </div>
    </div>
  );
}
