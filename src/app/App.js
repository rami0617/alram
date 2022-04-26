import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Alram  from "../components/Alram";
import List from "../components/List";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Alram onShowModal={setShowModal} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showModal && <List onShowModal={setShowModal} />}
    </div>
  );
}

export default App;
