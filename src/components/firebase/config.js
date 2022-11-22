import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR2IjSyT60HQnZnjXP7FFo8_oNjpjKA9o",
  authDomain: "apnadukan-a3d68.firebaseapp.com",
  projectId: "apnadukan-a3d68",
  storageBucket: "apnadukan-a3d68.appspot.com",
  messagingSenderId: "503892019634",
  appId: "1:503892019634:web:d711930bedbcf6cc297cab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
export default app