import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Navigation({ children }: Props) {
  return (
    <span className="hidden sm:inline text-sm font-bold hover:bg-fontColor hover:text-background cursor-pointer p-2 rounded-full">
      {children}
    </span>
  );
}
