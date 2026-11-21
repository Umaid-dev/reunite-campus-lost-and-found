export async function api(path = '', options = {}) {
  const response = await fetch(`/api/items${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong.');
    error.fields = data.errors;
    throw error;
  }
  return data;
}
