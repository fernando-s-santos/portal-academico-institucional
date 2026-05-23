export default function StatusBadge({ status }) {
  const estilos = {
    Pendente: "bg-yellow-100 text-yellow-800",
    "Em análise": "bg-blue-100 text-blue-800",
    Aprovado: "bg-green-100 text-green-800",
    Reprovado: "bg-red-100 text-red-800",
    Concluído: "bg-gray-200 text-gray-800",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${estilos[status] || "bg-gray-100 text-gray-700"}
      `}
    >
      {status}
    </span>
  );
}