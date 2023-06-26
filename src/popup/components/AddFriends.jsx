import React, { useState, useEffect } from "react";

const AddFriends = () => {
  const [inputValue, setInputValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    /* eslint-disable no-undef */
    if (inputValue.trim() === "") {
      return; // Don't store empty strings
    }

    chrome.storage.local.get(["myArray"], (result) => {
      const myArray = result.myArray || [];
      myArray.push(inputValue);

      chrome.storage.local.set({ myArray }, () => {
        setSuccessMessage("Success");
      });
    });

    /* eslint-enable no-undef */
  };

  useEffect(() => {
    console.log("chrome storage printing");
    console.log(chrome);
    /* eslint-disable no-undef */

    // Initialize myArray if it doesn't exist in local storage
    chrome.storage.local.get(["myArray"], (result) => {
      if (!result.myArray) {
        chrome.storage.local.set({ myArray: [] });
      }
    });

    /* eslint-enable no-undef */
  }, []);

  return (
    <div className="flex flex-row justify-between items-center gap-2 py-4">
      <label
        htmlFor="add-friends-input"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Leetcode ID
      </label>
      <input
        id="add-friends-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Leetcode ID"
      />
      <button
        onClick={handleSubmit}
        className="py-1.5 px-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {successMessage ? successMessage : 'Store String'}
      </button>
    </div>
  );
};

export default AddFriends;
