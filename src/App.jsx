import { AnimatePresence, motion } from "framer-motion";
import { useCandidate } from "./hooks/useCandidate";
import { CandidateSetup } from "./components/CandidateSetup/CandidateSetup";
import { CandidateCard } from "./components/CandidateCard/CandidateCard";
import { JobList } from "./components/JobList/JobList";
import "./App.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: "easeIn" } },
};

function App() {
  const { candidate, isLoading, error, fetchCandidate, resetCandidate } =
    useCandidate();

  return (
    <div className="app">
      <main className="app__container">
        <AnimatePresence mode="wait">
          {!candidate ? (
            <motion.div
              key="setup"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CandidateSetup
                onFetch={fetchCandidate}
                isLoading={isLoading}
                error={error}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              className="app__dashboard"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CandidateCard candidate={candidate} onReset={resetCandidate} />
              <JobList candidate={candidate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="app__footer">
        <p>Nimble Gravity — Candidate Portal</p>
      </footer>
    </div>
  );
}

export default App;
