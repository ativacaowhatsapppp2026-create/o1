import { motion } from "motion/react";
import { Shield, Lock, EyeOff, CheckCircle2 } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Proteção de Nível Bancário",
    description: "Seus dados são protegidos por criptografia AES-256 bits, o padrão ouro do mercado financeiro."
  },
  {
    icon: Lock,
    title: "Zero Compartilhamento",
    description: "Nunca vendemos ou compartilhamos seus dados com terceiros sem sua autorização expressa."
  },
  {
    icon: EyeOff,
    title: "Privacidade by Design",
    description: "Nossos sistemas são construídos para acessar apenas o necessário para sua análise de crédito."
  }
];

export default function Security() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="seguranca">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 mb-16 lg:mb-0"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight leading-tight" id="security-title">
              Sua análise 100% segura e <br className="hidden md:block" /> 
              privada, direto no seu celular.
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed" id="security-desc">
              O aplicativo Android CrediSecure utiliza as mais modernas tecnologias de segurança bancária. Faça o download, simule e contrate com total tranquilidade, garantindo o controle total das suas informações em todas as etapas da liberação.
            </p>

            <div className="space-y-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-[12px] bg-brand-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center p-4 bg-brand-muted rounded-2xl border border-gray-100 italic text-sm text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0" />
              "Respeitamos integralmente a LGPD, garantindo o controle total sobre suas informações."
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="lg:w-1/2 relative flex justify-center"
          >
            {/* Background decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/10 rounded-full blur-2xl -z-10"></div>
            
            <img 
              src="https://www.creditas.com/images/iphone-shape.png" 
              alt="Simulation in App" 
              className="w-full max-w-[450px] drop-shadow-2xl h-auto"
              referrerPolicy="no-referrer"
              id="security-phone-img"
            />
            
            {/* Overlay indicators */}
            <div className="absolute top-1/4 -left-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-50 max-w-[200px]">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-gray-800 uppercase tracking-tighter">Análise Realizada</span>
            </div>

            <div className="absolute bottom-1/4 -right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 max-w-[200px]">
              <Lock className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-bold text-gray-800">Conexão Criptografada</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
