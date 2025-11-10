import Hero from "../components/Hero";
import Founder from "../sections/Founder";
import Solutions from "../sections/Solutions";
import Products from "../sections/Products";
import Services from "../sections/Services";
import Trust from "../sections/Trust";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-6 -mt-20">
        <Founder />
        <Trust />
        <Solutions />
        <Products />
        <Services />
        <Contact />
      </div>
    </>
  );
}
