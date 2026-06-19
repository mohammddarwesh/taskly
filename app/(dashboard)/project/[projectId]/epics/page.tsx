import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { EpicsContent } from "@/features/epics/components/EpicsContent";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectEpicsPage({ params }: PageProps) {
  const { projectId } = await params;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <Breadcrumbs />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#041B3C] tracking-[-0.75px]">
              Epics
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex items-center w-full min-w-[300px] h-12 bg-[#D7E2FF] rounded-sm px-3 focus-within:ring-1 focus-within:ring-[#003D9B] focus-within:ring-opacity-50">
              <Image
                src="/icons/search.svg"
                alt="Search"
                width={10.5}
                height={10.5}
                className="opacity-60 shrink-0"
              />
              <Input
                id="search"
                label=""
                placeholder="Search epics..."
                className="bg-transparent border-none! focus:outline-none! focus:ring-0! focus:border-transparent! pl-3 h-full text-sm placeholder:text-[#737685] focus:outline-none focus:ring-0"
              />
            </div>
            <Link href={`/project/${projectId}/epics/new`}>
              <Button className="h-12 px-6 bg-gradient-to-r from-[#003D9B] to-[#0052CC] text-white font-bold shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]">
                <Image
                  src="/icons/plus.svg"
                  alt="Create"
                  width={10.5}
                  height={10.5}
                  className="mr-2"
                />
                Create New Epic
              </Button>
            </Link>
          </div>
        </div>

        <EpicsContent projectId={projectId} />
      </div>
    </div>
  );
}
