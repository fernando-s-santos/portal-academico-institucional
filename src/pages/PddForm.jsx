import {useState} from "react";
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
  "Aguardando documentos",
  "Análise coordenação de curso",
  "Aprovado",
  "Cancelamento de curso Senac",
  "Cancelado",
  "Concluído",
  "Convocado para matrícula",
  "Desistência pelo candidato",
  "Documentos entregues",
  "Documentos pendentes",
  "Encaminhado processo seletivo",
  "Em análise",
  "Envio de comunicação de aprovação",
  "Lançamento no sistema",
  "Pendente",
  "Recebido DAC",
  "Reconvoção",
  "Reprovado",
  "Vagas esgotadas - reprovado",
];

const CURSOS_PRETENDIDOS = [
  "",
  "ADS",
  "Administração",
  "Design Gráfico",
  "Moda",
  "Arquitetura",
  "Publicidade e Propaganda",
];

const TURNOS = ["Manhã", "Tarde", "Noite"];
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
  "Diploma de graduação",
  "Histórico escolar da graduação",
  "Conteúdo programático",
  "RG",
  "CPF",
  "Foto",
  "Certificado de conclusão do ensino médio",
  "Comprovante de residência",
];

const ESTADO_INICIAL = {
  semestre: "2026-1",
  status: "Selecione o Status atual",
  aluno: "",
  idAluno: "",
  email: "",
  telefone: "",
  instituicaoFormacao: "",
  cursoFormacao: "",
  anoConclusao: "",
  cursoPretendido: "",
  turnoPretendido: "Manhã",
  coordenador: "",
  nrInscricao: "",
  dataInscricao: "",
  envioDAC: "",
  recebidoDAC: "",
  dataLimiteAnalise: "",
  periodoIndicado: "",
  parecerCoordenacao: "",
  dataComunicacaoAprovacao: "",
  statusSS: "Em análise",
  dataConvocacao: "",
  statusMatricula: "Pendente",
  documentos: [],
  criadoPor: "",
  dataCriacao: "",
  modificadoPor: "",
  dataModificacao: "",
};

export default function PddForm({ voltar, salvarFicha }) {
  const [form, setForm] = useState(ESTADO_INICIAL);

  function handleChange(campo) {
    return (e) => setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  }

  function toggleDocumento(doc) {
    setForm((prev) => ({
      ...prev,
      documentos: prev.documentos.includes(doc)
        ? prev.documentos.filter((d) => d !== doc)
        : [...prev.documentos, doc],
    }));
  }

  function salvarSolicitacao() {
    const camposObrigatorios = [
      form.aluno,
      form.idAluno,
      form.cursoPretendido,
    ];

    const invalido =
      camposObrigatorios.some((campo) => !campo.trim()) ||
      form.status === "Selecione o Status atual";

    if (invalido) {
      alert("Preencha candidato, ID/RA, curso pretendido e status antes de salvar.");
      return;
    }

    salvarFicha({
      processo: "PDD",
      semestre: form.semestre,
      idAluno: form.idAluno,
      aluno: form.aluno,
      curso: form.cursoPretendido,
      status: form.status,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Portador de Diploma"
        subtitle="PDD | Nova solicitação"
        onBack={voltar}
      />

      <main className="p-10">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800">
              Dados do Portador de Diploma
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Registre os dados do candidato, formação anterior, curso pretendido e documentação.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Semestre"
              options={SEMESTRES}
              value={form.semestre}
              onChange={handleChange("semestre")}
            />

            <FormReadOnly label="Processo" value="PDD" />

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
              placeholder="ID ou RA do candidato"
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

            <FormReadOnly
              label="Tipo de ingresso"
              value="Portador de Diploma"
            />

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

            <FormInput
              label="Instituição de formação"
              type="text"
              value={form.instituicaoFormacao}
              onChange={handleChange("instituicaoFormacao")}
              placeholder="Instituição onde concluiu a graduação"
            />

            <FormInput
              label="Curso de formação"
              type="text"
              value={form.cursoFormacao}
              onChange={handleChange("cursoFormacao")}
              placeholder="Curso concluído anteriormente"
            />

            <FormInput
              label="Ano de conclusão"
              type="text"
              value={form.anoConclusao}
              onChange={handleChange("anoConclusao")}
              placeholder="Ex: 2024"
            />

            <FormSelect
              label="Curso pretendido"
              options={[
                { value: "", label: "Selecione o curso pretendido" },
                ...CURSOS_PRETENDIDOS.filter(Boolean).map((curso) => ({
                  value: curso,
                  label: curso,
                })),
              ]}
              value={form.cursoPretendido}
              onChange={handleChange("cursoPretendido")}
            />

            <FormSelect
              label="Turno pretendido"
              options={TURNOS}
              value={form.turnoPretendido}
              onChange={handleChange("turnoPretendido")}
            />

            <FormInput
              label="Coordenador responsável"
              type="text"
              value={form.coordenador}
              onChange={handleChange("coordenador")}
              placeholder="Coordenador responsável pela análise"
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
              placeholder="Insira o parecer da coordenação"
            />

            <SectionDivider title="Processo seletivo / matrícula" />

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