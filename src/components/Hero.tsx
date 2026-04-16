import { motion } from "motion/react";
import { ShieldCheck, Zap, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[420px] flex items-center bg-gradient-to-br from-[#00875a] to-[#00a36c] overflow-hidden" id="hero">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-15 lg:px-15 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-xl"
          >
            <h1 className="text-5xl md:text-[48px] font-bold text-white leading-[1.1] mb-6 tracking-tight" id="hero-title">
              Seu limite aprovado na palma da mão. Baixe o App.
            </h1>
            
            <p className="text-lg text-white opacity-90 mb-8 font-normal leading-relaxed" id="hero-description">
              Descubra na hora se você tem o score necessário para sua próxima compra. Instale nosso aplicativo Android e complete sua análise de crédito em 2 minutos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#instalacao" className="bg-white text-brand-primary px-10 py-4 rounded-[8px] text-lg font-bold hover:scale-105 hover:text-brand-primary transition-transform shadow-lg flex items-center justify-center gap-3" id="btn-hero-simular">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 15.59V7H13V15.59L15.3 13.3L16.71 14.71L12 19.41L7.29 14.71L8.7 13.3L11 15.59Z"/></svg>
                Baixar App para Android
              </a>
            </div>
          </motion.div>

          <div className="flex-1 flex justify-center items-center">
            <div className="w-[240px] h-[380px] bg-[#111] border-[8px] border-[#333] rounded-[36px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex flex-col">
              <div className="h-5 bg-[#111] flex justify-center pt-1.5">
                <div className="w-15 h-1.5 bg-[#222] rounded-full"></div>
              </div>
              <div className="flex-1 bg-white p-5 text-brand-dark">
                <div className="font-bold text-xs mb-4 uppercase tracking-tighter">Status da Instalação</div>
                <div className="h-2 w-full bg-[#eee] rounded-full mb-2.5 overflow-hidden">
                  <div className="h-full w-[100%] bg-brand-primary rounded-full"></div>
                </div>
                <div className="text-[10px] text-[#888] mb-5">App Pronto para Analisar Score</div>
                <div className="border border-dashed border-[#ccc] p-2.5 rounded-[4px]">
                  <div className="text-[9px] font-bold">Android 10+ Suportado</div>
                  <div className="text-[8px] text-[#999]">Download Seguro Verificado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
