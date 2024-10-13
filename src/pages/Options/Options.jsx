import React, { useState, useEffect } from "react";

const Options = () => {
  const [preferences, setPreferences] = useState({
    enableSound: true,
    checkFrequency: 1,
  });

  useEffect(() => {
    chrome.storage.sync.get(["preferences"], (result) => {
      setPreferences(result.preferences || preferences);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const savePreferences = () => {
    chrome.storage.sync.set({ preferences }, () => {
      alert("Preferences saved!");
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Options</h1>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="enableSound"
            checked={preferences.enableSound}
            onChange={handleChange}
            className="mr-2"
          />
          Enable notification sounds
        </label>
      </div>
      <div className="mb-4">
        <label>
          Check frequency (minutes):
          <input
            type="number"
            name="checkFrequency"
            value={preferences.checkFrequency}
            onChange={handleChange}
            className="ml-2 border rounded p-1"
            min="1"
          />
        </label>
      </div>
      <button
        onClick={savePreferences}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default Options;
