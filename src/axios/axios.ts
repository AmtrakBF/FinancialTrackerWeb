import axios from "axios";

const config = { 
    baseURL: "https://localhost:44329/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}
const instance = axios.create(config)
export default instance