import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Navigation } from "./navigation";
export function Header() {
  return <header className="relative z-20 border-b border-line bg-white">
    <Container className="flex min-h-24 flex-wrap items-center justify-between gap-6 py-5">
      <Link href="/" aria-label="BSJ Builders home" className="flex items-center gap-3">
        <span aria-hidden="true" className="border-l-4 border-yellow pl-3 font-heading text-3xl font-extrabold tracking-[-0.06em]">BSJ</span>
        <span className="text-xs font-semibold uppercase tracking-[0.22em]">Builders</span>
      </Link>
      <Navigation />
    </Container>
  </header>;
}
