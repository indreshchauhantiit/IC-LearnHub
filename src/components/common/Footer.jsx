import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const categories = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "MCQ Practice", path: "/mcq" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label="IC-LearnHub home"
              className="mb-4 inline-flex items-center gap-2"
            >
              <BookOpen
                aria-hidden="true"
                className="h-7 w-7 text-indigo-400"
              />

              <span className="text-2xl font-bold text-white">
                IC-LearnHub
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-slate-400">
              Learn new skills, explore your potential, and build your
              future with IC-LearnHub.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-4 font-semibold text-white">
              Quick Links
            </h2>

            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="mb-4 font-semibold text-white">
              Categories
            </h2>

            <ul className="space-y-3 text-sm">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to="/courses"
                    className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 font-semibold text-white">
              Contact Us
            </h2>

            <p className="text-sm leading-6 text-slate-400">
              Have questions about our courses? We are working to make
              learning easier for everyone.
            </p>

            {/* Add your verified support email here before launch. */}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p>
            &copy; {currentYear} IC-LearnHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
