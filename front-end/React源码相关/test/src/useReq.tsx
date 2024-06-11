import { useState, useEffect, useRef } from "react";
const useRequest = (url: string, options: any = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lockRef = useRef(false);
  useEffect(() => {
    console.log("hhh");
    const fetchData = async () => {
      if (lockRef.current) return;
      lockRef.current = true;
      setLoading(true);
      try {
        const data = await fetch(url, options);
        setData(data);
      } catch {
        setError(error);
      }
      lockRef.current = false;
      setLoading(false);
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};
export default useRequest;
