import React, { useState } from "react";
import axios from "axios";

const LogForm = () => {
  const [logData, setLogData] = useState({
    level: "",
    log_string: "",
    metadata: {
      source: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setLogData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setLogData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/logs", logData);
      alert("Log created successfully");
      setLogData({
        level: "",
        log_string: "",
        metadata: {
          source: "",
        },
      });
    } catch (error) {
      console.error("Error creating log:", error.message);
      alert("Error creating log");
    }
  };

  return (
    <div>
      <h2>Create Log</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="level">Level:</label>
          <input
            type="text"
            name="level"
            id="level"
            value={logData.level}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="log_string">Log String:</label>
          <input
            type="text"
            name="log_string"
            id="log_string"
            value={logData.log_string}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="metadata.source">Source:</label>
          <input
            type="text"
            name="metadata.source"
            id="metadata.source"
            value={logData.metadata.source}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogForm;
