import {
  UsersRound,
  BookOpen,
  GraduationCap,
  Globe2,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    id: 1,
    value: "10K+",
    label: "Active Learners",
    description: "Learning and growing every day",
    icon: UsersRound,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: 2,
    value: "500+",
    label: "Online Courses",
    description: "Skills for every career path",
    icon: BookOpen,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    value: "50+",
    label: "Expert Instructors",
    description: "Learn from industry professionals",
    icon: GraduationCap,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    value: "20+",
    label: "Learning Categories",
    description: "Explore skills across industries",
    icon: Globe2,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    gradient: "from-orange-500 to-rose-500",
  },
];

function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white py-14 sm:py-16 lg:py-20">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-purple-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            LearnHub in Numbers
          </span>

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Empowering Learners,
            <span className="text-indigo-600"> Every Day</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Join a growing learning community and take the next step
            toward your personal and professional goals.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 sm:p-7"
              >
                {/* Top Accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${stat.gradient} transition-transform duration-300 group-hover:scale-x-100`}
                />

                {/* Icon and Trend */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Growing
                  </span>
                </div>

                {/* Number */}
                <div className="mt-6">
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-base font-bold text-slate-800">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div
                  className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-300 group-hover:w-20`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:mt-12 sm:flex-row">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <GraduationCap className="h-5 w-5" />
          </div>

          <p className="text-sm text-slate-600 sm:text-base">
            Your next big opportunity starts with
            <span className="font-bold text-indigo-600"> learning.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
