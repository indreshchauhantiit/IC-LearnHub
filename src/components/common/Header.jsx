
import { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  BookOpen,
  Search,
  Menu,
  X,
  ShoppingCart,
  UserRound,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Java Q&A", path: "/java-questions" },
  { name: "MCQ", path: "/mcq" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-indigo-600"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  const closeMenu = () => setIsOpen(false);

  const dashboardPath =
    user?.role === "instructor"
      ? "/instructor/dashboard"
      : "/student/dashboard";

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="IC-LearnHub home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200">
            <BookOpen className="h-6 w-6 text-white" />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            <span className="text-indigo-600">IC-</span>
            Learn<span className="text-indigo-600">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={linkClass}
            >
              {({ isActive }) => (
                <span className="relative block py-1">
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-indigo-600 transition-all duration-200 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-4">
          <Link
            to="/courses"
            aria-label="Search courses"
            title="Search courses"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Search className="h-5 w-5" />
          </Link>

          <Link
            to="/student/cart"
            aria-label="Shopping cart"
            title="Shopping cart"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>

          <span className="h-7 w-px bg-slate-200" />

          {isAuthenticated ? (
            <>
              <Link
                to={dashboardPath}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <LayoutDashboard size={17} />
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600"
              >
                <UserRound className="h-4 w-4" />
                Log in
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile / Tablet Actions */}
        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <Link
            to="/student/cart"
            aria-label="Shopping cart"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Dropdown */}
      <div
        id="mobile-navigation"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out lg:hidden ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="min-h-0">
          <div className="border-t border-slate-200 bg-white px-4 py-5 sm:px-6">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {/* Main Links */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <Link
                to="/courses"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Search className="h-5 w-5" />
                Explore Courses
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>

                  <Link
                    to="/student/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <UserRound className="h-5 w-5" />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-lg border border-red-100 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <UserRound className="h-5 w-5" />
                    Log in
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="mt-2 flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
