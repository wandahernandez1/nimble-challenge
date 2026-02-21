import { motion } from "framer-motion";
import "./CandidateCard.css";

export function CandidateCard({ candidate, onReset }) {
  const { firstName, lastName, email, candidateId } = candidate;
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <motion.div
      className="ccard"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="ccard__left">
        <div className="ccard__avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="ccard__info">
          <p className="ccard__name">
            {firstName} {lastName}
          </p>
          <p className="ccard__meta">
            {email} &middot; <span className="ccard__id">{candidateId}</span>
          </p>
        </div>
      </div>

      <motion.button
        className="ccard__reset"
        onClick={onReset}
        aria-label="Cambiar candidato"
        whileTap={{ scale: 0.95 }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M2 6.5a4.5 4.5 0 108.5-2M2 2.5v4h4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Cambiar
      </motion.button>
    </motion.div>
  );
}
