import { twMerge } from "tailwind-merge";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  color?: "primary" | "default";
  asIcon?: boolean;
  disabled?: boolean;
};

const buttonColors = {
  primary: "bg-[#1D4878] text-white hover:bg-[#16385e] focus:bg-[#16385e]",
  default: "border-1 border-[#b6b6b6] hover:bg-[#B2D5E3] focus:bg-[#B2D5E3]",
};

function Button({ children, color, asIcon, ...rest }: ButtonProps) {
  const colorStyles = buttonColors[color ?? "default"];

  return (
    <button
      {...rest}
      className={twMerge(
        "select-none transition-colors rounded-sm cursor-pointer font-bold inline-flex gap-2 text-center items-center justify-center text-xs disabled:opacity-70 disabled:pointer-events-none",
        asIcon ? "px-3 py-2" : "px-4 py-2",
        colorStyles
      )}
    >
      {children}
    </button>
  );
}

export default Button;
