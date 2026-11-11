"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { navigation } from "@/lib/navigation";

export function Navigation() {
  const pathname = usePathname();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const links = navigation.map(({ href, label }) => <Link key={href} href={href}
    aria-current={pathname === href ? "page" : undefined}
    onClick={() => { if (disclosure.current) disclosure.current.open = false; }}
    className="block py-3 text-sm font-medium underline-offset-8 hover:underline aria-[current=page]:underline">{label}</Link>);
  return <>
    <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex">{links}</nav>
    <details ref={disclosure} className="group xl:hidden" onKeyDown={(event) => {
      if (event.key === "Escape" && disclosure.current) {
        disclosure.current.open = false;
        disclosure.current.querySelector("summary")?.focus();
      }
    }}>
      <summary className="min-h-11 px-3 py-3 text-sm font-semibold">Menu</summary>
      <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-b border-line bg-white px-6 py-5 shadow-sm">{links}</nav>
    </details>
  </>;
}
