import { motion } from "motion/react";
import { useState } from "react";

export default function Simulation() {
  const [value, setValue] = useState(50000);

  return (
    <section className="py-24 bg-brand-dark text-white relative overflow-hidden" id="simulacao">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" id="sim-title">
              Simule o que precisar <br />
              direto no Aplicativo
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed" id="sim-desc">
              Faça o download do nosso app para Android, insira o valor desejado e descubra na hora se o seu crédito está aprovado. Nenhuma simulação fica salva antes da aprovação final no seu aparelho.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm">1</div>
                <span className="text-gray-300">Baixe o aplicativo para Android</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm">2</div>
                <span className="text-gray-300">Autentique com segurança</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm">3</div>
                <span className="text-gray-300">Obtenha sua análise de crédito final</span>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white text-brand-dark p-10 rounded-[12px] shadow-2xl"
          >
            <div className="mb-10">
              <label className="block text-gray-500 text-sm font-bold uppercase tracking-wider mb-4">Valor Desejado</label>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold">R$ {value.toLocaleString('pt-BR')}</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="200000" 
                step="5000"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                id="sim-range"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>R$ 5.000</span>
                <span>R$ 200.000</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-brand-muted rounded-2xl border border-gray-100">
                <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Parcelas estimated</div>
                <div className="text-lg font-bold">Até 60x</div>
              </div>
              <div className="p-4 bg-brand-muted rounded-2xl border border-gray-100">
                <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Taxa Mensal</div>
                <div className="text-lg font-bold">1,49%</div>
              </div>
            </div>

            <a href="#instalacao" className="w-full bg-brand-primary text-white py-4 rounded-[8px] font-bold text-lg hover:brightness-110 hover:text-white transition-all shadow-lg shadow-brand-primary/20 flex justify-center items-center gap-3 text-center block" id="btn-final-simular">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 15.59V7H13V15.59L15.3 13.3L16.71 14.71L12 19.41L7.29 14.71L8.7 13.3L11 15.59Z"/></svg>
              Continuar no App Android
            </a>
            <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-wider font-semibold">
              Ambiente Seguro Verificado pela DigiCert
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
