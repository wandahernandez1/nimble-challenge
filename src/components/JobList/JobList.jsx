import { motion } from "framer-motion";
import { useJobs } from "../../hooks/useJobs";
import { JobItem } from "../JobItem/JobItem";
import { Alert } from "../ui/Alert";
import "./JobList.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export function JobList({ candidate }) {
  const { jobs, isLoading, error } = useJobs();

  if (isLoading) {
    return (
      <div className="job-list__skeleton">
        {[1, 2, 3].map((i) => (
          <div key={i} className="job-list__skeleton-item">
            <div className="job-list__skeleton-line job-list__skeleton-line--short" />
            <div className="job-list__skeleton-line" />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <Alert type="error" message={error} />;

  if (jobs.length === 0) {
    return (
      <Alert
        type="info"
        message="No hay posiciones disponibles en este momento."
      />
    );
  }

  return (
    <section className="job-list">
      <motion.header
        className="job-list__header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="job-list__title">Posiciones abiertas</h2>
        <span className="job-list__count">{jobs.length}</span>
      </motion.header>

      <motion.ul
        className="job-list__grid"
        role="list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {jobs.map((job) => (
          <motion.li key={job.id} variants={itemVariants}>
            <JobItem job={job} candidate={candidate} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
