import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;
export default function Input({ ...props }: InputProps) {
  return (
    <input
      className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
      {...props}
    />
  );
}
