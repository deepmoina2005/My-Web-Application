import axios from "axios";
import { useEffect, useState } from "react";

function useFetchData(apiEndpoint){
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState([]);
  const [initialLoad, setInitialLoad] = useState([]);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        const alldata = res.data;
        setAlldata(alldata);
        setLoading(false)
      } catch (error) {
        setLoading(false);
      }
    }

    // fetch blog data only if category exists
    if (apiEndpoint) {
      fetchAllData()
    }
  }, [initialLoad, apiEndpoint]); // depend on initialLoad to trigger api

  return {alldata, loading}
}

export default useFetchData;