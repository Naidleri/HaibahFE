const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://be-lp-2-m-coffee-quality-prediction.vercel.app';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
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

export async function loginService({ email, password }) {
  return request('/api/login', { method: 'POST', body: { email, password } });
}

export async function registerService({ name, email, password }) {
  return request('/api/register', { method: 'POST', body: { name, email, password } });
}

export async function getAllUsers(token) {
  return request('/api/users', { method: 'GET', token });
}

export async function getUserById(id, token) {
  return request(`/api/user/${id}`, { method: 'GET', token });
}

export async function createUser(data, token) {
  return request('/api/register', { method: 'POST', body: data, token });
}

export async function updateUser(id, data, token) {
  return request(`/api/user/update/${id}`, { method: 'PUT', body: data, token });
}

export async function deleteUser(id, token) {
  return request(`/api/user/delete/${id}`, { method: 'DELETE', token });
}

export async function getHistoryByUserId(id, token) {
  return request(`/api/history/${id}`, { method: 'GET', token });
}
