// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import ComplaintPage from "./pages/ComplaintPage";
import AllComplaintsPage from "./pages/AllComplaintsPage";
import WelcomePage from "./pages/WelcomePage";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/complaint" element={<ComplaintPage />} />
      <Route path="/all-complaints" element={<AllComplaintsPage />} />
      
    </Routes>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ProfileProvider>
  );
}
