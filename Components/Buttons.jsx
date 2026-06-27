export default function Buttons({ goToScene }) {
  return (
    <div className="card">
      <button
        className="ticket"
        onClick={() => goToScene("selecao")}
      >
        <span className="ticketGlow" />

        <span className="pulseDot" />

        <div className="ticketContent">
          <span className="ticketLabel">
            EVENTO OFICIAL
          </span>

          <span className="ticketTitle">
            Comprar Ingresso
          </span>

          <span className="ticketHint">
            Últimos lotes disponíveis
          </span>
        </div>
      </button>

      <button
        className="btn glass"
        onClick={() =>
        window.open(
    "https://wa.me/5535991538017?text=Olá!%20Gostaria%20de%20levar%20o%20evento%20Seleção%20com%20Modão%20para%20a%20minha%20cidade.%20Poderia%20me%20enviar%20informações%20sobre%20datas,%20disponibilidade%20e%20condições%20de%20contratação?",
    "_blank"
  )
}
      >
      💬  Contratar Evento
      </button>

     <button
      className="btn glass"
      onClick={() => goToScene("conheca")}
      >
       🎤 Conheça Ronchini
      </button>

      <button
  className="btn glass"
  onClick={() =>
    window.open(
      "https://drive.google.com/drive/folders/18LCvDuv4NkY02TkTnoyOLE9QWwR1FE2r?usp=drive_link",
      "_blank"
    )
  }
>
  📁 Material para Contratantes
</button>
    </div>
  );
}