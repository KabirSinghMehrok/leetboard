import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../style/style.css";
import Overview from "./components/Overview";
import Topics from "./components/Topics";

function Popup() {
  const [showTab, setShowTab] = useState("overview");
  const baseTabStyling = "inline-flex items-center h-10 px-4 -mb-px text-sm text-center whitespace-nowrap focus:outline-none";
  const selectedTabStyling = "text-blue-800 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300";
  const unselectedTabStyling = "text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-gray-400 cursor-base hover:border-gray-400";

  return (
    <div className="w-80 h-[500px] border-2 flex flex-col items-center text-sm bg-white dark:bg-slate-800 text-black dark:text-white">
      
      {/* Selection tabs */}
      <div class="flex flex-row overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        <button
          class={baseTabStyling + (showTab == 'overview' ? selectedTabStyling : unselectedTabStyling) }
          onClick={() => setShowTab("overview")}
        >
          Overview
        </button>
        <button
          class={baseTabStyling + (showTab == 'topics' ? selectedTabStyling : unselectedTabStyling) }
          onClick={() => setShowTab("topics")}
        >
          Topics
        </button>
      </div>

      {/* Tab content */} 
      <div className="grow w-full py-4 px-4 bg-white dark:bg-slate-700">
        {showTab == "overview" ? <Overview/> : <Topics/>}
      </div>
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById("root"));
