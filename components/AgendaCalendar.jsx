"use client";

import { useEffect, useRef, useState } from "react";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6Xp4UtF4OQO2PyaUbSMRlRYZrQavHVZhkSoxHfkBBfxM9ok6WWQR8mM-Pae6eXzjgpj9wJSo4bPb9/pub?output=csv";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const HORARIOS = [
  "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  "00:00", "01:00", "02:00", "03:00",
];

const DURACAO_HORAS = 4;

const TIPOS_EVENTO = [
  { id: "casamento", emoji: "💍", nome: "Casamento", desc: "Cerimônia e recepção" },
  { id: "formatura", emoji: "🎓", nome: "Formatura", desc: "Colações e festas" },
  { id: "publico", emoji: "🏛️", nome: "Evento Público", desc: "Prefeituras e festivais" },
  { id: "aniversario", emoji: "🎉", nome: "Aniversário", desc: "Festas e comemorações" },
  { id: "corporativo", emoji: "🏢", nome: "Corporativo", desc: "Empresas e eventos" },
  { id: "confraternizacao", emoji: "🍻", nome: "Confraternização", desc: "Encontros e festas" },
  { id: "particular", emoji: "🎊", nome: "Evento Particular", desc: "Eventos privados" },
];

const FORMACOES = [
  { id: "acustico_solo", emoji: "🎸", nome: "Acústico Solo", desc: "Voz e violão" },
  { id: "acustico_dupla", emoji: "🎸", nome: "Acústico Dupla", desc: "2 vozes, violão e sanfona" },
  { id: "acustico_trio", emoji: "🎸", nome: "Acústico Trio", desc: "2 vozes, violão, sanfona e cajón" },
  { id: "banda_sem_luz", emoji: "🎤", nome: "Banda Completa", desc: "Sem luz e som" },
  { id: "banda_com_luz", emoji: "🎤", nome: "Banda Completa", desc: "Com luz e som" },
];

const PACOTES_ESPECIAIS = [
  {
    id: "standard",
    emoji: "💎",
    nome: "STANDARD",
    subtitulo: "O essencial",
    itens: [
      "Show com banda completa (6 integrantes)",
      "Duração de 3 horas",
    ],
  },
  {
    id: "premium",
    emoji: "👑",
    nome: "PREMIUM",
    subtitulo: "A experiência completa",
    itens: [
      "Show com banda completa (6 integrantes)",
      "Duração de 3 horas",
      "Show extra no jantar dos padrinhos (1h30, 3 integrantes)",
    ],
  },
  {
    id: "gold",
    emoji: "🏆",
    nome: "GOLD",
    subtitulo: "O inesquecível",
    itens: [
      "Show com banda completa (6 integrantes)",
      "Duração de 3 horas",
      "Show acústico extra no jantar dos padrinhos",
      "Equipamentos de som e estrutura",
      "Equipamentos de iluminação",
      "Registros fotográficos profissionais",
    ],
  },
];

const EVENTOS_COM_PACOTE = ["casamento", "formatura", "publico"];
const DIAS_FIM_DE_SEMANA = [4, 5, 6, 0];

const COR = {
  douradoClaro: "#f5d76e",
  dourado: "#d4af37",
  douradoEscuro: "#8c6b1f",
  verdeEsmeralda: "#16a34a",
  verdeEsmeraldaClaro: "#22c55e",
  textoDourado: "#f5d76e",
  bgCard: "rgba(245,215,110,0.04)",
  bgCardSelecionado: "rgba(245,215,110,0.18)",
  bordaDourada: "rgba(245,215,110,0.35)",
  bordaDouradaSutil: "rgba(245,215,110,0.22)",
  bordaSuave: "rgba(255,255,255,0.12)",
};

