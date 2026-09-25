export default function Buttons({ goToScene }) {
  return (
    <div className="card">
      <button
        className="ticket"
        onClick={() => goToScene("contratar")}
      >
        <span className="ticketGlow" />
        <span className="pulseDot" />

        <div className="ticketContent">
          <span className="ticketLabel">
            CONTRATAÇÃO PROFISSIONAL
          </span>

          <span className="ticketTitle">
            🎸 Contrate Agora
          </span>

          <span className="ticketHint">
            Shows, eventos e casamentos
          </span>
        </div>
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
