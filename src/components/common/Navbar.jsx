
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Menu,
  X,
  ShoppingCart,
  User,
} from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition-colors ${
      isActive
        ? 'text-indigo-600 font-semibold'
        : 'text-slate-600 hover:text-indigo-600'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-600 p-2">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">
            Learn<span className="text-indigo-600">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label="Search courses"
            onClick={() => window.location.assign('/courses')}
            className="text-slate-600 hover:text-indigo-600"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            to="/student/cart"
            aria-label="Shopping cart"
            className="text-slate-600 hover:text-indigo-600"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>

          <Link
            to="/login"
            className="font-medium text-slate-700 hover:text-indigo-600"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={linkClass}
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/student/cart"
              onClick={() => setIsOpen(false)}
              className="text-slate-600"
            >
              <ShoppingCart className="mr-2 inline h-4 w-4" />
              Cart
            </Link>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-slate-600"
            >
              <User className="mr-2 inline h-4 w-4" />
              Log in
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-center font-semibold text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;