export default function AgendaCalendar() {
  const [agenda, setAgenda] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());

  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [tipoEvento, setTipoEvento] = useState(null);
  const [pacote, setPacote] = useState(null);
  const [formacao, setFormacao] = useState(null);
  const [horario, setHorario] = useState(null);
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [obs, setObs] = useState("");

  // 🆕 Estado da tela de sucesso
  const [enviado, setEnviado] = useState(false);
  const [dadosEnviados, setDadosEnviados] = useState(null);

  const secaoEventoRef = useRef(null);
  const secaoPacoteRef = useRef(null);
  const secaoHorarioRef = useRef(null);
  const secaoDadosRef = useRef(null);
  const telaSucessoRef = useRef(null);

  function scrollPara(ref) {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  }

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((texto) => {
        const linhas = texto.trim().split("\n");
        const cabecalho = linhas[0].split(",").map((c) => c.trim());
        const dados = {};

        for (let i = 1; i < linhas.length; i++) {
          const valores = linhas[i].split(",");
          const linha = {};
          cabecalho.forEach((col, idx) => {
            linha[col] = (valores[idx] || "").trim();
          });
          if (linha.data && linha.hora) {
            const chave = `${linha.data}_${linha.hora}`;
            dados[chave] = linha.status === "ocupado";
          }
        }

        setAgenda(dados);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar a agenda.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (dataSelecionada && !enviado) scrollPara(secaoEventoRef);
  }, [dataSelecionada]);

  useEffect(() => {
    if (tipoEvento && !enviado) scrollPara(secaoPacoteRef);
  }, [tipoEvento]);

  useEffect(() => {
    if ((pacote || formacao) && !enviado) scrollPara(secaoHorarioRef);
  }, [pacote, formacao]);

  useEffect(() => {
    if (horario && !enviado) scrollPara(secaoDadosRef);
  }, [horario]);

  // 🆕 Scroll para a tela de sucesso quando envia
  useEffect(() => {
    if (enviado) {
      scrollPara(telaSucessoRef);
    }
  }, [enviado]);

  function mesAnterior() {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  }

  function mesProximo() {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  }

  function formatarData(dia) {
    const mes = String(mesAtual + 1).padStart(2, "0");
    const d = String(dia).padStart(2, "0");
    return `${anoAtual}-${mes}-${d}`;
  }

  function formatarDataBR(dataStr) {
    const [a, m, d] = dataStr.split("-");
    return `${d}/${m}/${a}`;
  }

  function ehDataPassada(dia, mes, ano) {
    const d = new Date(ano, mes, dia);
    d.setHours(0, 0, 0, 0);
    const hojeZero = new Date();
    hojeZero.setHours(0, 0, 0, 0);
    return d < hojeZero;
  }

  function horarioBloqueado(dataStr, horaStr) {
    const [ano, mes, dia] = dataStr.split("-").map(Number);
    const [h, min] = horaStr.split(":").map(Number);

    for (let i = 0; i < DURACAO_HORAS; i++) {
      const d = new Date(ano, mes - 1, dia, h - i, min);
      const anoStr = d.getFullYear();
      const mesStr = String(d.getMonth() + 1).padStart(2, "0");
      const diaStr = String(d.getDate()).padStart(2, "0");
      const horaStr2 = String(d.getHours()).padStart(2, "0") + ":00";
      const chave = `${anoStr}-${mesStr}-${diaStr}_${horaStr2}`;
      if (agenda[chave]) return true;
    }
    return false;
  }

  function diaTemAlgumLivre(dataStr) {
    return HORARIOS.some((h) => !horarioBloqueado(dataStr, h));
  }

  function diaTemEvento(dataStr) {
    return HORARIOS.some((h) => horarioBloqueado(dataStr, h));
  }

  function gerarDias() {
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
    const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const dias = [];
    for (let i = 0; i < primeiroDia; i++) dias.push(null);
    for (let d = 1; d <= totalDias; d++) dias.push(d);
    return dias;
  }

  function resetarSelecoes() {
    setTipoEvento(null);
    setPacote(null);
    setFormacao(null);
    setHorario(null);
    setNome("");
    setCidade("");
    setObs("");
  }

  function selecionarDia(dia) {
    const dataStr = formatarData(dia);
    if (ehDataPassada(dia, mesAtual, anoAtual)) return;
    if (!diaTemAlgumLivre(dataStr)) return;
    setDataSelecionada(dataStr);
    resetarSelecoes();
    setEnviado(false);
  }

  function eventoUsaPacote() {
    return EVENTOS_COM_PACOTE.includes(tipoEvento);
  }

  function gerarMensagem(dados) {
    if (!dados) return "";
    const {
      data,
      horario: h,
      tipoEvento: te,
      pacote: pac,
      formacao: form,
      nome: n,
      cidade: c,
      obs: o,
    } = dados;

    const tipo = TIPOS_EVENTO.find((t) => t.id === te);
    const linhas = [];

    linhas.push("🎸 *NOVA SOLICITAÇÃO DE CONTRATAÇÃO*");
    linhas.push("");
    linhas.push(`▸ *Data:* ${formatarDataBR(data)}`);
    linhas.push(`▸ *Horário:* ${h}`);
    linhas.push(`▸ *Tipo de evento:* ${tipo?.nome || ""}`);

    if (EVENTOS_COM_PACOTE.includes(te)) {
      const pacoteObj = PACOTES_ESPECIAIS.find((p) => p.id === pac);
      if (pacoteObj) linhas.push(`▸ *Pacote:* ${pacoteObj.nome}`);
    } else {
      const formacaoObj = FORMACOES.find((f) => f.id === form);
      if (formacaoObj)
        linhas.push(`▸ *Formação:* ${formacaoObj.nome} (${formacaoObj.desc})`);
    }

    if (n) linhas.push(`▸ *Nome:* ${n}`);
    if (c) linhas.push(`▸ *Cidade:* ${c}`);
    if (o) linhas.push(`▸ *Observações:* ${o}`);

    linhas.push("");
    linhas.push("Aguardo contato para orçamento!");

    return linhas.join("\n");
  }

  function montarURLWhatsApp(dados) {
    const msg = gerarMensagem(dados);
    const textoCodificado = encodeURI(msg)
      .replace(/#/g, "%23")
      .replace(/&/g, "%26");
    return `https://wa.me/5535991538017?text=${textoCodificado}`;
  }

  function enviarWhatsApp() {
    const dados = {
      data: dataSelecionada,
      horario,
      tipoEvento,
      pacote,
      formacao,
      nome,
      cidade,
      obs,
    };

    setDadosEnviados(dados);
    setEnviado(true);

    const url = montarURLWhatsApp(dados);
    window.open(url, "_blank");
  }

  function reabrirWhatsApp() {
    if (!dadosEnviados) return;
    const url = montarURLWhatsApp(dadosEnviados);
    window.open(url, "_blank");
  }

  function fazerNovoPedido() {
    setEnviado(false);
    setDadosEnviados(null);
    setDataSelecionada(null);
    resetarSelecoes();
  }

  const podeEnviar =
    dataSelecionada &&
    tipoEvento &&
    horario &&
    nome.trim() !== "" &&
    cidade.trim() !== "" &&
    (eventoUsaPacote() ? !!pacote : !!formacao);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", opacity: 0.7 }}>
        📅 Carregando agenda...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#ef4444" }}>
        {error}
      </div>
    );
  }

  // ============================================
  // 🎉 TELA DE SUCESSO
  // ============================================
  if (enviado && dadosEnviados) {
    const tipo = TIPOS_EVENTO.find((t) => t.id === dadosEnviados.tipoEvento);
    const pac = PACOTES_ESPECIAIS.find((p) => p.id === dadosEnviados.pacote);
    const form = FORMACOES.find((f) => f.id === dadosEnviados.formacao);

    return (
      <div
        ref={telaSucessoRef}
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          width: "100%",
          padding: "40px 28px",
          background:
            "linear-gradient(145deg, rgba(20,15,5,0.75), rgba(0,0,0,0.7))",
          borderRadius: "22px",
          backdropFilter: "blur(16px)",
          border: `1px solid ${COR.bordaDourada}`,
          boxShadow:
            "0 15px 50px rgba(0,0,0,0.4), 0 0 80px rgba(245,215,110,0.15), inset 0 1px 0 rgba(245,215,110,0.15)",
          textAlign: "center",
          animation: "sucessoEntrada 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ✅ Ícone de check com animação */}
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 28px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COR.douradoClaro}, ${COR.dourado})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            color: "#111",
            fontWeight: "900",
            boxShadow:
              "0 0 40px rgba(245,215,110,0.5), 0 0 80px rgba(245,215,110,0.25)",
            animation: "checkPulse 2s ease infinite",
          }}
        >
          ✓
        </div>

        <h2
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "clamp(22px, 3.5vw, 32px)",
            letterSpacing: "3px",
            color: COR.textoDourado,
            marginBottom: "14px",
            textTransform: "uppercase",
            textShadow: "0 0 25px rgba(245,215,110,0.4)",
          }}
        >
          Solicitação Enviada!
        </h2>

        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.7",
            opacity: 0.85,
            marginBottom: "30px",
            letterSpacing: "0.4px",
          }}
        >
          Sua solicitação foi aberta no WhatsApp. Se a janela não abriu
          automaticamente, clique no botão abaixo.
        </p>

        {/* Linha decorativa */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(245,215,110,0.5), transparent)",
            marginBottom: "26px",
          }}
        />

        {/* 📋 Resumo do pedido */}
        <div
          style={{
            background: "rgba(0,0,0,0.35)",
            borderRadius: "16px",
            padding: "22px",
            border: `1px solid ${COR.bordaDouradaSutil}`,
            marginBottom: "28px",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              fontSize: "11px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: COR.textoDourado,
              fontFamily: "var(--font-cinzel), serif",
              marginBottom: "16px",
              textAlign: "center",
              opacity: 0.85,
            }}
          >
            Resumo do pedido
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <LinhaResumo label="Data" valor={formatarDataBR(dadosEnviados.data)} />
            <LinhaResumo label="Horário" valor={dadosEnviados.horario} />
            <LinhaResumo label="Evento" valor={tipo?.nome || ""} />
            {pac && <LinhaResumo label="Pacote" valor={pac.nome} />}
            {form && (
              <LinhaResumo label="Formação" valor={`${form.nome} — ${form.desc}`} />
            )}
            <LinhaResumo label="Nome" valor={dadosEnviados.nome} />
            <LinhaResumo label="Cidade" valor={dadosEnviados.cidade} />
            {dadosEnviados.obs && (
              <LinhaResumo label="Observações" valor={dadosEnviados.obs} />
            )}
          </div>
        </div>

        {/* 🔘 Botões de ação */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <button
            onClick={reabrirWhatsApp}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "2px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "#fff",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 8px 30px rgba(37,211,102,0.35)",
              fontFamily: "var(--font-inter), sans-serif",
              textTransform: "uppercase",
            }}
          >
            💬 Abrir WhatsApp novamente
          </button>

          <button
            onClick={fazerNovoPedido}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "2px",
              borderRadius: "14px",
              border: `1px solid ${COR.bordaDourada}`,
              cursor: "pointer",
              background: "rgba(245,215,110,0.05)",
              color: COR.textoDourado,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              fontFamily: "var(--font-inter), sans-serif",
              textTransform: "uppercase",
            }}
          >
            Fazer novo pedido
          </button>
        </div>

        <p
          style={{
            fontSize: "11px",
            opacity: 0.5,
            marginTop: "24px",
            fontStyle: "italic",
            letterSpacing: "0.5px",
          }}
        >
          Respondemos em até 24h úteis pelo WhatsApp
        </p>
      </div>
    );
  }

  // ============================================
  // 📅 CALENDÁRIO + FORMULÁRIO (fluxo normal)
  // ============================================
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", width: "100%" }}>

      {/* CALENDÁRIO */}
      <div
        style={{
          padding: "28px",
          background:
            "linear-gradient(145deg, rgba(20,15,5,0.75), rgba(0,0,0,0.65))",
          borderRadius: "22px",
          backdropFilter: "blur(16px)",
          border: `1px solid ${COR.bordaDourada}`,
          marginBottom: "24px",
          boxShadow:
            "0 15px 50px rgba(0,0,0,0.4), 0 0 60px rgba(245,215,110,0.06), inset 0 1px 0 rgba(245,215,110,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <button onClick={mesAnterior} style={estiloNavCalendario}>
            ←
          </button>

          <h3
            style={{
              margin: 0,
              fontSize: "21px",
              fontFamily: "var(--font-cinzel), serif",
              letterSpacing: "2.5px",
              color: COR.textoDourado,
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(245,215,110,0.3)",
            }}
          >
            {MESES[mesAtual]} {anoAtual}
          </h3>

          <button onClick={mesProximo} style={estiloNavCalendario}>
            →
          </button>
        </div>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(245,215,110,0.4), transparent)",
            marginBottom: "18px",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "6px",
            marginBottom: "10px",
          }}
        >
          {DIAS_SEMANA.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "rgba(245,215,110,0.65)",
                fontWeight: "600",
                letterSpacing: "2px",
                fontFamily: "var(--font-cinzel), serif",
                textTransform: "uppercase",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "6px",
          }}
        >
          {gerarDias().map((dia, idx) => {
            if (dia === null) {
              return <div key={`empty-${idx}`} />;
            }

            const dataStr = formatarData(dia);
            const passado = ehDataPassada(dia, mesAtual, anoAtual);
            const temLivre = diaTemAlgumLivre(dataStr);
            const temEvento = diaTemEvento(dataStr);
            const isSelecionado = dataSelecionada === dataStr;

            const dataObj = new Date(anoAtual, mesAtual, dia);
            const diaSemana = dataObj.getDay();
            const isFimDeSemana = DIAS_FIM_DE_SEMANA.includes(diaSemana);

            const clicavel = !passado && temLivre;

            let background;
            let color;
            let opacity = 1;
            let border = "none";
            let boxShadow = "none";
            let fontWeight = "600";

            if (passado) {
              background = "rgba(255,255,255,0.02)";
              color = "rgba(255,255,255,0.2)";
              opacity = 0.6;
              border = "1px solid rgba(255,255,255,0.04)";
            } else if (!temLivre) {
              background = "rgba(255,255,255,0.04)";
              color = "rgba(255,255,255,0.25)";
              opacity = 0.5;
              border = "1px solid rgba(255,255,255,0.05)";
            } else if (isSelecionado) {
              background = `linear-gradient(135deg, ${COR.douradoClaro}, ${COR.dourado})`;
              color = "#111";
              border = "2px solid #fff";
              boxShadow =
                "0 0 25px rgba(245,215,110,0.6), 0 0 50px rgba(245,215,110,0.3)";
              fontWeight = "800";
            } else {
              background = `linear-gradient(135deg, ${COR.verdeEsmeralda}, #15803d)`;
              color = "#fff";
              border = `1px solid ${COR.bordaDouradaSutil}`;
            }

            return (
              <div
                key={dia}
                onClick={() => selecionarDia(dia)}
                style={{
                  position: "relative",
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight,
                  background,
                  color,
                  border,
                  boxShadow,
                  cursor: clicavel ? "pointer" : "not-allowed",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity,
                }}
              >
                {dia}

                {passado && isFimDeSemana && (
                  <span
                    title="Show realizado"
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      fontSize: "10px",
                      fontWeight: "900",
                      background: COR.verdeEsmeraldaClaro,
                      color: "#fff",
                      borderRadius: "50%",
                      width: "14px",
                      height: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: 1,
                      boxShadow: "0 0 4px rgba(34,197,94,0.6)",
                    }}
                  >
                    ✓
                  </span>
                )}

                {!passado && temLivre && temEvento && !isSelecionado && (
                  <span
                    title="Este dia já tem evento marcado"
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: COR.douradoClaro,
                      boxShadow: `0 0 6px ${COR.douradoClaro}`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* LEGENDA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            marginTop: "24px",
            fontSize: "11px",
            flexWrap: "wrap",
            letterSpacing: "0.5px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "4px",
                background: `linear-gradient(135deg, ${COR.verdeEsmeralda}, #15803d)`,
                border: `1px solid ${COR.bordaDouradaSutil}`,
                display: "inline-block",
              }}
            />
            Livre
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                position: "relative",
                width: "14px",
                height: "14px",
                borderRadius: "4px",
                background: `linear-gradient(135deg, ${COR.verdeEsmeralda}, #15803d)`,
                border: `1px solid ${COR.bordaDouradaSutil}`,
                display: "inline-block",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "1px",
                  right: "1px",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: COR.douradoClaro,
                }}
              />
            </span>
            Já tem evento
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.06)",
                display: "inline-block",
              }}
            />
            Sem vaga
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "4px",
                background: `linear-gradient(135deg, ${COR.douradoClaro}, ${COR.dourado})`,
                display: "inline-block",
              }}
            />
            Selecionado
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                position: "relative",
                width: "14px",
                height: "14px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.03)",
                display: "inline-block",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-3px",
                  right: "-3px",
                  fontSize: "9px",
                  fontWeight: "900",
                  background: COR.verdeEsmeraldaClaro,
                  color: "#fff",
                  borderRadius: "50%",
                  width: "11px",
                  height: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </span>
            </span>
            Show realizado
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            opacity: 0.55,
            marginTop: "20px",
            fontStyle: "italic",
            letterSpacing: "0.5px",
            color: "rgba(245,215,110,0.6)",
          }}
        >
          Toque em uma data para ver as opções de contratação
        </p>
      </div>

      {/* FORMULÁRIO */}
      {dataSelecionada && (
        <div
          style={{
            padding: "28px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "22px",
            backdropFilter: "blur(16px)",
            border: `1px solid ${COR.bordaDourada}`,
            boxShadow:
              "0 15px 50px rgba(0,0,0,0.4), 0 0 60px rgba(245,215,110,0.05)",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: COR.textoDourado,
              fontSize: "18px",
              fontFamily: "var(--font-cinzel), serif",
              letterSpacing: "3px",
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(245,215,110,0.3)",
            }}
          >
            {formatarDataBR(dataSelecionada)}
          </h3>

          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(245,215,110,0.4), transparent)",
              marginBottom: "24px",
            }}
          />

          {/* ETAPA 1 */}
          <div ref={secaoEventoRef} style={{ marginBottom: "28px", scrollMarginTop: "20px" }}>
            <h4 style={estiloTituloEtapa}>1. Que tipo de evento?</h4>
            <div style={estiloGridCards}>
              {TIPOS_EVENTO.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setTipoEvento(t.id);
                    setPacote(null);
                    setFormacao(null);
                  }}
                  style={estiloCard(tipoEvento === t.id)}
                >
                  <div style={estiloCardEmoji}>{t.emoji}</div>
                  <div style={estiloCardNome}>{t.nome}</div>
                  <div style={estiloCardDesc}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ETAPA 2 — PACOTE */}
          {eventoUsaPacote() && (
            <div ref={secaoPacoteRef} style={{ marginBottom: "28px", scrollMarginTop: "20px" }}>
              <h4 style={estiloTituloEtapa}>2. Escolha o pacote</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "14px" }}>
                {PACOTES_ESPECIAIS.map((p) => {
                  const sel = pacote === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setPacote(p.id)}
                      style={{
                        padding: "20px",
                        borderRadius: "16px",
                        background: sel ? COR.bgCardSelecionado : COR.bgCard,
                        border: sel
                          ? `2px solid ${COR.douradoClaro}`
                          : `1px solid ${COR.bordaSuave}`,
                        cursor: "pointer",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        textAlign: "left",
                        boxShadow: sel ? `0 0 30px rgba(245,215,110,0.2)` : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          marginBottom: "12px",
                        }}
                      >
                        <span style={{ fontSize: "30px" }}>{p.emoji}</span>
                        <div>
                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "800",
                              letterSpacing: "2px",
                              fontFamily: "var(--font-cinzel), serif",
                              color: sel ? COR.douradoClaro : "#fff",
                            }}
                          >
                            {p.nome}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              opacity: 0.7,
                              fontStyle: "italic",
                              marginTop: "2px",
                            }}
                          >
                            {p.subtitulo}
                          </div>
                        </div>
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: "20px",
                          fontSize: "13px",
                          lineHeight: "1.8",
                          opacity: 0.9,
                        }}
                      >
                        {p.itens.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ETAPA 2 — FORMAÇÃO */}
          {tipoEvento && !eventoUsaPacote() && (
            <div ref={secaoPacoteRef} style={{ marginBottom: "28px", scrollMarginTop: "20px" }}>
              <h4 style={estiloTituloEtapa}>2. Escolha a formação</h4>
              <div style={estiloGridCards}>
                {FORMACOES.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setFormacao(f.id)}
                    style={estiloCard(formacao === f.id)}
                  >
                    <div style={estiloCardEmoji}>{f.emoji}</div>
                    <div style={estiloCardNome}>{f.nome}</div>
                    <div style={estiloCardDesc}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ETAPA 3 */}
          {tipoEvento && (eventoUsaPacote() ? pacote : formacao) && (
            <div ref={secaoHorarioRef} style={{ marginBottom: "28px", scrollMarginTop: "20px" }}>
              <h4 style={estiloTituloEtapa}>3. Escolha o horário</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
                  gap: "10px",
                }}
              >
                {HORARIOS.map((h) => {
                  const bloqueado = horarioBloqueado(dataSelecionada, h);
                  const sel = horario === h;
                  return (
                    <div
                      key={h}
                      onClick={() => !bloqueado && setHorario(h)}
                      style={{
                        padding: "12px 6px",
                        textAlign: "center",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        background: bloqueado
                          ? "rgba(255,255,255,0.04)"
                          : sel
                          ? `linear-gradient(135deg, ${COR.douradoClaro}, ${COR.dourado})`
                          : `linear-gradient(135deg, ${COR.verdeEsmeralda}, #15803d)`,
                        color: bloqueado
                          ? "rgba(255,255,255,0.25)"
                          : sel
                          ? "#111"
                          : "#fff",
                        border: bloqueado
                          ? `1px solid rgba(255,255,255,0.06)`
                          : sel
                          ? "2px solid #fff"
                          : `1px solid ${COR.bordaDouradaSutil}`,
                        cursor: bloqueado ? "not-allowed" : "pointer",
                        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                        opacity: bloqueado ? 0.5 : 1,
                        boxShadow: sel ? `0 0 25px rgba(245,215,110,0.35)` : "none",
                      }}
                    >
                      {h}
                    </div>
                  );
                })}
              </div>
              <p
                style={{
                  fontSize: "11px",
                  opacity: 0.55,
                  marginTop: "14px",
                  textAlign: "center",
                  lineHeight: "1.6",
                  letterSpacing: "0.5px",
                }}
              >
                Cada reserva ocupa {DURACAO_HORAS}h (show + logística)
              </p>
            </div>
          )}

          {/* ETAPA 4 */}
          {horario && (
            <div ref={secaoDadosRef} style={{ marginBottom: "28px", scrollMarginTop: "20px" }}>
              <h4 style={estiloTituloEtapa}>4. Seus dados</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={estiloInput}
                />
                <input
                  type="text"
                  placeholder="Cidade / Estado *"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  style={estiloInput}
                />
                <textarea
                  placeholder="Observações (opcional)"
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  rows={3}
                  style={{ ...estiloInput, resize: "vertical" }}
                />
              </div>
            </div>
          )}

          {/* ETAPA 5 */}
          {horario && (
            <button
              onClick={enviarWhatsApp}
              disabled={!podeEnviar}
              style={{
                width: "100%",
                padding: "18px",
                fontSize: "15px",
                fontWeight: "700",
                letterSpacing: "2px",
                borderRadius: "14px",
                border: "none",
                cursor: podeEnviar ? "pointer" : "not-allowed",
                background: podeEnviar
                  ? "linear-gradient(135deg, #25D366, #128C7E)"
                  : "rgba(255,255,255,0.08)",
                color: podeEnviar ? "#fff" : "rgba(255,255,255,0.4)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: podeEnviar
                  ? "0 8px 30px rgba(37,211,102,0.35)"
                  : "none",
                fontFamily: "var(--font-inter), sans-serif",
                textTransform: "uppercase",
              }}
            >
              💬 Enviar para WhatsApp
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============ COMPONENTE AUXILIAR ============

function LinhaResumo({ label, valor }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px",
        fontSize: "13px",
        paddingBottom: "10px",
        borderBottom: "1px solid rgba(245,215,110,0.08)",
      }}
    >
      <span
        style={{
          color: "rgba(245,215,110,0.75)",
          fontWeight: "600",
          letterSpacing: "0.8px",
          fontSize: "11px",
          textTransform: "uppercase",
          minWidth: "90px",
          paddingTop: "2px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          textAlign: "right",
          flex: 1,
          opacity: 0.95,
          lineHeight: "1.5",
        }}
      >
        {valor}
      </span>
    </div>
  );
}

