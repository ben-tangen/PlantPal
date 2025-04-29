import React, { useState } from "react";

function PhotoJournal() {
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos([...photos, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Photo Journal</h1>
      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={handlePhotoUpload} style={{ marginBottom: "10px" }} />
      </div>
      <div>
        <h2>Uploaded Photos</h2>
        {photos.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Plant ${index + 1}`}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            ))}
          </div>
        ) : (
          <p>No photos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default PhotoJournal;