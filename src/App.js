import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import DashboardPage from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      
      <Routes>
          <Route path='*' element={<Navigate to="/" />} />
          <Route path="/" exact element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
