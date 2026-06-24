import { redirect } from "next/navigation";
interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}
const page = async ({ params }: PageProps) => {
  const { projectId } = await params;
  return redirect(`/project/${projectId}/epics`);
};

export default page;
