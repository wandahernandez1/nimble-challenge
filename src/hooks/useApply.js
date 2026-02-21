import { useState, useCallback } from "react";
import { applyToJob } from "../api/candidateService";
import { validateGithubUrl } from "../utils/validators";

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
};

// Cada JobItem tiene su propia instancia para mantener el estado aislado por posición
export function useApply() {
  const [state, setState] = useState(INITIAL_STATE);

  const submitApplication = useCallback(
    async ({ uuid, applicationId, jobId, candidateId, repoUrl }) => {
      const { valid, error: validationError } = validateGithubUrl(repoUrl);
      if (!valid) {
        setState((prev) => ({ ...prev, error: validationError }));
        return;
      }

      setState({ isLoading: true, success: false, error: null });

      try {
        await applyToJob({
          uuid,
          applicationId,
          jobId,
          candidateId,
          repoUrl: repoUrl.trim(),
        });
        setState({ isLoading: false, success: true, error: null });
      } catch (err) {
        setState({
          isLoading: false,
          success: false,
          error: err.message || "Error al enviar la postulación.",
        });
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    isLoading: state.isLoading,
    success: state.success,
    error: state.error,
    submitApplication,
    reset,
  };
}
