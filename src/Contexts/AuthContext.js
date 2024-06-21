// Importing necessary dependencies from React and Firebase
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Creating a context to manage authentication state
const AuthContext = createContext();

// Custom hook to access authentication context
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap the application and provide authentication context
export function AuthProvider({ children }) {
  // State to track the current user
  const [currentUser, setCurrentUser] = useState(null);

  // Function to handle user registration
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
    } catch (error) {
      throw error; // Propagate the error for handling in the SignUp component
    }
  };

  // Function to handle user login
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
    } catch (error) {
      throw error; // Propagate the error for handling in the SignIn component
    }
  };

  // Function to handle user logout
  const signOutFunc = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Sign Out Error:", error.message);
    }
  };

  // Effect to update the user state when authentication changes
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Unsubscribe when the component unmounts
    return unsubscribe;
  }, [currentUser]);

  // Creating the context value to be provided to the components
  const value = {
    currentUser,
    signUp,
    signIn,
    signOutFunc,
  };

  // Providing the context value to the wrapped components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
