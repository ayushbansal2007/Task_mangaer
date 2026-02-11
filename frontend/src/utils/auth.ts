export const getUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.user_id;
};
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
