import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// 환경 변수 타입 정의
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// 환경 변수 할당 (undefined 방지)
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string ?? "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string ?? undefined,
};

// Firebase 앱 초기화
export const firebaseApp = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(firebaseApp);
