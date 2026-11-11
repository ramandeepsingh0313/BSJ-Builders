import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Shared = { variant?: "primary" | "outline"; className?: string };
type Props = Shared & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href">)
  | ({ href?: never } & ComponentPropsWithoutRef<"button">)
);
export function Button(props: Props) {
  const { variant = "primary", className = "", ...rest } = props;
  const styles = `inline-flex min-h-12 items-center justify-center gap-8 px-6 py-3 text-sm font-semibold transition-colors motion-reduce:transition-none ${variant === "primary" ? "border border-yellow bg-yellow text-navy hover:bg-navy hover:text-white hover:border-navy" : "border border-navy text-navy hover:bg-navy hover:text-white"} ${className}`;
  if (rest.href !== undefined) return <Link {...rest} className={styles} />;
  return <button type="button" {...rest} className={styles} />;
}
