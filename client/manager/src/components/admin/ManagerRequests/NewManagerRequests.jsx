import React from "react";
import useManagerRequests from "@hooks/admin/useManagerRequests";
import ManagerRequestCard from "./ManagerRequestsCard"; // Updated import
import ManagerRequestsSkeleton from "./ManagerRequestSkeleton"; // Updated import
import ManagerRequestSearch from "./ManagerRequestSearch"; // Updated import

const NewManagerRequests = () => {
  const {
    requests,
    loading,
    handleAccept,
    handleReject,
    requestId,
    searchTerm,
    handleSearch,
  } = useManagerRequests();

  if (loading) return <ManagerRequestsSkeleton />; // Updated component name

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        New Manager Requests
      </h1>
      <div className="mb-6">
        <ManagerRequestSearch
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
      </div>
      {(requests?.length || 0) === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <span>No new Manager requests at the moment.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <ManagerRequestCard
              key={request._id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
              isProcessing={requestId === request._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewManagerRequests; // Updated component name
