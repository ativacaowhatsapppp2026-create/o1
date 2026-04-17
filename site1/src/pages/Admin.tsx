import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        loadClientes();
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) loadClientes();
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const loadClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao carregar clientes:', error);
    } else {
      setClientes(data || []);
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
             <h1 className="text-xl font-bold text-gray-800 border-l pl-3 ml-3">Painel de Clientes</h1>
          </div>
          <Button onClick={() => supabase.auth.signOut()} variant="outline" className="rounded-xl border-gray-200">Sair</Button>
        </div>

        <Card className="rounded-3xl border-none shadow-md overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#00C853] text-white">
                  <th className="p-4 whitespace-nowrap">Data</th>
                  <th className="p-4 whitespace-nowrap">Nome</th>
                  <th className="p-4 whitespace-nowrap">Contato</th>
                  <th className="p-4 whitespace-nowrap">CPF</th>
                  <th className="p-4 whitespace-nowrap">Identidade</th>
                  <th className="p-4 whitespace-nowrap">Comprovantes Renda</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(cliente.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4 font-semibold text-gray-800 whitespace-nowrap">{cliente.nome}</td>
                    <td className="p-4 text-sm text-gray-600">
                      <div>{cliente.email}</div>
                      <div>{cliente.telefone}</div>
                    </td>
                    <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap">{cliente.cpf}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {cliente.rg_frente_url && (
                          <a href={cliente.rg_frente_url} target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-800 hover:underline text-xs font-medium bg-green-50 px-2 py-1 rounded inline-block w-max">
                            Visualizar Frente
                          </a>
                        )}
                        {cliente.rg_verso_url && (
                          <a href={cliente.rg_verso_url} target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-800 hover:underline text-xs font-medium bg-green-50 px-2 py-1 rounded inline-block w-max">
                            Visualizar Verso
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                       <div className="flex flex-col gap-1">
                        {cliente.comprovante_renda_m1_url && (
                           <a href={cliente.comprovante_renda_m1_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium bg-blue-50 px-2 py-1 rounded inline-block w-max">
                             Mês 1
                           </a>
                        )}
                        {cliente.comprovante_renda_m2_url && (
                           <a href={cliente.comprovante_renda_m2_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium bg-blue-50 px-2 py-1 rounded inline-block w-max">
                             Mês 2
                           </a>
                        )}
                         {cliente.comprovante_renda_m3_url && (
                           <a href={cliente.comprovante_renda_m3_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium bg-blue-50 px-2 py-1 rounded inline-block w-max">
                             Mês 3
                           </a>
                        )}
                       </div>
                    </td>
                  </tr>
                ))}
                {clientes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Nenhum cliente cadastrado ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
