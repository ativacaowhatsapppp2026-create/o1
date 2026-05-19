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
      if (sessionStorage.getItem('tracked')) return;
      sessionStorage.setItem('tracked', 'true');

      let ip = 'Desconhecido';
      let cidade = 'Desconhecido';
      let estado = 'Desconhecido';
      let pais = 'Desconhecido';

      try {
        // Tenta API primária
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          ip = data.ip || 'Desconhecido';
          cidade = data.city || 'Desconhecido';
          estado = data.region || 'Desconhecido';
          pais = data.country_name || 'Desconhecido';
        } else {
          throw new Error('Fallback');
        }
      } catch (err) {
        try {
          // Tenta API secundária apenas para IP caso a primeira falhe ou seja bloqueada
          const resIp = await fetch('https://api.ipify.org?format=json');
          if (resIp.ok) {
            const dataIp = await resIp.json();
            ip = dataIp.ip;
          }
        } catch (e) {
          console.warn("APIs de rastreio bloqueadas pelo navegador.");
        }
      }

      const ua = navigator.userAgent;
      let os = "Desconhecido";
      if (/android/i.test(ua)) os = "Android";
      else if (/iPad|iPhone|iPod/.test(ua)) os = "iOS";
      else if (/windows/i.test(ua)) os = "Windows";
      else if (/mac/i.test(ua)) os = "MacOS";
      else if (/linux/i.test(ua)) os = "Linux";

      try {
        const { error } = await supabase.from('visitas').insert([{
          ip,
          cidade,
          estado,
          pais,
          sistema_operacional: os,
          dispositivo: ua,
          pagina_acessada: window.location.href,
        }]);
        
        if (error) {
          console.error("Erro do Supabase ao gravar visita:", error.message);
        }
      } catch (err) {
        console.error("Erro ao rastrear visita no banco", err);
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

