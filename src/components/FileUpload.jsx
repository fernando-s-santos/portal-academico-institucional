import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";

export default function FileUpload() {
  const inputRef = useRef(null);
  const [arquivos, setArquivos] = useState([]);

  function selecionarArquivos(event) {
    const arquivosSelecionados = Array.from(event.target.files);

    setArquivos((arquivosAtuais) => [
      ...arquivosAtuais,
      ...arquivosSelecionados,
    ]);
  }

  function removerArquivo(index) {
    setArquivos((arquivosAtuais) =>
      arquivosAtuais.filter((_, i) => i !== index)
    );
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Anexos
      </label>

      <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 bg-blue-50 text-center">
        <Upload className="mx-auto text-blue-800 mb-3" size={36} />

        <p className="font-semibold text-gray-700">Upload de arquivos</p>

        <p className="text-sm text-gray-500 mt-1">
          PDFs, requerimentos, documentos e comprovantes.
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={selecionarArquivos}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="mt-4 px-5 py-2 rounded-xl bg-white border border-blue-200 text-blue-900 hover:bg-blue-100 transition"
        >
          Selecionar arquivo
        </button>
      </div>

      {arquivos.length > 0 && (
        <div className="mt-4 space-y-2">
          {arquivos.map((arquivo, index) => (
            <div
              key={`${arquivo.name}-${index}`}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-blue-900" />
                <div>
                  <p className="font-medium text-gray-800">{arquivo.name}</p>
                  <p className="text-xs text-gray-500">
                    {(arquivo.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removerArquivo(index)}
                className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}