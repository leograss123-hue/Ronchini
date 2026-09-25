"use client";

import { useEffect, useState } from "react";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6Xp4UtF4OQO2PyaUbSMRlRYZrQavHVZhkSoxHfkBBfxM9ok6WWQR8mM-Pae6eXzjgpj9wJSo4bPb9/pub?output=csv";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function AgendaCalendar() {
  const [agenda, setAgenda] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((texto) => {
        const linhas = texto.trim().split("\n");
        const cabecalho = linhas[0].split(",");
        const dados = {};

        for (let i = 1; i < linhas.length; i++) {
          const valores = linhas[i].split(",");
          const linha = {};
          cabecalho.forEach((col, idx) => {
            linha[col.trim()] = (valores[idx] || "").trim();
          });
          if (linha.data) {
            dados[linha.data] = linha;
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

  function getCorStatus(status) {
    if (status === "livre") return "#22c55e";
    if (status === "parcial") return "#eab308";
    if (status === "cheio") return "#ef4444";
    return "transparent";
  }

  function formatarData(dia) {
    const mes = String(mesAtual + 1).padStart(2, "0");
    const d = String(dia).padStart(2, "0");
    return `${anoAtual}-${mes}-${d}`;
  }

  function gerarDias() {
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
    const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();

    const dias = [];
    for (let i = 0; i < primeiroDia; i++) dias.push(null);
    for (let d = 1; d <= totalDias; d++) dias.push(d);
    return dias;
  }

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
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        background: "rgba(0,0,0,0.4)",
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* CABEÇALHO */}
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

      {/* DIAS DA SEMANA */}
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

      {/* GRID DE DIAS */}
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
          const info = agenda[dataStr];
          const cor = info ? getCorStatus(info.status) : "transparent";
          const temInfo = !!info;

          return (
            <div
              key={dia}
              title={info ? `Status: ${info.status}` : "Sem informação"}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                background: temInfo ? cor : "rgba(255,255,255,0.05)",
                color: temInfo ? "#000" : "rgba(255,255,255,0.4)",
                border: temInfo
                  ? "none"
                  : "1px solid rgba(255,255,255,0.1)",
                cursor: temInfo ? "pointer" : "default",
                transition: "transform 0.2s",
              }}
            >
              {dia}
            </div>
          );
        })}
      </div>

      {/* LEGENDA */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
          fontSize: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "4px",
              background: "#22c55e",
              display: "inline-block",
            }}
          />
          Disponível
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "4px",
              background: "#eab308",
              display: "inline-block",
            }}
          />
          Parcial
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "4px",
              background: "#ef4444",
              display: "inline-block",
            }}
          />
          Ocupado
        </div>
      </div>
    </div>
  );
}
