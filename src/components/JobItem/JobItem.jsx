import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApply } from "../../hooks/useApply";
import { Alert } from "../ui/Alert";
import "./JobItem.css";

export function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const { isLoading, success, error, submitApplication, reset } = useApply();

  function handleSubmit(e) {
    e.preventDefault();
    submitApplication({
      applicationId: candidate.uuid,
      jobId: job.id,
      candidateId: candidate.candidateId,
      repoUrl,
    });
  }

  function handleRepoChange(e) {
    setRepoUrl(e.target.value);
    if (error) reset();
  }

  return (
    <motion.article
      className={`job-item ${success ? "job-item--success" : ""}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="job-item__header">
        <div className="job-item__dot" aria-hidden="true" />
        <h2 className="job-item__title">{job.title}</h2>
        <span className="job-item__id">{job.id}</span>
      </div>

      {/* Body */}
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            className="job-item__success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="job-item__success-icon"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 9l3.5 3.5 6.5-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <div>
              <p className="job-item__success-title">Postulación enviada</p>
              <p className="job-item__success-sub">
                Tu aplicación para <strong>{job.title}</strong> fue recibida con
                éxito.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="job-item__form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="job-item__field">
              <label htmlFor={`repo-${job.id}`} className="job-item__label">
                Repositorio de GitHub
              </label>
              <div className="job-item__input-wrap">
                <svg
                  className="job-item__input-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7 1a6 6 0 100 12A6 6 0 007 1zM4.5 11v-.8c0-.9.4-1.4 1-1.7C3.8 8.2 3 7.3 3 6c0-.8.3-1.4.8-1.9.3-.8 0-1.3-.1-1.8.7 0 1.3.3 1.8.7C6 2.7 6.5 2.6 7 2.6s1 .1 1.5.4c.5-.4 1.1-.7 1.8-.7-.1.5-.4 1-.1 1.8.5.5.8 1.1.8 1.9 0 1.3-.8 2.2-2.5 2.5.6.3 1 .8 1 1.7V11"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id={`repo-${job.id}`}
                  type="url"
                  className="job-item__input"
                  placeholder="https://github.com/usuario/repositorio"
                  value={repoUrl}
                  onChange={handleRepoChange}
                  disabled={isLoading}
                  autoComplete="off"
                />
              </div>
            </div>

            <Alert type="error" message={error} onDismiss={reset} />

            <div className="job-item__actions">
              <motion.button
                type="submit"
                className="job-item__button"
                disabled={isLoading || !repoUrl.trim()}
                whileTap={{ scale: 0.96 }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      className="job-item__btn-inner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="job-item__btn-dots">
                        <span />
                        <span />
                        <span />
                      </span>
                      Enviando
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      className="job-item__btn-inner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      Submit
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M2 6.5h9M7 2.5l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
