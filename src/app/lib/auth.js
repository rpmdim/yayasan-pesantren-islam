import { getUsers } from "@/data/users";

export function login(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return null;

  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("currentUser");
  return raw ? JSON.parse(raw) : null;
}