
import { SlidersHorizontal, X } from 'lucide-react';

function CourseFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  maxPrice,
  setMaxPrice,
  clearFilters,
}) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-bold text-slate-900">
          <SlidersHorizontal size={18} />
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div className="border-b border-slate-100 pb-6">
        <h3 className="mb-4 font-semibold text-slate-800">
          Categories
        </h3>

        <div className="space-y-3">
          {['All', ...categories].map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="h-4 w-4 accent-indigo-600"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Level */}
      <div className="border-b border-slate-100 py-6">
        <h3 className="mb-4 font-semibold text-slate-800">
          Difficulty Level
        </h3>

        <div className="space-y-3">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <label
              key={level}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="level"
                checked={selectedLevel === level}
                onChange={() => setSelectedLevel(level)}
                className="h-4 w-4 accent-indigo-600"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            Maximum Price
          </h3>
          <span className="text-sm font-semibold text-indigo-600">
            ₹{maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="3000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full cursor-pointer accent-indigo-600"
          aria-label="Maximum course price"
        />

        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>₹0</span>
          <span>₹3,000</span>
        </div>
      </div>

      <button
        type="button"
        onClick={clearFilters}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
      >
        <X size={16} />
        Reset filters
      </button>
    </aside>
  );
}

export default CourseFilters;