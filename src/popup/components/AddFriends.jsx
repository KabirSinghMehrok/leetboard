import React, { useState, useEffect } from "react";

const AddFriends = ({fetchData}) => {
  const [inputValue, setInputValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateUserName = (userName) => {
    // Ensures that username doesn't contain any whitespace
    const regex = /^\S*$/;
    return regex.test(userName);
  };

  const handleInputChange = (e) => {
    // Changes username corresponding to input
    if (validateUserName(e.target.value)) {
      setInputValue(e.target.value);
      setErrorMessage("");
    } else {
      setErrorMessage("No space in username");
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      return; // Don't store empty strings
    }

    chrome.storage.sync.get(["friends"], (result) => {
      const friends = result.friends || [];
      friends.push(inputValue);

      chrome.storage.sync.set({ friends }, () => {
        // On succes, fetch new list 
        // update message to success and return to normal
        fetchData();
        setSuccessMessage("Friend Added");
        setTimeout(() => {
          setSuccessMessage("");
          setInputValue("");
        }, 1000);
      });
    });

  };

  const handleDeletion = () => {
    chrome.storage.sync.clear(() => {
      fetchData();
      setDeleteMessage("Storage cleared");
      setTimeout(() => setDeleteMessage(""), 1000);
    });
  };

  useEffect(() => {
    // Initialize friends if it doesn't exist in local storage
    chrome.storage.sync.get(["friends"], (result) => {
      if (!result.friends) {
        chrome.storage.sync.set({ friends: [] });
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4 px-4 w-full">
      <label
        htmlFor="add-friends-input"
        className="mb-2 w-full text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Leetcode ID
      </label>
      <input
        id="add-friends-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="p-1 text-sm text-gray-900 bg-gray-50 rounded-lg  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Leetcode ID"
      />
      <div className="flex flex-row gap-4 items-center">
        <button
          onClick={handleSubmit}
          className="py-1.5 px-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          disabled={errorMessage}
        >
          {successMessage
            ? successMessage
            : errorMessage
            ? errorMessage
            : "Add Friend"}
        </button>
        <button
          onClick={handleDeletion}
          className="py-1.5 px-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-red rounded-full border border-gray-200 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700"
        >
          {deleteMessage ? deleteMessage : "Delete storage"}
        </button>
      </div>
    </div>
  );
};

export default AddFriends;
