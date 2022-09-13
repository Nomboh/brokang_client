import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance().get(url, {
          signal: controller.signal,
        });

        setData(res.data);
      } catch (error) {
        setLoading(false);
        if (error.name === "AbortError") {
          console.log("Too many request, Aborted");
        } else {
          setError(error);
        }
      }
      setLoading(false);
    };

    getData();

    return () => {
      controller.abort();
    };
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance().get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
}

export default useFetch;
