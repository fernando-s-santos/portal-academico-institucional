import { ArrowLeft } from "lucide-react";

export default function Header({ title, subtitle, onBack }) {
  return (
    <header className="bg-blue-900 text-white px-8 py-5 shadow-lg flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-blue-100 mt-1">{subtitle}</p>}
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>
      )}
    </header>
  );
}