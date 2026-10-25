
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Star,
  Users,
  Clock,
  BookOpen,
  Code,
  Palette,
  Database,
  Megaphone,
  Award,
  ArrowRight,
  GraduationCap,
  Globe,
  CheckCircle,
  Play,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  ChevronRight,
} from 'lucide-react';

import { courses, categories } from '../../data/courses';

const categoryIcons = {
  Code,
  Palette,
  Database,
  Megaphone,
};

function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    navigate(
      query
        ? `/courses?search=${encodeURIComponent(query)}`
        : '/courses'
    );
  };

  const stats = [
    {
      value: '10K+',
      label: 'Active learners',
      icon: Users,
    },
    {
      value: '500+',
      label: 'Expert courses',
      icon: BookOpen,
    },
    {
      value: '100+',
      label: 'Professional mentors',
      icon: GraduationCap,
    },
    {
      value: '50+',
      label: 'Countries reached',
      icon: Globe,
    },
  ];

  const benefits = [
    {
      icon: GraduationCap,
      title: 'Learn from experts',
      description:
        'Get practical knowledge and guidance from experienced instructors.',
    },
    {
      icon: Clock,
      title: 'Learn on your schedule',
      description:
        'Study whenever you want and move forward at your own pace.',
    },
    {
      icon: ShieldCheck,
      title: 'Build real-world skills',
      description:
        'Strengthen your portfolio with practical lessons and projects.',
    },
  ];

  const featuredCourses = courses.slice(0, 4);

  return (
    <div className="overflow-hidden bg-white text-slate-900">

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        {/* Decorative backgrounds */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-20 -z-10 h-96 w-96 rounded-full bg-purple-300/25 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">

          {/* Hero content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              <Sparkles size={16} className="text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">
                Your journey to success starts here
              </span>
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-extrabold leading-[1.13] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
              Learn new skills.
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Shape your future.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Discover expert-led courses, master in-demand skills,
              and turn your ambitions into real achievements with
              IC-Learn-Hub.
            </p>

            {/* Search form */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl shadow-indigo-100/60 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100"
            >
              <Search
                size={21}
                className="ml-3 shrink-0 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What do you want to learn?"
                aria-label="Search courses"
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              />

              <button
                type="submit"
                className="shrink-0 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95 sm:px-6"
              >
                Search
              </button>
            </form>

            {/* Hero actions */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to="/courses"
                className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
              >
                Explore Courses
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Get Started Free
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-emerald-500" />
                Expert instructors
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-emerald-500" />
                Flexible learning
              </span>
            </div>
          </div>

          {/* Hero image and floating cards */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-indigo-200/60 to-purple-200/60 blur-2xl"
            />

            <div className="relative rounded-[2rem] border border-white/80 bg-white/50 p-3 shadow-2xl shadow-indigo-200/40 backdrop-blur-sm sm:p-4">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=85"
                  alt="Students learning and collaborating together"
                  fetchPriority="high"
                  className="h-[330px] w-full object-cover sm:h-[430px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-indigo-950/10" />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                      <TrendingUp
                        size={25}
                        className="text-indigo-600"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">
                        Your growth, your pace
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Learn today. Lead tomorrow.
                      </p>
                    </div>

                    <div className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 sm:block">
                      Keep growing
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating card */}
            <div className="absolute -right-1 top-7 rounded-2xl border border-white bg-white p-3 shadow-xl sm:-right-5 sm:top-12 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                  <Star
                    size={21}
                    className="fill-amber-400 text-amber-400"
                  />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-slate-900">
                    4.9/5
                  </p>
                  <p className="text-xs text-slate-500">
                    Learner rating
                  </p>
                </div>
              </div>
            </div>

            {/* Learners card */}
            <div className="absolute -left-1 top-1/2 rounded-2xl border border-white bg-white p-3 shadow-xl sm:-left-6 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <Users size={23} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-slate-900">
                    10K+
                  </p>
                  <p className="text-xs text-slate-500">
                    Learners
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom floating badge */}
            <div className="absolute -bottom-5 right-5 flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-white shadow-xl sm:right-8">
              <Award size={20} className="text-amber-400" />
              <span className="text-sm font-semibold">
                Skills that matter
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-10 border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map(({ value, label, icon: Icon }, index) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-3 py-7 sm:gap-4 sm:px-5 sm:py-9 ${
                index % 2 === 0 ? 'border-r border-slate-100 md:border-r-0' : ''
              } ${
                index < 2 ? 'border-b border-slate-100 md:border-b-0' : ''
              } ${
                index !== 0 ? 'md:border-l md:border-slate-100' : ''
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 sm:h-12 sm:w-12">
                <Icon size={23} className="text-indigo-600" />
              </div>

              <div>
                <p className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <Sparkles size={14} />
                Find your path
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Explore popular
                <span className="text-indigo-600"> categories</span>
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-slate-500">
                Find a subject you love and start building skills
                that open new opportunities.
              </p>
            </div>

            <Link
              to="/courses"
              className="group inline-flex w-fit items-center gap-2 font-bold text-indigo-600 transition hover:text-indigo-800"
            >
              View all courses
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.icon] || BookOpen;

              const colorStyles = [
                {
                  icon: 'bg-indigo-100 text-indigo-600',
                  hover: 'group-hover:bg-indigo-600',
                },
                {
                  icon: 'bg-purple-100 text-purple-600',
                  hover: 'group-hover:bg-purple-600',
                },
                {
                  icon: 'bg-emerald-100 text-emerald-600',
                  hover: 'group-hover:bg-emerald-600',
                },
                {
                  icon: 'bg-orange-100 text-orange-600',
                  hover: 'group-hover:bg-orange-500',
                },
              ];

              const colors = colorStyles[index % colorStyles.length];

              return (
                <Link
                  key={category.name}
                  to={`/courses?category=${encodeURIComponent(category.name)}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 ${colors.icon} ${colors.hover} group-hover:text-white`}
                    >
                      <Icon size={27} />
                    </div>

                    <ArrowRight
                      size={20}
                      className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600"
                    />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900 transition group-hover:text-indigo-600">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {category.courses} courses to explore
                  </p>

                  <div className="mt-5 h-1 w-10 rounded-full bg-slate-100 transition-all duration-300 group-hover:w-16 group-hover:bg-indigo-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES SECTION */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-11 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 shadow-sm">
                <Zap size={14} />
                Level up your skills
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Featured courses
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-slate-500">
                Handpicked learning experiences to help you move
                closer to your career goals.
              </p>
            </div>

            <Link
              to="/courses"
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-indigo-200 bg-white px-5 py-3 font-bold text-indigo-600 transition hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              Browse all
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredCourses.map((course) => (
                <article
                  key={course.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/60"
                >
                  <Link
                    to={`/courses/${course.id}`}
                    className="relative block overflow-hidden bg-slate-100"
                    aria-label={`View ${course.title}`}
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-60" />

                    {course.badge && (
                      <span className="absolute left-3 top-3 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        {course.badge}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo-600 shadow-lg transition group-hover:bg-indigo-600 group-hover:text-white">
                      <ArrowRight size={19} />
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {course.category}
                    </p>

                    <Link to={`/courses/${course.id}`}>
                      <h3 className="mt-2 min-h-[3.5rem] text-base font-bold leading-6 text-slate-900 transition hover:text-indigo-600">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-sm text-slate-500">
                      By {course.instructor}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-y border-slate-100 py-3">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                        <Star
                          size={16}
                          className="fill-amber-400 text-amber-400"
                        />
                        {course.rating}
                      </span>

                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users size={15} />
                        {Number(course.students || 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {course.duration}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-1">
                        {course.level}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xl font-extrabold text-slate-900">
                          ₹{course.price}
                        </span>

                        {course.originalPrice > course.price && (
                          <span className="text-sm text-slate-400 line-through">
                            ₹{course.originalPrice}
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/courses/${course.id}`}
                        aria-label={`View ${course.title}`}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                      >
                        View
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <BookOpen
                size={36}
                className="mx-auto text-slate-400"
              />
              <h3 className="mt-4 font-bold text-slate-900">
                Courses coming soon
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                New learning opportunities will appear here.
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Explore all courses
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-4 -top-4 h-28 w-28 rounded-3xl border-2 border-indigo-200 sm:-left-6 sm:-top-6" />

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=85"
              alt="Student learning digital skills using a laptop"
              loading="lazy"
              className="relative z-10 h-[340px] w-full rounded-3xl object-cover shadow-2xl sm:h-[440px]"
            />

            <div className="absolute -bottom-6 -right-2 z-20 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-right-6 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                  <Award size={25} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    Skills for tomorrow
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Learn. Practice. Grow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-3 lg:pt-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <Sparkles size={14} />
              The IC-Learn-Hub difference
            </div>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Education that moves
              <span className="block text-indigo-600">
                you forward.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Go beyond watching lessons. Develop practical skills,
              learn from experienced instructors, and take control
              of your personal and professional growth.
            </p>

            <div className="mt-9 space-y-7">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/courses"
              className="group mt-9 inline-flex items-center gap-2 font-bold text-indigo-600 transition hover:text-indigo-800"
            >
              Start learning today
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 px-6 py-14 shadow-2xl shadow-indigo-200/60 sm:px-12 sm:py-20">
          {/* Decorative shapes */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-purple-400/20 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute right-1/4 top-10 h-3 w-3 rounded-full bg-amber-300"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-50 backdrop-blur">
              <Sparkles size={16} />
              Your next chapter starts now
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Turn your curiosity into your superpower.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-indigo-100 sm:text-lg">
              Take the first step toward your goals. Discover new
              interests, develop valuable skills, and build a future
              you are proud of.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Browse Courses
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/5 px-6 py-3.5 font-bold text-white transition hover:bg-white/15"
              >
                Create Free Account
                <ChevronRight size={19} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-indigo-100">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} />
                Learn at your pace
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={16} />
                Grow your skills
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
