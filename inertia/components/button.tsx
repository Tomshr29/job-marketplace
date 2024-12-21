import { Link } from "@inertiajs/react";
import type { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
  size?: "normal" | "large";
  link?: string;
}

const buttonColorClassName = {
  primary: "bg-[#83838333]",
  secondary: "bg-[#fae100]",
};

const buttonSizeClassName = {
  normal: "h-[40px] w-[156px]",
  large: "w-full h-[40px]",
};

export function Button(props: Props) {
  const { variant = "primary", size = "normal", link, ...rest } = props;

  const className = `rounded-[7px] cursor-pointer hover:opacity-50 ${buttonColorClassName[variant]} ${buttonSizeClassName[size]} ${rest.className}`;

  if (link) {
    return (
      <Link href={link} className={className}>
        <span className="mb-0.5 block scale-y-90 font-bold uppercase tracking-tight antialiased">
          {rest.children}
        </span>
      </Link>
    );
  }

  return (
    <button {...rest} className={className}>
      <span className="mb-0.5 block scale-y-90 font-bold uppercase tracking-tight antialiased">
        {rest.children}
      </span>
    </button>
  );
}
