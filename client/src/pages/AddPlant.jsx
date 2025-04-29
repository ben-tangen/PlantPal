import React, { useState } from "react";

function AddPlant() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState("");

  const handleAddPlant = () => {
    if (newPlant.trim() !== "") {
      setPlants([...plants, newPlant]);
      setNewPlant(""); // Clear the input field
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Plant</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter plant name"
          value={newPlant}
          onChange={(e) => setNewPlant(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={handleAddPlant} style={{ padding: "10px" }}>
          Add Plant
        </button>
      </div>
      <div>
        <h2>Your Plants</h2>
        {plants.length > 0 ? (
          <ul>
            {plants.map((plant, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {plant}
              </li>
            ))}
          </ul>
        ) : (
          <p>No plants added yet.</p>
        )}
      </div>
    </div>
  );
}

export default AddPlant;