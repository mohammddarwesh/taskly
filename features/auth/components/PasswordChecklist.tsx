import Image from "next/image";
import { checkListItems } from "../types/signup.types";

type props = { items: checkListItems };
export default function PasswordChecklist({ items }: props) {
  return (
    <div className="bg-surface-app p-4 rounded-lg flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex gap-2 items-center justify-start "
        >
          <span>
            <Image
              src={item.valid ? "/icons/checked.svg" : "/icons/unChecked.svg"}
              alt="status"
              width={11.666666984558105}
              height={11.666666984558105}
            />
          </span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
