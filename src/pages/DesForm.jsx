import { useState } from "react";
import { Save } from "lucide-react";
import Header from "../components/Header";
import FileUpload from "../components/FileUpload";
import HistoryPanel from "../components/HistoryPanel";

import {
  FormInput,
  FormSelect,
  FormReadOnly,
  FormTextarea,
  SectionDivider,
} from "../components/forms/FormComponents";

const SEMESTRES = ["2026-1", "2026-3", "2027-1", "2027-3", "2028-1", "2028-3"];

const STATUS_OPTIONS = [
  "Selecione o Status atual",
  "Análise concluída",
  "Análise GA",
  "Chamado processado",
  "Concluído",
  "Enviado coordenador",
  "Enviado secretaria",
];

const PARECER_OPTIONS = [
  "Em análise",
  "Aprovado",
  "Reprovado",
  "Necessita ajustes",
];

const PERIODOS = [
  "",
  "1º Período",
  "2º Período",
  "3º Período",
  "4º Período",
  "5º Período",
  "6º Período",
  "7º Período",
  "8º Período",
  "9º Período",
  "10º Período",
];

const CURSOS = [
  "",
  "Arquitetura",
  "Publicidade e Propaganda",
  "Fotografia",
  "Design Gráfico",
  "Design Digital",
  "Moda",
  "ADS",
];

const ESTADO_INICIAL = {
  semestre: "2026-1",
  status: "Selecione o Status atual",

  numeroChamado: "",

  aluno: "",
  idAluno: "",
  curso: "",
  coordenador: "",

  aberturaChamado: "",
  recebimentoDAC: "",
  devolucaoCoordenacao: "",
  envioSecretaria: "",

  parecerAnalise: "Em análise",
  periodo: "",

  orientacoesAnalise: "",

  adReferendum: false,
  fichaAnalitica: false,
  solicitacaoDPEspecial: false,

  observacoes: "",

  criadoPor: "",
  dataCriacao: "",
  modificadoPor: "",
  dataModificacao: "",
};

