import {
  ClipboardList,
  Repeat,
  FileCheck,
  Undo2,
  GraduationCap,
  BookOpen,
} from "lucide-react";

export const processos = [
  {
    codigo: "TRX",
    titulo: "Transferência Externa",
    icon: <Repeat size={34} />,
  },

  {
    codigo: "TRT",
    titulo: "Transferência Interna",
    icon: <Repeat size={34} />,
  },

  {
    codigo: "PDD",
    titulo: "Portador de Diploma",
    icon: <GraduationCap size={34} />,
  },

  {
    codigo: "DES",
    titulo: "Destrancamento",
    icon: <Undo2 size={34} />,
  },

  {
    codigo: "RAC",
    titulo: "Retorno ao Curso",
    icon: <BookOpen size={34} />,
  },

  {
    codigo: "ICH",
    titulo: "Integralização CH",
    icon: <ClipboardList size={34} />,
  },

  {
    codigo: "REA",
    titulo: "Regime Especial de Avaliação",
    icon: <FileCheck size={34} />,
  },

  {
    codigo: "DPE",
    titulo: "Dependência Especial",
    icon: <ClipboardList size={34} />,
  },
];