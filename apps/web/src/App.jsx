import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { runtimeConfig } from "./lib/runtime-config.js";

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
      <Route path={runtimeConfig.adminPath} element={<AdminPage />} />
      <Route path="/admin" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </div>
);
