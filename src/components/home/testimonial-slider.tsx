"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const testimonials: readonly { quote: string; name: string; role: string }[] = [
  {
    quote: "The process felt organised from the first conversation through to the finishing details. Every decision was explained clearly and the site remained well managed.",
    name: "Residential client",
    role: "Home construction project",
  },
  {
    quote: "We needed a team that could coordinate the work carefully without disrupting our day-to-day operations. The communication and planning gave us confidence at every stage.",
    name: "Commercial client",
    role: "Commercial fit-out project",
  },
  {
    quote: "What stood out was the attention to the details that make a space feel complete. The team listened to what we needed and kept the process straightforward.",
    name: "Renovation client",
    role: "Residential renovation project",
  },
  {
    quote: "The site was handled with discipline, clear updates and a practical approach to solving issues as the work progressed. It made the experience much easier to navigate.",
    name: "Project client",
    role: "Construction project",
  },
];

export function TestimonialSlider() {
  const slider = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleSlides = testimonials.length > 1;

  if (!testimonials.length) return <section tabIndex={-1} id="testimonials" aria-labelledby="testimonial-heading" className="home-testimonial">
    <div className="testimonial-grid" aria-hidden="true" /><div className="testimonial-orbit" aria-hidden="true" />
    <div className="home-container testimonial-shell"><div className="testimonial-top"><span>Project conversations</span><span>BSJ Builders</span></div><div className="testimonial-slide testimonial-empty"><span className="testimonial-quote-mark" aria-hidden="true"><Quote /></span><h2 id="testimonial-heading">Every project begins with a clear conversation about the space ahead.</h2><p>Verified client perspectives will be added when they are approved for publication.</p></div></div>
  </section>;
  return <section tabIndex={-1} id="testimonials" aria-labelledby="testimonial-heading" className="home-testimonial">
    <div className="testimonial-grid" aria-hidden="true" />
    <div className="testimonial-orbit" aria-hidden="true" />
    <div className="home-container testimonial-shell">
      <div className="testimonial-top" data-section-reveal><span>Client perspective</span><span>{String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span></div>
      <Swiper className="testimonial-swiper" modules={[A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination]} effect="fade" fadeEffect={{ crossFade: true }} speed={850} slidesPerView={1} loop={hasMultipleSlides} autoplay={hasMultipleSlides ? { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true } : false} allowTouchMove={hasMultipleSlides} keyboard={{ enabled: hasMultipleSlides }} onSwiper={instance => { slider.current = instance; }} onSlideChange={instance => setActiveIndex(instance.realIndex)}>
        {testimonials.map((testimonial, index) => <SwiperSlide key={testimonial.name}>
          <figure className="testimonial-slide" aria-label={`Testimonial from ${testimonial.name}`}>
            <span className="testimonial-quote-mark" aria-hidden="true"><Quote /></span>
            <blockquote id={index === 0 ? "testimonial-heading" : undefined}>&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <figcaption><strong>{testimonial.name}</strong><span>{testimonial.role}</span></figcaption>
          </figure>
        </SwiperSlide>)}
      </Swiper>
      <div className="testimonial-controls" data-section-reveal>
        <div className="testimonial-progress" aria-hidden="true"><i style={{ transform: `scaleX(${(activeIndex + 1) / testimonials.length})` }} /></div>
        <div className="testimonial-buttons"><button type="button" onClick={() => slider.current?.slidePrev()} disabled={!hasMultipleSlides} aria-label="Previous testimonial"><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" onClick={() => slider.current?.slideNext()} disabled={!hasMultipleSlides} aria-label="Next testimonial"><ArrowRight size={18} aria-hidden="true" /></button></div>
      </div>
    </div>
  </section>;
}
