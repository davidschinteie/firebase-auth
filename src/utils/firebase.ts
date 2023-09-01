import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// Google Auth function
const googleProvider = new GoogleAuthProvider();

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  let user = null;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    user = res.user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }

  return user;
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  let user = null;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: user.email,
      images: [],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
  return user;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    alert(err.message);
  }

  return user;
};
