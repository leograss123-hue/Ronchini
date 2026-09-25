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

  const secaoEventoRef = useRef(null);
  const secaoPacoteRef = useRef(null);
  const secaoHorarioRef = useRef(null);
  const secaoDadosRef = useRef(null);

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
    if (dataSelecionada) scrollPara(secaoEventoRef);
  }, [dataSelecionada]);

  useEffect(() => {
    if (tipoEvento) scrollPara(secaoPacoteRef);
  }, [tipoEvento]);

  useEffect(() => {
    if (pacote || formacao) scrollPara(secaoHorarioRef);
  }, [pacote, formacao]);

  useEffect(() => {
    if (horario) scrollPara(secaoDadosRef);
  }, [horario]);

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
  }

  function eventoUsaPacote() {
    return EVENTOS_COM_PACOTE.includes(tipoEvento);
  }

  function gerarMensagem() {
    if (!dataSelecionada || !tipoEvento || !horario) return "";

    const tipo = TIPOS_EVENTO.find((t) => t.id === tipoEvento);
    const linhas = [];

    linhas.push("🎸 *NOVA SOLICITAÇÃO DE CONTRATAÇÃO*");
    linhas.push("");
    linhas.push(`📅 *Data:* ${formatarDataBR(dataSelecionada)}`);
    linhas.push(`🕐 *Horário:* ${horario}`);
    linhas.push(`🎉 *Tipo de evento:* ${tipo?.nome || ""}`);

    if (eventoUsaPacote()) {
      const pac = PACOTES_ESPECIAIS.find((p) => p.id === pacote);
      if (pac) linhas.push(`💎 *Pacote:* ${pac.nome}`);
    } else {
      const form = FORMACOES.find((f) => f.id === formacao);
      if (form) linhas.push(`🎤 *Formação:* ${form.nome} (${form.desc})`);
    }

    if (nome) linhas.push(`👤 *Nome:* ${nome}`);
    if (cidade) linhas.push(`📍 *Cidade:* ${cidade}`);
    if (obs) linhas.push(`📝 *Observações:* ${obs}`);

    linhas.push("");
    linhas.push("Aguardo contato para orçamento!");

    return linhas.join("\n");
  }

  // ⚡ NOVA CODIFICAÇÃO: preserva emojis como UTF-8 nativo
  function enviarWhatsApp() {
    const msg = gerarMensagem();
    const textoCodificado = encodeURI(msg)
      .replace(/#/g, "%23")
      .replace(/&/g, "%26");
    const url = `https://wa.me/5535991538017?text=${textoCodificado}`;
    window.open(url, "_blank");
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
      <div style={{ padding: "30px", textAlign: "center", opacity: 0.7 }}>
        📅 Carregando agenda...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "30px", textAlign: "center", color: "#ef4444" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", width: "100%" }}>

      {/* CALENDÁRIO */}
      <div
        style={{
          padding: "20px",
          background: "rgba(0,0,0,0.4)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={mesAnterior}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ←
          </button>

          <h3 style={{ margin: 0, fontSize: "20px" }}>
            {MESES[mesAtual]} {anoAtual}
          </h3>

          <button
            onClick={mesProximo}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "6px",
            marginBottom: "8px",
          }}
        >
          {DIAS_SEMANA.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: "12px",
                opacity: 0.6,
                fontWeight: "600",
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

            if (passado) {
              background = "rgba(255,255,255,0.03)";
              color = "rgba(255,255,255,0.25)";
              opacity = 0.7;
            } else if (!temLivre) {
              background = "rgba(255,255,255,0.05)";
              color = "rgba(255,255,255,0.25)";
              opacity = 0.5;
            } else if (isSelecionado) {
              background = "#f5d76e";
              color = "#000";
            } else {
              background = "#22c55e";
              color = "#000";
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
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  background,
                  color,
                  border: isSelecionado ? "2px solid #fff" : "none",
                  cursor: clicavel ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
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
                      background: "#22c55e",
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
                      background: "#f5d76e",
                      boxShadow: "0 0 4px rgba(245,215,110,0.8)",
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
            marginTop: "20px",
            fontSize: "11px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: "#22c55e", display: "inline-block" }} />
            Livre
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ position: "relative", width: "14px", height: "14px", borderRadius: "4px", background: "#22c55e", display: "inline-block" }}>
              <span style={{ position: "absolute", top: "1px", right: "1px", width: "5px", height: "5px", borderRadius: "50%", background: "#f5d76e" }} />
            </span>
            Já tem evento
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: "rgba(255,255,255,0.1)", display: "inline-block" }} />
            Sem vaga
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: "#f5d76e", display: "inline-block" }} />
            Selecionado
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ position: "relative", width: "14px", height: "14px", borderRadius: "4px", background: "rgba(255,255,255,0.03)", display: "inline-block" }}>
              <span style={{ position: "absolute", top: "-3px", right: "-3px", fontSize: "9px", fontWeight: "900", background: "#22c55e", color: "#fff", borderRadius: "50%", width: "11px", height: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
            opacity: 0.6,
            marginTop: "15px",
            fontStyle: "italic",
          }}
        >
          👆 Selecione uma data para ver as opções de contratação
        </p>
      </div>

      {/* FORMULÁRIO */}
      {dataSelecionada && (
        <div
          style={{
            padding: "25px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(245,215,110,0.3)",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "25px", color: "#f5d76e", fontSize: "18px" }}>
            📅 {formatarDataBR(dataSelecionada)}
          </h3>

          <div ref={secaoEventoRef} style={{ marginBottom: "25px", scrollMarginTop: "20px" }}>
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

          {eventoUsaPacote() && (
            <div ref={secaoPacoteRef} style={{ marginBottom: "25px", scrollMarginTop: "20px" }}>
              <h4 style={estiloTituloEtapa}>2. Escolha o pacote</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                {PACOTES_ESPECIAIS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPacote(p.id)}
                    style={{
                      padding: "18px",
                      borderRadius: "12px",
                      background: pacote === p.id ? "rgba(245,215,110,0.15)" : "rgba(255,255,255,0.05)",
                      border: pacote === p.id ? "2px solid #f5d76e" : "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "28px" }}>{p.emoji}</span>
                      <div>
                        <div style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "1px" }}>{p.nome}</div>
                        <div style={{ fontSize: "12px", opacity: 0.7, fontStyle: "italic" }}>{p.subtitulo}</div>
                      </div>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", lineHeight: "1.7", opacity: 0.9 }}>
                      {p.itens.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tipoEvento && !eventoUsaPacote() && (
            <div ref={secaoPacoteRef} style={{ marginBottom: "25px", scrollMarginTop: "20px" }}>
              <h4 style={estiloTituloEtapa}>2. Escolha a formação</h4>
              <div style={estiloGridCards}>
                {FORMACOES.map((f) => (
                  <div key={f.id} onClick={() => setFormacao(f.id)} style={estiloCard(formacao === f.id)}>
                    <div style={estiloCardEmoji}>{f.emoji}</div>
                    <div style={estiloCardNome}>{f.nome}</div>
                    <div style={estiloCardDesc}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tipoEvento && (eventoUsaPacote() ? pacote : formacao) && (
            <div ref={secaoHorarioRef} style={{ marginBottom: "25px", scrollMarginTop: "20px" }}>
              <h4 style={estiloTituloEtapa}>3. Escolha o horário</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "8px" }}>
                {HORARIOS.map((h) => {
                  const bloqueado = horarioBloqueado(dataSelecionada, h);
                  const sel = horario === h;
                  return (
                    <div
                      key={h}
                      onClick={() => !bloqueado && setHorario(h)}
                      style={{
                        padding: "10px 6px",
                        textAlign: "center",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "600",
                        background: bloqueado ? "rgba(255,255,255,0.05)" : sel ? "#f5d76e" : "#22c55e",
                        color: bloqueado ? "rgba(255,255,255,0.25)" : "#000",
                        border: sel ? "2px solid #fff" : "none",
                        cursor: bloqueado ? "not-allowed" : "pointer",
                        transition: "all 0.2s",
                        opacity: bloqueado ? 0.5 : 1,
                      }}
                    >
                      {h}
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: "11px", opacity: 0.6, marginTop: "12px", textAlign: "center", lineHeight: "1.5" }}>
                ⚠️ Cada reserva ocupa {DURACAO_HORAS}h (show + logística)
              </p>
            </div>
          )}

          {horario && (
            <div ref={secaoDadosRef} style={{ marginBottom: "25px", scrollMarginTop: "20px" }}>
              <h4 style={estiloTituloEtapa}>4. Seus dados</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input type="text" placeholder="Seu nome *" value={nome} onChange={(e) => setNome(e.target.value)} style={estiloInput} />
                <input type="text" placeholder="Cidade / Estado *" value={cidade} onChange={(e) => setCidade(e.target.value)} style={estiloInput} />
                <textarea placeholder="Observações (opcional)" value={obs} onChange={(e) => setObs(e.target.value)} rows={3} style={{ ...estiloInput, resize: "vertical" }} />
              </div>
            </div>
          )}

          {horario && (
            <button
              onClick={enviarWhatsApp}
              disabled={!podeEnviar}
              style={{
                width: "100%",
                padding: "18px",
                fontSize: "16px",
                fontWeight: "800",
                letterSpacing: "1px",
                borderRadius: "12px",
                border: "none",
                cursor: podeEnviar ? "pointer" : "not-allowed",
                background: podeEnviar ? "#25D366" : "rgba(255,255,255,0.1)",
                color: podeEnviar ? "#fff" : "rgba(255,255,255,0.4)",
                transition: "all 0.2s",
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

const estiloTituloEtapa = {
  fontSize: "14px",
  fontWeight: "700",
  marginBottom: "12px",
  letterSpacing: "1px",
  color: "#f5d76e",
};

const estiloGridCards = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
  gap: "10px",
};

function estiloCard(selecionado) {
  return {
    padding: "16px 10px",
    borderRadius: "12px",
    background: selecionado ? "rgba(245,215,110,0.15)" : "rgba(255,255,255,0.05)",
    border: selecionado ? "2px solid #f5d76e" : "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center",
  };
}

const estiloCardEmoji = { fontSize: "30px", marginBottom: "8px" };
const estiloCardNome = { fontSize: "14px", fontWeight: "700", marginBottom: "4px", lineHeight: "1.2" };
const estiloCardDesc = { fontSize: "11px", opacity: 0.7, lineHeight: "1.3" };

const estiloInput = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(0,0,0,0.3)",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  fontFamily: "inherit",
};
