import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const appFeatures = [
  {
    id: "analise-rapida",
    title: "Análise de Crédito Smart",
    description: "Verificação de crédito instantânea e segura pelo seu celular.",
    image: "https://images.ctfassets.net/n3x4bsh5l2so/3CsU8vyAubCirJLupcm5c3/9303b710a7abe5bdc5d2ea3686d88414/emprestimo-garantia-veiculo.jpg",
    tag: "Instalação Rápida"
  },
  {
    id: "simulador-integrado",
    title: "Simulador de Score Integrado",
    description: "Descubra rapidamente se o seu score aprova sua próxima compra.",
    image: "https://images.ctfassets.net/n3x4bsh5l2so/72sSXaQ0VnOyYu1hMQjrif/4f3c3b5b4d250273dc85f536b783e893/emprestimo-garantia-imovel.jpg",
    tag: "Resultado na Hora"
  },
  {
    id: "limite-imediato",
    title: "Limite Pré-aprovado",
    description: "Saiba quanto você tem disponível para uso em poucos toques.",
    image: "https://images.ctfassets.net/n3x4bsh5l2so/5N8HQtfpmwil3jvERUq5Rx/14be87972f40c5466ba301426c1c8c91/emprestimo-consignado.jpg",
    tag: "Notificação Ativa"
  }
];

export default function Products() {
  return (
    <section className="py-24 bg-brand-muted" id="solucoes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 tracking-tight"
            id="products-title"
          >
            Tudo que você precisa pelo App
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" id="products-subtitle">
            Baixe o aplicativo para ter acesso imediato ao seu score, confirmar seu limite de crédito e solicitar avaliação inteligente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {appFeatures.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-[12px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-t-4 hover:border-brand-primary transition-all group cursor-pointer border-t-4 border-transparent"
              id={`product-card-${product.id}`}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  id={`product-img-${product.id}`}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                  {product.tag}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-brand-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center text-brand-dark font-bold text-sm">
                  Baixe e confira no app <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
