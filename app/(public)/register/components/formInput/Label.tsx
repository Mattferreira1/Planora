import { ComponentProps } from "react";

type LabelProps = ComponentProps<"label">;
export default function Label(props: LabelProps) {
  return (
    <label className="text-sm font-medium text-zinc-400 pl-1" {...props} />
  );
}
