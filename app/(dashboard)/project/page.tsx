"use client";

import Head from "@/components/ui/Head";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { LoadingSkeleton } from "@/features/projects/components/LoadingSkeleton";
import { EmptyState } from "@/features/projects/components/EmptyState";
import { ErrorScreen } from "@/features/projects/components/ErrorScreen";
import { ProjectCard } from "@/features/projects/components/projectCard";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { Pagination } from "@/features/projects/components/Pagination";
import Link from "next/link";
import AddProjectCard from "@/features/projects/components/AddProjectCard";

export default function ProjectsPage() {
  const { projects, isLoading, error, retry } = useProjects();

  return (
    <div className="bg-background min-h-[calc(100vh-65px)] flex flex-col">
      <div className="max-w-7xl mx-auto lg:px-8 flex-1 w-full flex flex-col pb-8">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorScreen
            message={
              error ||
              `We're having trouble retrieving your
 projects right now. Please try
again in a moment..`
            }
            onRetry={retry}
          />
        ) : projects && projects.length > 0 ? (
          <>
            <Breadcrumbs />
            <div className="flex justify-between items-center w-full mb-8 pt-8">
              <Head
                head="Projects"
                className="pt-4 pb-0"
                headClassName="text-[36px] leading-10 tracking-[-0.9px]"
                sub="Manage and curate your projects"
              />
              <Link href="/project/add" className="hidden md:block">
                <Button className="py-3 px-6 h-11">
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
            <Link
              href="/project/add"
              className="bg-primary fixed  bottom-10 right-6 md:hidden w-14 h-14 rounded-xl p-5.25"
            >
              <Image
                src="/icons/plus.svg"
                alt="add Member"
                className="mr-2"
                // fill
                width={14}
                height={14}
              />{" "}
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              <AddProjectCard />
            </div>
            <div className="mt-auto">
              <Pagination />
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
