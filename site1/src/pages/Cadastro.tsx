import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, Mail, User, Phone, Image as ImageIcon, UploadCloud, FileText, MapPin, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Cadastro() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  
  interface FilesState {
    frente: File | null;
    verso: File | null;
    renda1: File | null;
    renda2: File | null;
    renda3: File | null;
  }
  
  const [files, setFiles] = useState<FilesState>({
    frente: null,
    verso: null,
    renda1: null,
    renda2: null,
    renda3: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputFrente = useRef<HTMLInputElement>(null);
  const fileInputVerso = useRef<HTMLInputElement>(null);
  const fileInputRenda1 = useRef<HTMLInputElement>(null);
  const fileInputRenda2 = useRef<HTMLInputElement>(null);
  const fileInputRenda3 = useRef<HTMLInputElement>(null);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
    return value;
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || '',
          }));
          setErrors(prev => ({ ...prev, cep: "" }));
        } else {
          setErrors(prev => ({ ...prev, cep: "CEP não encontrado." }));
        }
      } catch {
        setErrors(prev => ({ ...prev, cep: "Erro ao buscar CEP." }));
      }
    } else {
      if (cep.length > 0) {
        setErrors(prev => ({ ...prev, cep: "CEP inválido." }));
      }
    }
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = { ...errors };
    newErrors.name = ""; newErrors.email = ""; newErrors.phone = ""; newErrors.cpf = "";
    let isValid = true;

    if (formData.name.trim().split(" ").length < 2) {
      newErrors.name = "Por favor, insira seu nome completo.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "E-mail inválido.";
      isValid = false;
    }

    const phoneNumbers = formData.phone.replace(/\D/g, "");
    if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      newErrors.phone = "Telefone inválido.";
      isValid = false;
    }

    const cpfNumbers = formData.cpf.replace(/\D/g, "");
    if (cpfNumbers.length !== 11) {
      newErrors.cpf = "CPF inválido (11 dígitos).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = { ...errors };
    newErrors.cep = ""; newErrors.numero = "";
    let isValid = true;

    const cepNumbers = formData.cep.replace(/\D/g, "");
    if (cepNumbers.length !== 8) {
      newErrors.cep = "CEP inválido.";
      isValid = false;
    }
    if (!formData.numero.trim()) {
      newErrors.numero = "Campo obrigatório.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => s - 1);

  const getClientIP = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      return data.ip;
    } catch {
      return 'Desconhecido';
    }
  };

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documentos')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('documentos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleFinalSubmit = async () => {
    if (!files.frente || !files.verso || !files.renda1 || !files.renda2 || !files.renda3) {
      setErrors({ ...errors, files: "Por favor, anexe todos os documentos solicitados: CNH (Frente e Verso) e o Extrato Bancário dos últimos 3 meses." });
      return;
    }
    setErrors({ ...errors, files: "" });
    setLoading(true);

    try {
      // Upload Images
      const urlFrente = await uploadFile(files.frente, 'frente');
      const urlVerso = await uploadFile(files.verso, 'verso');
      const urlRenda1 = await uploadFile(files.renda1, 'renda');
      const urlRenda2 = await uploadFile(files.renda2, 'renda');
      const urlRenda3 = await uploadFile(files.renda3, 'renda');

      // Coleta Info
      const ip = await getClientIP();
      const userAgent = navigator.userAgent;

      // Inserir Banco
      const { error } = await supabase.from('clientes').insert([
        {
          nome: formData.name,
          email: formData.email,
          telefone: formData.phone,
          cpf: formData.cpf,
          cep: formData.cep,
          rua: formData.rua,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          ip: ip,
          tipo_dispositivo: userAgent,
          rg_frente_url: urlFrente,
          rg_verso_url: urlVerso,
          comprovante_renda_m1_url: urlRenda1,
          comprovante_renda_m2_url: urlRenda2,
          comprovante_renda_m3_url: urlRenda3,
        }
      ]);

      if (error) throw error;
      setStep(5);
    } catch (err: any) {
      alert("Erro ao enviar dados: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const logoUrl = "https://assets.creditas.com/microfrontends/prod/website-assets/logotipos/1.0.0/creditas/primary_logo_without_background.svg";

  const renderFileUploader = (
    file: File | null, 
    ref: React.RefObject<HTMLInputElement | null>, 
    label: string, 
    id: keyof FilesState, 
    icon: React.ReactNode
  ) => (
    <div 
      className={`border-2 border-dashed ${file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-green-500 hover:bg-green-50/50'} rounded-2xl p-4 text-center cursor-pointer transition-colors`}
      onClick={() => ref.current?.click()}
    >
      <input 
        type="file" 
        accept="image/*,application/pdf" 
        className="hidden" 
        ref={ref}
        onChange={e => setFiles({...files, [id]: e.target.files?.[0] || null})}
      />
      {file ? (
        <div className="flex flex-col items-center text-green-700">
          <CheckCircle2 className="w-8 h-8 mb-2" />
          <span className="font-semibold text-sm truncate max-w-full px-2" title={file.name}>{file.name}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <div className="mb-2 text-green-500">
            {icon}
          </div>
          <span className="font-semibold text-gray-700 text-sm">{label}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans py-12">
      <div className="w-full max-w-lg">
        {/* Header / Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logoUrl} alt="Creditas" className="h-10 object-contain" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold text-green-600 tracking-tight">Empréstimo Creditas</h1>
                <p className="text-gray-600 text-lg">Suas conquistas a um crédito de distância. Simule e cadastre-se agora mesmo de forma segura.</p>
              </div>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-green-50 flex items-center justify-center">
                <div className="text-center p-6 space-y-2">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                    <h2 className="text-green-800 text-2xl font-bold drop-shadow-sm">Taxas Menores,</h2>
                    <h2 className="text-green-700 text-xl font-medium drop-shadow-sm">Aprovação Transparente</h2>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full h-14 text-lg bg-[#00C853] hover:bg-green-600 text-white rounded-xl shadow-lg transition-all active:scale-95 border-0">
                Começar
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
                <CardHeader className="bg-[#00C853] text-white p-8">
                  <CardTitle className="text-2xl font-bold">Seus Dados Principais</CardTitle>
                  <CardDescription className="text-green-100">Etapa 1 de 3: Informações de contato.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input 
                        placeholder="Ex: João Silva" 
                        className={`pl-10 h-12 rounded-xl focus:ring-green-500 focus-visible:ring-green-500 ${errors.name ? 'border-red-500' : ''}`}
                        value={formData.name}
                        onChange={e => { setFormData({...formData, name: e.target.value}); setErrors({...errors, name: ""}); }}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">CPF</Label>
                    <Input 
                      placeholder="000.000.000-00" 
                      className={`h-12 rounded-xl focus:ring-green-500 focus-visible:ring-green-500 ${errors.cpf ? 'border-red-500' : ''}`}
                      value={formData.cpf}
                      onChange={e => { setFormData({...formData, cpf: formatCPF(e.target.value)}); setErrors({...errors, cpf: ""}); }}
                    />
                    {errors.cpf && <p className="text-xs text-red-500">{errors.cpf}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="(00) 00000-0000" 
                          className={`pl-9 h-12 rounded-xl focus:ring-green-500 focus-visible:ring-green-500 ${errors.phone ? 'border-red-500' : ''}`}
                          value={formData.phone}
                          onChange={e => { setFormData({...formData, phone: formatPhone(e.target.value)}); setErrors({...errors, phone: ""}); }}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          type="email" 
                          placeholder="seu@email.com" 
                          className={`pl-9 h-12 rounded-xl focus:ring-green-500 focus-visible:ring-green-500 ${errors.email ? 'border-red-500' : ''}`}
                          value={formData.email}
                          onChange={e => { setFormData({...formData, email: e.target.value}); setErrors({...errors, email: ""}); }}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button onClick={prevStep} variant="outline" className="flex-1 h-12 rounded-xl border-gray-200">Voltar</Button>
                    <Button onClick={nextStep} className="flex-[2] h-12 bg-[#00C853] hover:bg-green-600 text-white rounded-xl shadow-md border-0">
                      Avançar <ChevronRight className="ml-2 w-4 h-4"/>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
                <CardHeader className="bg-[#00C853] text-white p-8">
                  <CardTitle className="text-2xl font-bold">Seu Endereço</CardTitle>
                  <CardDescription className="text-green-100">Etapa 2 de 3: Onde você mora atualmente.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">CEP</Label>
                    <div className="relative flex gap-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input 
                          placeholder="00000-000" 
                          className={`pl-10 h-12 rounded-xl focus:ring-green-500 focus-visible:ring-green-500 ${errors.cep ? 'border-red-500' : ''}`}
                          value={formData.cep}
                          onChange={e => { setFormData({...formData, cep: formatCEP(e.target.value)}); setErrors({...errors, cep: ""}); }}
                          onBlur={handleCepBlur}
                        />
                      </div>
                      <Button onClick={handleCepBlur} variant="outline" className="h-12 px-4 rounded-xl text-green-700 border-green-200 bg-green-50 hover:bg-green-100 flex-shrink-0">
                        <Search className="w-5 h-5" />
                      </Button>
                    </div>
                    {errors.cep && <p className="text-xs text-red-500">{errors.cep}</p>}
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2 col-span-3">
                      <Label className="text-sm font-semibold text-gray-700">Rua / Logradouro</Label>
                      <Input 
                        placeholder="Ex: Av. Paulista" 
                        className="h-12 rounded-xl focus:ring-green-500"
                        value={formData.rua}
                        onChange={e => setFormData({...formData, rua: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <Label className="text-sm font-semibold text-gray-700">Número</Label>
                      <Input 
                        placeholder="123" 
                        className={`h-12 rounded-xl focus:ring-green-500 ${errors.numero ? 'border-red-500' : ''}`}
                        value={formData.numero}
                        onChange={e => { setFormData({...formData, numero: e.target.value}); setErrors({...errors, numero: ""}); }}
                      />
                      {errors.numero && <p className="text-xs text-red-500 mt-1">{errors.numero}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Complemento (Opcional)</Label>
                    <Input 
                      placeholder="Apto, Bloco, Casa..." 
                      className="h-12 rounded-xl focus:ring-green-500"
                      value={formData.complemento}
                      onChange={e => setFormData({...formData, complemento: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-1 sm:col-span-1">
                      <Label className="text-sm font-semibold text-gray-700">Bairro</Label>
                      <Input 
                        className="h-12 rounded-xl focus:ring-green-500"
                        value={formData.bairro}
                        onChange={e => setFormData({...formData, bairro: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 col-span-1 sm:col-span-1">
                      <Label className="text-sm font-semibold text-gray-700">Cidade</Label>
                      <Input 
                        className="h-12 rounded-xl focus:ring-green-500"
                        value={formData.cidade}
                        onChange={e => setFormData({...formData, cidade: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 col-span-2 sm:col-span-1">
                      <Label className="text-sm font-semibold text-gray-700">Estado</Label>
                      <Input 
                        className="h-12 rounded-xl focus:ring-green-500"
                        maxLength={2}
                        placeholder="UF"
                        value={formData.estado}
                        onChange={e => setFormData({...formData, estado: e.target.value.toUpperCase()})}
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button onClick={prevStep} variant="outline" className="flex-1 h-12 rounded-xl border-gray-200">Voltar</Button>
                    <Button onClick={nextStep} className="flex-[2] h-12 bg-[#00C853] hover:bg-green-600 text-white rounded-xl shadow-md border-0">
                      Avançar <ChevronRight className="ml-2 w-4 h-4"/>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
                <CardHeader className="bg-[#00C853] text-white p-8">
                  <CardTitle className="text-2xl font-bold">Documentação</CardTitle>
                  <CardDescription className="text-green-100">Etapa 3 de 3: Precisamos de alguns documentos para finalizar sua análise.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-yellow-800 text-sm">
                    Envie imagens legíveis ou arquivos em PDF.
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">CNH (Carteira Nacional de Habilitação)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {renderFileUploader(files.frente, fileInputFrente, "Frente da CNH", "frente", <ImageIcon className="w-8 h-8" />)}
                        {renderFileUploader(files.verso, fileInputVerso, "Verso da CNH", "verso", <ImageIcon className="w-8 h-8" />)}
                    </div>

                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider pt-2">Extrato Bancário</h3>
                    <p className="text-xs text-gray-500 -mt-3 pb-2">Por favor, envie o extrato bancário dos últimos 3 meses.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {renderFileUploader(files.renda1, fileInputRenda1, "Mês Recente", "renda1", <FileText className="w-6 h-6" />)}
                        {renderFileUploader(files.renda2, fileInputRenda2, "Mês Anterior", "renda2", <FileText className="w-6 h-6" />)}
                        {renderFileUploader(files.renda3, fileInputRenda3, "Mês Mais Antigo", "renda3", <FileText className="w-6 h-6" />)}
                    </div>

                    {errors.files && <p className="text-sm font-semibold text-center text-red-500 bg-red-50 p-3 rounded-lg">{errors.files}</p>}
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button onClick={prevStep} variant="outline" className="flex-1 h-12 rounded-xl" disabled={loading}>Voltar</Button>
                    <Button onClick={handleFinalSubmit} className="flex-[2] h-12 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md border-0" disabled={loading}>
                      {loading ? 'Enviando...' : 'Finalizar Cadastro'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 bg-white p-10 rounded-3xl shadow-2xl"
            >
              <div className="flex justify-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-100 p-6 rounded-full">
                  <CheckCircle2 className="h-20 w-20 text-[#00C853]" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">Pedido Concluído!</h2>
                <p className="text-gray-600">Seus dados e documentos foram recebidos com segurança. Estamos analisando o seu crédito, entraremos em contato em breve.</p>
              </div>

              <Button onClick={() => window.location.reload()} variant="outline" className="text-green-700 font-semibold rounded-xl h-12 px-8 border-green-200">
                Voltar ao Início
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
