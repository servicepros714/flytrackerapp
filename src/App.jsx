// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import FileTrackerApp from './Component/FileTrackerApp';
import Dashboard from './Admin/dashboard';
import ChangePasswordPage from './Component/Form';
import { getToken } from './auth/Auth';

function RequireAuth({ children, adminOnly = false, userOnly = false }) {
  const tokenData = getToken();

  if (!tokenData) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = tokenData.UserType === 'Admin';
  const isUser = tokenData.UserType === 'User';
  const isActive = tokenData.Status === 'Active';

  if (adminOnly && !isAdmin) {
    return <Navigate to="/file-tracker" replace />;
  }

  if (userOnly && (!isUser || !isActive)) {
    return <Navigate to="/" replace />;
  }

  if (window.location.pathname === '/change-password' && tokenData.Status === 'Active') {
  return <Navigate to="/file-tracker" replace />;
}

  return children;
}


function RedirectIfLoggedIn() {
  const tokenData = getToken();

  if (tokenData) {
    if (tokenData.Status === 'Pending') {
      return <Navigate to="/change-password" replace />;
    }

    return tokenData.UserType === 'Admin'
      ? <Navigate to="/admin-dashboard" replace />
      : <Navigate to="/file-tracker" replace />;
  }

  return <LoginPage />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectIfLoggedIn />} />

       <Route
          path="/file-tracker"
          element={
            <RequireAuth userOnly={true}>
              <FileTrackerApp />
            </RequireAuth>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <RequireAuth adminOnly={true}>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/change-password"
          element={
            <RequireAuth>
              <ChangePasswordPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
