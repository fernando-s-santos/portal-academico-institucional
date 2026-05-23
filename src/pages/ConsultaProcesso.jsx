import StatusBadge from "../components/StatusBadge";
import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import Header from "../components/Header";
import ExportCsvButton from "../components/ExportCsvButton";

export default function ConsultaProcesso({
  processo,
  voltar,
  novaSolicitacao,
  abrirFicha,
  excluirFicha,
  fichas,
}) {
  const [semestre, setSemestre] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [busca, setBusca] = useState("");

  const fichasFiltradas = fichas
    .map((ficha, indexGlobal) => ({
      ...ficha,
      indexGlobal,
    }))
    .filter((ficha) => {
      const mesmoProcesso = ficha.processo === processo.codigo;
      const mesmoSemestre = semestre === "Todos" || ficha.semestre === semestre;
      const mesmoStatus = status === "Todos" || ficha.status === status;

      const termoBusca = busca.toLowerCase();

      const bateBusca =
        (ficha.aluno || "").toLowerCase().includes(termoBusca) ||
        (ficha.idAluno || "").toLowerCase().includes(termoBusca) ||
        (ficha.processo || "").toLowerCase().includes(termoBusca) ||
        (ficha.curso || "").toLowerCase().includes(termoBusca) ||
        (ficha.disciplina || "").toLowerCase().includes(termoBusca) ||
        (ficha.docente || "").toLowerCase().includes(termoBusca);

      return mesmoProcesso && mesmoSemestre && mesmoStatus && bateBusca;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title={processo.titulo}
        subtitle={`${processo.codigo} | Consulta de fichas`}
        onBack={voltar}
      />

      <main className="p-10">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-7xl mx-auto">
          <div className="border-b border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Relação de fichas
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Consulte registros por semestre, status, referência, curso ou processo.
              </p>
            </div>

            <ExportCsvButton
              dados={fichasFiltradas}
              nomeArquivo={`relacao-${processo.codigo}-${semestre}`}
            />

            <button
              onClick={novaSolicitacao}
              className="bg-blue-900 text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition flex items-center gap-2"
            >
              <Plus size={18} />
              Nova solicitação
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Semestre
              </label>

              <select
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
              >
                <option>Todos</option>
                <option>2026-1</option>
                <option>2026-3</option>
                <option>2027-1</option>
                <option>2027-3</option>
                <option>2028-1</option>
                <option>2028-3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
              >
                <option>Todos</option>
                <option>Pendente</option>
                <option>Em análise</option>
                <option>Aprovado</option>
                <option>Reprovado</option>
                <option>Concluído</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar
              </label>

              <div className="relative">
                <Search
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />

                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  type="text"
                  placeholder="Buscar por referência, curso ou processo"
                  className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700">
                    Processo
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700">
                    Semestre
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700">
                    ID / Código
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700">
                    Referência
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700">
                    Curso
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700">
                    Data
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {fichasFiltradas.map((ficha, index) => (
                  <tr
                    key={index}
                    onClick={() => abrirFicha(ficha)}
                    className="border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 font-semibold text-blue-900">
                      {ficha.processo}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {ficha.semestre}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {ficha.idAluno}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {ficha.aluno}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {ficha.curso}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={ficha.status} />
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {ficha.data}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          excluirFicha(ficha.indexGlobal);
                        }}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                        title="Excluir ficha"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {fichasFiltradas.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Nenhuma ficha encontrada para os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}