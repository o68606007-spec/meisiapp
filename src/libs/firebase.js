import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAE-843NBYtYA00Y7kT_PhWPFCXEfNP78c",
    authDomain: "meisiapp-91595.firebaseapp.com",
    projectId: "meisiapp-91595",
    storageBucket: "meisiapp-91595.firebasestorage.app",
    messagingSenderId: "420423862690",
    appId: "1:420423862690:web:ee2cc3ce995deee1f20afb",
    measurementId: "G-1JSCZDD4YE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// console.log(analytics);
export default analytics;
