import http from "../http"

export default async function handleLogout() {
    try {
        await http.post("/users/logout")
    } catch (error) {
        //console.log(error);
    }
    localStorage.clear()
    window.location.href = "/"
}