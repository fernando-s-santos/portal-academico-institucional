import { useState } from "react";
import { Save } from "lucide-react";
import Header from "../components/Header";
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
  "Concluído",
  "Corrigido pelo professor(a)",
  "Correção",
  "Deferida",
  "Em análise",
  "Indeferida",
  "Pendente",
  "Abertura de Solicitação",
];

const TIPOS_COMPENSACAO = [
  "",
  "Reposição",
  "Complementação",
  "Alteração de data",
  "Inclusão de data",
  "Retirada de data",
];

const DEDICACOES = ["Selecione a dedicação", "Horista", "Mensalista"];

const CURSOS = [
  "Selecione o curso",
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

  disciplina: "",
  numeroAula: "",
  tipoCompensacao: "",

  nomeDocente: "",
  idDocente: "",
  dedicacao: "Selecione a dedicação",

  curso: "",
  coordenador: "",

  retirarData: "",
  retirarHoraInicio: "",
  retirarHoraTermino: "",

  incluirData: "",
  incluirHoraInicio: "",
  incluirHoraTermino: "",

  outrasDatas: "",
  justificativa: "",
  parecer: "",
};

export default function IchForm({ voltar, salvarFicha }) {
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
      form.nomeDocente,
      form.idDocente,
      form.curso,
      form.tipoCompensacao,
    ];

    const invalido =
      obrigatorios.some((campo) => !campo.trim()) ||
      form.status === "Selecione o Status atual";

    if (invalido) {
      alert(
        "Preencha disciplina, docente, ID docente, curso, tipo de compensação e status antes de salvar."
      );
      return;
    }

    salvarFicha({
      processo: "ICH",
      semestre: form.semestre,
      idAluno: form.idDocente,
      aluno: form.nomeDocente,
      curso: form.curso,
      status: form.status,
      disciplina: form.disciplina,
      tipoCompensacao: form.tipoCompensacao,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Inclusão e Alteração de Data"
        subtitle="ICH | Nova solicitação"
        onBack={voltar}
      />

      <main className="p-10">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800">
              Solicitação de Inclusão e Alteração de Data no Senac Solution | Carga Horária
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Registre disciplina, docente, compensação, datas, horários, justificativa e parecer.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Semestre"
              options={SEMESTRES}
              value={form.semestre}
              onChange={handleChange("semestre")}
            />

            <FormReadOnly label="Processo" value="ICH" />

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
              placeholder="Nome da disciplina"
            />

            <FormInput
              label="Nº aula"
              type="text"
              value={form.numeroAula}
              onChange={handleChange("numeroAula")}
              placeholder="Número da aula"
            />

            <FormSelect
              label="Tipo de compensação"
              options={[
                { value: "", label: "Selecione" },
                ...TIPOS_COMPENSACAO.filter(Boolean).map((tipo) => ({
                  value: tipo,
                  label: tipo,
                })),
              ]}
              value={form.tipoCompensacao}
              onChange={handleChange("tipoCompensacao")}
            />

            <SectionDivider title="Docente e curso" />

            <FormInput
              label="Nome docente"
              type="text"
              value={form.nomeDocente}
              onChange={handleChange("nomeDocente")}
              placeholder="Nome do docente"
            />

            <FormInput
              label="ID docente"
              type="text"
              value={form.idDocente}
              onChange={handleChange("idDocente")}
              placeholder="ID do docente"
            />

            <FormSelect
              label="Dedicação"
              options={DEDICACOES}
              value={form.dedicacao}
              onChange={handleChange("dedicacao")}
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
              label="Coordenador(a) do curso"
              type="text"
              colSpan2
              value={form.coordenador}
              onChange={handleChange("coordenador")}
              placeholder="Nome do coordenador"
            />

            <SectionDivider title="Data a retirar" />

            <FormInput
              label="Retirar data"
              type="date"
              value={form.retirarData}
              onChange={handleChange("retirarData")}
            />

            <FormInput
              label="Hora de início"
              type="time"
              value={form.retirarHoraInicio}
              onChange={handleChange("retirarHoraInicio")}
            />

            <FormInput
              label="Hora de término"
              type="time"
              value={form.retirarHoraTermino}
              onChange={handleChange("retirarHoraTermino")}
            />

            <SectionDivider title="Data a incluir" />

            <FormInput
              label="Incluir data"
              type="date"
              value={form.incluirData}
              onChange={handleChange("incluirData")}
            />

            <FormInput
              label="Hora de início"
              type="time"
              value={form.incluirHoraInicio}
              onChange={handleChange("incluirHoraInicio")}
            />

            <FormInput
              label="Hora de término"
              type="time"
              value={form.incluirHoraTermino}
              onChange={handleChange("incluirHoraTermino")}
            />

            <FormTextarea
              label="Outras datas e horários"
              rows={4}
              colSpan2
              value={form.outrasDatas}
              onChange={handleChange("outrasDatas")}
              placeholder="Caso ocorra em mais de uma data, descreva as demais datas e horários."
            />

            <SectionDivider title="Justificativa e parecer" />

            <FormTextarea
              label="Justificativa do professor(a)"
              rows={5}
              colSpan2
              value={form.justificativa}
              onChange={handleChange("justificativa")}
              placeholder="Informe a justificativa da solicitação"
            />

            <FormTextarea
              label="Parecer da Coordenação"
              rows={5}
              colSpan2
              value={form.parecer}
              onChange={handleChange("parecer")}
              placeholder="Parecer da análise"
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
