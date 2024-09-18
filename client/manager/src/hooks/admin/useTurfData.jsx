import { useEffect, useState } from "react";
import axiosInstance from "../useAxiosInstance";
import { useParams } from "react-router-dom";

const useTurfData = () => {
  const [turfData, setTurfData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(turfData, "turf data");

  const { managerId } = useParams();
  console.log(managerId)


  const fetchTurfData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/v1/admin/managers/${managerId}/turf`
      );
      const result = await response.data;
      console.log(result)
      setTurfData(result.turfs);
     } catch (err) {
      console.log(err);
    }finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfData();
  }, []);

  return { turfData, loading };
};

export default useTurfData;
