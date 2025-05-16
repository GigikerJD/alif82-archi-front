import { Navigate, Route, Routes } from "react-router-dom";
import { AppAuth } from "./AppProvider";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Forms } from "../pages/Forms";
import { Settings } from "../pages/Settings";
import { Studios } from "../pages/Studios";
import { Movie } from "../pages/Movie";

const ProtectedRoute = ({ children, endpoint }) => {
  const { isLoggedIn } = AppAuth();
  return isLoggedIn ? children : <Navigate to={endpoint} />;
};

const PublicRoute = ({ children, endpoint }) => {
  const { isLoggedIn } = AppAuth();
  return isLoggedIn ? <Navigate to={endpoint} /> : children;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute endpoint="/dashboard">
            <Home />
          </PublicRoute>
        }
        caseSensitive={true}
      />

      <Route
        path="/studios"
        element={
          <PublicRoute endpoint="/dashboard">
            <Studios/>
          </PublicRoute>
        }
      />

      <Route
        path="/movie/:title"
        element={
          <PublicRoute endpoint="/dashboard">
            <Movie/>
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute endpoint="/">
            <Dashboard />
          </ProtectedRoute>
        }
        caseSensitive={true}
      />

      <Route
        path="/forms"
        element={
          <PublicRoute endpoint="/dashboard">
            <Forms />
          </PublicRoute>
        }
        caseSensitive={true}
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute endpoint="/">
            <Settings />
          </ProtectedRoute>
        }
        caseSensitive={true}
      />
    </Routes>
  );
};

export default AppRouter;
