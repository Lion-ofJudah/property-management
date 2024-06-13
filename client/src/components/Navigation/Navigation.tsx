import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  path: string;
  children: ReactNode;
}

export default function Navigation({ path, children }: Props) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <span
      className={[
        isActive(path) ? "bg-fontColor text-background" : " ",
        "hidden sm:inline text-sm font-bold hover:bg-fontColor hover:text-background cursor-pointer p-2 rounded-full",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
