
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase, ref, set, get, Database } from "firebase/database";
import { defaultMelaData } from './data';
import type { MelaData } from './types';

const firebaseConfig = {
  "projectId": "melaverse",
  "appId": "1:682028400877:web:3b7b9530e980aed58c8ce4",
  "storageBucket": "melaverse.firebasestorage.app",
  "apiKey": "AIzaSyAjaiOlL5XindaPgdln3o4jQhh6eSHBMVQ",
  "authDomain": "melaverse.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "682028400877",
  "databaseURL": "https://melaverse-default-rtdb.firebaseio.com"
};

// This function safely initializes and returns the Firebase app and database instances.
// It ensures that initialization only happens on the client side and only once.
function getFirebaseServices() {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const database = getDatabase(app);
    return { app, database };
}

const DB_KEY = 'melaData';

export async function writeData(data: MelaData) {
  // Ensure we are on the client before trying to write.
  if (typeof window === 'undefined') return;
  const { database } = getFirebaseServices();
  return set(ref(database, DB_KEY), data);
}

export async function readData(): Promise<MelaData> {
  // This function should only be called on the client.
  // The useMelaData hook will ensure this.
  try {
    const { database } = getFirebaseServices();
    const snapshot = await get(ref(database, DB_KEY));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      // If no data, initialize with default and return that.
      console.log('No data found in Firebase, initializing with default data.');
      const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      const initialData = { ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() };
      await writeData(initialData);
      return initialData;
    }
  } catch (error) {
    console.error("Error reading data from Firebase:", error);
    // Fallback to default data in case of error
    const fifteenDaysFromNow = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
    return { ...defaultMelaData, eventDate: fifteenDaysFromNow.toISOString() };
  }
}
