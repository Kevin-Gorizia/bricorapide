import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            BR
          </div>
          <div>
            <h1 className="text-lg font-semibold">BricoRapide</h1>
            <p className="text-xs text-gray-500">
              Petits travaux & montages à domicile
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/services" className="text-gray-700 hover:text-primary">
            Services
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-primary">
            Tarifs
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary">
            Contact
          </Link>
          <a
            href="#booking"
            className="ml-4 px-4 py-2 bg-primary text-white rounded-md shadow"
          >
            Réserver
          </a>
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="p-2">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="#111827"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-4 mt-2 bg-white border rounded shadow p-4 w-48">
          <Link to="/services" className="block py-2">
            Services
          </Link>
          <Link to="/pricing" className="block py-2">
            Tarifs
          </Link>
          <Link to="/contact" className="block py-2">
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
