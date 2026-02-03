import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const TILES = [
  { id: "hero", className: "bento-tile tile-hero" },
  { id: "tall", className: "bento-tile tile-tall" },
  { id: "wide", className: "bento-tile tile-wide" },
  { id: "small-1", className: "bento-tile tile-small" },
  { id: "small-2", className: "bento-tile tile-small" },
  { id: "small-3", className: "bento-tile tile-small" },
];

/**
 * @param {{ media: { type: "image" | "video", src: string, alt?: string }[] }} props
 */
export default function BentoSlideshow({ media = [] }) {
  const shouldReduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [broken, setBroken] = useState({});

  const mediaList = useMemo(() => media.filter(Boolean), [media]);

  useEffect(() => {
    if (shouldReduceMotion || mediaList.length === 0) return undefined;
    const interval = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [mediaList.length, shouldReduceMotion]);

  return (
    <div className="bento-slideshow" aria-hidden="true">
      <div className="bento-grid">
        {TILES.map((tile, index) => {
          const mediaIndex = mediaList.length
            ? (index + tick) % mediaList.length
            : -1;
          const currentRaw = mediaIndex >= 0 ? mediaList[mediaIndex] : null;
          const current =
            currentRaw && !broken[currentRaw.src] ? currentRaw : null;
          const mediaKey = current?.src || `placeholder-${tile.id}`;

          return (
            <div key={tile.id} className={tile.className}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mediaKey}
                  className="bento-media"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                  {current ? (
                    current.type === "video" ? (
                      <video
                        className="bento-video"
                        src={current.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={() =>
                          setBroken((prev) => ({
                            ...prev,
                            [current.src]: true,
                          }))
                        }
                      />
                    ) : (
                      <img
                        className="bento-image"
                        src={current.src}
                        alt={current.alt || "Memory"}
                        loading="lazy"
                        onError={() =>
                          setBroken((prev) => ({
                            ...prev,
                            [current.src]: true,
                          }))
                        }
                      />
                    )
                  ) : (
                    <div className="bento-placeholder">
                      <span>Add media</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="bento-glow" />
            </div>
          );
        })}
      </div>
      <div className="bento-overlay" />
    </div>
  );
}
