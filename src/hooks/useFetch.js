import { useEffect, useState } from "react";
import { useProduct } from "../context/productContext";
import axiosInstance from "../utils/axiosInstance";

function useFetch(url, route) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accData, setAccData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { setSelectedCat, subCatId, selectedCat, status, search } =
    useProduct();

  useEffect(() => {
    setAccData([]);
  }, [selectedCat?._id, subCatId, status, search]);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance().get(url, {
          signal: controller.signal,
        });

        setData(res.data);
        if (res.data.products) {
          setAccData((prev) => [...prev, ...res.data.products]);
          setHasMore(res.data.products.length > 0);
        }
        if (route === "category") {
          setSelectedCat(res.data.category);
        }
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
  }, [
    url,
    setSelectedCat,
    route /* selectedCat?._id, subCatId, status,  search*/,
  ]);

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

  return { data, loading, error, reFetch, accData, hasMore };
}

export default useFetch;
