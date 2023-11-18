import {
  FIREBASE_APPID,
  FIREBASE_AUTH,
  FIREBASE_BUCKET,
  FIREBASE_KEY,
  FIREBASE_MEASUREMENTID,
  FIREBASE_MSGID,
  FIREBASE_PROJECT_ID,
} from "@env";
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: FIREBASE_AUTH,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_BUCKET,
  messagingSenderId: FIREBASE_MSGID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
