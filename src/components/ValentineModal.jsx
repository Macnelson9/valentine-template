import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NO_MESSAGES = [
  "Ah ah 😭 you sure? Try again joor 💖",
  "Okay… but I packed love for you o 😅",
  "This ‘no’ doesn’t match your vibe 😌",
  "Stop forming strong 😭💘",
  "My heart is doing backflip… say yes? 🥺",
  "You dey do shakara 😄",
  "No pressure. But I hope it’s a yes 😘",
];

/**
 * @param {{ isOpen: boolean, onYes: () => void }} props
 */
export default function ValentineModal({ isOpen, onYes }) {
  const [noClickCount, setNoClickCount] = useState(0);

  if (!isOpen) return null;

  const message =
    noClickCount === 0
      ? null
      : NO_MESSAGES[(noClickCount - 1) % NO_MESSAGES.length];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <motion.div
        className="modal-card"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="modal-title">Will you be my Valentine? 💘</h2>
        <div className="modal-actions">
          <button
            className="btn btn-primary"
            type="button"
            onClick={onYes}
          >
            Yes 💘
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setNoClickCount((prev) => prev + 1)}
          >
            No 😅
          </button>
        </div>
        <div className="modal-message" aria-live="polite">
          <AnimatePresence mode="wait">
            {message ? (
              <motion.p
                key={message}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
