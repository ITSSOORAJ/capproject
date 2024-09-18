import { useState, useEffect } from "react";
import axiosInstance from "../useAxiosInstance";

const useManagers = () => {
  const [managers, setManagers] = useState({
    all: [],
    filtered: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setManagers((prev) => ({
        ...prev,
        filtered: prev.all,
      }));
    } else {
      const filtered = managers.all.filter(
        (manager) =>
          manager.name.toLowerCase().includes(value.toLowerCase()) ||
          manager.email.toLowerCase().includes(value.toLowerCase())
      );
      setManagers((prev) => ({
        ...prev,
        filtered: filtered,
      }));
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/admin/managers/list");
      const result = response.data.managers;
      setManagers({
        all: result,
        filtered: result,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching managers:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return { managers: managers.filtered, loading, searchTerm, handleSearch };
};

export default useManagers;
