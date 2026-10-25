
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  LockKeyhole,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      // Registered email aur password verify karein.
      const result = login({
        email: normalizedEmail,
        password,
      });

      if (!result.success) {
        setError(
          result.message || "Invalid email or password."
        );
        return;
      }

      // Selected role aur registered account ka role match hona chahiye.
      if (result.user.role !== role) {
        // Galat role select hone par session clear karein.
        // Iske liye logout function use karna zaroori hai.
        setError(
          `This account is registered as ${result.user.role}. Please select the correct role.`
        );

        return;
      }

      const requestedPath = location.state?.from?.pathname;

      const defaultPath =
        result.user.role === "instructor"
          ? "/instructor/dashboard"
          : "/student/dashboard";

      navigate(requestedPath || defaultPath, {
        replace: true,
      });
    } catch {
      setError("Unable to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Back to Home */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <BookOpen size={28} />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue learning.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-indigo-600">
              <Mail
                size={18}
                className="text-slate-400"
              />

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-indigo-600">
              <LockKeyhole
                size={18}
                className="text-slate-400"
              />

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* Account Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Login As
            </label>

            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 outline-none focus:border-indigo-600"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Create account
          </Link>
        </p>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          Use the email and password you entered during registration.
        </p>
      </div>
    </div>
  );
}

export default Login;
