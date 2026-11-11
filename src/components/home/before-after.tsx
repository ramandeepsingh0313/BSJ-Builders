"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

export function BeforeAfter() {
  const [position, setPosition] = useState(48);
  const [dragging, setDragging] = useState(false);
  return <section className="home-section before-after" aria-labelledby="before-after-title">
    <div className="home-container before-after-layout"><div><p className="home-eyebrow">Detail in the finish</p><h2 id="before-after-title" className="home-heading">See the space <br />take shape.</h2><p className="before-after-copy">Move the divider to explore a construction-stage visual treatment and the finished space.</p><p className="before-after-note">Visual comparison using an approved project image.</p></div><div className={`before-after-frame ${dragging ? "is-dragging" : ""}`} style={{ "--comparison-position": `${position}%` } as CSSProperties}>
      <Image src="/images/home/interiors-after-hd.png" alt="Interior space shown with a visual before and after comparison" fill preload sizes="(min-width: 1024px) 58vw, 100vw" className="before-after-after" />
      <div className="before-after-before"><Image src="/images/home/interiors-before.png" alt="" fill preload sizes="(min-width: 1024px) 58vw, 100vw" aria-hidden="true" /></div>
      <div className="before-after-divider" aria-hidden="true"><i /><span>↔</span></div>
      <span className="before-after-label before">Before</span><span className="before-after-label after">After</span>
      <input aria-label="Move comparison divider" type="range" min="0" max="100" value={position} onPointerDown={() => setDragging(true)} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)} onChange={event => setPosition(Number(event.target.value))} />
    </div></div>
  </section>;
}
