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
const VIDEO_TILE_COUNT = 2;
const VIDEO_TILE_INDEXES = [1, 5];

/**
 * @param {{ media: { type: "image" | "video", src: string, alt?: string }[] }} props
 */
export default function BentoSlideshow({ media = [] }) {
  const shouldReduceMotion = useReducedMotion();
  const [broken, setBroken] = useState({});
  const [indices, setIndices] = useState(() =>
    TILES.map((_, index) => index),
  );
  const [modes, setModes] = useState(() =>
    TILES.map((_, index) => (index % 2 === 0 ? "image" : "video")),
  );

  const mediaList = useMemo(() => media.filter(Boolean), [media]);
  const imageItems = useMemo(
    () => mediaList.filter((item) => item.type === "image"),
    [mediaList],
  );
  const videoItems = useMemo(
    () => mediaList.filter((item) => item.type === "video"),
    [mediaList],
  );

  useEffect(() => {
    if (!mediaList.length) return;
    setModes(
      TILES.map((_, index) => {
        if (imageItems.length === 0) return "video";
        if (videoItems.length === 0) return "image";
        if (videoItems.length < VIDEO_TILE_COUNT) {
          return videoItems.length > 0 && index === 0 ? "video" : "image";
        }
        return VIDEO_TILE_INDEXES.includes(index) ? "video" : "image";
      }),
    );
    setIndices(TILES.map((_, index) => index));
  }, [imageItems.length, mediaList.length, videoItems.length]);

  useEffect(() => {
    if (shouldReduceMotion || mediaList.length === 0) return undefined;
    const interval = window.setInterval(() => {
      setIndices((prev) =>
        prev.map((currentIndex, tileIndex) => {
          if (modes[tileIndex] !== "image") return currentIndex;
          if (!imageItems.length) return currentIndex;
          return (currentIndex + 1) % imageItems.length;
        }),
      );
    }, 3200);
    return () => window.clearInterval(interval);
  }, [imageItems.length, mediaList.length, modes, shouldReduceMotion]);

  return (
    <div className="bento-slideshow" aria-hidden="true">
      <div className="bento-grid">
        {TILES.map((tile, index) => {
          const mode = modes[index];
          const pool = mode === "video" ? videoItems : imageItems;
          const poolIndex = pool.length ? indices[index] % pool.length : -1;
          const currentRaw = poolIndex >= 0 ? pool[poolIndex] : null;
          const current =
            currentRaw && !broken[currentRaw.src] ? currentRaw : null;
          const mediaKey = current?.src || `placeholder-${tile.id}`;

          return (
            <div key={tile.id} className={tile.className}>
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={mediaKey}
                  className="bento-media"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 5, ease: "easeInOut" }}
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
