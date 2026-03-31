import { Routes, Route, Link, NavLink } from "react-router-dom";
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
        <NavLink to="/admin">Admin</NavLink>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  </div>
);
