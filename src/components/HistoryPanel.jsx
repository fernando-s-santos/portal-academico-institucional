import { Clock } from "lucide-react";

export default function HistoryPanel() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-blue-900" />
        <h3 className="font-bold text-gray-800">
          Histórico completo
        </h3>
      </div>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="font-semibold text-gray-800">
            Solicitação criada
          </p>
          <p>Quem alterou: Usuário atual</p>
          <p>Quando: data e hora do registro</p>
          <p>O que mudou: criação inicial da ficha</p>
        </div>
      </div>
    </div>
  );
}