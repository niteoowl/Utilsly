import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCbSmDuJNCSrIB7Fx9IzbePERD_2ka3rQE",
    authDomain: "utilsly.firebaseapp.com",
    projectId: "utilsly",
    storageBucket: "utilsly.firebasestorage.app",
    messagingSenderId: "713000931988",
    appId: "1:713000931988:web:8891efe6d0ab2d61b61a81",
    measurementId: "G-WSRTSNGT8G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Expose auth to window for non-module scripts
window.UtilslyAuth = {
    auth: auth,
    currentUser: null,
    signOut: async () => {
        try {
            await signOut(auth);
            // Reload to update UI
            window.location.reload();
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
};

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    window.UtilslyAuth.currentUser = user;
    // Trigger custom event for community pages to listen
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
});
