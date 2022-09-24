import isAuthenticated from "../constants/isAuthenticated";

export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  isAuthenticated(token ? true : false);
  return token;
}

export function setJwtToken(token: string) {
  sessionStorage.setItem("jwt", token);
}

export function clearJwtToken() {
  sessionStorage.removeItem("jwt");
}
