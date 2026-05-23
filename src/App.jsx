import { useEffect, useState } from "react";
import { fichasMock } from "./data/mockData";
import Home from "./pages/Home";
import ConsultaProcesso from "./pages/ConsultaProcesso";
import ReaForm from "./pages/ReaForm";
import DpeForm from "./pages/DpeForm";
import TrxForm from "./pages/TrxForm";
import TrtForm from "./pages/TrtForm";
import PddForm from "./pages/PddForm";
import DesForm from "./pages/DesForm";
import RacForm from "./pages/RacForm";
import IchForm from "./pages/IchForm";

function FormularioNaoConfigurado({ processo, voltar }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-xl text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Formulário ainda não configurado
        </h1>

        <p className="text-gray-500 mb-6">
          O processo <strong>{processo?.codigo}</strong> já está cadastrado no portal,
          mas o formulário específico ainda será criado.
        </p>

        <button
          onClick={voltar}
          className="px-5 py-3 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition"
        >
          Voltar para consulta
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [processoAtual, setProcessoAtual] = useState(null);
  const [modo, setModo] = useState("home");
  const [fichas, setFichas] = useState(() => {
    const fichasSalvas = localStorage.getItem("fichas-academicas");

    if (fichasSalvas) {
      return JSON.parse(fichasSalvas);
    }

    return fichasMock;
  });

  useEffect(() => {
    localStorage.setItem("fichas-academicas", JSON.stringify(fichas));
  }, [fichas]);

  function abrirProcesso(processo) {
    setProcessoAtual(processo);
    setModo("consulta");
  }

  function voltarHome() {
    setProcessoAtual(null);
    setModo("home");
  }

  function abrirNovaSolicitacao() {
    setModo("formulario");
  }

  function abrirFicha(ficha) {
    alert(`Ficha selecionada: ${ficha.processo} - ${ficha.aluno}`);
  }

  function salvarFicha(novaFicha) {
    const fichaComData = {
      ...novaFicha,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    setFichas((fichasAtuais) => [...fichasAtuais, fichaComData]);
    setModo("consulta");
  }

  function excluirFicha(indexGlobal) {
    const confirmar = confirm("Deseja realmente excluir esta ficha?");

    if (!confirmar) return;

    setFichas((fichasAtuais) =>
      fichasAtuais.filter((_, index) => index !== indexGlobal)
    );
  }

  function voltarConsulta() {
    setModo("consulta");
  }

  if (modo === "consulta" && processoAtual) {
    return (
      <ConsultaProcesso
        processo={processoAtual}
        voltar={voltarHome}
        novaSolicitacao={abrirNovaSolicitacao}
        abrirFicha={abrirFicha}
        excluirFicha={excluirFicha}
        fichas={fichas}
      />
    );
  }

  if (modo === "formulario" && processoAtual?.codigo === "REA") {
    return <ReaForm voltar={voltarConsulta} salvarFicha={salvarFicha} />;
  }

  if (modo === "formulario" && processoAtual?.codigo === "DPE") {
    return <DpeForm voltar={voltarConsulta} salvarFicha={salvarFicha} />;
  }

  if (modo === "formulario" && processoAtual?.codigo === "TRX") {
    return <TrxForm voltar={voltarConsulta} salvarFicha={salvarFicha} />;
  }

  if (modo === "formulario" && processoAtual?.codigo === "PDD") {
    return <PddForm voltar={voltarConsulta} salvarFicha={salvarFicha} />;
  }

  if (modo === "formulario" && processoAtual?.codigo === "TRT") {
    return <TrtForm voltar={voltarConsulta} salvarFicha={salvarFicha} />;
  }

  if (modo === "formulario" && processoAtual?.codigo === "DES") {
    return <DesForm voltar={voltarConsulta} salvarFicha={salvarFicha} />;
  }

  if (modo === "formulario" && processoAtual?.codigo === "RAC") {
    return <RacForm voltar={voltarConsulta} salvarFicha={salvarFicha} />;
  }

  if (modo === "formulario" && processoAtual?.codigo === "ICH") {
    return <IchForm voltar={voltarConsulta} salvarFicha={salvarFicha} />;
  }

  if (modo === "formulario" && processoAtual) {
    return (
      <FormularioNaoConfigurado
        processo={processoAtual}
        voltar={voltarConsulta}
      />
    );
  }

  return <Home abrirProcesso={abrirProcesso} />;
}