"use client";

export default function Depoimentos() {
  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      {/* TÍTULO DA SEÇÃO */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(245,215,110,0.5), transparent)",
            maxWidth: "400px",
            margin: "0 auto 22px",
          }}
        />

        <h2
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "clamp(20px, 3vw, 28px)",
            letterSpacing: "3px",
            color: "#f5d76e",
            textTransform: "uppercase",
            margin: 0,
            textShadow: "0 0 25px rgba(245,215,110,0.35)",
          }}
        >
          Quem já viveu, recomenda
        </h2>

        <p
          style={{
            fontSize: "12px",
            opacity: 0.6,
            letterSpacing: "2px",
            marginTop: "10px",
            textTransform: "uppercase",
            fontFamily: "var(--font-cinzel), serif",
          }}
        >
          Mensagens reais de quem contratou
        </p>
      </div>

      {/* CARDS DE PRINT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {/* PRINT 1 */}
        <PrintWhatsApp
          nome="Cliente • Casamento"
          hora="14:55"
          mensagens={[
            {
              lado: "recebido",
              texto: "Hoje",
              tipo: "data",
            },
            {
              lado: "recebido",
              texto: "🙏🏼🙏🏼🙏🏼",
              hora: "14:52",
            },
            {
              lado: "recebido",
              texto:
                "Kkk foi muito show!!! Vc é muito bom! Uma produção de alto nível, super profissional, todos da banda tem muito carisma e uma vibe incrível!!!!",
              hora: "14:53",
            },
            {
              lado: "recebido",
              texto:
                "Ficaram marcados na festa, muita gente veio elogiar vc! Parabéns! 🏆",
              hora: "14:54",
            },
            {
              lado: "enviado",
              texto:
                "Que booommm, Fico muito feliz por isso!\nMuito obrigado, meu amigo. 🙏🏼🙏🏼",
              hora: "14:55",
            },
          ]}
        />

        {/* PRINT 2 */}
        <PrintWhatsApp
          nome="Cliente • Evento"
          hora="15:08"
          mensagens={[
            {
              lado: "recebido",
              texto: "Ontem",
              tipo: "data",
            },
            {
              lado: "recebido",
              texto: "Oiii, Ronchini, tudo bem????,",
              hora: "15:06",
            },
            {
              lado: "recebido",
              texto:
                "Muito obrigado pelo show, que bom que gostaram tb",
              hora: "15:06",
            },
            {
              lado: "recebido",
              texto:
                "A galera gostou muito do show, não é a toa que pediram 5 saideras heheheheh",
              hora: "15:07",
            },
            {
              lado: "recebido",
              texto:
                "Muita gente me disse que foi o melhor show sertanejo que já viram!!!!!",
              hora: "15:08",
            },
            {
              lado: "recebido",
              texto: "Parabéns!!!!!!!!!",
              hora: "15:08",
            },
            {
              lado: "enviado",
              texto:
                "Muito obrigado!\nEu que agradeço por tudo e fico muito feliz que tenham gostado!\nTô sempre a disposição!",
              hora: "15:09",
            },
          ]}
        />
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE: Print de WhatsApp (light mode)
// ============================================
function PrintWhatsApp({ nome, hora, mensagens }) {
  return (
    <div
      style={{
        borderRadius: "18px",
        background: "#ece5dd",
        padding: "12px",
        boxShadow:
          "0 15px 45px rgba(0,0,0,0.45), 0 0 40px rgba(245,215,110,0.06)",
        border: "1px solid rgba(245,215,110,0.15)",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* HEADER estilo WhatsApp (light) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          paddingBottom: "10px",
          paddingTop: "4px",
          paddingLeft: "4px",
          paddingRight: "4px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          marginBottom: "10px",
        }}
      >
        {/* Seta voltar */}
        <span
          style={{
            color: "#00a884",
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: 1,
          }}
        >
          ‹
        </span>

        {/* Avatar */}
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667781, #3b4a54)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "700",
            flexShrink: 0,
          }}
        >
          {nome.charAt(0)}
        </div>

        {/* Nome */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "#111",
              fontSize: "14px",
              fontWeight: "600",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {nome}
          </div>
          <div
            style={{
              color: "#667781",
              fontSize: "11px",
              marginTop: "1px",
            }}
          >
            online
          </div>
        </div>

        {/* Ícones */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            color: "#54656f",
            fontSize: "16px",
          }}
        >
          <span>📞</span>
          <span>⋮</span>
        </div>
      </div>

      {/* ÁREA DAS MENSAGENS */}
      <div
        style={{
          background: "#ece5dd",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.15) 0%, transparent 30%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.12) 0%, transparent 30%)",
          padding: "8px 4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {mensagens.map((m, i) => (
          <BalãoMensagem key={i} {...m} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE: Balão de mensagem (light)
// ============================================
function BalãoMensagem({ lado, texto, hora, tipo }) {
  // Mensagem de data (centralizada)
  if (tipo === "data") {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "6px 0",
        }}
      >
        <span
          style={{
            background: "#ffffff",
            color: "#54656f",
            fontSize: "10.5px",
            padding: "5px 12px",
            borderRadius: "7px",
            letterSpacing: "0.3px",
            fontWeight: "500",
            boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
          }}
        >
          {texto}
        </span>
      </div>
    );
  }

  const recebido = lado === "recebido";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: recebido ? "flex-start" : "flex-end",
        marginBottom: "2px",
      }}
    >
      <div
        style={{
          maxWidth: "82%",
          padding: "6px 9px 18px",
          borderRadius: recebido
            ? "8px 8px 8px 2px"
            : "8px 8px 2px 8px",
          background: recebido ? "#ffffff" : "#d9fdd3",
          color: "#111b21",
          fontSize: "12.5px",
          lineHeight: "1.4",
          position: "relative",
          boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
          wordWrap: "break-word",
          whiteSpace: "pre-line",
        }}
      >
        <span style={{ display: "block" }}>{texto}</span>

        {/* Hora + check */}
        <span
          style={{
            position: "absolute",
            bottom: "3px",
            right: "8px",
            fontSize: "10px",
            color: "#667781",
            display: "flex",
            alignItems: "center",
            gap: "2px",
            whiteSpace: "nowrap",
          }}
        >
          {hora}
          {!recebido && (
            <span
              style={{
                color: "#53bdeb",
                fontSize: "11px",
                marginLeft: "2px",
              }}
            >
              ✓✓
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
