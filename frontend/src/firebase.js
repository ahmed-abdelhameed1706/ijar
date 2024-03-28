import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  authDomain: "ijarapp-11.firebaseapp.com",
  projectId: "ijarapp-11",
  storageBucket: "ijarapp-11.appspot.com",
  messagingSenderId: "816959710130",
  appId: "1:816959710130:web:2758207f05716d82a97aab",
  measurementId: "G-VM5QFMYRQ1",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
