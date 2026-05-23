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
  "Aberta",
  "Aberta - atribuição pendente",
  "Aberta - iniciada",
  "Aberta - iniciada / SGO",
  "Aprovado",
  "Aguardando chamado",
  "Aprovada coord doc.",
  "Cancelado",
  "Concluído",
  "Corrigido coordenador",
  "Correção",
  "Em análise",
  "Indeferida gestão acadêmica",
  "Pendente",
  "Reprovado",
  "Sem aluno matriculado",
  "Solicitada",
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

const TURNOS = ["Selecione o turno", "Manhã", "Tarde", "Noite"];

const DIAS_SEMANA = [
  "Selecione o dia da semana",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "EAD",
];

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

const SIM_NAO = ["Selecione", "Não", "Sim"];

const DEDICACOES = ["Selecione a dedicação", "Mensalista", "Horista"];

const ESTADO_INICIAL = {
  semestre: "2026-1",
  status: "Selecione o Status atual",

  disciplina: "",
  cargaHoraria: "",
  tipoSolicitacao: "",
  curso: "",
  programa: "",
  turno: "Selecione o turno",
  grupoExigencia: "",
  curriculo: "",
  periodoDisciplina: "",
  idComponente: "",
  componenteEletivo: "Selecione",
  chamado: "",

  coordenador: "",
  professor: "",
  dedicacao: "Selecione a dedicação",
  diaSemana: "Selecione o dia da semana",
  horario: "",

  observacaoSolicitante: "",

  sigla: "",
  oferta: "",
  bloco: "",
  aula: "",
  desmembramento: "Selecione",
  parecerCG: "",
  parecerCoordenacao: "",
};