// ============ ESTILOS REUTILIZÁVEIS ============

const estiloNavCalendario = {
  background: "rgba(245,215,110,0.05)",
  border: `1px solid ${COR.bordaDourada}`,
  color: "#f5d76e",
  padding: "8px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.3s ease",
};

const estiloTituloEtapa = {
  fontSize: "13px",
  fontWeight: "700",
  marginBottom: "14px",
  letterSpacing: "2px",
  color: "#f5d76e",
  fontFamily: "var(--font-cinzel), serif",
  textTransform: "uppercase",
};

const estiloGridCards = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
  gap: "12px",
};

function estiloCard(selecionado) {
  return {
    padding: "18px 12px",
    borderRadius: "14px",
    background: selecionado ? "rgba(245,215,110,0.18)" : "rgba(245,215,110,0.04)",
    border: selecionado
      ? "2px solid #f5d76e"
      : "1px solid rgba(255,255,255,0.12)",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    textAlign: "center",
    boxShadow: selecionado ? "0 0 25px rgba(245,215,110,0.2)" : "none",
  };
}

const estiloCardEmoji = {
  fontSize: "32px",
  marginBottom: "10px",
};

const estiloCardNome = {
  fontSize: "14px",
  fontWeight: "700",
  marginBottom: "5px",
  lineHeight: "1.2",
  letterSpacing: "0.3px",
};

const estiloCardDesc = {
  fontSize: "11px",
  opacity: 0.65,
  lineHeight: "1.4",
};

const estiloInput = {
  padding: "15px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(245,215,110,0.2)",
  background: "rgba(0,0,0,0.35)",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  fontFamily: "var(--font-inter), inherit",
  transition: "all 0.3s ease",
  letterSpacing: "0.3px",
};
