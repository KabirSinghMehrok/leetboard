import React, { useState, useEffect } from 'react';

const AddFriends = () => {
  const [inputValue, setInputValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      return; // Don't store empty strings
    }

    chrome.storage.local.get(['myArray'], (result) => {
      const myArray = result.myArray || [];
      myArray.push(inputValue);

      chrome.storage.local.set({ myArray }, () => {
        setSuccessMessage('String stored successfully!');
      });
    });
  };

	useEffect(() => {
		console.log('chrome storage printing');
		console.log(chrome.storage);
		
    // Initialize myArray if it doesn't exist in local storage
    chrome.storage.local.get(['myArray'], (result) => {
      if (!result.myArray) {
        chrome.storage.local.set({ myArray: [] });
      }
    });
  }, []);

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Store String</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default AddFriends;
