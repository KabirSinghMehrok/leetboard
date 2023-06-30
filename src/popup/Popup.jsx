import { StrictMode } from "react";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "../style/style.css";
import AddFriends from "./components/AddFriends";
import Overview from "./components/Overview";
import Topics from "./components/Topics";
import fillOverviewData from "../data/overview";

function Popup() {
  const [showTab, setShowTab] = useState("overview");
  const baseTabStyling =
    "inline-flex items-center h-10 px-4 -mb-px text-sm text-center whitespace-nowrap focus:outline-none";
  const selectedTabStyling =
    "text-blue-800 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300";
  const unselectedTabStyling =
    "text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-gray-400 cursor-base hover:border-gray-400";

  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    const response = await fillOverviewData();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-96 h-[500px] border-2 flex flex-col items-center text-sm bg-white dark:bg-slate-800 text-black dark:text-white">
      {/* Selection tabs */}
      <div className="flex flex-row overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        <button
          className={
            baseTabStyling +
            (showTab == "overview" ? selectedTabStyling : unselectedTabStyling)
          }
          onClick={() => setShowTab("overview")}
        >
          Overview
        </button>
        <button
          className={
            baseTabStyling +
            (showTab == "topics" ? selectedTabStyling : unselectedTabStyling)
          }
          onClick={() => setShowTab("topics")}
        >
          Topics
        </button>
      </div>

      {/* Tab content */}
      <div className="grow w-full py-4 px-4 bg-white dark:bg-slate-700">
        {showTab == "overview" ? <Overview data={data} fetchData={fetchData}/> : <Topics />}
      </div>

      {/* User management bar */}
      <AddFriends fetchData={fetchData}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Popup />
  </StrictMode>
);
