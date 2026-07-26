import IntroAnimation from "../components/ui/scroll-morph-hero";
import MenuPreview from "../components/MenuPreview";
import Cerita from "../components/Cerita";
import Lokasi from "../components/Lokasi";
import Reservasi from "../components/Reservasi";

export default function Home() {
  return (
    <>
      <section id="hero" className="relative h-[100svh] min-h-[600px] w-full">
        <IntroAnimation />
      </section>
      <MenuPreview />
      <Cerita />
      <Lokasi />
      <Reservasi />
    </>
  );
}
