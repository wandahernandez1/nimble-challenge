class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  // Intentamos leer el mensaje del body antes de caer en el status genérico
  let errorMessage = `Error ${response.status}: ${response.statusText}`;

  try {
    const errorBody = await response.json();
    if (errorBody?.message) errorMessage = errorBody.message;
    else if (errorBody?.error) errorMessage = errorBody.error;
    else if (typeof errorBody === "string") errorMessage = errorBody;
  } catch {
    // el body no es JSON, usamos el mensaje por defecto
  }

  throw new ApiError(errorMessage, response.status);
}

export async function get(url, params = {}) {
  const urlWithParams = new URL(url);
  Object.entries(params).forEach(([key, value]) =>
    urlWithParams.searchParams.append(key, value),
  );

  try {
    const response = await fetch(urlWithParams.toString());
    return handleResponse(response);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      "No se pudo conectar con el servidor. Verificá tu conexión.",
      0,
    );
  }
}

export async function post(url, body = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      "No se pudo conectar con el servidor. Verificá tu conexión.",
      0,
    );
  }
}
