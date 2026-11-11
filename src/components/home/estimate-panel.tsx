"use client";
import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EstimatePanel() {
  const id = useId();
  const [area, setArea] = useState(4500);
  const [project, setProject] = useState("residential");
  const [status, setStatus] = useState("");
  const lakh = (rate: number) => (area * rate / 100000).toLocaleString("en-IN", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  function requestEstimate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${String(data.get("name"))}\nMobile: ${String(data.get("phone"))}\nProject: ${project === "residential" ? "Luxury Kothi / Villa" : "Commercial build"}\nRegion: Sangrur & Immediate Malwa Belt\nBuilt-up area: ${area.toLocaleString("en-IN")} sq. ft.\n\nPlease contact me to arrange a site audit and a detailed quotation.`;
    window.location.href = `mailto:projects@bsjbuilders.in?subject=${encodeURIComponent("BSJ Builders — Site audit enquiry")}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app has been requested to open an enquiry draft. Review and send it there. Nothing has been submitted by this website.");
  }
  return <div className="estimate-panel" data-section-reveal>
    <div className="centered-heading"><p className="home-eyebrow">06 • Instant estimate engine</p>
      <h2 id="estimate-heading" className="home-heading" data-split-heading>Get an instant estimate for your residential or commercial build</h2>
      <p>Select your structural requirements to generate an approximate civil budget range benchmarked for Punjab standards.</p>
    </div>
    <form action="mailto:projects@bsjbuilders.in" method="post" encType="text/plain" onSubmit={requestEstimate}>
      <div className="estimate-fields">
        <div><label htmlFor={`${id}-project`}>Project typology</label><select id={`${id}-project`} value={project} onChange={event=>setProject(event.target.value)}><option value="residential">Luxury Kothi / Villa (Turnkey Full Finish)</option><option value="commercial">Commercial build — detailed quotation</option></select></div>
        <div><label htmlFor={`${id}-region`}>Site region in Punjab</label><select id={`${id}-region`}><option>Sangrur &amp; Immediate Malwa Belt</option></select></div>
      </div>
      <div className="area-control"><div><label htmlFor={`${id}-area`}>Estimated built-up area</label><output htmlFor={`${id}-area`}>{area.toLocaleString("en-IN")} Sq. Ft.</output></div>
        <input id={`${id}-area`} type="range" min={1500} max={20000} step={100} value={area} onChange={event=>setArea(Number(event.target.value))} aria-valuetext={`${area} square feet`} />
        <div className="range-labels"><span>1,500 Sq. Ft. (Compact Residence)</span><span>10,000 Sq. Ft.</span><span>20,000+ Sq. Ft. (Expansive Commercial / Estate)</span></div>
      </div>
      <div className="estimate-output">
        <div><h3>Estimated turnkey civil budget bracket</h3><p className="budget" aria-live="polite" aria-atomic="true">{project === "residential" ? `₹${lakh(1900)} Lakh – ₹${lakh(2300)} Lakh` : "Let's discuss your project"}</p>
          <p>{project === "residential" ? "Includes Lab-Tested Foundations, Fe-550D TMT, Certified Concrete & Supervisory BOQ" : "Commercial requirements are reviewed individually following a site consultation."}</p></div>
        <a href="tel:+918544960313" className="home-phone"><Phone size={18} aria-hidden="true" />+91 8544960313</a>
      </div>
      <p className="estimate-disclaimer">Indicative design estimate only. Final scope and pricing require a site assessment and written quotation.</p>
      <div className="enquiry-fields">
        <div><label htmlFor={`${id}-name`}>Your full name</label><input id={`${id}-name`} name="name" autoComplete="name" placeholder="Your name" required maxLength={100} /></div>
        <div><label htmlFor={`${id}-phone`}>Direct mobile / WhatsApp</label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" required pattern="[+]?[0-9 ]{10,20}" maxLength={20} /></div>
        <Button type="submit" className="home-button">Request site audit <ArrowRight size={17} aria-hidden="true" /></Button>
      </div>
      <p className="enquiry-help">Opens your email app with an enquiry draft. You choose when to send. Or <a href="mailto:projects@bsjbuilders.in">email us directly</a>.</p>
      <p role="status" className="enquiry-status">{status}</p>
    </form>
  </div>;
}
