import React from "react";
import { useParams } from "react-router-dom";

function EditPlant() {
  const { id } = useParams();
  return <h1>Edit Plant {id}</h1>;
}

export default EditPlant;