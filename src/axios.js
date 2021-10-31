import axios from "axios";

const instance = axios.create({
 baseURL: "https://whatsapp-backendversion.herokuapp.com/",
})

export default instance;