export default function DpeForm({ voltar, salvarFicha }) {
  const [form, setForm] = useState(ESTADO_INICIAL);

  function handleChange(campo) {
    return (e) =>
      setForm((prev) => ({
        ...prev,
        [campo]: e.target.value,
      }));
  }

  function salvarSolicitacao() {
    const obrigatorios = [
      form.disciplina,
      form.curso,
      form.professor,
    ];

    const invalido =
      obrigatorios.some((campo) => !campo.trim()) ||
      form.status === "Selecione o Status atual";

    if (invalido) {
      alert("Preencha disciplina, curso, professor e status antes de salvar.");
      return;
    }

    salvarFicha({
      processo: "DPE",
      semestre: form.semestre,
      idAluno: "-",
      aluno: form.disciplina,
      curso: form.curso,
      status: form.status,
      professor: form.professor,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Dependência Especial"
        subtitle="DPE | Nova solicitação"
        onBack={voltar}
      />

      <main className="p-10">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800">
              Formulário de Solicitação de Abertura de DP
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Preencha os dados da disciplina, curso, professor e organização acadêmica.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Semestre"
              options={SEMESTRES}
              value={form.semestre}
              onChange={handleChange("semestre")}
            />

            <FormReadOnly label="Processo" value="DPE" />

            <FormSelect
              label="Status"
              options={STATUS_OPTIONS}
              value={form.status}
              onChange={handleChange("status")}
            />

            <SectionDivider title="Dados da disciplina" />

            <FormInput
              label="Disciplina"
              type="text"
              colSpan2
              value={form.disciplina}
              onChange={handleChange("disciplina")}
              placeholder="Nome completo da disciplina"
            />

            <FormInput
              label="Carga horária"
              type="text"
              value={form.cargaHoraria}
              onChange={handleChange("cargaHoraria")}
              placeholder="Ex: 80h"
            />

            <FormInput
              label="Tipo de solicitação"
              type="text"
              value={form.tipoSolicitacao}
              onChange={handleChange("tipoSolicitacao")}
              placeholder="Tipo de solicitação"
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
              label="Programa"
              type="text"
              value={form.programa}
              onChange={handleChange("programa")}
              placeholder="Programa"
            />

            <FormSelect
              label="Turno"
              options={TURNOS}
              value={form.turno}
              onChange={handleChange("turno")}
            />

            <FormInput
              label="Grupo de exigência"
              type="text"
              value={form.grupoExigencia}
              onChange={handleChange("grupoExigencia")}
              placeholder="Grupo de exigência"
            />

            <FormInput
              label="Currículo"
              type="text"
              value={form.curriculo}
              onChange={handleChange("curriculo")}
              placeholder="Currículo"
            />

            <FormSelect
              label="Período da disciplina"
              options={[
                { value: "", label: "Selecione o período" },
            
                ...PERIODOS_INDICADOS.map((periodo) => ({
                    value: periodo,
                    label: periodo,
                })),
              ]}
              value={form.periodoDisciplina}
              onChange={handleChange("periodoDisciplina")}
            />

            <FormInput
              label="ID Componente Curricular"
              type="text"
              value={form.idComponente}
              onChange={handleChange("idComponente")}
              placeholder="ID do componente"
            />

            <FormSelect
              label="Componente eletivo"
              options={SIM_NAO}
              value={form.componenteEletivo}
              onChange={handleChange("componenteEletivo")}
            />

            <FormInput
              label="Chamado"
              type="text"
              value={form.chamado}
              onChange={handleChange("chamado")}
              placeholder="Número do chamado"
            />

            <SectionDivider title="Docente e horário" />

            <FormInput
              label="Coordenador(a)"
              type="text"
              value={form.coordenador}
              onChange={handleChange("coordenador")}
              placeholder="Nome do coordenador"
            />

            <FormInput
              label="Professor(a)"
              type="text"
              value={form.professor}
              onChange={handleChange("professor")}
              placeholder="Nome do professor"
            />

            <FormSelect
              label="Dedicação"
              options={DEDICACOES}
              value={form.dedicacao}
              onChange={handleChange("dedicacao")}
            />

            <FormSelect
              label="Dia da semana"
              options={DIAS_SEMANA}
              value={form.diaSemana}
              onChange={handleChange("diaSemana")}
            />

            <FormInput
              label="Horário"
              type="text"
              value={form.horario}
              onChange={handleChange("horario")}
              placeholder="Ex: 19h às 22h"
            />

            <FormTextarea
              label="Observação do solicitante"
              rows={4}
              colSpan2
              value={form.observacaoSolicitante}
              onChange={handleChange("observacaoSolicitante")}
              placeholder="Insira observações do solicitante"
            />

            <SectionDivider title="Espaço reservado para Coordenação de Graduação" />

            <FormInput
              label="Sigla"
              type="text"
              value={form.sigla}
              onChange={handleChange("sigla")}
              placeholder="Ex: ADS"
            />

            <FormInput
              label="Oferta"
              type="text"
              value={form.oferta}
              onChange={handleChange("oferta")}
              placeholder="Informe a oferta"
            />

            <FormInput
              label="Bloco"
              type="text"
              value={form.bloco}
              onChange={handleChange("bloco")}
              placeholder="Informe o bloco"
            />

            <FormInput
              label="Aula"
              type="text"
              value={form.aula}
              onChange={handleChange("aula")}
              placeholder="Informe a aula"
            />

            <FormSelect
              label="Desmembramento"
              options={SIM_NAO}
              colSpan2
              value={form.desmembramento}
              onChange={handleChange("desmembramento")}
            />

            <FormTextarea
              label="Parecer CG"
              rows={4}
              colSpan2
              value={form.parecerCG}
              onChange={handleChange("parecerCG")}
              placeholder="Parecer da Coordenação de Graduação"
            />

            <FormTextarea
              label="Parecer da coordenação"
              rows={4}
              colSpan2
              value={form.parecerCoordenacao}
              onChange={handleChange("parecerCoordenacao")}
              placeholder="Espaço reservado para parecer"
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
