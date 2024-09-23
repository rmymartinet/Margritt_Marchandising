import axios from "axios";
import { useEffect, useState } from "react";

export function useFilteredData(filterCriteria) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4242/api/originals");
        const filteredData = response.data.filter(
          (item) => item.dimension === filterCriteria
        );
        setData(filteredData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filterCriteria]);

  return { data, error, loading };
}
