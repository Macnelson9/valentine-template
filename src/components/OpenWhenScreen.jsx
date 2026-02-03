import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const OPEN_WHEN_NOTES = [
  {
    label: "Open when you miss me",
    note: "Close your eyes and remember one small moment that made you smile. I'm right there with you.",
  },
  {
    label: "Open when you’re stressed",
    note: "Breathe in for four, hold for four, out for four. I’m cheering for you, always.",
  },
  {
    label: "Open when you want to smile",
    note: "Think of the cutest thing we’ve laughed about. I’m saving more for you.",
  },
  {
    label: "Open when you need motivation",
    note: "You’re stronger than you feel right now. I believe in you and your big beautiful future.",
  },
  {
    label: "Open when it’s late at night",
    note: "Pretend this is a forehead kiss. Rest well, love. I’ll see you in the morning.",
  },
];

/**
 * @param {{ onBack: () => void }} props
 */
export default function OpenWhenScreen({ onBack }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeNote = useMemo(() => {
    if (activeIndex === null) return null;
    return OPEN_WHEN_NOTES[activeIndex];
  }, [activeIndex]);

  return (
    <div className="screen-overlay">
      <motion.div
        className="open-when-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <header className="open-when-header">
          <h2>Open When… 💌</h2>
          <p>Pick a little envelope made for you.</p>
        </header>
        <div className="open-when-grid">
          {OPEN_WHEN_NOTES.map((item, index) => (
            <button
              key={item.label}
              className="open-when-item"
              type="button"
              onClick={() => setActiveIndex(index)}
            >
              <span className="envelope">✉️</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="open-when-actions">
          <button className="btn btn-secondary" type="button" onClick={onBack}>
            Back
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeNote ? (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="modal-title">{activeNote.label}</h3>
              <p className="modal-note">{activeNote.note}</p>
              <button className="btn btn-secondary" type="button">
                Play voice note (soon)
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setActiveIndex(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
