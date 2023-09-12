import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Google Auth function
const googleProvider = new GoogleAuthProvider();

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    if (err instanceof Error) {
      // Handle authentication-specific errors gracefully
      console.error(err.message);
      alert(err.message);
    } else {
      console.error("Unexpected error", err);
    }
    return null; // Return null in case of error
  }
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const userData = {
      uid: res.user.uid,
      name,
      email: res.user.email,
    };

    await setDoc(doc(db, "users", res.user.uid), userData);

    return res.user;
  } catch (err) {
    if (err instanceof Error) {
      // Handle authentication-specific errors gracefully
      console.error(err.message);
      alert(err.message);
    } else {
      console.error("Unexpected error", err);
    }
    return null; // Return null in case of error
  }
};

export const logoutFirebase = () => {
  signOut(auth);
};

export const signInWithGoogle = async () => {
  try {
    // Sign in with Google
    const authResult = await signInWithPopup(auth, googleProvider);

    // Check if the user already exists in the database
    const userDocRef = doc(db, "users", authResult.user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      console.log("Adding a new user to the database.");
      // Add the user to the database if they don't exist
      const userData = {
        uid: authResult.user.uid,
        name: authResult.user.displayName,
        email: authResult.user.email,
      };
      await setDoc(userDocRef, userData);
    }

    return authResult.user;
  } catch (err) {
    console.error("Error during Google sign-in:", err);

    if (err instanceof Error) {
      // Handle authentication-specific errors gracefully
      alert(err.message);
    }

    return null; // Return null in case of error
  }
};
