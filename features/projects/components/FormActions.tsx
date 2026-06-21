import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type Props = {
  isSubmitting: boolean;
  onBack?: () => void;
  submitLabel?: string;
  onCancel?: () => void;
};

export function FormActions({
  isSubmitting,
  onBack,
  onCancel,
  submitLabel = "Create",
}: Props) {
  const router = useRouter();
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onBack) {
      onBack();
    } else {
      router.push("/project");
    }
  };
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-4">
      <Button
        variant="ghost"
        type="button"
        onClick={handleCancel}
        className="font-bold text-sm leading-5 text-text-secondary uppercase hover:underline"
      >
        Back
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full "
      >
        {isSubmitting ? "Creating..." : submitLabel}
      </Button>
    </div>
  );
}
