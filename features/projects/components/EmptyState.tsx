import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Image
        src="/icons/noProjects.svg"
        // fill
        alt=""
        className=" mb-6 opacity-40"
        width={288}
        height={288}
      />
      <h2 className="text-xl font-semibold text-text-primary mb-2">
        You don’t have any projects yet.
      </h2>
      <p className="text-text-secondary mb-6">
        Create your first project to get started.
      </p>
      <Link href="/project/add">
        <Button>Create New Project</Button>
      </Link>
    </div>
  );
}
