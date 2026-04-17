import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Security from "./components/Security";
import InstallGuide from "./components/InstallGuide";
import Simulation from "./components/Simulation";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  useEffect(() => {
    const trackVisit = async () => {
      // Check if already tracked this session to avoid infinite inserts in React StrictMode
      if (sessionStorage.getItem('tracked')) return;
      sessionStorage.setItem('tracked', 'true');

      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        
        const ua = navigator.userAgent;
        let os = "Desconhecido";
        if (/android/i.test(ua)) os = "Android";
        else if (/iPad|iPhone|iPod/.test(ua)) os = "iOS";
        else if (/windows/i.test(ua)) os = "Windows";
        else if (/mac/i.test(ua)) os = "MacOS";
        else if (/linux/i.test(ua)) os = "Linux";

        await supabase.from('visitas').insert([{
          ip: data.ip || 'Desconhecido',
          cidade: data.city || 'Desconhecido',
          estado: data.region || 'Desconhecido',
          pais: data.country_name || 'Desconhecido',
          sistema_operacional: os,
          dispositivo: ua,
          pagina_acessada: window.location.href,
        }]);
      } catch (err) {
        console.error("Erro ao rastrear visita", err);
      }
    };
    trackVisit();
  }, []);

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

