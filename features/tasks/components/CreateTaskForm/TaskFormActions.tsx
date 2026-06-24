import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface TaskFormActionsProps {
  isSubmitting: boolean;
  onBack?: () => void;
}

export function TaskFormActions({
  isSubmitting,
  onBack,
}: TaskFormActionsProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex justify-end items-center gap-4 border-t border-[#E8EDFF] pt-14">
      <Button
        type="button"
        variant="ghost"
        onClick={handleBack}
        disabled={isSubmitting}
        className="text-[#4F5F7B] text-[16px] font-medium hover:text-[#4F5F7B]/70 bg-transparent px-0"
      >
        Back
      </Button>
      <Button
        type="submit"
        loading={isSubmitting}
        className="bg-linear-to-br from-[#003D9B] to-[#0052CC] text-white text-[16px] font-semibold px-8 py-3 rounded-[2px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:opacity-90 transition-opacity"
      >
        Create Task
      </Button>
    </div>
  );
}
