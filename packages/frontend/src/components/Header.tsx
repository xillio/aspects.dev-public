import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Database } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/75 dark:bg-black/75 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-xl text-black dark:text-white"
          >
            <Database className="w-5 h-5" />
            <span>Aspects.dev</span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link
              to="/docs"
              className={`hover:text-black dark:hover:text-white transition ${
                location.pathname === "/docs"
                  ? "text-black dark:text-white font-semibold"
                  : ""
              }`}
            >
              Documentation
            </Link>
            <Link
              to="/api-reference"
              className={`hover:text-black dark:hover:text-white transition ${
                location.pathname === "/api-reference"
                  ? "text-black dark:text-white font-semibold"
                  : ""
              }`}
            >
              API Reference
            </Link>
          </nav>
        </div>

        {/* Right: Theme toggle + CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="text-xl hover:opacity-80 transition"
            title="Toggle dark mode"
          >
            {dark ? "🌙" : "☀️"}
          </button>
          <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md text-sm font-semibold shadow hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
