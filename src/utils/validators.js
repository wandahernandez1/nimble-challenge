// Acepta URLs del tipo https://github.com/usuario/repositorio con o sin barra al final, pero no acepta rutas adicionales ni parámetros
const GITHUB_REPO_REGEX =
  /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateGithubUrl(url) {
  if (!url || url.trim() === "") {
    return {
      valid: false,
      error: "El campo de repositorio no puede estar vacío.",
    };
  }
  if (!GITHUB_REPO_REGEX.test(url.trim())) {
    return {
      valid: false,
      error:
        "Ingresá una URL válida de GitHub (ej: https://github.com/usuario/repo).",
    };
  }
  return { valid: true, error: null };
}

export function validateEmail(email) {
  if (!email || email.trim() === "") {
    return { valid: false, error: "El email no puede estar vacío." };
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return { valid: false, error: "Ingresá un email válido." };
  }
  return { valid: true, error: null };
}
