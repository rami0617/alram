import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Alram  from "../components/Alram";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Alram />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
