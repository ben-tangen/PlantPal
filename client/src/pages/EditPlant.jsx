import React, { useState } from "react";

function EditPlant() {
  const [plantName, setPlantName] = useState("");
  const [newPlantName, setNewPlantName] = useState("");

  const handleEditPlant = () => {
    if (newPlantName.trim() !== "") {
      setPlantName(newPlantName);
      setNewPlantName("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Plant</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new plant name"
          value={newPlantName}
          onChange={(e) => setNewPlantName(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={handleEditPlant} style={{ padding: "10px" }}>
          Edit Plant
        </button>
      </div>
      {plantName && <p>Plant name updated to: {plantName}</p>}
    </div>
  );
}

export default EditPlant;