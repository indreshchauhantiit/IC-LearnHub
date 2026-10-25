import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  GraduationCap,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";

function CTASection() {
  const benefits = [
    "Learn at your own pace",
    "Expert-led courses",
    "Build real-world skills",
  ];

  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 px-6 py-12 shadow-2xl shadow-indigo-200/60 sm:px-10 sm:py-16 lg:px-16 lg:py-20">

          {/* Background Decorations */}
          <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full border-[40px] border-white/5 sm:h-96 sm:w-96" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="pointer-events-none absolute right-1/4 top-0 -z-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left Content */}
            <div className="text-center lg:text-left">

              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-50 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                Start Your Learning Journey
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                Your Future
                <span className="block text-indigo-200">
                  Starts Here.
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg lg:mx-0">
                Turn your ambitions into achievements with LearnHub.
                Discover new skills, learn from expert instructors,
                and take the next step toward your dream career.
              </p>

              {/* Benefits */}
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-sm font-medium text-white/95"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                    {benefit}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  to="/courses"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-indigo-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  Explore Courses
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  <GraduationCap className="h-5 w-5" />
                  Join LearnHub
                </Link>
              </div>

              <p className="mt-5 text-sm text-indigo-200">
                Start learning today and invest in yourself.
              </p>
            </div>

            {/* Right Visual Card */}
            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:p-6">

                {/* Floating Icon */}
                <div className="absolute -right-3 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 text-indigo-900 shadow-xl sm:-right-4 sm:-top-5 sm:h-16 sm:w-16">
                  <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>

                {/* Main Card */}
                <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-7">

                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200">
                      <BookOpen className="h-7 w-7" />
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                        LearnHub
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Learn. Grow. Succeed.
                      </p>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-slate-100" />

                  {/* Learning Progress Illustration */}
                  <div className="rounded-2xl bg-indigo-50/80 p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                          Your next chapter
                        </p>
                        <h4 className="mt-2 text-lg font-bold text-slate-900">
                          Learn Something New
                        </h4>
                      </div>

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                        <PlayCircle className="h-6 w-6" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-800">
                          Your Learning Journey
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Start with a course you love
                        </p>
                      </div>

                      <ArrowRight className="h-5 w-5 shrink-0 text-indigo-500" />
                    </div>
                  </div>

                  {/* Bottom Message */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Every expert was once a beginner.
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Take your first step today.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Bottom Label */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-white/90">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  Your journey. Your goals. Your future.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
