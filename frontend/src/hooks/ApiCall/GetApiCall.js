import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function useGetApiCall(url, refreshKey = null) {
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);

  const refetch = useCallback(() => {
    setRequestKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!url) return undefined;

    const controller = new AbortController();

    const getData = async () => {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          signal: controller.signal,
        });
        setData(response.data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getData();
    return () => controller.abort();
  }, [url, token, requestKey, refreshKey]);

  return {
    data: url ? data : null,
    loading: url ? loading : false,
    error: url ? error : null,
    refetch,
  };
}

export default useGetApiCall;
