
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  PlayCircle,
  CheckCircle,
  Clock,
  Download,
  Award,
} from "lucide-react";
import { useCart } from "../../context/useCart";

function EnrollmentCard({ course }) {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const isAdded = cartItems.some(
    (item) => String(item.id) === String(course.id)
  );

  const discount = course.originalPrice
    ? Math.round(
        ((course.originalPrice - course.price) /
          course.originalPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(course);
    navigate("/student/cart");
  };

  const handleEnrollNow = () => {
    addToCart(course);
    navigate("/student/cart", {
      state: { checkout: true },
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="h-52 w-full object-cover"
        />

        {course.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            {course.badge}
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-3xl font-bold text-slate-900">
            ₹{Number(course.price).toLocaleString("en-IN")}
          </span>

          {course.originalPrice && (
            <span className="text-lg text-slate-400 line-through">
              ₹{Number(course.originalPrice).toLocaleString("en-IN")}
            </span>
          )}

          {discount > 0 && (
            <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              {discount}% off
            </span>
          )}
        </div>

        <p className="mt-2 text-center text-xs text-slate-500">
          Demo pricing — real payment is not connected
        </p>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <ShoppingCart size={18} />
            {isAdded ? "View Cart" : "Add to Cart"}
          </button>

          <button
            type="button"
            onClick={handleEnrollNow}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-600 px-5 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Enroll Now
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Enrollment and payment are demo flows for now.
        </p>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <h3 className="mb-4 font-semibold text-slate-900">
            This course includes:
          </h3>

          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-3">
              <PlayCircle size={17} className="text-indigo-500" />
              {course.duration} of video content
            </li>

            <li className="flex items-center gap-3">
              <Download size={17} className="text-indigo-500" />
              Downloadable resources
            </li>

            <li className="flex items-center gap-3">
              <Clock size={17} className="text-indigo-500" />
              Lifetime access (demo)
            </li>

            <li className="flex items-center gap-3">
              <Award size={17} className="text-indigo-500" />
              Certificate of completion (demo)
            </li>

            <li className="flex items-center gap-3">
              <CheckCircle size={17} className="text-indigo-500" />
              Self-paced learning
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentCard;
