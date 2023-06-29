import React, { useState, useEffect } from "react";
import BarChart from "../charts/BarChart";
import "../../style/style.css";

function Overview({data}) {
  return (
    <div className="h-full w-full">
      {data.length==0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="mx-auto my-auto text-gray-200">No friends found</p>
        </div>
      ) : (
        <BarChart data={data} />
      )}
    </div>
  );
}

export default Overview;
