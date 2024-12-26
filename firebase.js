// SDK-lardan sizə lazım olan funksiyaları idxal edir
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase konfiqurasiyası
const firebaseConfig = {
  apiKey: AIzaSyAqsWZ5_ri2DBim6cgtMn2ir9w8t3XXa-8, // .env-də saxla
  authDomain: "fact-checking-asisstant.firebaseapp.com",
  projectId: "fact-checking-asisstant",
  storageBucket: "fact-checking-asisstant.appspot.com",
  messagingSenderId: "543735020388",
  appId: "1:543735020388:web:dc0521ea65838e9f271871",
  measurementId: "G-BLQXDLD0PP",
};
// Mühit dəyişənlərini doğrulayın
if (!firebaseConfig.apiKey) {
  throw new Error("Missing Firebase API Key. Please check your .env file.");
}

// Firebase-i işə salın
const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
