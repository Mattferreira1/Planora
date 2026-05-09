import { ComponentProps } from "react";

type RootProps = ComponentProps<"div">;
export default function Root(props: RootProps) {
  return <div className="space-y-1" {...props} />;
}
