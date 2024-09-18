import React from "react";
import useOwnerRequests from "@hooks/admin/useManagerRequests";
import ManagerRequestCard from "./ManagerRequestsCard"; // Updated import
import ManagerRequestsSkeleton from "./ManagerRequestSkeleton"; // Updated import
import ManagerRequestSearch from "./ManagerRequestSearch"; // Updated import

const RejectedManagerRequests = () => { // Updated component name
  const {
    rejectedRequests = [], // Default to an empty array if undefined
    loading,
    handleReconsider,
    requestId,
    searchTerm,
    handleSearch,
  } = useOwnerRequests();

  if (loading) return <ManagerRequestsSkeleton />; // Updated component name

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Rejected Manager Requests
      </h1>
      <div className="mb-6">
        <ManagerRequestSearch
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
      </div>
      {rejectedRequests.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <span>No rejected Manager requests at the moment.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rejectedRequests.map((request) => (
            <ManagerRequestCard
              key={request._id}
              request={request}
              onReconsider={handleReconsider}
              isProcessing={requestId === request._id}
              isRejected={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedManagerRequests; // Updated component name
