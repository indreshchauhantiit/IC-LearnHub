import { Link } from "react-router-dom";
import {
  Code2,
  Database,
  Palette,
  Megaphone,
  BrainCircuit,
  BriefcaseBusiness,
  Smartphone,
  Camera,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Web Development",
    description: "Build modern websites and web applications.",
    courses: 24,
    icon: Code2,
    color: "from-blue-500 to-indigo-600",
    light: "bg-blue-50",
    iconColor: "text-blue-600",
    slug: "web-development",
  },
  {
    id: 2,
    name: "Data Science",
    description: "Discover insights with data and analytics.",
    courses: 18,
    icon: Database,
    color: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50",
    iconColor: "text-emerald-600",
    slug: "data-science",
  },
  {
    id: 3,
    name: "UI/UX Design",
    description: "Create beautiful and user-friendly designs.",
    courses: 16,
    icon: Palette,
    color: "from-purple-500 to-pink-600",
    light: "bg-purple-50",
    iconColor: "text-purple-600",
    slug: "ui-ux-design",
  },
  {
    id: 4,
    name: "Digital Marketing",
    description: "Grow brands with modern marketing strategies.",
    courses: 12,
    icon: Megaphone,
    color: "from-orange-500 to-rose-600",
    light: "bg-orange-50",
    iconColor: "text-orange-600",
    slug: "digital-marketing",
  },
  {
    id: 5,
    name: "Artificial Intelligence",
    description: "Explore AI, machine learning and automation.",
    courses: 14,
    icon: BrainCircuit,
    color: "from-violet-500 to-purple-700",
    light: "bg-violet-50",
    iconColor: "text-violet-600",
    slug: "artificial-intelligence",
  },
  {
    id: 6,
    name: "Business",
    description: "Develop leadership and business skills.",
    courses: 10,
    icon: BriefcaseBusiness,
    color: "from-amber-500 to-orange-600",
    light: "bg-amber-50",
    iconColor: "text-amber-600",
    slug: "business",
  },
  {
    id: 7,
    name: "App Development",
    description: "Build applications for mobile devices.",
    courses: 15,
    icon: Smartphone,
    color: "from-cyan-500 to-blue-600",
    light: "bg-cyan-50",
    iconColor: "text-cyan-600",
    slug: "app-development",
  },
  {
    id: 8,
    name: "Photography",
    description: "Master photography and visual storytelling.",
    courses: 9,
    icon: Camera,
    color: "from-pink-500 to-rose-600",
    light: "bg-pink-50",
    iconColor: "text-pink-600",
    slug: "photography",
  },
];

function Categories() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-purple-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Explore Categories
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Learn Skills That
            <span className="mt-1 block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Shape Your Future
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Explore our learning categories and discover courses
            designed to help you grow your skills and achieve your goals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                to={`/courses?category=${encodeURIComponent(category.slug)}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
              >
                {/* Top Row */}
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.light} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-7 w-7 ${category.iconColor}`} />
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>

                {/* Category Details */}
                <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                  {category.name}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                {/* Bottom Row */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-medium text-slate-500">
                    {category.courses} Courses
                  </span>

                  <span
                    className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${category.color} transition-all duration-300 group-hover:w-16`}
                  />
                </div>

                {/* Hover Accent */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${category.color} transition-transform duration-300 group-hover:scale-x-100`}
                />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center sm:mt-14">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
          >
            Explore All Courses
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Categories;
