import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fact-checking-asisstant.firebaseapp.com",
  projectId: "fact-checking-asisstant",
  storageBucket: "fact-checking-asisstant.appspot.com",
  messagingSenderId: "543735020388",
  appId: "1:543735020388:web:dc0521ea65838e9f271871",
  measurementId: "G-BLQXDLD0PP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Development mühitində emulator qoşulması
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

// Auth state dəyişikliklərini izləyirik
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user);
});

export { auth };
export default app;