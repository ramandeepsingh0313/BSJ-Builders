"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/motion/core";

type ServiceDescriptionProps = {
  id: string;
  summary: string;
  details: string;
};

export function ServiceDescription({ id, summary, details }: ServiceDescriptionProps) {
  const root = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [renderDetails, setRenderDetails] = useState(false);

  useGSAP(() => {
    const content = detailsRef.current;
    if (!content) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(content);

    if (expanded) {
      if (reducedMotion) {
        gsap.set(content, { clearProps: "height,opacity" });
        return;
      }
      gsap.fromTo(content, { height: 0, opacity: 0 }, {
        height: "auto", opacity: 1, duration: 0.42, ease: "power2.out", clearProps: "height,opacity",
      });
      return;
    }

    if (!renderDetails) return;
    if (reducedMotion) {
      setRenderDetails(false);
      return;
    }
    gsap.to(content, {
      height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut",
      onComplete: () => setRenderDetails(false),
    });
  }, { scope: root, dependencies: [expanded, renderDetails], revertOnUpdate: true });

  const toggle = () => {
    if (expanded) setExpanded(false);
    else {
      setRenderDetails(true);
      setExpanded(true);
    }
  };

  return <div className="service-description" ref={root}>
    <p className="service-summary">{summary}</p>
    {renderDetails && <div id={id} ref={detailsRef} className="service-details"><p>{details}</p></div>}
    <button type="button" className="service-details-toggle" aria-expanded={expanded} aria-controls={id} onClick={toggle}>
      <span>{expanded ? "Read less" : "Read more"}</span><i aria-hidden="true" />
    </button>
    <noscript><p className="service-details-noscript">{details}</p></noscript>
  </div>;
}
