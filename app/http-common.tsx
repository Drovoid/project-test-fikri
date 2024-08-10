import axios from "axios";

export default axios.create({
  baseURL: "https://suitmedia-backend.suitdev.com/api/ideas",
  headers: {
    "Content-type": "application/json"
  }
});