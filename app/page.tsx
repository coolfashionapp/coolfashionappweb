import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stylist from "@/components/Stylist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stylist />
      </main>
      <Footer />
    </>
  );
}
