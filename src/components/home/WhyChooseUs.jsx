import {
  GraduationCap,
  Laptop,
  Award,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    description:
      "Learn from experienced instructors who help you build practical skills.",
  },
  {
    icon: Laptop,
    title: "Learn Anywhere",
    description:
      "Access your courses anytime and learn at your own pace from any device.",
  },
  {
    icon: Award,
    title: "Certificates",
    description:
      "Earn certificates after completing courses and showcase your achievements.",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description:
      "Revisit your course materials whenever you need to refresh your knowledge.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Why LearnHub?
          </span>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Why Choose Us?
          </h2>

          <p className="mt-4 text-gray-600">
            We provide everything you need to learn new skills,
            grow your career, and achieve your goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;