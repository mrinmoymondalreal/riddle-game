import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CheckedButton({
  children,
  link,
  className,
  onClick,
}: {
  children: React.ReactNode;
  link: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <div className="relative z-[1]">
      <Link
        href={link}
        onClick={onClick}
        className={cn(
          "bg-slate-50 text-black shadow-md block text-center button-checked",
          className
        )}
      >
        {children}
      </Link>
    </div>
  );
}
