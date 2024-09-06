// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const saveLayout = async (layoutData) => {
    const newLayoutRef = ref(database, 'layouts/' + layoutData.name); // Store by layout name
    await set(newLayoutRef, layoutData);
    return newLayoutRef;
};

export const loadLayout = async (layoutName) => {
    const dbRef = ref(database);
    const layoutSnapshot = await get(child(dbRef, `layouts/${layoutName}`));
    if (layoutSnapshot.exists()) {
        return layoutSnapshot.val();
    } else {
        console.log('No layout found with this name');
        return null;
    }
};
