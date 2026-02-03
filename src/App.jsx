import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import BentoSlideshow from "./components/BentoSlideshow.jsx";
import HeartParticles from "./components/HeartParticles.jsx";
import IntroOverlay from "./components/IntroOverlay.jsx";
import OpenWhenScreen from "./components/OpenWhenScreen.jsx";
import ReceiptScreen from "./components/ReceiptScreen.jsx";
import SequenceCard from "./components/SequenceCard.jsx";
import SuccessScreen from "./components/SuccessScreen.jsx";
import ValentineModal from "./components/ValentineModal.jsx";

import cutie from "./assets/cutie.jpeg";
import cutie2 from "./assets/cutie2.jpeg";
import cutie3 from "./assets/cutie3.jpeg";
import cutie4 from "./assets/cutie4.jpeg";
import cutie5 from "./assets/cutie5.jpeg";
import compilationVideo from "./assets/Compilation video.mp4";

const MEDIA = [
  { type: "image", src: cutie, alt: "Memory one" },
  { type: "image", src: cutie2, alt: "Memory two" },
  { type: "video", src: compilationVideo, alt: "Memory three" },
  { type: "image", src: cutie3, alt: "Memory four" },
  { type: "image", src: cutie4, alt: "Memory five" },
  { type: "image", src: cutie5, alt: "Memory six" },
];

const HEART_EMOJIS = ["💛", "💘", "💖", "💕", "😍"];
const MAX_HEARTS = 200;

const randomBetween = (min, max) => min + Math.random() * (max - min);

function App() {
  const shouldReduceMotion = useReducedMotion();
  const [introVisible, setIntroVisible] = useState(true);
  const [screen, setScreen] = useState("homeSequence");
  const [showValentine, setShowValentine] = useState(false);
  const [hearts, setHearts] = useState([]);
  const idRef = useRef(1);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  const spawnHearts = useCallback(
    (x, y, options = {}) => {
      if (shouldReduceMotion) return;
      const {
        count = Math.floor(randomBetween(8, 16)),
        spread = 90,
        sizeMin = 14,
        sizeMax = 26,
      } = options;

      setHearts((prev) => {
        const next = [...prev];
        for (let i = 0; i < count; i += 1) {
          const id = idRef.current++;
          const size = randomBetween(sizeMin, sizeMax);
          const duration = randomBetween(1200, 1900);
          const drift = randomBetween(-spread, spread);
          const rise = randomBetween(120, 220);
          const rotate = randomBetween(-35, 35);
          const emoji =
            HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
          next.push({
            id,
            x: x + randomBetween(-24, 24),
            y: y + randomBetween(-18, 18),
            size,
            duration,
            drift,
            rise,
            rotate,
            emoji,
          });

          window.setTimeout(() => {
            setHearts((current) => current.filter((heart) => heart.id !== id));
          }, duration + 120);
        }
        return next.slice(-MAX_HEARTS);
      });
    },
    [shouldReduceMotion],
  );

  const handlePointerDown = useCallback(
    (event) => {
      spawnHearts(event.clientX, event.clientY, {});
    },
    [spawnHearts],
  );

  const handleSequenceComplete = useCallback(() => {}, []);

  const handleKeepGoing = useCallback(() => {
    setShowValentine(true);
  }, []);

  const handleYes = useCallback(() => {
    setShowValentine(false);
    setScreen("success");
    spawnHearts(window.innerWidth / 2, window.innerHeight / 2, {
      count: 42,
      spread: 200,
      sizeMin: 18,
      sizeMax: 38,
    });
  }, [spawnHearts]);

  return (
    <div className="app" onPointerDownCapture={handlePointerDown}>
      <BentoSlideshow media={MEDIA} />
      <div className="app-overlay" />
      <HeartParticles hearts={hearts} />
      <IntroOverlay isVisible={introVisible} />

      {screen === "homeSequence" ? (
        <main className="app-content">
          {!introVisible ? (
            <SequenceCard
              onComplete={handleSequenceComplete}
              onContinue={handleKeepGoing}
            />
          ) : null}
          <ValentineModal
            isOpen={showValentine && !introVisible}
            onYes={handleYes}
          />
        </main>
      ) : null}

      {screen === "success" ? (
        <SuccessScreen
          onReceipt={() => setScreen("receipt")}
          onOpenWhen={() => setScreen("openWhen")}
        />
      ) : null}

      {screen === "receipt" ? (
        <ReceiptScreen
          onBack={() => setScreen("success")}
          onOpenWhen={() => setScreen("openWhen")}
        />
      ) : null}

      {screen === "openWhen" ? (
        <OpenWhenScreen onBack={() => setScreen("success")} />
      ) : null}
    </div>
  );
}

export default App;
