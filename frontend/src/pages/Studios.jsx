import { useState, useEffect } from "react";
import axios from "axios";
import { AppAuth } from "../config/AppProvider";

export const Studios = () => {
  const { backendUrl } = AppAuth();
  const [movies, setMovies] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(backendUrl + "/api/movies", {
        validateStatus: (status) => {
          return true;
        },
      });
      const status = response.status;
      setStatus(status);

      switch (status) {
        case 200:
          setMovies(response.data);
          break;
        case 404:
          setMessage(response.data.message);
          break;
        default:
          setMessage("An unexpected error occurred.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {status === 200 && movies && <pre>{JSON.stringify(movies, null, 2)}</pre>}
      {status === 404 && <span>{message}</span>}
    </>
  );
};
