import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-sm rounded-3xl border-none shadow-xl">
        <CardHeader className="bg-[#00C853] text-white p-8 rounded-t-3xl border-b-0">
          <CardTitle>Acesso Restrito</CardTitle>
          <CardDescription className="text-green-100">Painel Administrativo</CardDescription>
        </CardHeader>
        <CardContent className="p-8 text-center text-gray-500">
          <p>O painel de administração está desativado nesta versão do sistema.</p>
        </CardContent>
      </Card>
    </div>
  );
}
