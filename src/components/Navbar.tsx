import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full bg-white border-b border-brand-border"
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-15 lg:px-15">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
             <img src="https://assets.creditas.com/microfrontends/prod/website-assets/logotipos/1.0.0/creditas/primary_logo_without_background.svg" alt="Creditas Logo" className="h-8 w-auto" id="logo-geometric" referrerPolicy="no-referrer" />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#solucoes" className="text-sm font-medium text-[#4a4a4a] hover:text-brand-primary transition-colors" id="nav-solucoes">Como Funciona</a>
            <a href="#seguranca" className="text-sm font-medium text-[#4a4a4a] hover:text-brand-primary transition-colors" id="nav-seguranca">Segurança</a>
            <a href="#instalacao" className="text-sm font-medium text-[#4a4a4a] hover:text-brand-primary transition-colors" id="nav-instalacao">Como Instalar</a>
            <a href="#instalacao" className="bg-brand-primary text-white px-6 py-2.5 rounded-[8px] text-sm font-bold hover:text-white hover:brightness-110 transition-all shadow-sm inline-block" id="btn-entrar">
              Baixar App Android
            </a>
          </div>
          
          <div className="md:hidden">
            <button className="p-2" id="mobile-menu-btn">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
