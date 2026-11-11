import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HomeEyebrow } from "@/components/home/homepage";
import { ServicesExperience } from "@/components/services/services-experience";
import { ServiceDescription } from "@/components/services/service-description";
import { serviceContent, workingProcess } from "@/lib/services-content";
import "../home.css";
import "./services.css";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Construction, renovation, civil works, turnkey projects, interior finishing and project management for residential and commercial spaces in Punjab.",
};
export default function ServicesPage() {
  return <ServicesExperience>
    <section className="services-hero" aria-labelledby="services-title">
      <div className="services-hero-image" data-services-hero-image><Image src="/images/home/foundations.jpg" alt="Construction crew working around foundation drilling equipment" fill preload sizes="100vw" /></div>
      <Container className="home-container services-hero-content">
        <nav className="services-breadcrumb" aria-label="Breadcrumb" data-services-hero><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Our Services</span></nav>
        <div className="services-hero-copy"><HomeEyebrow>What we do</HomeEyebrow><h1 id="services-title" data-services-title>Complete Construction.  <br /><span className="services-title-accent">Thoughtfully Delivered.</span></h1>
          <p data-services-hero>From initial planning to the final finishing touches, BSJ Builders provides dependable construction and renovation solutions for residential and commercial spaces.</p>
          <div className="services-hero-actions" data-services-hero><Button href="#our-services" className="home-button">Explore our services <ArrowDown size={17} aria-hidden="true" /></Button><Link href="/contact" className="services-text-link">Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </div>
        <div className="services-hero-baseline" data-services-hero><span>Residential / Commercial / Renovation</span><span>01 — 07 <i aria-hidden="true" /></span></div>
      </Container>
    </section>
    <section className="home-section services-intro" aria-labelledby="expertise-title">
      <Container className="home-container">
        <div className="services-intro-top"><div><HomeEyebrow>Our expertise</HomeEyebrow><h2 id="expertise-title" className="home-heading" data-services-heading>Built Around <br />Your Vision.</h2></div>
          <div data-services-enter><p className="services-lead">Every space starts with a purpose. Our approach brings construction, renovation and finishing into one considered conversation.</p><p>We begin with your requirements and the realities of the site, then coordinate the work around the spaces you want to create.</p></div>
        </div>
        <nav className="services-index" aria-label="Jump to a service">{serviceContent.map(({slug,title},index)=><a key={slug} href={`#${slug}`}><span>{String(index+1).padStart(2,"0")}</span>{title}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</nav>
      </Container>
    </section>
    <section id="our-services" tabIndex={-1} className="home-section services-catalog" aria-labelledby="catalog-title">
      <Container className="home-container">
        <div className="services-catalog-header"><div><HomeEyebrow>The complete scope</HomeEyebrow><h2 id="catalog-title" className="home-heading" data-services-heading>Seven disciplines. <br />One considered approach.</h2></div><span className="services-catalog-label">Construction &amp; renovation <br />All in one place.</span></div>
        <div className="services-story-status" aria-live="polite" data-services-story-status>
          <span className="services-story-status-count" data-services-story-count>01 / 07</span>
          <span className="services-story-status-title" data-services-story-title>Residential Construction</span>
          <span className="services-story-status-line" aria-hidden="true"><i data-services-story-progress /></span>
          <span className="services-story-status-prompt" aria-hidden="true">Scroll to explore</span>
        </div>
        <div className="services-chapters">{serviceContent.map(({slug,title,description,details,image,alt,feature},index)=><article key={slug} id={slug} tabIndex={-1} className={`services-chapter ${feature ? "chapter-feature" : "chapter-compact"} ${index===3 ? "chapter-reverse" : ""} ${index===0 ? "is-active" : ""}`} data-service data-service-index={index} data-service-name={title}>
          <span className="services-chapter-number" aria-hidden="true" data-services-enter>{String(index+1).padStart(2,"0")}</span>
          <div className="services-chapter-copy" data-services-enter><h3 data-services-heading>{title}</h3><ServiceDescription id={`${slug}-details`} summary={description} details={details} /><Link href="/contact" className="services-row-link" aria-label={`Discuss ${title}`}>Discuss this service <span className="service-arrow"><ArrowUpRight size={17} aria-hidden="true" /></span></Link></div>
          <div className="services-chapter-image" data-services-image><Image src={`/images/home/${image}.jpg`} alt={alt} fill sizes={feature ? "(min-width: 1440px) 620px, (min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 240px, 100vw"} /><span className="services-image-corner" aria-hidden="true" /></div>
        </article>)}</div>
      </Container>
    </section>
    <section id="working-process" tabIndex={-1} className="home-section services-process" aria-labelledby="process-title">
      <Container className="home-container"><div className="services-process-header"><HomeEyebrow>How we work</HomeEyebrow><h2 id="process-title" className="home-heading" data-services-heading>From First Conversation <br />to Final Handover.</h2></div>
        <ol className="services-process-track" data-services-process>{workingProcess.map(({title,description},index)=><li key={title} data-process-step><span className="services-process-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </Container>
    </section>
    <section className="home-section services-project-connection" aria-labelledby="project-connection-title">
      <Container className="home-container services-project-layout"><div className="services-project-copy" data-services-enter><HomeEyebrow>Explore the possibilities</HomeEyebrow><h2 id="project-connection-title" className="home-heading" data-services-heading>The work behind <br />the spaces.</h2><p>A closer look at spaces, materials and the ideas that bring them together.</p><Button href="/projects" className="home-button">Explore Our Projects <ArrowUpRight size={17} aria-hidden="true" /></Button></div>
        <figure className="services-project-figure"><div data-services-image><Image src="/images/home/cantilever-villa.jpg" alt="Architectural reference of a cantilevered residence and pool at dusk" fill sizes="(min-width: 1440px) 680px, (min-width: 1024px) 55vw, 100vw" /></div><figcaption><span>Architectural reference</span><ArrowUpRight size={14} aria-hidden="true" /></figcaption></figure>
      </Container>
    </section>
    <section className="home-section services-inquiry" aria-labelledby="inquiry-title">
      <Container className="home-container"><div className="services-inquiry-top"><HomeEyebrow>Let&apos;s begin</HomeEyebrow><span>Building Trust. Creating Spaces.</span></div><div className="services-inquiry-main"><h2 id="inquiry-title" className="home-heading" data-services-heading>Have a Project <br />in Mind?</h2><Link href="/contact" className="services-inquiry-arrow" aria-label="Discuss your project with BSJ Builders"><ArrowUpRight size={88} strokeWidth={1.1} aria-hidden="true" /></Link></div><div className="services-inquiry-bottom" data-services-enter><p>Let&apos;s discuss your construction or renovation requirements.</p><div><Button href="/contact" className="home-button">Discuss Your Project <ArrowUpRight size={17} aria-hidden="true" /></Button><Link href="/contact" className="services-text-link">Contact Us <ArrowRight size={16} aria-hidden="true" /></Link></div></div></Container>
    </section>
  </ServicesExperience>;
}
