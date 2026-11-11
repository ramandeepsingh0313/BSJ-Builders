import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck, ReceiptText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Leadership, HomeEyebrow } from "@/components/home/homepage";
import { AboutExperience } from "@/components/about/about-experience";
import "../home.css";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: "Meet BSJ Builders, a construction and contracting company in Sangrur, Punjab. Explore our approach, values and leadership.",
};
const principles = [
  { number: "01", icon: ShieldCheck, title: "Quality in the details.", text: "From tested aggregates and structural concrete to interior finishing, the quality of a space begins with the materials and decisions behind it." },
  { number: "02", icon: ReceiptText, title: "Clarity at every milestone.", text: "Transparent BOQs, agreed civil milestones and clear material records keep the conversation grounded in the work." },
  { number: "03", icon: Compass, title: "One considered whole.", text: "Civil construction, architectural coordination and interior finishing belong to the same conversation: how a space is built, and how it will be used." },
];
export default function AboutPage() {
  return <AboutExperience>
    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-hero-photo"><Image src="/images/home/site-engineers.jpg" alt="Engineers studying construction plans at a foundation site" fill preload sizes="100vw" /></div>
      <div className="about-survey-grid" aria-hidden="true" />
      <Container className="home-container about-hero-content">
        <div className="about-hero-top" data-about-hero><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About BSJ Builders</span></nav><span className="about-location">Sangrur, Punjab / India</span></div>
        <div className="about-hero-heading"><HomeEyebrow>The company behind the spaces</HomeEyebrow><h1 id="about-title" data-about-heading>Building Trust. <br /><span className="about-title-accent">Creating Spaces.</span></h1></div>
        <div className="about-hero-bottom"><div className="about-hero-aside" data-about-hero><p>A construction and contracting company rooted in Punjab. Bringing structural discipline and architectural thinking to the places we build.</p><a href="#our-story" className="about-explore">Discover our approach <ArrowDown size={16} aria-hidden="true" /></a></div>
          <a href="#our-story" className="about-seal" aria-label="Discover the BSJ Builders story" data-about-hero>
            <svg viewBox="0 0 120 120" aria-hidden="true" className="about-seal-ring"><defs><path id="about-seal-track" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text><textPath href="#about-seal-track" textLength="276">BUILDING TRUST • CREATING SPACES • </textPath></text></svg><ArrowDown size={24} aria-hidden="true" />
          </a>
        </div>
        <nav className="about-chapter-nav" aria-label="Explore the About page" data-about-hero><a href="#our-story"><span>01</span>Our story</a><a href="#our-values"><span>02</span>Our approach</a><a href="#leadership"><span>03</span>Our people</a><span className="about-hero-note">From the ground up.</span></nav>
      </Container>
    </section>
    <section id="our-story" tabIndex={-1} className="home-section about-story" aria-labelledby="story-title">
      <Container className="home-container">
        <div className="about-story-header"><div className="about-section-index"><span>01 / Our story</span><i aria-hidden="true" /></div><span className="about-story-label">Civil construction.<br />Architectural thinking.</span></div>
        <h2 id="story-title" className="about-story-statement" data-about-statement>More than structures. <br /><span>A considered approach.</span></h2>
        <div className="about-story-layout">
          <figure className="about-story-inset" data-about-enter><div><Image src="/images/home/interiors.jpg" alt="A carefully finished living space with marble flooring and bespoke interior details" fill sizes="(min-width: 1024px) 400px, 100vw" /></div><figcaption><span>Spaces, considered.</span><span aria-hidden="true">↗</span></figcaption></figure>
          <div><div className="about-story-copy" data-about-enter><p className="about-lead">Headquartered in Sangrur, BSJ Builders brings civil construction and architectural finishing together under one roof.</p><p>Our work spans residences, commercial spaces and civil infrastructure. From foundations and structural execution to the materials people see and touch, each part contributes to the whole.</p><p>Building Trust. Creating Spaces. It is the idea that connects our company, our people and the work.</p></div>
            <div className="about-vision" data-about-enter><article><span>Our vision</span><h3>A clear standard<br />for honest contracting.</h3><p>Setting the gold benchmark for honest civil contracting across the northern corridor.</p></article><article><span>Our mission</span><h3>Care in what<br />stands behind the finish.</h3><p>Structural discipline, tested materials and transparent billing, brought together with architectural care.</p></article></div>
          </div>
        </div>
      </Container>
    </section>
    <div className="about-type-band" aria-hidden="true"><div data-about-type>STRUCTURE <span>✳</span> SPACE <span>✳</span> TRUST <span>✳</span> STRUCTURE</div></div>
    <section id="our-values" tabIndex={-1} className="home-section about-values" aria-labelledby="values-title">
      <Container className="home-container about-values-layout">
        <div className="about-values-intro"><HomeEyebrow>02 • What guides the work</HomeEyebrow><h2 id="values-title" className="home-heading" data-about-heading>The details<br />build the difference.</h2>
          <div className="about-detail-image" data-about-enter><Image src="/images/home/blueprints.jpg" alt="A construction drawing reviewed at a worktable" fill sizes="(min-width: 1024px) 440px, 100vw" /><span aria-hidden="true" className="about-detail-cross">+</span></div><p>Good construction begins long before the final finish.</p></div>
        <div className="about-principles">{principles.map(({ number, icon: Icon, title, text }) => <article key={number} data-about-enter><span className="about-principle-number" aria-hidden="true">{number}</span><div><Icon size={24} strokeWidth={1.6} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </Container>
    </section>
    <Leadership eyebrow="03 • The people behind the work" />
    <section className="home-section about-next" aria-labelledby="next-title">
      <Container className="home-container"><div className="about-next-inner"><div data-about-enter><HomeEyebrow>A conversation is a good foundation</HomeEyebrow><h2 id="next-title" className="home-heading" data-about-heading>What are you<br />looking to build?</h2></div><Link href="/contact" className="about-contact-orbit" aria-label="Discuss your project with BSJ Builders" data-about-enter><ArrowUpRight aria-hidden="true" strokeWidth={1} /></Link></div>
        <div className="about-next-bottom" data-about-enter><p>A new home, a commercial space or a renovation.<br />Start with the space you have in mind.</p><div><Button href="/contact" className="home-button">Let&apos;s talk <ArrowUpRight size={18} aria-hidden="true" /></Button><Link href="/services" className="about-services-link">Explore our services <ArrowUpRight size={15} aria-hidden="true" /></Link></div></div>
      </Container>
    </section>
  </AboutExperience>;
}
