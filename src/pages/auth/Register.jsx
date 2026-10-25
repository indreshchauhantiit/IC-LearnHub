
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail) {
      setError("Please enter your name and email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const result = register({
        name: normalizedName,
        email: normalizedEmail,
        password,
        role,
      });

      if (!result.success) {
        setError(
          result.message || "Unable to create account."
        );
        return;
      }

      navigate(
        result.user.role === "instructor"
          ? "/instructor/dashboard"
          : "/student/dashboard",
        { replace: true }
      );
    } catch {
      setError("Unable to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] bg-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          {/* Logo and Heading */}
          <div className="mb-7 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <BookOpen size={28} />
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Join us and start learning today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-3 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                <UserRound
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-3 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                <Mail
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-3 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                <LockKeyhole
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>

              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter password again"
                className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Account Type */}
            <div>
              <label
                htmlFor="register-role"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Account Type
              </label>

              <select
                id="register-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Sign In
            </Link>
          </p>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Use your registered email and password to sign in.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
