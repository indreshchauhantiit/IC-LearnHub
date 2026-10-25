import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Search,
  Play,
  Star,
  UsersRound,
  Clock3,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Code2,
  Palette,
  BrainCircuit,
} from "lucide-react";

function Hero() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (query) {
      navigate(`/courses?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/courses");
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-32 top-32 -z-10 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl sm:h-[30rem] sm:w-[30rem]" />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10 xl:gap-16">

          {/* Left Content */}
          <div className="text-center lg:text-left">

            {/* Top Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Sparkles className="h-3.5 w-3.5" />
              </span>

              <span className="text-xs font-bold text-slate-700 sm:text-sm">
                Your Journey to Success Starts Here
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-5xl xl:text-6xl">
              Learn New Skills.
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Build Your Future.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0">
              Unlock your potential with expert-led online courses.
              Learn at your own pace, master in-demand skills, and
              take the next step toward your dream career.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-indigo-100/50 transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 lg:mx-0"
            >
              <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400 sm:ml-3" />

              <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="What do you want to learn?"
                aria-label="Search courses"
                className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
              />

              <button
                type="submit"
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 sm:px-5"
              >
                <span className="hidden sm:inline">Search</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md"
              >
                <Play className="h-4 w-4 fill-current" />
                Get Started
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <div className="flex items-center -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-xs font-bold text-indigo-700">
                  A
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-xs font-bold text-violet-700">
                  R
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-xs font-bold text-amber-700">
                  P
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-[10px] font-bold text-white">
                  +
                </div>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-1 sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-1 text-sm font-bold text-slate-800">
                    Learn with confidence
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Flexible learning for your goals
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">

            {/* Main Visual Card */}
            <div className="relative rounded-[2rem] border border-white bg-white/70 p-3 shadow-2xl shadow-indigo-200/40 backdrop-blur-xl sm:p-5">

              {/* Learning Banner */}
              <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-6 text-white sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border-[24px] border-white/10" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-violet-400/20 blur-2xl" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      Learning made simple
                    </span>

                    <BookOpen className="h-6 w-6 text-indigo-200" />
                  </div>

                  <h2 className="mt-7 max-w-sm text-2xl font-extrabold leading-tight sm:text-3xl">
                    Invest in yourself.
                    <span className="block text-indigo-200">
                      Grow every day.
                    </span>
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-indigo-100">
                    Discover new opportunities with courses designed
                    for your personal and professional growth.
                  </p>

                  {/* Course Topic Icons */}
                  <div className="mt-7 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur">
                      <Code2 className="mx-auto h-6 w-6" />
                      <p className="mt-2 text-xs font-semibold">Coding</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur">
                      <Palette className="mx-auto h-6 w-6" />
                      <p className="mt-2 text-xs font-semibold">Design</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur">
                      <BrainCircuit className="mx-auto h-6 w-6" />
                      <p className="mt-2 text-xs font-semibold">AI Skills</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Learning Card */}
              <div className="p-3 sm:p-5">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                      Your next step
                    </p>
                    <h3 className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
                      Start learning today
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Choose a course that inspires you.
                    </p>
                  </div>

                  <Link
                    to="/courses"
                    aria-label="Explore courses"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Feature Card */}
            <div className="absolute -left-3 top-16 hidden items-center gap-3 rounded-2xl border border-white bg-white p-3.5 shadow-xl shadow-indigo-100/60 sm:flex lg:-left-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Learn at your pace
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Flexible learning
                </p>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-5 -right-2 hidden items-center gap-3 rounded-2xl border border-white bg-white p-4 shadow-xl shadow-indigo-100/60 sm:flex lg:-right-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <UsersRound className="h-5 w-5" />
              </div>

              <div>
                <p className="text-lg font-extrabold text-slate-900">
                  LearnHub
                </p>
                <p className="text-xs text-slate-500">
                  Your learning partner
                </p>
              </div>
            </div>

            {/* Floating Time Icon */}
            <div className="absolute -right-2 top-1/3 hidden h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white text-indigo-600 shadow-xl sm:flex lg:-right-5">
              <Clock3 className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
