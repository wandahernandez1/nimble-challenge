import { get, post } from "./client";
import { ENDPOINTS } from "../constants/api";

export async function getCandidateByEmail(email) {
  return get(ENDPOINTS.GET_CANDIDATE_BY_EMAIL, { email });
}

export async function applyToJob(payload) {
  return post(ENDPOINTS.APPLY_TO_JOB, payload);
}
