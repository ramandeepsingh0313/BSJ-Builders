"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
/** Select server-rendered chrome while retaining the foundation for unfinished routes. */
export function SiteChrome({ home, about, services, projects, contact, standard }: { home: ReactNode; about?: ReactNode; services?: ReactNode; projects?: ReactNode; contact?: ReactNode; standard: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return home;
  if (pathname === "/about" && about !== undefined) return about;
  if (pathname === "/services" && services !== undefined) return services;
  if (pathname === "/projects" && projects !== undefined) return projects;
  if (pathname === "/contact" && contact !== undefined) return contact;
  return standard;
}
