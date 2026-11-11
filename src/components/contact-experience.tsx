"use client";
import { useRef,type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap,useGSAP } from "@/lib/motion/core";
gsap.registerPlugin(ScrollTrigger,SplitText);
export function ContactExperience({children}:{children:ReactNode}) { const root=useRef<HTMLDivElement>(null); useGSAP(()=>{const e=root.current;if(!e)return;const m=gsap.matchMedia();m.add({motion:"(prefers-reduced-motion: no-preference)",desktop:"(min-width:1024px)"},c=>{if(!c.conditions?.motion)return;const s:SplitText[]=[];const h=e.querySelector<HTMLElement>("[data-contact-title]");if(h)s.push(SplitText.create(h,{type:"lines,words",mask:"lines",aria:"auto",onSplit(x){return gsap.from(x.words,{yPercent:110,opacity:0,stagger:.05,duration:.85,ease:"power3.out",clearProps:"transform,opacity"})}}));gsap.from(e.querySelectorAll("[data-contact-hero]"),{y:18,opacity:0,stagger:.1,duration:.7,clearProps:"transform,opacity"});e.querySelectorAll<HTMLElement>("[data-contact-enter]").forEach(x=>gsap.from(x,{y:c.conditions?.desktop?28:14,opacity:0,duration:.7,clearProps:"transform,opacity",scrollTrigger:{trigger:x,start:"top 90%",once:true}}));return()=>s.forEach(x=>x.revert())},root);return()=>m.revert()},{scope:root});return <div ref={root} className="bsj-home contact-page">{children}</div> }
