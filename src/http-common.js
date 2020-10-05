import axios from "axios";


export default axios.create({
    baseURL: "http://10.0.0.57:8080",
    headers: {
        "Content-type": "application/json"
    }
})