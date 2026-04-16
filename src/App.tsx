import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Security from "./components/Security";
import InstallGuide from "./components/InstallGuide";
import Simulation from "./components/Simulation";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Security />
        <InstallGuide />
        <Simulation />
      </main>
      <Footer />
    </div>
  );
}

