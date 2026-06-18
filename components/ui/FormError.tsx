type Props = {
  message?: string;
  showDot?: boolean;
};

export function FormError({ message, showDot = false }: Props) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-1.5 mt-[7.5px]">
      {showDot && (
        <div className="w-[13.33px] h-[13.33px] rounded-full bg-error shrink-0" />
      )}
      <p className="font-medium text-xs leading-4 text-error">{message}</p>
    </div>
  );
}