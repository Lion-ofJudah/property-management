import { FormEvent, ReactNode, MouseEvent } from "react";
import style from "./RippleButton.module.css";

interface Props {
  children: ReactNode;
  onClick?: (event: FormEvent) => void;
  className?: String;
}

export default function RippleButton({ children, onClick, className }: Props) {
  const handleClick = (event: MouseEvent) => {
    let x = event.clientX - (event.target as HTMLElement).offsetLeft;
    let y = event.clientY - (event.target as HTMLElement).offsetTop;

    let ripples = document.createElement("span");
    ripples.classList.add(style.ripple);
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    event.currentTarget.appendChild(ripples);

    setTimeout(() => {
      ripples.remove();
    }, 1000);
  };

  return (
    <button
      className={[style.button, className || ""].join(" ")}
      onClick={(event) => {
        handleClick(event);
        onClick && onClick(event);
      }}
    >
      {children}
    </button>
  );
}
