export async function signInUser(username: string, password: string) {
  // Dummy user check
  if (username === "agus" && password === "admin") {
    return { success: true, data: { username } };
  }
  return { success: false, error: "Invalid credentials" };
}
