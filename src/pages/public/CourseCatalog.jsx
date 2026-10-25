
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, BookOpen, ArrowUpDown } from "lucide-react";

import { courses as defaultCourses } from "../../data/courses";
import CourseCard from "../../components/course/CourseCard";
import CourseFilters from "../../components/course/CourseFilters";

const STORAGE_KEY = "lms-created-courses";

function CourseCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [createdCourses, setCreatedCourses] = useState([]);

  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState("popular");

  // Load instructor-created courses from localStorage.
  useEffect(() => {
    const loadCreatedCourses = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        const parsedData = storedData ? JSON.parse(storedData) : [];

        if (!Array.isArray(parsedData)) {
          throw new Error("Saved courses must be an array.");
        }

        // Only published instructor courses appear in the student catalog.
        setCreatedCourses(
          parsedData.filter(
            (course) =>
              course &&
              course.id != null &&
              course.status === "published"
          )
        );
      } catch (error) {
        console.error("Unable to load instructor courses:", error);
        setCreatedCourses([]);
      }
    };

    loadCreatedCourses();

    // Update if localStorage changes in another browser tab.
    window.addEventListener("storage", loadCreatedCourses);

    return () => {
      window.removeEventListener("storage", loadCreatedCourses);
    };
  }, []);

  // Merge built-in courses and instructor-created courses without
  // duplicating courses that share the same ID.
  const allCourses = useMemo(() => {
    const combinedCourses = [...defaultCourses];
    const existingIds = new Set(
      combinedCourses.map((course) => String(course.id))
    );

    createdCourses.forEach((course) => {
      const courseId = String(course.id);

      if (!existingIds.has(courseId)) {
        combinedCourses.push(course);
        existingIds.add(courseId);
      }
    });

    return combinedCourses;
  }, [createdCourses]);

  // Build categories from both built-in and instructor-created courses.
  const categories = useMemo(
    () => [
      ...new Set(
        allCourses
          .map((course) => course.category)
          .filter(Boolean)
      ),
    ],
    [allCourses]
  );

  // Keep URL search and category parameters in sync.
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "All";

    setSearch(urlSearch);
    setSelectedCategory(
      urlCategory === "All" || categories.includes(urlCategory)
        ? urlCategory
        : "All"
    );
  }, [searchParams, categories]);

  const filteredCourses = useMemo(() => {
    let result = [...allCourses];

    // Search by title, instructor, category, or subtitle.
    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((course) =>
        [
          course.title,
          course.subtitle,
          course.instructor,
          course.category,
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        )
      );
    }

    // Category filter.
    if (selectedCategory !== "All") {
      result = result.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Difficulty filter.
    if (selectedLevel !== "All") {
      result = result.filter(
        (course) => course.level === selectedLevel
      );
    }

    // Maximum price filter.
    result = result.filter(
      (course) =>
        Number.isFinite(Number(course.price)) &&
        Number(course.price) <= maxPrice
    );

    // Sorting.
    switch (sortBy) {
      case "rating":
        result.sort(
          (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)
        );
        break;

      case "price-low":
        result.sort(
          (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
        );
        break;

      case "name":
        result.sort((a, b) =>
          String(a.title || "").localeCompare(String(b.title || ""))
        );
        break;

      case "popular":
      default:
        result.sort(
          (a, b) =>
            (Number(b.students) || 0) - (Number(a.students) || 0)
        );
        break;
    }

    return result;
  }, [
    allCourses,
    search,
    selectedCategory,
    selectedLevel,
    maxPrice,
    sortBy,
  ]);

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    if (
      selectedCategory !== "All" &&
      categories.includes(selectedCategory)
    ) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setMaxPrice(3000);
    setSortBy("popular");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-sm text-indigo-100">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>Courses</span>
          </div>

          <h1 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Explore Our Courses
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-indigo-100">
            Discover expert-led courses and develop the skills
            you need to achieve your learning goals.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-2xl items-center gap-2 rounded-xl bg-white p-2 shadow-lg"
          >
            <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses, instructors..."
              aria-label="Search courses and instructors"
              className="min-w-0 flex-1 px-2 py-3 text-sm text-slate-800 outline-none"
            />

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Catalog Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <div className="lg:sticky lg:top-24">
            <CourseFilters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
            />
          </div>

          {/* Course Results */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  All Courses
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Showing {filteredCourses.length} of {allCourses.length} courses
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown
                  size={18}
                  className="shrink-0 text-slate-500"
                />

                <label
                  htmlFor="sort"
                  className="whitespace-nowrap text-sm text-slate-600"
                >
                  Sort by:
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Course Name</option>
                </select>
              </div>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                <BookOpen
                  size={44}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-xl font-bold text-slate-800">
                  No courses found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or adjusting the filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseCatalog;
