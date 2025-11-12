import { createContext, useContext, useEffect, useState } from "react";
import {
  onIdTokenChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Listen for token changes and store ID token
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("token", token);
        setUser(currentUser);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // 🧾 Register user
  const register = async (name, email, password, photoURL) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name, photoURL });
    const token = await res.user.getIdToken();
    localStorage.setItem("token", token);
  };

  // 🔑 Email login
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const token = await res.user.getIdToken();
    localStorage.setItem("token", token);
  };

  // 🟢 Google login
  const googleLogin = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const token = await res.user.getIdToken();
    localStorage.setItem("token", token);
  };

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
