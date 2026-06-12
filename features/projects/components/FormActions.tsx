import Button from "@/components/ui/Button";

type Props = {
  isSubmitting: boolean;
  onBack?: () => void;
  submitLabel?: string;
};

export function FormActions({
  isSubmitting,
  onBack,
  submitLabel = "Create",
}: Props) {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button
        variant="ghost"
        type="button"
        onClick={onBack || (() => window.history.back())}
        className="font-bold text-sm leading-5 text-text-secondary uppercase hover:underline"
      >
        Back
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary "
      >
        {isSubmitting ? "Creating..." : submitLabel}
      </Button>
    </div>
  );
}
