import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderSekarang from "./components/OrderSekarang";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import ScrollManager from "./lib/ScrollManager";
import { initSmoothScroll } from "./lib/smoothScroll";

export default function App() {
  useEffect(() => {
    const { cleanup } = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <Header />
      <main className="bg-ink">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
      <OrderSekarang />
    </BrowserRouter>
  );
}
