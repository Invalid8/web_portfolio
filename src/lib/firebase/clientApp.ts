import {initializeApp, getApps} from 'firebase/app';
import {config} from './config';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

export const firebaseApp = getApps().length === 0 ? initializeApp(config) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
