import { useState, useCallback } from "react";
import { getCandidateByEmail } from "../api/candidateService";
import { validateEmail } from "../utils/validators";

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  error: null,
};

export function useCandidate() {
  const [state, setState] = useState(INITIAL_STATE);

  const fetchCandidate = useCallback(async (email) => {
    const { valid, error: validationError } = validateEmail(email);
    if (!valid) {
      setState((prev) => ({ ...prev, error: validationError }));
      return;
    }

    setState({ data: null, isLoading: true, error: null });

    try {
      const data = await getCandidateByEmail(email.trim());
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error.message || "No se pudo obtener el candidato.",
      });
    }
  }, []);

  const resetCandidate = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    candidate: state.data,
    isLoading: state.isLoading,
    error: state.error,
    fetchCandidate,
    resetCandidate,
  };
}
