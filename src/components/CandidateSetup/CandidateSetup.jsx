import { useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "../ui/Spinner";
import { Alert } from "../ui/Alert";
import "./CandidateSetup.css";

export function CandidateSetup({ onFetch, isLoading, error }) {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onFetch(email);
  }

  return (
    <section className="setup">
      {/* Logo mark */}
      <motion.div
        className="setup__mark"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="10" fill="var(--color-primary)" />
          <path
            d="M9 16l5 5 9-9"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <motion.div
        className="setup__header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="setup__title">Nimble Gravity</h1>
        <p className="setup__subtitle">
          Ingresá tu email para comenzar el proceso de postulación.
        </p>
      </motion.div>

      <motion.form
        className="setup__form"
        onSubmit={handleSubmit}
        noValidate
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="setup__field">
          <label htmlFor="email" className="setup__label">
            Email
          </label>
          <div className="setup__input-wrap">
            <svg
              className="setup__input-icon"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <rect
                x="1"
                y="3"
                width="13"
                height="9"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M1 5.5l6.5 4 6.5-4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <input
              id="email"
              type="email"
              className="setup__input"
              placeholder="jane.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />
          </div>
        </div>

        <Alert type="error" message={error} />

        <motion.button
          type="submit"
          className="setup__button"
          disabled={isLoading || !email.trim()}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? (
            <Spinner size="sm" label="Buscando..." />
          ) : (
            <>
              <span>Continuar</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </motion.button>
      </motion.form>
    </section>
  );
}
