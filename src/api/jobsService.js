import { get } from "./client";
import { ENDPOINTS } from "../constants/api";

export async function getJobsList() {
  return get(ENDPOINTS.GET_JOBS_LIST);
}
