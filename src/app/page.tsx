import { HomeExperience } from "@/components/home/home-experience";
import { Suspense } from "react";
import { BeforeAfter } from "@/components/home/before-after";
import { HomeHero, CompanyStory, ServicesOverview, FeaturedProjects, StructuralTrust, ClientTestimonial, Leadership, ContactEstimate } from "@/components/home/homepage";
import "./home.css";
import "./home-editorial.css";

export default function Home() {
  return <HomeExperience>
    <HomeHero /><CompanyStory /><ServicesOverview /><FeaturedProjects /><BeforeAfter />
    <StructuralTrust /><Suspense fallback={null}><ClientTestimonial /></Suspense><Leadership /><ContactEstimate />
  </HomeExperience>;
}
