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
    signOut: () => signOut(auth)
};

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    window.UtilslyAuth.currentUser = user;
    updateSidebar(user);
});

function updateSidebar(user) {
    // Find the profile section in the sidebar
    // It's usually .user-profile inside .sidebar-header
    const sidebarHeader = document.querySelector('.sidebar-header');
    if (!sidebarHeader) return;

    // We want to replace or update the profile section
    // Current common.js renders: 
    // <div class="user-profile">
    //    <div class="avatar">U</div>
    //    <span class="username">Utilsly</span>
    // </div>
    // OR just text "Utilsly." in simple mode

    // Let's make it a clickable auth button

    if (user) {
        // Logged In
        const nickname = user.displayName || user.email.split('@')[0];
        sidebarHeader.innerHTML = `
            <div class="user-profile" id="userMenuBtn" style="justify-content: space-between;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div class="avatar" style="background:var(--accent-blue); color:white;">${nickname[0].toUpperCase()}</div>
                    <span class="username">${nickname}</span>
                </div>
                <button onclick="UtilslyAuth.signOut()" title="로그아웃" style="background:none; border:none; cursor:pointer; color:var(--text-secondary);">
                    <span class="material-symbols-rounded" style="font-size:18px;">logout</span>
                </button>
            </div>
        `;
    } else {
        // Logged Out
        sidebarHeader.innerHTML = `
            <a href="/login.html" class="user-profile" style="text-decoration:none;">
                <div class="avatar" style="background:var(--bg-active);">?</div>
                <span class="username">로그인</span>
            </a>
        `;
    }
}
