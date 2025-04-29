import React, { useState } from "react";

function CareLog() {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState("");

  const handleAddLog = () => {
    if (newLog.trim() !== "") {
      setLogs([...logs, newLog]);
      setNewLog("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Care Log</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter care activity"
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={handleAddLog} style={{ padding: "10px" }}>
          Add Log
        </button>
      </div>
      <div>
        <h2>Care Activities</h2>
        {logs.length > 0 ? (
          <ul>
            {logs.map((log, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {log}
              </li>
            ))}
          </ul>
        ) : (
          <p>No care activities logged yet.</p>
        )}
      </div>
    </div>
  );
}

export default CareLog;