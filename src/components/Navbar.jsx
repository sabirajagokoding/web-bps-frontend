import React from "react";
import bpslogo from "../assets/bps-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { id: "publications", label: "Daftar Publikasi", path: "/publications" },
  { id: "add", label: "Tambah Publikasi", path: "/publications/add" },
  { id: "logout", label: "Logout", path: "/logout" },
];

function BpsLogo() {
  return (
    <img
      src={bpslogo}
      alt="BPS Logo"
      className="h-10 w-auto"
    />
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAction, error } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutAction();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <nav className="bg-[#2f6846] shadow-md sticky top-0 z-50">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 text-sm">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => window.location.reload()}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BpsLogo />
            <span className="text-white text-base md:text-lg font-bold tracking-wide hidden sm:block">
              BPS PROVINSI SULAWESI TENGGARA
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.id === "add" &&
                  location.pathname.startsWith("/publications/add")) ||
                (item.id === "publications" &&
                  location.pathname === "/publications");

              if (item.id === "logout") {
                return (
                  <button
                    key={item.id}
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition duration-300"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
                    isActive
                      ? "bg-white text-[#2f6846] shadow font-bold"
                      : "text-white hover:bg-[#245339] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
