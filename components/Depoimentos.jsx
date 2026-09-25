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
            marginBottom: "22px",
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
          gap: "20px",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {/* PRINT 1 */}
        <PrintWhatsApp
          nome="Cliente • Casamento"
          hora="15:06"
          mensagens={[
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
                "Que booommm, Fico muito feliz por isso! Muito obrigado, meu amigo. 🙏🙏",
              hora: "14:55",
            },
          ]}
        />

        {/* PRINT 2 */}
        <PrintWhatsApp
          nome="Cliente • Evento"
          hora="15:36"
          mensagens={[
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
// COMPONENTE: Print de WhatsApp (recriado)
// ============================================
function PrintWhatsApp({ nome, hora, mensagens }) {
  return (
    <div
      style={{
        borderRadius: "22px",
        background: "#0b141a",
        padding: "14px 10px 12px",
        boxShadow:
          "0 15px 45px rgba(0,0,0,0.45), 0 0 40px rgba(245,215,110,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
        border: "1px solid rgba(245,215,110,0.15)",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* HEADER estilo WhatsApp */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "12px",
        }}
      >
        {/* Seta voltar */}
        <span
          style={{
            color: "#00a884",
            fontSize: "16px",
            fontWeight: "300",
          }}
        >
          ←
        </span>

        {/* Avatar */}
        <div
          style={{
            width: "36px",
            height: "36px",
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
              color: "#e9edef",
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
              color: "#8696a0",
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
            color: "#aebac1",
            fontSize: "16px",
          }}
        >
          <span>📞</span>
          <span>⋮</span>
        </div>
      </div>

      {/* ÁREA DAS MENSAGENS (fundo bege do WhatsApp) */}
      <div
        style={{
          background: "#0b141a",
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(0,168,132,0.03) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(245,215,110,0.04) 0%, transparent 40%)",
          borderRadius: "12px",
          padding: "14px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxHeight: "360px",
          overflowY: "auto",
        }}
      >
        {/* Marcação de hora (Ontem/Hoje) */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          <span
            style={{
              background: "#182229",
              color: "#8696a0",
              fontSize: "10px",
              padding: "4px 10px",
              borderRadius: "8px",
              letterSpacing: "0.5px",
            }}
          >
            Hoje
          </span>
        </div>

        {mensagens.map((m, i) => (
          <BalãoMensagem key={i} {...m} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE: Balão de mensagem
// ============================================
function BalãoMensagem({ lado, texto, hora }) {
  const recebido = lado === "recebido";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: recebido ? "flex-start" : "flex-end",
      }}
    >
      <div
        style={{
          maxWidth: "82%",
          padding: "8px 10px 6px",
          borderRadius: recebido
            ? "8px 8px 8px 2px"
            : "8px 8px 2px 8px",
          background: recebido ? "#202c33" : "#005c4b",
          color: "#e9edef",
          fontSize: "12.5px",
          lineHeight: "1.45",
          position: "relative",
          boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          wordWrap: "break-word",
        }}
      >
        <span style={{ display: "block", paddingRight: "50px" }}>
          {texto}
        </span>

        {/* Hora + check */}
        <span
          style={{
            position: "absolute",
            bottom: "4px",
            right: "8px",
            fontSize: "10px",
            color: recebido ? "#8696a0" : "#a8d5c4",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            whiteSpace: "nowrap",
          }}
        >
          {hora}
          {!recebido && (
            <span style={{ color: "#53bdeb", fontSize: "11px" }}>
              ✓✓
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
