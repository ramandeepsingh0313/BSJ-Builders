import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigation } from "@/lib/navigation";
export function Footer() {
  return <footer className="bg-navy py-14 text-white">
    <Container>
      <div className="grid gap-12 md:grid-cols-2">
        <div><Link href="/" className="font-heading text-3xl font-bold">BSJ Builders<span className="text-yellow">.</span></Link>
          <p className="mt-4 text-sm leading-7 text-white/75">Building Trust. Creating Spaces.</p>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/75">Punjab, India</p></div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-1">
          {navigation.map(({ href, label }) => <Link key={href} href={href} className="py-2 text-sm underline-offset-4 hover:underline">{label}</Link>)}
        </nav>
      </div>
      <div className="mt-14 border-t border-white/20 pt-6 text-xs text-white/70">BSJ Builders · Construction &amp; contracting</div>
    </Container>
  </footer>;
}
