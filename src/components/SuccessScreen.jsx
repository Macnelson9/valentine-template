import React from "react";
import { motion } from "framer-motion";

/**
 * @param {{ onReceipt: () => void, onOpenWhen: () => void }} props
 */
export default function SuccessScreen({ onReceipt, onOpenWhen }) {
  return (
    <div className="success-overlay" role="status" aria-live="polite">
      <motion.div
        className="success-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="success-emoji">😍</div>
        <h2>Yayyy! 😍</h2>
        <p>See you on Feb 14 😉</p>
        <div className="success-actions">
          <button className="btn btn-primary" type="button" onClick={onReceipt}>
            View 4-month receipt
          </button>
          <button className="btn btn-secondary" type="button" onClick={onOpenWhen}>
            Open when…
          </button>
        </div>
      </motion.div>
    </div>
  );
}
