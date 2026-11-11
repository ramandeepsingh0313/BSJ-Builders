import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Building2, KeyRound, Clock, Compass, BadgeCheck, Ruler, ShieldCheck, UsersRound, ReceiptText, MapPin, Eye, DraftingCompass, Globe, Star, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TestimonialSlider } from "./testimonial-slider";
import { Button } from "@/components/ui/button";
import { EstimatePanel } from "./estimate-panel";

const asset = (name: string) => `/images/home/${name}.jpg`;
export function HomeEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="home-eyebrow">{children}</p>;
}
function Photo({ name, alt, className = "", preload = false }: { name: string; alt: string; className?: string; preload?: boolean }) {
  return <div className={`home-photo ${className}`} data-image-reveal>
    <Image src={asset(name)} alt={alt} fill preload={preload} sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" />
  </div>;
}
function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return <span className="home-icon"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>;
}
export function HomeHero() {
  const values = [
    { icon: Building2, eyebrow: "01 / Structural", title: "Groundwork & Civil Mastery", description: "Lab-tested seismic foundations, heavy retaining structures, and precision RCC grade beams engineered for lifelong structural stability." },
    { icon: KeyRound, eyebrow: "02 / Turnkey", title: "100% Single-Sourced Execution", description: "From soil deep piling, architectural sanctioning, to imported Italian marble finishing—managed under one contractual roof." },
    { icon: Clock, eyebrow: "03 / Reliability", title: "Guaranteed Timelines & BOQ", description: "Zero hidden escalations. Fixed milestone schedules with transparent digital procurement logs and chartered survey verifications." },
  ];
  return <section tabIndex={-1} id="home" aria-labelledby="hero-heading" className="home-hero">
    <div className="hero-background" aria-hidden="true"><Image src={asset("hero")} alt="" fill preload sizes="100vw" /></div>
    <Container className="home-container hero-content">
      <p className="home-eyebrow hero-eyebrow" data-hero-item><i />Premier architectural &amp; turnkey civil engineering • Punjab</p>
      <h1 id="hero-heading" data-hero-heading>Shaping future <br /><span className="hero-accent">through excellence.</span></h1>
      <p className="hero-description" data-hero-item>Specialized civil contracting, high-grade structural engineering, and bespoke luxury residential &amp; commercial landmarks across Sangrur, Patiala, Ludhiana, and Chandigarh Tricity.</p>
      <div className="hero-actions" data-hero-item>
        <Button href="#contact" className="home-button">Discuss your project <span className="button-orb"><ArrowUpRight size={18} aria-hidden="true" /></span></Button>
        <Button href="#projects" variant="outline" className="home-button secondary">Explore Portfolio <Eye size={16} aria-hidden="true" /></Button>
      </div>
      <div className="hero-values">{values.map(({icon:Icon,eyebrow,title,description}) => <article key={title} className="value-panel" data-hero-item>
        <div className="value-top"><IconBadge icon={Icon} /><span>{eyebrow}</span></div><h2>{title}</h2><p>{description}</p>
      </article>)}</div>
    </Container>
  </section>;
}
export function CompanyStory() {
  const metrics = [
    { label:"Civil groundwork", value:"12+", description:"Years of continuous engineering excellence and on-time site completion in Punjab.", icon:Building2 },
    { label:"Total built space", value:"350K+", description:"Square feet of luxury villas, commercial showrooms & institutional campuses delivered.", icon:Ruler },
    { label:"Quality verification", value:"100%", description:"In-house structural QA/QC cube compression tests & non-destructive concrete scanning.", icon:ShieldCheck },
    { label:"Standard integrity", value:"ZERO", description:"Compromise policy on mill-certified Fe-550D TMT steel and M25/M30 concrete mixes.", icon:CheckCircle2 },
  ];
  return <section tabIndex={-1} id="about" aria-labelledby="about-heading" className="home-section home-story">
    <Container className="home-container">
      <div className="story-header">
        <div><HomeEyebrow>01 • Civil engineering authority</HomeEyebrow><h2 id="about-heading" className="home-heading" data-split-heading>The largest privately held civil contracting firm in Malwa.</h2></div>
        <div className="story-intro" data-section-reveal><p>Headquartered in Sangrur, BSJ Builders bridges rigorous institutional structural discipline with architectural luxury. We engineer residences, commercial plazas, and infrastructural spaces that withstand generations.</p>
          <div className="vision-grid"><div><h3><Compass size={16} aria-hidden="true" />Our vision</h3><p>Setting the gold benchmark for honest civil contracting across the northern corridor.</p></div>
            <div><h3><BadgeCheck size={16} aria-hidden="true" />Our mission</h3><p>Absolute structural zero-compromise with certified steel, tested aggregates, and transparent billing.</p></div></div>
        </div>
      </div>
      <div className="story-mosaic">
        <div className="story-portrait" data-section-reveal><Photo name="site-engineers" alt="Engineers reviewing construction plans at a concrete foundation site" />
          <div className="site-quote"><div><strong><i />On-site directorship</strong><span>Est. Sangrur 2012</span></div>
            <p>&quot;Real estate value is forged not in brochures, but deep underground in the rebar and batching ratios.&quot;</p><p className="quote-signature">— Er. B. S. Jawandha</p>
          </div>
        </div>
        <div className="metrics-grid">{metrics.map(({label,value,description,icon:Icon},i) => <article className={`metric-panel ${i===3 ? "metric-photo" : ""}`} key={label} data-section-reveal>
          {i===3 && <Image src={asset("blueprints")} fill sizes="(min-width: 768px) 25vw, 50vw" alt="" />}
          <div className="metric-content"><div className="metric-label"><h3>{label}</h3><Icon size={16} aria-hidden="true" /></div><p className="metric-number">{value}</p><p>{description}</p></div>
        </article>)}</div>
      </div>
    </Container>
  </section>;
}
const services = [
  {title:"Residential Kothis & Luxury Villas", description:"Monumental architectural residential construction with expansive cantilevers, double-height atriums...", image:"residential", alt:"Luxury residence with a landscaped entrance at dusk"},
  {title:"Commercial Plazas & Retail Hubs", description:"High-traffic retail showrooms, institutional complexes, and multistory commercial buildings...", image:"commercial", alt:"Illuminated commercial retail plaza"},
  {title:"Deep Foundations & Heavy Civil Works", description:"Deep bore piling, soil stabilizing retaining walls, industrial grade slabs, and seismic-resistant...", image:"foundations", alt:"Deep foundation drilling rig and construction crew"},
  {title:"Turnkey Architectural Interior Finishing", description:"Bespoke teak millwork, imported book-matched Italian marble, acoustic false ceilings, concealed VRV HVAC ducting, and automated ambient lighting arrays.", image:"interiors", alt:"Contemporary living room with marble flooring and bespoke joinery", wide:true},
  {title:"Structural Retrofitting & Heritage Overhauls", description:"Carbon fiber wrapping, load-bearing column augmentation, beam jacketing, and facade...", image:"retrofitting", alt:"Glass-fronted building at a city street corner"},
];
export function ServicesOverview() {
  return <section tabIndex={-1} id="services" aria-labelledby="services-heading" className="home-section home-services services-redesign"><Container className="home-container">
    <div className="discipline-header"><div><HomeEyebrow>02 • Core disciplines</HomeEyebrow><h2 id="services-heading" className="home-heading" data-split-heading>Take a look at some of the services we offer</h2></div><p>End-to-end architectural engineering, seismic civil execution, and turnkey luxury contracting under rigorous engineering control.</p></div>
    <div className="services-editorial" data-service-gallery>
      <div className="discipline-stage" aria-hidden="true">
        <div className="discipline-stage-top"><span>Our expertise</span><span>01 — 05</span></div>
        <div className="discipline-image-stack">
          {services.map(({image,title}, index) => <div key={image} className="discipline-preview" data-gallery-panel>
            <Image src={asset(image)} alt="" fill sizes="(min-width: 1280px) 500px, 45vw" />
            <div className="discipline-preview-caption"><span>{String(index+1).padStart(2,"0")} / 05</span><p>{title}</p></div>
          </div>)}
          <span className="drawing-corner corner-top" /><span className="drawing-corner corner-bottom" />
        </div>
        <div className="discipline-stage-bottom"><span>BSJ Builders</span><span>Building Trust. Creating Spaces.</span></div>
      </div>
      <div className="discipline-list">{services.map(({title,description,image,alt,wide}, index) => <Link href="/services" key={title} className="discipline-row" data-service data-section-reveal data-active={index === 0 ? "true" : "false"}>
        <span className="discipline-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
        <div className="service-copy"><div className="service-title"><h3>{title}</h3><span className="service-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span></div><p>{description}</p>
          {wide && <div className="material-tags"><span>Italian Statuario</span><span>Acoustic Drywall</span><span>Custom Joinery</span></div>}
          <Photo name={image} alt={alt} className="discipline-thumbnail" />
        </div>
      </Link>)}</div>
    </div>
    <p className="service-note">Need custom structural specifications or blueprinted BOQ? <Link href="#contact">Request On-Site Technical Audit <ArrowRight size={14} aria-hidden="true" /></Link></p>
  </Container></section>;
}
export function FeaturedProjects() {
  return <section tabIndex={-1} id="projects" aria-labelledby="projects-heading" className="home-section home-projects projects-redesign"><Container className="home-container">
    <div className="projects-header"><div><HomeEyebrow>03 • Featured commissions</HomeEyebrow><h2 id="projects-heading" className="home-heading" data-split-heading>Innovative designs, lasting impressions</h2></div><p>Explore recent turnkey deliveries spanning Sangrur, Patiala, and the wider Malwa industrial and residential corridor.</p></div>
    <div className="project-stories">
      <article className="project-story" data-project-story>
        <div className="project-copy" data-section-reveal><div className="project-index"><span>01</span><i /><strong>Commercial flagship</strong></div>
          <p className="project-location"><MapPin size={14} aria-hidden="true" />Sangrur, Punjab • Nabha Gate Corridor</p><h3>Punjab Junction<br />Flagship Store</h3>
          <p>Complete turnkey civil overhaul and luxury commercial finishing for a premier multi-level fashion retail landmark. Engineered with heavy load floor plates, seamless double-glazed curtain walls, and central climate automation.</p>
          <dl className="project-facts"><div><dt>Scope</dt><dd>Turnkey Civil</dd></div><div><dt>Area</dt><dd>14,500 Sq. Ft.</dd></div><div><dt>Delivery</dt><dd>14 Days Early</dd></div></dl>
          <Link className="small-link" href="/projects">View Engineering Case Brief <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="project-visual"><span className="project-watermark" aria-hidden="true">01</span><Photo name="punjab-junction" alt="Punjab Junction flagship retail building design" /><span className="photo-label"><i />Active Commercial Landmark</span></div>
      </article>
      <article className="project-story project-reverse" data-project-story>
        <div className="project-copy" data-section-reveal><div className="project-index"><span>02</span><i /><strong>Residential estate</strong></div>
          <p className="project-location"><MapPin size={14} aria-hidden="true" />Patiala Road Enclave, Sangrur</p><h3>The Cantilevered Villa 09</h3>
          <p>A private 9,200 sq. ft. modern sanctuary defined by massive 18-foot unpropped cantilevered slabs, subterranean home theatre, post-tensioned beam geometry, and automated smart-climate thermal glass envelope.</p>
          <dl className="project-facts"><div><dt>Typology</dt><dd>Custom Kothi</dd></div><div><dt>Duration</dt><dd>14 Months</dd></div><div><dt>Certification</dt><dd>Seismic Zone IV</dd></div></dl>
          <Link className="small-link" href="#contact">Request Architectural Floorplan <ArrowRight size={15} aria-hidden="true" /></Link>
        </div><div className="project-visual"><span className="project-watermark" aria-hidden="true">02</span><Photo name="cantilever-villa" alt="Cantilevered villa with an illuminated terrace and swimming pool" /><span className="photo-label"><i />Private Residential Commission</span></div>
      </article>
    </div>
  </Container></section>;
}
export function StructuralTrust() {
  const reasons = [
    {icon:ShieldCheck,title:"Direct Mill Sourcing & Tested Aggregates",description:"We eliminate intermediaries. Rebar procured directly from Tata Tiscon & Jindal Steel; high-grade 53 OPC cement direct from UltraTech batching plants with accompanying digital test certificates."},
    {icon:UsersRound,title:"In-House Civil Engineers, No Sub-Contractor Markup",description:"All structural shuttering, bar-bending schedules, and concrete curing are directly supervised by certified civil engineering graduates—not handed over to unaccountable subcontractors."},
    {icon:ReceiptText,title:"Digital Milestone BOQs & Zero Hidden Costs",description:"Every gram of reinforcement and every bag of cement is tracked in a transparent digital dashboard. You pay strictly against mutually signed civil milestones."},
  ];
  return <section aria-labelledby="trust-heading" className="home-section home-trust trust-redesign"><Container className="home-container trust-grid">
    <div className="trust-photo" data-section-reveal><Photo name="trust-engineers" alt="Two engineers in hard hats standing at a building site" /><div className="trust-rating"><span className="rating-number">4.9<Star size={15} aria-hidden="true" /></span><div><div className="rating-avatars" aria-hidden="true"><span>PB</span><span>SG</span><span>LD</span></div><strong>180+ Completed Handheld Audits</strong><p>100% On-Time Punjab Project Delivery</p></div></div></div>
    <div><HomeEyebrow>04 • Structural trust</HomeEyebrow><h2 id="trust-heading" className="home-heading" data-split-heading>What makes us <br />different</h2><p className="trust-intro">It is not just about erecting walls; it is about engineering lifetime generational security with unmatched transparency and civil accountability.</p>
      <div className="trust-reasons">{reasons.map(({icon,title,description}, index) => <article key={title} data-section-reveal><span className="trust-step-index" aria-hidden="true">{String(index+1).padStart(2,"0")}</span><IconBadge icon={icon} /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </div>
  </Container></section>;
}
export function ClientTestimonial() {
  return <TestimonialSlider />;
}
export function Leadership({ eyebrow = "05 • Principals & engineers" }: { eyebrow?: string } = {}) {
  const people = [
    {image:"jawandha",name:"Er. B. S. Jawandha",role:"Managing Director & Chief Engineer",description:"B.Tech Civil Engineering with over 15 years leading major RCC infrastructure, commercial developments, and luxury residences in Punjab.",icon:BadgeCheck},
    {image:"gurpreet",name:"Gurpreet Singh",role:"Head of Structural Execution",description:"Expert in high-density rebar framing, precision formwork alignment, and on-site batch quality management across all active commissions.",icon:DraftingCompass},
    {image:"harpreet",name:"Harpreet Kaur",role:"Head of Interior Architecture",description:"Leads turnkey spatial ergonomics, Italian stonework installations, lighting simulations, and bespoke woodcraft coordination.",icon:Globe},
  ];
  return <section tabIndex={-1} id="leadership" aria-labelledby="leadership-heading" className="home-section home-leadership"><Container className="home-container">
    <div className="centered-heading"><HomeEyebrow>{eyebrow}</HomeEyebrow><h2 id="leadership-heading" className="home-heading" data-split-heading>Executive leadership</h2><p>Driven by seasoned civil engineers and architectural visionaries rooted in the Malwa heartland.</p></div>
    <div className="leadership-grid">{people.map(({image,name,role,description,icon}) => <article key={name} className="leader-panel" data-section-reveal><div className="leader-portrait"><Photo name={image} alt={name} /><IconBadge icon={icon} /></div><p className="leader-role">{role}</p><h3>{name}</h3><p>{description}</p></article>)}</div>
  </Container></section>;
}
export function ContactEstimate() {
  return <section tabIndex={-1} id="contact" aria-labelledby="estimate-heading" className="home-section home-contact"><Container className="home-container"><EstimatePanel /></Container></section>;
}
