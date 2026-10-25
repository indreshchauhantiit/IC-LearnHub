
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "lms-user";
const ACCOUNTS_KEY = "lms-accounts";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeEmail(email) {
  return typeof email === "string"
    ? email.trim().toLowerCase()
    : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSafeUser(account) {
  return {
    name: account.name,
    email: account.email,
    role: account.role,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = readStorage(STORAGE_KEY, null);

    if (
      savedUser &&
      typeof savedUser.email === "string" &&
      ["student", "instructor"].includes(savedUser.role)
    ) {
      return {
        name: savedUser.name,
        email: normalizeEmail(savedUser.email),
        role: savedUser.role,
      };
    }

    return null;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(user)
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Unable to save login session:", error);
    }
  }, [user]);

  const isAuthenticated = Boolean(user);

  // Register a new account.
  const register = ({
    name,
    email,
    password,
    role = "student",
  }) => {
    const cleanName =
      typeof name === "string" ? name.trim() : "";

    const normalizedEmail = normalizeEmail(email);

    if (!cleanName || !normalizedEmail) {
      return {
        success: false,
        message: "Name and email are required.",
      };
    }

    if (!isValidEmail(normalizedEmail)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    if (typeof password !== "string" || password.length < 6) {
      return {
        success: false,
        message: "Password must contain at least 6 characters.",
      };
    }

    const normalizedRole =
      typeof role === "string" ? role.toLowerCase() : "";

    if (!["student", "instructor"].includes(normalizedRole)) {
      return {
        success: false,
        message: "Please select a valid account type.",
      };
    }

    const accounts = readStorage(ACCOUNTS_KEY, []);

    if (!Array.isArray(accounts)) {
      return {
        success: false,
        message: "Unable to read accounts. Please try again.",
      };
    }

    const alreadyExists = accounts.some(
      (account) =>
        normalizeEmail(account.email) === normalizedEmail
    );

    if (alreadyExists) {
      return {
        success: false,
        message: "An account with this email already exists. Please log in.",
      };
    }

    const newAccount = {
      name: cleanName,
      email: normalizedEmail,
      password,
      role: normalizedRole,
    };

    try {
      localStorage.setItem(
        ACCOUNTS_KEY,
        JSON.stringify([...accounts, newAccount])
      );
    } catch {
      return {
        success: false,
        message: "Unable to save your account in this browser.",
      };
    }

    const safeUser = getSafeUser(newAccount);
    setUser(safeUser);

    return {
      success: true,
      user: safeUser,
    };
  };

  // Verify credentials against a previously registered account.
  const login = ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    if (typeof password !== "string" || !password) {
      return {
        success: false,
        message: "Please enter your password.",
      };
    }

    const accounts = readStorage(ACCOUNTS_KEY, []);

    if (!Array.isArray(accounts)) {
      return {
        success: false,
        message: "Unable to read accounts. Please try again.",
      };
    }

    const account = accounts.find(
      (item) =>
        normalizeEmail(item.email) === normalizedEmail &&
        item.password === password
    );

    if (!account) {
      return {
        success: false,
        message: "Incorrect email or password, or account not registered.",
      };
    }

    const safeUser = getSafeUser(account);
    setUser(safeUser);

    return {
      success: true,
      user: safeUser,
    };
  };

  // Update allowed profile information without changing account credentials.
  const updateUser = (updates) => {
    if (!user) {
      return {
        success: false,
        message: "Please log in first.",
      };
    }

    const updatedName =
      typeof updates?.name === "string"
        ? updates.name.trim()
        : user.name;

    if (!updatedName) {
      return {
        success: false,
        message: "Name cannot be empty.",
      };
    }

    const updatedUser = {
      ...user,
      name: updatedName,
    };

    // Keep the saved account profile in sync.
    const accounts = readStorage(ACCOUNTS_KEY, []);

    try {
      if (Array.isArray(accounts)) {
        const updatedAccounts = accounts.map((account) =>
          normalizeEmail(account.email) === user.email
            ? { ...account, name: updatedName }
            : account
        );

        localStorage.setItem(
          ACCOUNTS_KEY,
          JSON.stringify(updatedAccounts)
        );
      }

      setUser(updatedUser);

      return {
        success: true,
        user: updatedUser,
      };
    } catch {
      return {
        success: false,
        message: "Unable to update your profile.",
      };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    updateUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
