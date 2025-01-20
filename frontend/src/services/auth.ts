export function login(username: string, password: string) {
  // ...authenticate with server...
  return true; // or false
}

export function logout() {
  // ...clear session...
}

export function isAuthenticated() {
  // ...check token...
  return false;
}
