import { FileSpreadsheet } from "lucide-react";

export default function ExportCsvButton({ dados, nomeArquivo = "relacao-fichas" }) {
  function exportarCSV() {
    if (!dados || dados.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const cabecalhos = [
      "Processo",
      "Semestre",
      "ID / Código",
      "Referência",
      "Curso",
      "Status",
      "Data",
    ];

    const linhas = dados.map((item) => [
      item.processo || "",
      item.semestre || "",
      item.idAluno || item.codigoReferencia || "-",
      item.aluno || item.referencia || "",
      item.curso || "",
      item.status || "",
      item.data || "",
    ]);

    const escaparCSV = (valor) => {
      const texto = String(valor ?? "");
      return `"${texto.replace(/"/g, '""')}"`;
    };

    const conteudoCSV = [
      cabecalhos.map(escaparCSV).join(";"),
      ...linhas.map((linha) => linha.map(escaparCSV).join(";")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + conteudoCSV], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${nomeArquivo}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={exportarCSV}
      className="border border-blue-900 text-blue-900 px-5 py-3 rounded-xl hover:bg-blue-50 transition flex items-center gap-2"
    >
      <FileSpreadsheet size={18} />
      Exportar relação
    </button>
  );
}