const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    method: options.method || 'GET',
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  const responseText = await response.text();
  let data;

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    throw new Error(`O servidor retornou uma resposta inválida (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    const validationMessage = data.errors
      ? Object.values(data.errors).flat().join('\n')
      : '';
    throw new Error(
      validationMessage || data.mensagem || data.message || `Erro HTTP ${response.status}.`
    );
  }

  return data;
}
