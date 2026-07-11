import { Hero } from "./components/Hero";
import { TrustLogos } from "./components/TrustLogos";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Products } from "./components/Products";
import { Awards } from "./components/Awards";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <Stats />
      <Services />
      <Products />
      <Awards />
    </>
  );
}
