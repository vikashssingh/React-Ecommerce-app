// Importing necessary dependencies from React, Firebase, and other sources
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { ProductData } from "../data";
import { useAuth } from "./AuthContext";

// Creating a context to manage the shopping cart state
const CartContext = createContext();

// Custom hook to access the shopping cart context
export function useCart() {
  return useContext(CartContext);
}

// CartProvider component to wrap the application and provide shopping cart context
export function CartProvider({ children }) {
  // State to track the items in the shopping cart
  const [cart, setCart] = useState([]);
  // Accessing the current user from the authentication context
  const { currentUser } = useAuth();

  // References to Firestore collections for the shopping cart and orders
  const cartCollectionRef = collection(db, "productCart");
  const ordersCollectionRef = collection(db, "orders");

  // Function to remove an item from the shopping cart
  const removeFromCart = async (productId) => {
    try {
      // Find the cart item to be removed
      const cartItem = cart.find((item) => item.id === productId);

      if (cartItem) {
        // Delete the cart item from Firestore
        await deleteDoc(doc(db, "productCart", cartItem.docId));
        // Update the local cart state
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        // Show a success toast
        toast.success("Removed from Cart!");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
    }
  };

  // Function to update the quantity of an item in the shopping cart
  const updateQuantity = async (productId, increment = 1) => {
    try {
      // Find the cart item to be updated
      const cartItem = cart.find((item) => item.id === productId);

      if (cartItem) {
        // Update the quantity in Firestore
        const cartDocRef = doc(db, "productCart", cartItem.docId);
        const currentQuantity = cartItem.quantity;
        const newQuantity = currentQuantity + increment;

        await updateDoc(cartDocRef, { quantity: newQuantity });

        // Update the local cart state
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );

        // Show a success toast
        toast.success("Quantity updated!");
      }
    } catch (error) {
      console.error("Error updating quantity in cart:", error.message);
    }
  };

  // Function to fetch the user's shopping cart from Firestore
  const fetchCart = async () => {
    try {
      if (currentUser) {
        // Query to get the user's cart items
        const userCartQuery = query(
          cartCollectionRef,
          where("userId", "==", currentUser.uid)
        );
        // Get the query snapshot
        const querySnapshot = await getDocs(userCartQuery);

        // Map the data from the snapshot to an array
        const cartData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));

        // Update the local cart state
        setCart(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  // Effect to fetch the user's cart whenever the user changes
  useEffect(() => {
    fetchCart();
  });

  // Function to add a product to the shopping cart
  const addToCart = async (productId) => {
    if (currentUser) {
      // Check if the product is already in the cart
      const existingCartItem = cart.find((item) => item.id === productId);

      if (existingCartItem) {
        try {
          // If yes, update the quantity in Firestore
          const cartDocRef = doc(db, "productCart", existingCartItem.docId);
          await updateDoc(cartDocRef, {
            quantity: existingCartItem.quantity + 1,
          });

          // Update the local cart state
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );

          // Show a success toast
          toast.success("Added to Cart!");
        } catch (error) {
          console.error("Error updating quantity in cart:", error.message);
        }
      } else {
        try {
          // If not, add a new document to Firestore
          const productToAdd = ProductData.find(
            (product) => product.id === productId
          );
          const docRef = await addDoc(cartCollectionRef, {
            userId: currentUser.uid,
            ...productToAdd,
            quantity: 1,
            timestamp: serverTimestamp(),
          });

          // Update the local cart state
          setCart((prevCart) => [
            ...prevCart,
            { ...productToAdd, quantity: 1, docId: docRef.id },
          ]);

          // Show a success toast
          toast.success("Added to Cart!");
        } catch (error) {
          console.error("Error adding product to cart:", error.message);
        }
      }
    }
  };

  // Function to handle the purchase process
  const handlePurchase = async () => {
    try {
      if (currentUser && cart.length > 0) {
        // Loop through each product in the cart
        for (const item of cart) {
          // Add a new document to the orders collection in Firestore
          await addDoc(ordersCollectionRef, {
            userId: currentUser.uid,
            image: item.image,
            name: item.name,
            price: item.price,
            productId: item.id,
            quantity: item.quantity,
            timestamp: serverTimestamp(),
          });

          // Delete the product from the cart
          const cartItemRef = doc(db, "productCart", item.docId);
          await deleteDoc(cartItemRef);
        }

        // Clear the local cart state after a successful purchase
        setCart([]);
        // Show a success toast
        toast.success("Purchase successful!");
      } else {
        // Show an error toast if there are no products in the cart
        toast.error("No products in the cart.");
      }
    } catch (error) {
      console.error("Error adding to orders:", error.message);
    }
  };

  // Creating the context value to be provided to the components
  const value = {
    cart,
    addToCart,
    fetchCart,
    removeFromCart,
    updateQuantity,
    handlePurchase,
  };

  // Providing the context value to the wrapped components
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
