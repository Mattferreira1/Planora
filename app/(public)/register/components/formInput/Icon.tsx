import { ElementType } from "react";

type IconType = ElementType;
export default function FormIcon({ icon: Icon }: { icon: IconType }) {
  return (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-zinc-500" />
    </div>
  );
}
