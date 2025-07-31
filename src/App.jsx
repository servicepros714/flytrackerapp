// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import FileTrackerApp from './Component/FileTrackerApp';
import Dashboard from './Admin/dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/file-tracker" element={<FileTrackerApp />} />
         <Route path="/admin-dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
