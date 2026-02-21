import { useState, useEffect } from "react";
import { getJobsList } from "../api/jobsService";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Evita pisar el estado si el componente se desmontó antes de resolver el fetch
    let cancelled = false;

    async function fetchJobs() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getJobsList();
        if (!cancelled) setJobs(data);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "No se pudo cargar la lista de posiciones.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  return { jobs, isLoading, error };
}
