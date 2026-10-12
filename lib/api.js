
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ai-receptionalist-backend.onrender.com";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("clienxo_token");
}

export function setToken(token) {
  window.localStorage.setItem("clienxo_token", token);
}

export async function api(path, options = {}) {
  const { auth, headers: customHeaders, ...fetchOptions } = options;

  const headers = {
    ...(customHeaders || {}),
  };

  if (fetchOptions.body != null && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const token = auth === false ? null : getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${API_BASE}${path}`;

  let response;

  try {
    response = await fetch(url, {
      ...fetchOptions,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    console.error("API network/CORS error:", url, error);
    throw error;
  }

  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { detail: text };
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.detail || `Request failed with status ${response.status}`
    );
  }

  return data;
}

export { API_BASE };
