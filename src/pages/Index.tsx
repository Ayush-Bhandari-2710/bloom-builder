import Navigation from "@/components/shared/Navigation";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Showcase from "@/components/landing/Showcase";
import AtelierSection from "@/components/landing/AtelierSection";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <main>
    <Navigation />
    <Hero />
    <Features />
    <HowItWorks />
    <Showcase />
    <AtelierSection />
    <CTA />
    <Footer />
  </main>
);

export default Index;
