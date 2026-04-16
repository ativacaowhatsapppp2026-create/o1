import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <img 
              src="https://assets.creditas.com/microfrontends/prod/website-assets/logotipos/1.0.0/creditas/primary_logo_without_background.svg" 
              alt="Creditas Logo" 
              className="h-7 w-auto mb-8"
              referrerPolicy="no-referrer"
              id="footer-logo"
            />
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              O melhor aplicativo Android focado em democratizar a análise de crédito. Limite pré-aprovado com as melhores taxas do mercado e segurança total nos seus dados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 border border-gray-100 rounded-full hover:bg-brand-muted transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 border border-gray-100 rounded-full hover:bg-brand-muted transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-2 border border-gray-100 rounded-full hover:bg-brand-muted transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 border border-gray-100 rounded-full hover:bg-brand-muted transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Institucional</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Imprensa</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Soluções</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Aplicativo Android</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Simulador de Limite</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Análise de Score</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Termos do App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Ajuda</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Como funciona</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-400">
              &copy; 2024 Creditas Soluções Financeiras Ltda.
            </p>
            <div className="flex space-x-8 text-xs text-gray-400">
              <a href="#" className="hover:text-brand-primary">Segurança de Dados LGPD</a>
              <a href="#" className="hover:text-brand-primary">Criptografia 256 bits</a>
              <a href="#" className="hover:text-brand-primary">Processo 100% Digital</a>
            </div>
          </div>
          <div className="mt-8 text-[10px] text-gray-400 leading-relaxed text-center md:text-left">
            O aplicativo CrediSecure é uma solução digital que atua como correspondente Bancário. Seguimos a Resolução nº 4.935 do Banco Central do Brasil. Taxas a partir de 1,49% a.m. O prazo de pagamento pode variar de 18 a 60 meses. Exemplo: Um empréstimo de R$ 100.000,00 para pagar em 240 meses (20 anos) terá prestações iniciais de R$ 1.144,63. A análise de crédito ocorre exclusivamente via app Android instalado no dispositivo do solicitante de forma segura.
          </div>
        </div>
      </div>
    </footer>
  );
}
