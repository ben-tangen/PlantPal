import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AddPlant from "./pages/AddPlant";
import Dashboard from "./pages/Dashboard";
import CareLog from "./pages/CareLog";
import EditPlant from "./pages/EditPlant";
import PhotoJournal from "./pages/PhotoJournal";

function Navigation() {
  const navigate = useNavigate(); // Use the useNavigate hook here

  return (
    <nav className="navbar">
      <button onClick={() => navigate("/")}>Dashboard</button>
      <button onClick={() => navigate("/add-plant")}>Add Plant</button>
      <button onClick={() => navigate("/edit-plant")}>Edit Plant</button>
      <button onClick={() => navigate("/care-log")}>Care Log</button>
      <button onClick={() => navigate("/photo-journal")}>Photo Journal</button>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-plant" element={<AddPlant />} />
          <Route path="/edit-plant" element={<EditPlant />} />
          <Route path="/care-log" element={<CareLog />} />
          <Route path="/photo-journal" element={<PhotoJournal />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
