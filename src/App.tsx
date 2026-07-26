import { useEffect } from "react";
import Header from "./components/Header";
import IntroAnimation from "./components/ui/scroll-morph-hero";
import Menu from "./components/Menu";
import Cerita from "./components/Cerita";
import Lokasi from "./components/Lokasi";
import Reservasi from "./components/Reservasi";
import Footer from "./components/Footer";
import { initSmoothScroll } from "./lib/smoothScroll";

export default function App() {
  useEffect(() => {
    const { cleanup } = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <>
      <Header />
      <main className="bg-ink">
        <section id="hero" className="relative h-[100svh] min-h-[600px] w-full">
          <IntroAnimation />
        </section>
        <Menu />
        <Cerita />
        <Lokasi />
        <Reservasi />
        <Footer />
      </main>
    </>
  );
}
