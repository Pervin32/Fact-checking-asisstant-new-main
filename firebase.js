import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const facebookConfig = {
  appId: process.env.REACT_APP_FACEBOOK_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user);
  // You might want to store the user info in localStorage here
  if (user) {
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('facebookProfile', JSON.stringify({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }));
  } else {
    localStorage.setItem('userEmail', 'null');
    localStorage.setItem('facebookProfile', null);
  }
});

export { auth };
export default app;