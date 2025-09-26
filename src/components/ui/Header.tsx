/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiUser, HiLogout } from "react-icons/hi";
import { useAuth } from "../../contexts/AuthContext";
import Button from "./Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fermer les menus quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { to: "/services", label: "Services" },
    { to: "/pricing", label: "Tarifs" },
    { to: "/contact", label: "Contact" },
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      // L'erreur est gérée dans le contexte
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Retour à l'accueil"
          >
            <motion.div
              className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BR
            </motion.div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                BricoRapide
              </h1>
              <p className="text-xs text-gray-500">
                Petits travaux & montages à domicile
              </p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-6" role="navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  text-gray-700 hover:text-orange-500 transition-colors duration-200
                  font-medium relative
                  ${isActiveLink(item.to) ? "text-orange-500" : ""}
                `}
              >
                {item.label}
                {isActiveLink(item.to) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                    layoutId="activeLink"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <HiUser className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.nom}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1"
                      role="menu"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Tableau de bord
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        role="menuitem"
                      >
                        <HiLogout className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}

            <Link to="/booking">
              <Button size="md">Réserver</Button>
            </Link>
          </div>

          {/* Menu mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-label="Menu de navigation"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6 text-gray-600" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <nav className="flex flex-col gap-4" role="navigation">
                {navigationItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      text-gray-700 hover:text-orange-500 transition-colors
                      font-medium py-2
                      ${isActiveLink(item.to) ? "text-orange-500" : ""}
                    `}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="border-t border-gray-200 pt-4 mt-2">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-2">
                      <Link
                        to="/dashboard"
                        className="text-gray-700 font-medium py-2"
                      >
                        Tableau de bord
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-left text-gray-700 font-medium py-2 flex items-center gap-2"
                      >
                        <HiLogout className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/login">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                        >
                          Connexion
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="outline" size="sm" className="w-full">
                          Inscription
                        </Button>
                      </Link>
                    </div>
                  )}

                  <Link to="/booking" className="block mt-4">
                    <Button size="md" className="w-full">
                      Réserver
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
