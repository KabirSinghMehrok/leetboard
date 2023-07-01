import React from "react";
import BarChart from "../charts/BarChart";
import "../../style/style.css";

function Overview({data, fetchData}) {
  return (
    <div className="h-full w-full p-4">
      {data.length==0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="mx-auto my-auto text-gray-200">No friends found</p>
        </div>
      ) : (
        <BarChart data={data} fetchData={fetchData} />
      )}
    </div>
  );
}

export default Overview;
