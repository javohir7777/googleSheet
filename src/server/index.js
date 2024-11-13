import axios from "axios";

export const requies = axios.create({
  baseURL: "https://api.sheetbest.com/sheets",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
export default requies;
