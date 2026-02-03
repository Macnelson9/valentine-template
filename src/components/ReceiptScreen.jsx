import React from "react";
import { motion } from "framer-motion";

const RECEIPT_ITEMS = [
  { label: "Gists shared", value: "∞" },
  { label: "Support given", value: "Plenty" },
  { label: "Laughs", value: "A lot" },
  { label: "Patience", value: "Premium" },
  { label: "Hugs (owed)", value: "Uncountable" },
];

/**
 * @param {{ onBack: () => void, onOpenWhen: () => void }} props
 */
export default function ReceiptScreen({ onBack, onOpenWhen }) {
  return (
    <div className="screen-overlay">
      <motion.div
        className="receipt-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <header className="receipt-header">
          <h2>Relationship Receipt 🧾</h2>
          <p>4 months of us</p>
        </header>
        <div className="receipt-items">
          {RECEIPT_ITEMS.map((item) => (
            <div key={item.label} className="receipt-row">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="receipt-total">
          <span>Total</span>
          <span>Priceless 💛</span>
        </div>
        <p className="receipt-footer">Thank you for choosing me.</p>
        <div className="receipt-actions">
          <button className="btn btn-secondary" type="button" onClick={onBack}>
            Back
          </button>
          <button className="btn btn-primary" type="button" onClick={onOpenWhen}>
            Open when…
          </button>
        </div>
      </motion.div>
    </div>
  );
}
