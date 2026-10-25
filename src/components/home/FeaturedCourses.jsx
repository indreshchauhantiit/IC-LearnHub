import { Link } from "react-router-dom";
import {
  Star,
  Clock3,
  UsersRound,
  ArrowRight,
  ShoppingCart,
  PlayCircle,
  Sparkles,
} from "lucide-react";

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    category: "Web Development",
    instructor: "Rahul Sharma",
    rating: 4.9,
    students: 1250,
    duration: "32 hours",
    lessons: 48,
    price: 799,
    originalPrice: 1999,
    badge: "Bestseller",
    badgeColor: "bg-amber-100 text-amber-700",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    category: "Data Science",
    instructor: "Priya Verma",
    rating: 4.8,
    students: 980,
    duration: "28 hours",
    lessons: 36,
    price: 999,
    originalPrice: 2499,
    badge: "Popular",
    badgeColor: "bg-emerald-100 text-emerald-700",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "UI/UX Design with Figma",
    category: "UI/UX Design",
    instructor: "Ananya Singh",
    rating: 4.9,
    students: 860,
    duration: "18 hours",
    lessons: 24,
    price: 699,
    originalPrice: 1599,
    badge: "Bestseller",
    badgeColor: "bg-amber-100 text-amber-700",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass",
    category: "Marketing",
    instructor: "Aman Gupta",
    rating: 4.7,
    students: 720,
    duration: "15 hours",
    lessons: 22,
    price: 599,
    originalPrice: 1499,
    badge: "Trending",
    badgeColor: "bg-rose-100 text-rose-700",
    image:
      "https://images.unsplash.com/photo- digital-marketing",
    gradient: "from-orange-500 to-rose-600",
  },
];

function FeaturedCourses() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
              <Sparkles className="h-4 w-4" />
              Handpicked For You
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Featured
              <span className="text-indigo-600"> Courses</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              Learn from expert instructors and build skills that
              help you move forward in your career.
            </p>
          </div>

          <Link
            to="/courses"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 sm:self-auto"
          >
            View All Courses
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredCourses.map((course) => (
            <article
              key={course.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
            >
              {/* Course Image */}
              <Link
                to={`/courses/${course.id}`}
                aria-label={`View ${course.title}`}
                className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                <span
                  className={`absolute left-3 top-3 rounded-lg px-3 py-1.5 text-xs font-bold ${course.badgeColor}`}
                >
                  {course.badge}
                </span>

                <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                  {course.category}
                </span>

                <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo-600 shadow-lg transition duration-300 group-hover:scale-110">
                  <PlayCircle className="h-5 w-5" />
                </span>
              </Link>

              {/* Course Details */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800">
                    {course.rating}
                  </span>
                  <span className="text-slate-400">
                    ({course.students.toLocaleString("en-IN")})
                  </span>
                </div>

                <Link to={`/courses/${course.id}`}>
                  <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-indigo-600">
                    {course.title}
                  </h3>
                </Link>

                <p className="mt-2 text-sm text-slate-500">
                  By{" "}
                  <span className="font-semibold text-slate-700">
                    {course.instructor}
                  </span>
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 pb-4 text-xs font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-indigo-500" />
                    {course.duration}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <UsersRound className="h-4 w-4 text-indigo-500" />
                    {course.lessons} lessons
                  </span>
                </div>

                {/* Price and Cart */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-xs text-slate-400 line-through">
                      ₹{course.originalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <Link
                    to="/student/cart"
                    aria-label={`Add ${course.title} to cart`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 sm:px-4"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-slate-500">
            Can't find the right course? Explore our full catalog.
          </p>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Explore All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCourses;