export default function Buttons({ goToScene }) {
  return (
    <div className="card">
      <button
        className="btn glass"
        onClick={() => goToScene("contratar")}
      >
        🎸 Contrate Agora
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
