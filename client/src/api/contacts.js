async function request(url, options = {}) {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || "Request failed"), { fields: data.errors });
  return data;
}

export const listContacts = (q = "") => request(`/api/contacts?q=${encodeURIComponent(q)}`);
export const createContact = (body) => request("/api/contacts", { method: "POST", body: JSON.stringify(body) });
export const updateContact = (id, body) => request(`/api/contacts/${id}`, { method: "PUT", body: JSON.stringify(body) });
export const deleteContact = (id) => request(`/api/contacts/${id}`, { method: "DELETE" });
