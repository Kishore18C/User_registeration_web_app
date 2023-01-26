import axios from "axios";

async function registerUser(user) {
  return axios.post("http://localhost:9000/register", user);
}
async function loginUser(user) {
  return axios.post("http://localhost:9000/login", user);
}

export { registerUser, loginUser };
