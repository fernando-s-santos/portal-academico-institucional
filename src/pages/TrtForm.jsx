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
  "Ação financeiro",
  "Ação secretaria",
  "Aguardando divulgação das notas",
  "Análise coordenação de curso",
  "Aprovado",
  "Cancelamento de curso Senac",
  "Concluído",
  "Convocado para matrícula",
  "Desistência pelo aluno",
  "Documentos entregues",
  "Documentos pendentes",
  "Encaminhado processo seletivo",
  "Envio de comunicação de aprovação",
  "Lançamento no sistema",
  "Liberado convocação",
  "Liberado financeiro",
  "Liberado secretaria",
  "Pendente ação financeiro",
  "Pendente ação secretaria",
  "Recebido DAC",
  "Reconvoção",
  "Reprovado",
  "Vagas esgotadas - reprovado",
];

const MODALIDADES = ["Presencial", "EAD", "Híbrido"];
const TURNOS = ["Manhã", "Tarde", "Noite"];
const SIM_NAO = ["Sim", "Não"];
const STATUS_SS = ["Em análise", "Aprovado", "Reprovado", "Concluído"];
const STATUS_MATRICULA = ["Pendente", "Efetivada", "Cancelada"];
const PERIODOS_INDICADOS = [
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

const DOCUMENTOS = [
  "Estrutura curricular do curso de origem do estudante",
];

const ESTADO_INICIAL = {
  semestre: "2026-1",
  status: "Selecione o Status atual",

  aluno: "",
  idAluno: "",
  email: "",
  telefone: "",

  nrInscricao: "",
  dataInscricao: "",

  modalidadeOrigem: "Presencial",
  modalidadeDestino: "Presencial",

  cursoOrigem: "",
  cursoDestino: "",

  turnoOrigem: "Manhã",
  turnoDestino: "Manhã",

  coordenadorOrigem: "",
  coordenadorDestino: "",

  documentos: [],

  envioDAC: "",
  recebidoDAC: "",
  dataLimiteAnalise: "",
  periodoIndicado: "",
  parecerCoordenacao: "",

  dataComunicacaoAprovacao: "",
  statusSS: "Em análise",
  dataConvocacao: "",
  statusMatricula: "Pendente",

  secretariaDataAcao1: "",
  secretariaAcao1: "",
  secretariaDataAcao2: "",
  secretariaRealizada: "Sim",
  secretariaDataAcao3: "",
  secretariaObservacoes: "",

  financeiroDataAcao1: "",
  financeiroRealizada: "Sim",
  financeiroDataAcao2: "",
  financeiroDataAcao3: "",
  financeiroObservacoes: "",

  historicoOcorrencias: "",

  criadoPor: "",
  dataCriacao: "",
  modificadoPor: "",
  dataModificacao: "",
};

export default function TrtForm({ voltar, salvarFicha }) {
  const [form, setForm] = useState(ESTADO_INICIAL);

  function handleChange(campo) {
    return (e) => {
      setForm((prev) => ({
        ...prev,
        [campo]: e.target.value,
      }));
    };
  }

  function toggleDocumento(doc) {
    setForm((prev) => ({
      ...prev,
      documentos: prev.documentos.includes(doc)
        ? prev.documentos.filter((item) => item !== doc)
        : [...prev.documentos, doc],
    }));
  }

  function salvarSolicitacao() {
    const camposObrigatorios = [
      form.aluno,
      form.idAluno,
      form.cursoDestino,
    ];

    const invalido =
      camposObrigatorios.some((campo) => !campo.trim()) ||
      form.status === "Selecione o Status atual";

    if (invalido) {
      alert("Preencha candidato, ID/RA, curso destino e status antes de salvar.");
      return;
    }

    salvarFicha({
      processo: "TRT",
      semestre: form.semestre,
      idAluno: form.idAluno,
      aluno: form.aluno,
      curso: form.cursoDestino,
      status: form.status,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Transferência Interna"
        subtitle="TRT | Nova solicitação"
        onBack={voltar}
      />

      <main className="p-10">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800">
              Dados da transferência interna
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Registre origem, destino, documentação e análise acadêmica.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Semestre"
              options={SEMESTRES}
              value={form.semestre}
              onChange={handleChange("semestre")}
            />

            <FormReadOnly label="Processo" value="TRT" />

            <FormSelect
              label="Status"
              options={STATUS_OPTIONS}
              value={form.status}
              onChange={handleChange("status")}
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
              label="ID / RA"
              type="text"
              value={form.idAluno}
              onChange={handleChange("idAluno")}
              placeholder="ID ou RA do aluno"
            />

            <FormInput
              label="E-mail"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="email@exemplo.com"
            />

            <FormInput
              label="Telefone"
              type="text"
              value={form.telefone}
              onChange={handleChange("telefone")}
              placeholder="(00) 00000-0000"
            />

            <SectionDivider title="Inscrição" />

            <FormInput
              label="Nº de inscrição"
              type="text"
              value={form.nrInscricao}
              onChange={handleChange("nrInscricao")}
              placeholder="Número da inscrição"
            />

            <FormInput
              label="Data de inscrição"
              type="date"
              value={form.dataInscricao}
              onChange={handleChange("dataInscricao")}
            />

            <FormSelect
              label="Modalidade origem"
              options={MODALIDADES}
              value={form.modalidadeOrigem}
              onChange={handleChange("modalidadeOrigem")}
            />

            <FormSelect
              label="Modalidade destino"
              options={MODALIDADES}
              value={form.modalidadeDestino}
              onChange={handleChange("modalidadeDestino")}
            />

            <FormInput
              label="Curso origem"
              type="text"
              value={form.cursoOrigem}
              onChange={handleChange("cursoOrigem")}
              placeholder="Curso atual"
            />

            <FormInput
              label="Curso destino"
              type="text"
              value={form.cursoDestino}
              onChange={handleChange("cursoDestino")}
              placeholder="Curso desejado"
            />

            <FormSelect
              label="Turno origem"
              options={TURNOS}
              value={form.turnoOrigem}
              onChange={handleChange("turnoOrigem")}
            />

            <FormSelect
              label="Turno destino"
              options={TURNOS}
              value={form.turnoDestino}
              onChange={handleChange("turnoDestino")}
            />

            <FormInput
              label="Coordenador(a) origem"
              type="text"
              value={form.coordenadorOrigem}
              onChange={handleChange("coordenadorOrigem")}
              placeholder="Coordenador de origem"
            />

            <FormInput
              label="Coordenador(a) destino"
              type="text"
              value={form.coordenadorDestino}
              onChange={handleChange("coordenadorDestino")}
              placeholder="Coordenador de destino"
            />

            <SectionDivider title="Documentação" />

            {DOCUMENTOS.map((doc) => (
              <label key={doc} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={form.documentos.includes(doc)}
                  onChange={() => toggleDocumento(doc)}
                />
                <span className="text-gray-700">{doc}</span>
              </label>
            ))}

            <SectionDivider title="Diretoria Acadêmica" />

            <FormInput
              label="Envio de documentação para DAC"
              type="date"
              value={form.envioDAC}
              onChange={handleChange("envioDAC")}
            />

            <FormInput
              label="Documentação recebida pela DAC"
              type="date"
              value={form.recebidoDAC}
              onChange={handleChange("recebidoDAC")}
            />

            <FormInput
              label="Data limite de finalização da análise"
              type="date"
              value={form.dataLimiteAnalise}
              onChange={handleChange("dataLimiteAnalise")}
            />

            <FormSelect
              label="Período indicado"
              options={[
                { value: "", label: "Selecione o período" },

                ...PERIODOS_INDICADOS.map((periodo) => ({
                  value: periodo,
                  label: periodo,
                })),
              ]}
              value={form.periodoIndicado}
              onChange={handleChange("periodoIndicado")}
            />

            <FormTextarea
              label="Parecer da coordenação do curso"
              rows={4}
              colSpan2
              value={form.parecerCoordenacao}
              onChange={handleChange("parecerCoordenacao")}
              placeholder="Insira o parecer"
            />

            <SectionDivider title="Processo seletivo" />

            <FormInput
              label="Data de comunicação de aprovação"
              type="date"
              value={form.dataComunicacaoAprovacao}
              onChange={handleChange("dataComunicacaoAprovacao")}
            />

            <FormSelect
              label="Status SS"
              options={STATUS_SS}
              value={form.statusSS}
              onChange={handleChange("statusSS")}
            />

            <FormInput
              label="Data de convocação"
              type="date"
              value={form.dataConvocacao}
              onChange={handleChange("dataConvocacao")}
            />

            <FormSelect
              label="Status da matrícula"
              options={STATUS_MATRICULA}
              value={form.statusMatricula}
              onChange={handleChange("statusMatricula")}
            />

            <SectionDivider title="Secretaria" />

            <FormInput
              label="Data da 1ª ação"
              type="date"
              value={form.secretariaDataAcao1}
              onChange={handleChange("secretariaDataAcao1")}
            />

            <FormInput
              label="Ações"
              type="text"
              value={form.secretariaAcao1}
              onChange={handleChange("secretariaAcao1")}
              placeholder="Descreva a ação realizada"
            />

            <FormInput
              label="Data da 2ª ação"
              type="date"
              value={form.secretariaDataAcao2}
              onChange={handleChange("secretariaDataAcao2")}
            />

            <FormSelect
              label="Ação realizada"
              options={SIM_NAO}
              value={form.secretariaRealizada}
              onChange={handleChange("secretariaRealizada")}
            />

            <FormInput
              label="Data da 3ª ação"
              type="date"
              value={form.secretariaDataAcao3}
              onChange={handleChange("secretariaDataAcao3")}
            />

            <FormTextarea
              label="Observações da secretaria"
              rows={4}
              colSpan2
              value={form.secretariaObservacoes}
              onChange={handleChange("secretariaObservacoes")}
              placeholder="Observações internas da secretaria"
            />

            <SectionDivider title="Financeiro" />

            <FormInput
              label="Data da 1ª ação financeira"
              type="date"
              value={form.financeiroDataAcao1}
              onChange={handleChange("financeiroDataAcao1")}
            />

            <FormSelect
              label="Ação realizada"
              options={SIM_NAO}
              value={form.financeiroRealizada}
              onChange={handleChange("financeiroRealizada")}
            />

            <FormInput
              label="Data da 2ª ação financeira"
              type="date"
              value={form.financeiroDataAcao2}
              onChange={handleChange("financeiroDataAcao2")}
            />

            <FormInput
              label="Data da 3ª ação financeira"
              type="date"
              value={form.financeiroDataAcao3}
              onChange={handleChange("financeiroDataAcao3")}
            />

            <FormTextarea
              label="Observações financeiras"
              rows={4}
              colSpan2
              value={form.financeiroObservacoes}
              onChange={handleChange("financeiroObservacoes")}
              placeholder="Observações do financeiro"
            />

            <SectionDivider title="Histórico de ocorrências" />

            <FormTextarea
              label="Histórico de ocorrências"
              rows={5}
              colSpan2
              value={form.historicoOcorrencias}
              onChange={handleChange("historicoOcorrencias")}
              placeholder="Registro completo de movimentações, ocorrências e observações do processo"
            />

            <div className="md:col-span-2">
              <FileUpload />
            </div>

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
