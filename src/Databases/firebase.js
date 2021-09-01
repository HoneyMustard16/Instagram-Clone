import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAUtHlYsO2tzOsFWTQziswoEe2k8dCsCok",
  authDomain: "instagram-clone-react-bf6f0.firebaseapp.com",
  projectId: "instagram-clone-react-bf6f0",
  storageBucket: "instagram-clone-react-bf6f0.appspot.com",
  messagingSenderId: "439416378062",
  appId: "1:439416378062:web:3dbb05b58d8dbff620f69f",
  measurementId: "G-DHML4M0MRN",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
