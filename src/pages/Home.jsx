import Header from "../components/Header";
import ProcessCard from "../components/ProcessCard";
import { processos } from "../data/processos.jsx";

export default function Home({ abrirProcesso }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Portal Acadêmico Interno"
        subtitle="Coordenação Presencial"
      />

      <main className="p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Processos acadêmicos
          </h2>
          <p className="text-gray-500 mt-1">
            Selecione o tipo de solicitação para consultar ou iniciar um atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processos.map((processo) => (
            <ProcessCard
              key={processo.codigo}
              processo={processo}
              onClick={() => abrirProcesso(processo)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}