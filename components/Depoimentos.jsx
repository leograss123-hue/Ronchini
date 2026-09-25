"use client";

export default function Depoimentos({ layout = "coluna" }) {
  return (
    <div style={{ marginTop: "10px", width: "100%" }}>
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

      {/* CARDS DE PRINT — empilhados com largura de celular */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          width: "100%",
        }}
      >
        <PrintWhatsApp
          nome="Cliente • Casamento"
          mensagens={[
            { lado: "sistema", texto: "Hoje" },
            { lado: "recebido", texto: "🙏🏼🙏🏼🙏🏼", hora: "14:52" },
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
                "Que booommm, Fico muito feliz por isso! Muito obrigado, meu amigo. 🙏🏼🙏🏼",
              hora: "14:55",
            },
          ]}
        />

        <PrintWhatsApp
          nome="Cliente • Evento"
          mensagens={[
            { lado: "sistema", texto: "Ontem" },
            {
              lado: "recebido",
              texto: "Oiii, Ronchini, tudo bem????,",
              hora: "15:06",
            },
            {
              lado: "recebido",
              texto: "Muito obrigado pelo show, que bom que gostaram tb",
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
            { lado: "recebido", texto: "Parabéns!!!!!!!!!", hora: "15:08" },
            {
              lado: "enviado",
              texto:
                "Muito obrigado! Eu que agradeço por tudo e fico muito feliz que tenham gostado! Tô sempre a disposição!",
              hora: "15:09",
            },
          ]}
        />
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE: Print de WhatsApp (formato celular)
// ============================================
function PrintWhatsApp({ nome, mensagens }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "340px",
        borderRadius: "20px",
        background: "#111b21",
        padding: "6px",
        boxShadow:
          "0 20px 55px rgba(0,0,0,0.5), 0 0 45px rgba(245,215,110,0.06)",
        border: "1px solid rgba(245,215,110,0.18)",
        overflow: "hidden",
      }}
    >
      {/* HEADER WhatsApp */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 8px 10px",
          background: "#202c33",
          borderRadius: "14px 14px 0 0",
        }}
      >
        <span
          style={{
            color: "#00a884",
            fontSize: "16px",
            lineHeight: 1,
            padding: "0 2px",
          }}
        >
          ‹
        </span>

        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#6a7175",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e9edef",
            fontSize: "12px",
            fontWeight: "600",
            flexShrink: 0,
            fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
          }}
        >
          {nome.charAt(0)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "#e9edef",
              fontSize: "12.5px",
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
            }}
          >
            {nome}
          </div>
          <div
            style={{
              color: "#8696a0",
              fontSize: "10px",
              fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
            }}
          >
            online
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            color: "#aebac1",
            fontSize: "13px",
            paddingRight: "4px",
          }}
        >
          <span>📞</span>
          <span>⋮</span>
        </div>
      </div>

      {/* ÁREA DE MENSAGENS */}
      <div
        style={{
          background: "#0b141a",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,168,132,0.04) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(245,215,110,0.03) 0%, transparent 40%)",
          padding: "10px 8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          borderRadius: "0 0 14px 14px",
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
// COMPONENTE: Balão de mensagem (compacto)
// ============================================
function BalãoMensagem({ lado, texto, hora }) {
  if (lado === "sistema") {
    return (
      <div style={{ textAlign: "center", margin: "4px 0 6px" }}>
        <span
          style={{
            background: "#182229",
            color: "#8696a0",
            fontSize: "10px",
            padding: "4px 10px",
            borderRadius: "8px",
            letterSpacing: "0.3px",
            fontWeight: "500",
            fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
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
          maxWidth: "85%",
          padding: "5px 8px 16px",
          borderRadius: recebido ? "8px 8px 8px 2px" : "8px 8px 2px 8px",
          background: recebido ? "#202c33" : "#005c4b",
          color: "#e9edef",
          fontSize: "11.5px",
          lineHeight: "1.4",
          position: "relative",
          boxShadow: "0 1px 1px rgba(0,0,0,0.25)",
          wordWrap: "break-word",
          whiteSpace: "pre-line",
          fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        <span style={{ display: "block" }}>{texto}</span>

        <span
          style={{
            position: "absolute",
            bottom: "3px",
            right: "7px",
            fontSize: "9px",
            color: recebido ? "#8696a0" : "#a8d5c4",
            display: "flex",
            alignItems: "center",
            gap: "2px",
            whiteSpace: "nowrap",
            fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
          }}
        >
          {hora}
          {!recebido && (
            <span
              style={{
                color: "#53bdeb",
                fontSize: "10px",
                marginLeft: "1px",
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
