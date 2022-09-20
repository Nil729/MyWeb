import Axios from "axios";

// Serveix per donar format mitjansant els heders
export default Axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-type": "application/json"
  }
});