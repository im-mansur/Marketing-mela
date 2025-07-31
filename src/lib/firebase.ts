
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from "firebase/database";
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const DB_KEY = 'melaData';

export async function writeData(data: MelaData) {
  return set(ref(database, DB_KEY), data);
}

export async function readData(): Promise<MelaData> {
  try {
    const snapshot = await get(ref(database, DB_KEY));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      // If no data, initialize with default and return that.
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
