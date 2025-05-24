import { useEffect } from "react";
import api from "../api.ts";
const useWakeupAPI = () => {
  useEffect(() => {
    api
      .get("/ping")
      .then(() => console.log("API wakeup success"))
      .catch((err) => console.log("API wakeup failed:", err.message));
  }, []);
};

export default useWakeupAPI;