export default function DesForm({ voltar, salvarFicha }) {
  const [form, setForm] = useState(ESTADO_INICIAL);

  function handleChange(campo) {
    return (e) => {
      const valor = e.target.type === "checkbox" ? e.target.checked : e.target.value;

      setForm((prev) => ({
        ...prev,
        [campo]: valor,
      }));
    };
  }

  function salvarSolicitacao() {
    const obrigatorios = [
      form.aluno,
      form.idAluno,
      form.curso,
    ];

    const invalido =
      obrigatorios.some((campo) => !campo.trim()) ||
      form.status === "Selecione o Status atual";

    if (invalido) {
      alert("Preencha nome do candidato, ID do candidato, curso e status antes de salvar.");
      return;
    }

    salvarFicha({
      processo: "DES",
      semestre: form.semestre,
      idAluno: form.idAluno,
      aluno: form.aluno,
      curso: form.curso,
      status: form.status,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Destrancamento"
        subtitle="DES | Nova solicitação"
        onBack={voltar}
      />

      <main className="p-10">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800">
              Destrancamento ao Curso
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Registre os dados do aluno, controle de datas e parecer da coordenação.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Semestre"
              options={SEMESTRES}
              value={form.semestre}
              onChange={handleChange("semestre")}
            />

            <FormReadOnly label="Processo" value="DES" />

            <FormSelect
              label="Status"
              options={STATUS_OPTIONS}
              value={form.status}
              onChange={handleChange("status")}
            />

            <FormInput
              label="Nº chamado"
              type="text"
              value={form.numeroChamado}
              onChange={handleChange("numeroChamado")}
              placeholder="Número do chamado"
            />

            <SectionDivider title="Candidato" />

            <FormInput
              label="Nome do candidato"
              type="text"
              value={form.aluno}
              onChange={handleChange("aluno")}
              placeholder="Nome completo"
            />

            <FormInput
              label="ID do candidato"
              type="text"
              value={form.idAluno}
              onChange={handleChange("idAluno")}
              placeholder="ID do candidato"
            />

            <FormSelect
              label="Curso"
              options={[
                { value: "", label: "Selecione o curso" },
                ...CURSOS.filter(Boolean).map((curso) => ({
                  value: curso,
                  label: curso,
                })),
              ]}
              value={form.curso}
              onChange={handleChange("curso")}
            />

            <FormInput
              label="Coordenador(a)"
              type="text"
              value={form.coordenador}
              onChange={handleChange("coordenador")}
              placeholder="Coordenador responsável"
            />

            <SectionDivider title="Controle de datas" />

            <FormInput
              label="Abertura do chamado"
              type="date"
              value={form.aberturaChamado}
              onChange={handleChange("aberturaChamado")}
            />

            <FormInput
              label="Recebimento DAC"
              type="date"
              value={form.recebimentoDAC}
              onChange={handleChange("recebimentoDAC")}
            />

            <FormInput
              label="Devolução coordenação"
              type="date"
              value={form.devolucaoCoordenacao}
              onChange={handleChange("devolucaoCoordenacao")}
            />

            <FormInput
              label="Envio secretaria"
              type="date"
              value={form.envioSecretaria}
              onChange={handleChange("envioSecretaria")}
            />

            <SectionDivider title="Coordenação Geral" />

            <FormSelect
              label="Parecer análise"
              options={PARECER_OPTIONS}
              value={form.parecerAnalise}
              onChange={handleChange("parecerAnalise")}
            />

            <FormSelect
              label="Período"
              options={[
                { value: "", label: "Selecione o período" },
                ...PERIODOS.filter(Boolean).map((periodo) => ({
                  value: periodo,
                  label: periodo,
                })),
              ]}
              value={form.periodo}
              onChange={handleChange("periodo")}
            />

            <FormTextarea
              label="Orientações para análise"
              rows={4}
              colSpan2
              value={form.orientacoesAnalise}
              onChange={handleChange("orientacoesAnalise")}
              placeholder="Insira as orientações para análise"
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={form.adReferendum}
                onChange={handleChange("adReferendum")}
              />
              <span className="text-gray-700">Ad referendum</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={form.fichaAnalitica}
                onChange={handleChange("fichaAnalitica")}
              />
              <span className="text-gray-700">Ficha Analítica</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={form.solicitacaoDPEspecial}
                onChange={handleChange("solicitacaoDPEspecial")}
              />
              <span className="text-gray-700">Solicitação de DP Especial</span>
            </label>

            <FormTextarea
              label="Observações"
              rows={5}
              colSpan2
              value={form.observacoes}
              onChange={handleChange("observacoes")}
              placeholder="Observações gerais do processo"
            />

            <SectionDivider title="Registro de funcionário" />

            <FormInput
              label="Criado por"
              type="text"
              value={form.criadoPor}
              onChange={handleChange("criadoPor")}
              placeholder="Usuário responsável pela criação"
            />

            <FormInput
              label="Data de criação"
              type="date"
              value={form.dataCriacao}
              onChange={handleChange("dataCriacao")}
            />

            <FormInput
              label="Modificado por"
              type="text"
              value={form.modificadoPor}
              onChange={handleChange("modificadoPor")}
              placeholder="Último usuário que modificou"
            />

            <FormInput
              label="Data de modificação"
              type="date"
              value={form.dataModificacao}
              onChange={handleChange("dataModificacao")}
            />

            <div className="md:col-span-2">
              <FileUpload />
            </div>

            <div className="md:col-span-2">
              <HistoryPanel />
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 flex flex-col md:flex-row justify-end gap-3">
            <button
              onClick={voltar}
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

            <button
              onClick={salvarSolicitacao}
              className="px-5 py-3 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Salvar solicitação
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
