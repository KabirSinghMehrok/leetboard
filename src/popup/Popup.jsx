import { StrictMode } from "react";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "../style/style.css";
import AddFriends from "./components/AddFriends";
import Overview from "./components/Overview";
import fillOverviewData from "../data/overview";

function Popup() {
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
      {/* Warning and information */}
      <div
        className="m-4 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-transparent dark:text-yellow-300"
        role="alert"
      >
        <span class="font-medium">Warning!</span> Click on a friend to delete them from the leaderboard
      </div>

      {/* Tab content */}
      <div className="grow w-full bg-white dark:bg-slate-700">
        <Overview data={data} fetchData={fetchData} />
      </div>

      {/* User management bar */}
      <AddFriends fetchData={fetchData} />
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
