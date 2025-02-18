import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mode, setMode] = useState("moon"); // "moon" means dark mode is active
  const [isOpen, setIsOpen] = useState(false); // For mobile hamburger menu

  // Toggle the theme mode and close mobile menu if open
  const handleMode = (type) => {
    setMode(type);
    setIsOpen(false);
  };

  // Update the HTML element's class for dark mode using Tailwind's class strategy.
  useEffect(() => {
    if (mode === "moon") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <nav className="relative bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
          <span className="text-3xl sm:text-4xl font-bold cursor-pointer bg-gradient-to-r from-green-500 to-green-900 text-transparent bg-clip-text">
            Product Store
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-16 items-center">
          <Link to="/create">
            <button className="bg-green-700 text-white px-4 py-2 rounded-md font-bold text-lg cursor-pointer">
              Create Product
            </button>
          </Link>
          {mode === "moon" ? (
            <Moon
              className="cursor-pointer text-white w-6 h-6"
              onClick={() => handleMode("sun")}
            />
          ) : (
            <Sun
              className="cursor-pointer text-yellow-400 w-6 h-6"
              onClick={() => handleMode("moon")}
            />
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="sm:hidden">
          {isOpen ? (
            <X
              className="cursor-pointer text-black dark:text-white w-8 h-8"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <Menu
              className="cursor-pointer text-black dark:text-white w-8 h-8"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-gray-100 dark:bg-gray-900 p-4 flex flex-col gap-4">
          <Link to="/create">
            <button
              className="bg-green-700 text-white px-4 py-2 rounded-md font-bold text-lg cursor-pointer w-full"
              onClick={() => setIsOpen(false)}
            >
              Create Product
            </button>
          </Link>
          <div className="flex justify-center">
            {mode === "moon" ? (
              <Moon
                className="cursor-pointer text-white w-6 h-6"
                onClick={() => handleMode("sun")}
              />
            ) : (
              <Sun
                className="cursor-pointer text-yellow-400 w-6 h-6"
                onClick={() => handleMode("moon")}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
