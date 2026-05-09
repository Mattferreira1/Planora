import { ComponentProps } from "react";

type InputAreaProps = ComponentProps<"div">;
export default function InputArea(props: InputAreaProps) {
  return <div className="relative" {...props} />;
}
