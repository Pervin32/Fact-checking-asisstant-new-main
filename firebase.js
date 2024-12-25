// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // Store in .env
  authDomain: "fact-checking-asisstant.firebaseapp.com",
  projectId: "fact-checking-asisstant",
  storageBucket: "fact-checking-asisstant.appspot.com", // Corrected
  messagingSenderId: "543735020388",
  appId: "1:543735020388:web:dc0521ea65838e9f271871",
  measurementId: "G-BLQXDLD0PP",
};

// Validate environment variables
if (!firebaseConfig.apiKey) {
  throw new Error("Missing Firebase API Key. Please check your .env file.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
