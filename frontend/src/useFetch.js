import { useEffect, useState } from "react";

//link = json-server rest api link

const useFetch = (link) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abort = new AbortController();

    fetch(link, { signal: abort.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Permission denied"); //check out diff errors based on code
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(err.message);
          setIsLoading(false);
          console.log(err.message);
        }
      });

    //some problem is there
    return () => abort.abort(); //runs everytime the component calling useEffect unmounts
  }, [link]); //link is the dependency
  return { data, isLoading, error };
};
export default useFetch;
