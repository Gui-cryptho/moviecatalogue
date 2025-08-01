import { Film } from "lucide-react";

export default function MovieEmptyState() {
  return (
    <div className="bg-gray rounded-2xl shadow-lg p-12 text-center">
      <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-gray-600 mb-2">Nenhum FIlme Encontrado</h3>
      <p className="text-gray-500">Adicione o seu Primeiro Filme!</p>
    </div>
  );
}
