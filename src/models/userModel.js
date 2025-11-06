const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://be-lp-2-m-coffee-quality-prediction.vercel.app';

async function req(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw data || { message: res.statusText };
    return data;
  } catch (err) {
    if (!res.ok) throw { message: res.statusText || 'Request failed' };
    return null;
  }
}

export async function createUser(data, token) {
  return req('/api/register', { method: 'POST', body: data, token });
}

export async function updateUser(id, data, token) {
  return req(`/api/user/update/${id}`, { method: 'PUT', body: data, token });
}

export async function allReadUser(token) {
  return req('/api/users', { method: 'GET', token });
}

export async function readUserById(id, token) {
  return req(`/api/user/${id}`, { method: 'GET', token });
}

export async function deleteUser(id, token) {
  return req(`/api/user/delete/${id}`, { method: 'DELETE', token });
}
