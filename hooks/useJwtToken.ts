import isAuthenticated from "../constants/isAuthenticated";

export function getJwtToken() {
  return sessionStorage.getItem("jwt");
}

export function setJwtToken(token: string) {
  sessionStorage.setItem("jwt", token);
  isAuthenticated(true);
}

export function clearJwtToken() {
  sessionStorage.removeItem("jwt");
  isAuthenticated(false);
}
