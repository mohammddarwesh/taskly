import Button from "@/components/ui/Button";
import Image from "next/image";

interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorScreen({ message, onRetry }: Props) {
  return (
    <div className="m-auto flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-input-bg-error w-16  mb-6 rounded-xl p-5">
        <Image
          src="/icons/cloudLineThrough.svg"
          alt="server error"
          className=" opacity-50"
          width={27.5}
          height={24.75}
        />
      </div>
      <h2 className="text-xl font-semibold text-slate-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-text-secondary max-w-md mb-6">{message}</p>
      <Button onClick={onRetry}>Retry Connection</Button>
    </div>
  );
}
