import client from "../apollo-client";
import isAuthenticated from "../constants/isAuthenticated";

export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  isAuthenticated(token && token.length ? true : false);
  return token;
}

export function setJwtToken(token: string) {
  sessionStorage.setItem("jwt", token);
  isAuthenticated(true);
}

export function clearJwtToken() {
  sessionStorage.removeItem("jwt");
  isAuthenticated(false);
  client.clearStore();
}
