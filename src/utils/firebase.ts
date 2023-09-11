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
      images: [],
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
  let user = null;

  try {
    const res = await signInWithPopup(auth, googleProvider);
    user = res.user;
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log("add new user to db");
        // add new user to database if does not exist
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: user.email,
          incomes: [],
        });
      }
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    if (err instanceof Error) {
      // TypeScript knows err is an instance of the Error object.
      console.error(err.message);
      alert(err.message);
    } else {
      console.error("Unexpected error", err);
    }
  }

  return user;
};
