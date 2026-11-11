import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SiteChrome } from "@/components/home/site-chrome";
import { HomeHeader, HomeFooter } from "@/components/home/home-chrome";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
export const metadata: Metadata = {
  title: { default: "BSJ Builders | Building Trust. Creating Spaces.", template: "%s | BSJ Builders" },
  description: "BSJ Builders, a construction and contracting company in Punjab, India. Building Trust. Creating Spaces.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-IN" suppressHydrationWarning className={`${inter.variable} ${manrope.variable} antialiased`}>
    <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("bsj-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch{document.documentElement.dataset.theme="dark"}` }} /></head>
    <body className="flex min-h-dvh flex-col">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteChrome home={<HomeHeader />} about={<HomeHeader page="about" />} services={<HomeHeader page="services" />} projects={<HomeHeader page="projects" />} contact={<HomeHeader page="contact" />} standard={<Header />} /><main id="main-content" tabIndex={-1} className="flex-1">{children}</main><SiteChrome home={<HomeFooter />} about={<HomeFooter innerPage />} services={<HomeFooter innerPage />} projects={<HomeFooter innerPage />} contact={<HomeFooter innerPage />} standard={<Footer />} />
    </body>
  </html>;
}
