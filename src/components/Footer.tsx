import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="bg-dark border-t border-gray-800 py-8 mt-12">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
      <p>© {new Date().getFullYear()} BricoRapide. Tous droits réservés.</p>
      <nav className="flex gap-6 mt-4 md:mt-0">
        <Link to="/services" className="hover:text-primary">
          Services
        </Link>
        <Link to="/pricing" className="hover:text-primary">
          Tarifs
        </Link>
        <Link to="/contact" className="hover:text-primary">
          Contact
        </Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
