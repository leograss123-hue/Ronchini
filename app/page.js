"use client";

import { useRef, useState } from "react";

import Hero from "../components/Hero";
import Buttons from "../components/Buttons";
import SoundButton from "../components/SoundButton";

export default function Home() {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [scene, setScene] = useState("home");
  const [transition, setTransition] = useState(false);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    if (!soundOn) {
      video.muted = false;
      video.volume = 0;

      let v = 0;
      const fadeIn = setInterval(() => {
        v += 0.04;
        if (v >= 1) {
          v = 1;
          clearInterval(fadeIn);
        }
        video.volume = v;
      }, 30);
    } else {
      let v = video.volume;

      const fadeOut = setInterval(() => {
        v -= 0.05;
        if (v <= 0) {
          v = 0;
          video.muted = true;
          clearInterval(fadeOut);
        }
        video.volume = v;
      }, 30);
    }

    setSoundOn(!soundOn);
  }

  function goToScene(next) {
    if (transition) return;

    setTransition(true);

    setTimeout(() => {
      setScene(next);
      setTransition(false);
    }, 500);
  }

  return (
    <main className="wrap">

      {/* 🎥 VÍDEO */}
      <video
        ref={videoRef}
        src="/videos/aftermovie.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="video"
      />

      {/* 🌑 OVERLAY */}
      <div className="overlay" />

      {/* 🎬 HOME */}
      {scene === "home" && (
        <div className="content">
          <Hero />
          
          <Buttons goToScene={goToScene} />

        </div>
      )}

      {scene === "selecao" && (
  <div className="scene">

   <h2
  style={{
    fontSize: "clamp(32px, 4vw, 52px)",
    marginBottom: "30px",
    marginTop: "-120px",
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: "2px",
  }}
>
  🍻 Seleção com Modão 🍻
</h2>

    <p
      style={{
        maxWidth: "520px",
        textAlign: "center",
        lineHeight: "1.8",
        padding: "0 20px",
      }}
    >
      Andradas foi escalada.
      <br />
      A Seleção foi convocada.
      <br />
      O dia 19 foi show — e não foi só de futebol.
      <br />
      <br />
      Acompanhe nossos perfis e fique por dentro dos próximos eventos.
    </p>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "20px",
      }}
    >
    <a
  href="https://www.instagram.com/selecaocommodao"
  target="_blank"
  rel="noopener noreferrer"
  className="socialCard"
>
  📸 @selecaocommodao
</a>

<a
  href="https://www.instagram.com/ronchinioficial/"
  target="_blank"
  rel="noopener noreferrer"
  className="socialCard"
>
  🎤 @ronchinioficial
</a>
    </div>

    <p
      style={{
        marginTop: "28px",
        color: "#f5d76e",
        fontWeight: "700",
        letterSpacing: "1px",
      }}
    >
      Ingressos esgotados
    </p>

    <button
      className="back"
      onClick={() => goToScene("home")}
    >
      Voltar
    </button>

  </div>
)}

      {/* 🎟 CONTRATAR */}
      {scene === "contratar" && (
        <div className="scene">
          <h2>🎟 Contratar Evento</h2>
          <p>Leve o Ronchini para seu evento</p>

          <button className="back" onClick={() => goToScene("home")}>
            Voltar
          </button>
        </div>
      )}

      {/* SOBRE RONCHINI */}
{scene === "conheca" && (
  <div
    className="scene"
    style={{
      overflowY: "auto",
      padding: "80px 20px",
      justifyContent: "flex-start",
    }}
  >
    <div
      style={{
        maxWidth: "800px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(38px, 6vw, 70px)",
          marginBottom: "10px",
        }}
      >
        SOBRE RONCHINI
      </h1>

      <p
        style={{
          opacity: 0.7,
          letterSpacing: "2px",
          marginBottom: "50px",
        }}
      >
        TRADIÇÃO, VIOLA CAIPIRA E GRANDES HISTÓRIAS
      </p>

      <h2>Sobre</h2>

      <p
        style={{
          lineHeight: "1.8",
          opacity: 0.9,
        }}
      >
        Natural de Poços de Caldas (MG), Ronchini vem conquistando
        espaço no cenário sertanejo ao unir a tradição da viola
        caipira à energia do público contemporâneo.
        Seu show transita entre os clássicos que marcaram gerações
        e os sucessos que continuam embalando festas, festivais e
        grandes eventos.
      </p>

      <br />

      <h2>Números</h2>

<div className="statsGrid">

  <div className="statCard">
    <div className="statIcon">🎧</div>

    <div className="statNumber">
      150 MIL+
    </div>

    <div className="statLabel">
      PLAYS
    </div>
  </div>

  <div className="statCard">
    <div className="statIcon">📲</div>

    <div className="statNumber">
      25 MIL+
    </div>

    <div className="statLabel">
      SEGUIDORES
    </div>
  </div>

  <div className="statCard">
    <div className="statIcon">📺</div>

    <div className="statNumber">
      TV
    </div>

    <div className="statLabel">
      NACIONAL
    </div>
  </div>

  <div className="statCard">
    <div className="statIcon">🎤</div>

    <div className="statNumber">
      GRANDES
    </div>

    <div className="statLabel">
      FESTIVAIS
    </div>
  </div>

</div>

      <br />

      <h2>Destaques na Mídia</h2>

<div className="mediaGrid">

  <div className="mediaCard">
    <div className="mediaLogo">📺</div>

    <div className="mediaTitle">
      Terra da Padroeira
    </div>

    <div className="mediaSub">
      TV Aparecida
    </div>
  </div>

  <div className="mediaCard">
    <div className="mediaLogo">🎤</div>

    <div className="mediaTitle">
      Aparecida Sertaneja
    </div>

    <div className="mediaSub">
      TV Aparecida
    </div>
  </div>

  <div className="mediaCard">
    <div className="mediaLogo">🌎</div>

    <div className="mediaTitle">
      Rede Globo
    </div>

    <div className="mediaSub">
      Mais Caminhos
    </div>
  </div>

  <div className="mediaCard">
    <div className="mediaLogo">📻</div>

    <div className="mediaTitle">
      Band
    </div>

    <div className="mediaSub">
      Paixão Sertaneja
    </div>
  </div>

</div>

      <br />

      <h2>📸 Momentos da Carreira</h2>

<div className="galleryGrid">

  <div className="galleryCard">
    <img
      src="/images/palco-01.jpg"
      alt="Show Ronchini"
    />

    <div className="galleryOverlay">
      Apresentações ao vivo
    </div>
  </div>

  <div className="galleryCard">
    <img
      src="/images/palco-02.jpg"
      alt="Palco"
    />

    <div className="galleryOverlay">
      Grandes eventos
    </div>
  </div>

  <div className="galleryCard">
    <img
      src="/images/tv-01.jpg"
      alt="TV"
    />

    <div className="galleryOverlay">
      Participações na mídia
    </div>
  </div>

  <div className="galleryCard galleryCardCenter">
  <img
    src="/images/oficial.jpg"
    alt="Ronchini"
  />

  <div className="galleryOverlay">
    Ronchini
  </div>
</div>

</div>
      <br />
      <h2>🍻 Seleção com Modão</h2>

      <p
        style={{
          lineHeight: "1.8",
          opacity: 0.9,
        }}
      >
        O projeto Seleção com Modão nasceu para reunir pessoas
        através das músicas que marcaram suas histórias.
        Mais do que um show, é uma experiência onde o público
        se transforma em parte do espetáculo.
      </p>

      <br />

     <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  }}
>
  <button
    className="ticket"
    onClick={() =>
      window.open(
        "https://wa.me/5535991538017?text=Olá!%20Gostaria%20de%20levar%20o%20evento%20Seleção%20com%20Modão%20para%20a%20minha%20cidade.",
        "_blank"
      )
    }
  >
    💬 Levar para minha cidade
  </button>
</div>
      <br />
      <br />

      <button
        className="back"
        onClick={() => goToScene("home")}
       >
        Voltar
       </button>
       </div>
       </div>
        )}
      

      {/* 🎧 SPOTIFY */}
      {scene === "spotify" && (
        <div className="scene">
          <h2>🎧 Spotify</h2>
          <p>Ouça o repertório do Ronchini</p>

          <button className="back" onClick={() => goToScene("home")}>
            Voltar
          </button>
        </div>
      )}

      {/* 🔊 SOM */}
      <SoundButton
       soundOn={soundOn}
      toggleSound={toggleSound}
     />


      {/* 🎨 CSS */}

    </main>
  );
}