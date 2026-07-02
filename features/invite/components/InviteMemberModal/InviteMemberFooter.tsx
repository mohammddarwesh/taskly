import Button from "@/components/ui/Button";

type Props = {
  onClose: () => void;
  isSubmitting: boolean;
};

export function InviteMemberFooter({ onClose, isSubmitting }: Props) {
  return (
    <div className="flex justify-between items-center pt-2">
      <button
        type="button"
        onClick={onClose}
        className="text-[15px] font-medium text-[#434654] hover:text-[#041B3C] transition-colors disabled:opacity-50"
      >
        Cancel
      </button>
      <Button
        type="submit"
        variant="primary"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="py-3 px-8 text-[15px]"
      >
        Send Invitation
      </Button>
    </div>
  );
}
