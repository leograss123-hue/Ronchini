export default function SoundButton({ soundOn, toggleSound }) {
  return (
    <button
      onClick={toggleSound}
      className="sound"
    >
      {soundOn ? "🔊" : "🔇"}
    </button>
  );
}