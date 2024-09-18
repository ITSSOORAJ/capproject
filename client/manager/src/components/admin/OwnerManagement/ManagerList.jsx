import React from "react";
import ManagerCard from "./ManagerCard";  // Updated import to ManagerCard
import { CalendarDays } from "lucide-react";

const ManagerList = ({ managers = [] }) => {  // Provide default value to avoid undefined issues
  return (
    <>
      {managers.length === 0 ? (
        <div className="alert alert-info shadow-lg w-full">
          <div>
            <span>No managers at the moment.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {managers.map((manager) => (
            <ManagerCard key={manager._id} manager={manager} />  // Updated to ManagerCard
          ))}
        </div>
      )}
    </>
  );
};

export default ManagerList;
