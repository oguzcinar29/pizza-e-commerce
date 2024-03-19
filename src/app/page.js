import AboutUsSection from "@/components/Home/AboutUsSection";
import BestSellerSection from "@/components/Home/BestSellerSection";
import ContactUsSection from "@/components/Home/ContactUsSection";
import HeroSection from "@/components/Home/HeroSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <BestSellerSection />
      <AboutUsSection />
      <ContactUsSection />
    </div>
  );
}
