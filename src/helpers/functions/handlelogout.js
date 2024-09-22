import http from "../http"

export default async function handleLogout() {
    await http.post("/users/logout")
    localStorage.clear()
    window.location.href = "/"
}