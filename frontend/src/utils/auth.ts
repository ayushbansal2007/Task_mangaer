export const loginSave = (token: string, userId: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user_id", userId);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  window.location.href = "/";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getUserId = () => {
  return localStorage.getItem("user_id");
};
