import { motion } from "motion/react";
import { Download, Settings, ShieldCheck, PlayCircle, Smartphone } from "lucide-react";

export default function InstallGuide() {
  return (
    <section className="py-24 bg-brand-muted relative overflow-hidden" id="instalacao">
      {/* Decorações visuais para reforçar confiança */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-brand-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <ShieldCheck className="w-5 h-5" /> Instalação 100% Segura e Verificada
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 tracking-tight"
          >
            Como instalar o App CrediSecure
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nosso aplicativo oferece tecnologia de ponta para analisar seu crédito em tempo real. Veja o vídeo ou siga os passos rápidos para instalação.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Coluna 1: Vídeo Tutorial */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/5 aspect-video border-[4px] border-white">
              {/* Substitua a URL src="https://www.youtube..." pelo link de embed do seu vídeo quando você o hospedar. */}
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&playsinline=1&modestbranding=1" 
                title="Tutorial de Instalação do Aplicativo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full outline-none"
              ></iframe>
            </div>
            <div className="mt-8 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-6">
              <h4 className="font-bold text-brand-dark mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-primary" /> 
                Por que instalar assim?
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Para garantir a privacidade máxima dos seus dados financeiros e oferecer taxas menores, distribuímos nosso app diretamente aos nossos clientes. Essa prática é <strong className="text-brand-dark">totalmente segura</strong> e reconhecida pelo sistema Android.
              </p>
            </div>
          </motion.div>

          {/* Coluna 2: Passo a Passo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            {/* Passo 1 */}
            <div className="flex gap-6 relative">
              <div className="absolute left-[27px] top-14 bottom-[-30px] w-0.5 bg-gray-200"></div>
              <div className="flex-shrink-0 w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center border-2 border-brand-primary z-10">
                <span className="text-xl font-black text-brand-primary">1</span>
              </div>
              <div className="pt-3">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Download className="w-5 h-5 text-brand-primary" /> Baixe o Aplicativo
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Toque no botão abaixo para baixar o arquivo de instalação (.apk) com a autorização da CrediSecure.
                </p>
                <a href="/CREDITA.apk" download className="bg-brand-dark text-white px-6 py-3 rounded-[8px] font-bold text-sm hover:text-white hover:bg-black transition-colors inline-flex items-center gap-2 shadow-lg w-max">
                  <Download className="w-4 h-4" /> 
                  Iniciar Download do APK (Seguro)
                </a>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="flex gap-6 relative">
               <div className="absolute left-[27px] top-14 bottom-[-30px] w-0.5 bg-gray-200"></div>
              <div className="flex-shrink-0 w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center border-2 border-gray-200 z-10 transition-colors">
                <span className="text-xl font-black text-gray-400">2</span>
              </div>
              <div className="pt-3">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-brand-primary" /> Permita "Origens Desconhecidas"
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ao abrir o arquivo, o Android pedirá confirmação. Clique em <strong>"Configurações"</strong> na janela que aparecer, e ative a opção <strong>"Permitir desta fonte"</strong> ou "Permitir aplicativos desconhecidos" para o seu navegador (Chrome, etc).
                </p>
                <div className="mt-3 bg-white p-3 rounded-lg border border-gray-100 text-xs text-gray-500 font-medium italic">
                  * Você pode desativar essa permissão depois de instalar nosso app.
                </div>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="flex gap-6 relative">
              <div className="flex-shrink-0 w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center border-2 border-green-500 z-10">
                <span className="text-xl font-black text-green-500">3</span>
              </div>
              <div className="pt-3">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-green-500" /> Clique em Instalar
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Volte para a tela anterior e clique em "Instalar". Abra o aplicativo e descubra na hora quanto você tem de limite aprovado!
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
