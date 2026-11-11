import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { navigation } from "@/lib/navigation";
import { ArrowUpRight, Building2, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const links = [
  ["#home", "Home"], ["/about", "About Us"], ["/services", "Services"],
  ["#projects", "Projects"], ["#leadership", "Leadership"],
  ["#testimonials", "Testimonials"], ["#contact", "Contact"],
] as const;
function Brand({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="home-brand" aria-label="BSJ Builders home">
    <span className="brand-symbol"><Building2 size={22} aria-hidden="true" /></span>
    <span><strong>{compact ? "BSJ BUILDERS" : <>BSJ<br />BUILDERS</>}</strong>
      {!compact && <small>Architectural &amp;<br />Turnkey Civil</small>}</span>
  </Link>;
}
export function HomeHeader({ page = "home" }: { page?: "home" | "about" | "services" | "projects" | "contact" } = {}) {
  const headerLinks: ReadonlyArray<readonly [string, string]> = page !== "home" ? navigation.map(({ href, label }) => [href, label] as const) : links;
  return <header className="bsj-home home-header">
    <Container className="home-container header-inner">
      <Brand compact />
      <nav aria-label="Main navigation" className="home-desktop-nav">{headerLinks.map(([href,label]) =>
        <Link key={href} href={href} className={(page === "home" ? href === "#home" : href === "/" + page) ? "is-active" : undefined} aria-current={page !== "home" && href === "/" + page ? "page" : undefined}>{label}</Link>)}</nav>
      <div className="header-actions"><a href="tel:+918544960313" className="home-phone" aria-label="Call BSJ Builders at +91 8544960313"><Phone size={16} aria-hidden="true" /><span>+91 8544960313</span></a>
        <Button href={page !== "home" ? "/contact" : "#contact"} className="home-button header-cta">Get in touch</Button></div>
      <ThemeToggle />
      <details className="home-mobile-menu">
        <summary aria-label="Open navigation">Menu <span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation">{headerLinks.map(([href,label]) => <Link href={href} key={href} aria-current={page !== "home" && href === "/" + page ? "page" : undefined}>{label}</Link>)}
          <a href="tel:+918544960313">Call +91 8544960313</a>
        </nav>
      </details>
    </Container>
  </header>;
}
export function HomeFooter({ innerPage = false }: { innerPage?: boolean } = {}) {
  return <footer className="bsj-home home-footer">
    <Container className="home-container">
      <div className="footer-intro"><div><span className="footer-kicker">BSJ Builders / Sangrur, Punjab</span><h2>Building Trust. <span>Creating Spaces.</span></h2></div><div className="footer-intro-action"><p>Tell us what you are looking to build.</p><Button href="/contact" className="home-button">Start a Project <ArrowUpRight size={17} aria-hidden="true" /></Button></div></div>
      <div className="footer-grid">
        <div className="footer-brand"><Brand compact /><p>Construction, renovation and finishing support for residential and commercial spaces in Punjab.</p></div>
        <div className="footer-column"><h2>Disciplines &amp; civil scope</h2><nav aria-label="Construction services">
          {["Turnkey Civil Construction","Commercial Architectural Contracting","Institutional & Educational Campuses","Luxury Residential Estates","Structural Retrofitting & Engineering"].map(label => <Link key={label} href="/services">{label}</Link>)}
        </nav></div>
        <div className="footer-column"><h2>Navigation</h2><nav aria-label="Footer navigation">{[["#home","Overview"],["/about","Firm Profile"],["#projects","Active Portfolios"],["#leadership","Executive Board"],["#testimonials","Client Testimonials"],["#contact","Direct Inquiries"]].map(([href,label]) => <Link href={innerPage && href.startsWith("#") ? (href === "#contact" ? "/contact" : "/" + href) : href} key={href}>{label}</Link>)}</nav></div>
        <div className="footer-column footer-contact"><h2>Regional headquarters</h2><address>
          <p><MapPin size={15} aria-hidden="true" /><span>BSJ Tower, Opp. District Administrative Complex, Sangrur, Punjab 148001</span></p>
          <a href="tel:+918544960313"><Phone size={15} aria-hidden="true" />+91 8544960313</a>
          <a href="mailto:projects@bsjbuilders.in"><Mail size={15} aria-hidden="true" />projects@bsjbuilders.in</a>
          <p><Clock size={15} aria-hidden="true" /><span>Mon – Sat: 08:30 AM – 07:00 PM IST</span></p>
        </address></div>
      </div>
      <div className="footer-bottom"><p>© {2026} BSJ Builders. All rights reserved.</p>
        <nav className="footer-legal" aria-label="Request company documents">{["Statutory Compliance", "Safety Mandate", "Privacy Policy"].map(label => <a key={label} href={`mailto:projects@bsjbuilders.in?subject=${encodeURIComponent("Request: " + label)}`} aria-label={`Request ${label} by email`}>{label}</a>)}</nav></div>
    </Container>
  </footer>;
}
