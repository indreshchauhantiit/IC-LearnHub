import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);
const CART_STORAGE_KEY = "lms-cart";

function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) return [];

    const seenIds = new Set();

    return parsedCart.filter((item) => {
      if (
        !item ||
        item.id == null ||
        !Number.isFinite(Number(item.price)) ||
        Number(item.price) < 0
      ) {
        return false;
      }

      const id = String(item.id);

      if (seenIds.has(id)) return false;

      seenIds.add(id);
      return true;
    });
  } catch (error) {
    console.error("Unable to load cart:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cartItems]);

  const addToCart = (course) => {
    if (
      !course ||
      course.id == null ||
      !Number.isFinite(Number(course.price)) ||
      Number(course.price) < 0
    ) {
      return;
    }

    setCartItems((previousItems) => {
      const alreadyAdded = previousItems.some(
        (item) => String(item.id) === String(course.id)
      );

      if (alreadyAdded) return previousItems;

      return [...previousItems, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => String(item.id) !== String(courseId)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const { totalPrice, cartCount } = useMemo(() => {
    const total = cartItems.reduce(
      (total, item) => total + Number(item.price),
      0
    );

    return {
      totalPrice: Math.round((total + Number.EPSILON) * 100) / 100,
      cartCount: cartItems.length,
    };
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

