import useManagers from "@hooks/admin/useManagers";  // Updated import to useManagers
import ManagerList from "./ManagerList";  // Updated import to ManagerList
import SearchBar from "./SearchBar";
import ManagersSkeleton from "./ManagersSkeleton";  // Updated import to ManagersSkeleton

const ManagerViewer = () => {
  const { managers, loading, searchTerm, handleSearch } = useManagers();  // Updated hook to useManagers

  if (loading) return <ManagersSkeleton />;  // Updated to ManagersSkeleton

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Manager Viewer</h1>  {/* Updated heading */}
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <ManagerList managers={managers} />  {/* Updated to ManagerList */}
    </div>
  );
};

export default ManagerViewer;
