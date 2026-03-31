import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import { apiConfig } from "@portfolio/shared";
import { HomePage } from "./pages/HomePage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";

export const App = () => (
  <div className="app-shell">
    <header className="topbar">
      <Link className="brand" to="/">
        David Fernandez-Cuenca
      </Link>
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={apiConfig.adminPath} element={<AdminPage />} />
      <Route path="/admin" element={<Navigate to="/" replace />} />
    </Routes>
  </div>
);
