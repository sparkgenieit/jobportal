import http from "../../helpers/http";
import httpUpload from "../../helpers/httpUpload";

class UserService {
    
  getAll() {
    return http.get("/user");
  }

  get(id) {
    return http.get(`/users/profile/${id}`);
  }

  create(data) {
    return http.post("/users/register", data);
  }

  forgetpassword(data) {
    return http.post("/forgot-password", data);
  }

  resetpassword(data) {
    return http.post("/reset-password", data);
  }

  login(data) {
    return http.post("/users/login", data);
  }

  verify(data) {
    return http.post("/verify", data);
  }

  subscribe(data) {
    return http.post("/subscribe", data);
  }

  update(id, data) {
   console.log(data.photo);
    if(data.photo){
      return http.put(`/update-user-wiht-photo/${id}`, data);
    }else{
      console.log(data);
      return http.put(`/update-user/${id}`, data);
    }
  }

  changePassword(id, data) {
    return http.put(`/changePassword/${id}`, data);
  }

  delete(id) {
    return http.delete(`/remove-user/${id}`);
  }

  deleteAll() {
    return http.delete(`/locations`);
  }

  
}

export default new UserService();