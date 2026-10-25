
import { Link, useNavigate } from "react-router-dom";
import { Trash2, BookOpen, ArrowLeft, ShieldCheck } from "lucide-react";
import { useCart } from "../../context/useCart";
import { useEnrollments } from "../../context/EnrollmentContext";

const getPrice = (price) => {
  const amount = Number(String(price ?? 0).replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
};

const CartCheckout = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { enrollCourses } = useEnrollments();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, course) => sum + getPrice(course.price),
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Demo checkout only — no real payment is processed.
    enrollCourses(cartItems);
    clearCart();
    navigate("/student/dashboard", { replace: true });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <BookOpen className="mx-auto mb-4 text-indigo-600" size={42} />
          <h1 className="text-2xl font-bold text-slate-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-slate-500">
            Add a course before proceeding to checkout.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            <ArrowLeft size={18} /> Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/courses"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600"
        >
          <ArrowLeft size={16} /> Continue browsing
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-slate-900">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Your Courses ({cartItems.length})
            </h2>

            <div className="space-y-5">
              {cartItems.map((course) => (
                <div
                  key={course.id}
                  className="flex gap-4 border-b border-slate-100 pb-5 last:border-0"
                >
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-24 w-28 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-28 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <BookOpen size={30} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {course.title}
                    </h3>
                    <p className="mt-2 font-medium text-slate-700">
                      ₹{getPrice(course.price).toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => removeFromCart(course.id)}
                      className="mt-2 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="my-5 flex justify-between border-b border-slate-100 pb-4 text-slate-600">
              <span>Total courses</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="mb-6 flex justify-between text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <div className="mb-5 flex gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              <ShieldCheck size={20} className="shrink-0" />
              <p>Demo checkout. No real payment will be collected.</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Complete Demo Checkout
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
