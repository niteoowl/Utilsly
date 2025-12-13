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
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
};

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    window.UtilslyAuth.currentUser = user;
    updateCommunitySection(user);
});

function updateCommunitySection(user) {
    // Update community section in sidebar ONLY
    // Find the community nav-section
    const communitySection = document.querySelector('.nav-section[data-category="커뮤니티 (Community)"]');
    if (!communitySection) {
        // If sidebar hasn't loaded yet, retry in a bit
        setTimeout(() => updateCommunitySection(user), 100);
        return;
    }

    // Check if auth header already exists
    let authHeader = communitySection.querySelector('.community-auth-header');

    if (user) {
        // Logged In
        const nickname = user.displayName || user.email.split('@')[0];
        const authHtml = `
            <div class="community-auth-header" style="padding: 12px 8px; margin-bottom: 8px; background: var(--bg-hover); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px;">${nickname[0].toUpperCase()}</div>
                    <div>
                        <div style="font-size:13px; font-weight:600; color:var(--text-primary);">${nickname}</div>
                        <div style="font-size:11px; color:var(--text-tertiary);">로그인됨</div>
                    </div>
                </div>
                <button onclick="UtilslyAuth.signOut()" title="로그아웃" style="background:none; border:none; cursor:pointer; color:var(--text-secondary); padding:4px;">
                    <span class="material-symbols-rounded" style="font-size:18px;">logout</span>
                </button>
            </div>
        `;

        if (authHeader) {
            authHeader.outerHTML = authHtml;
        } else {
            // Insert after section title
            const sectionTitle = communitySection.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.insertAdjacentHTML('afterend', authHtml);
            }
        }
    } else {
        // Logged Out
        const authHtml = `
            <a href="/login.html" class="community-auth-header" style="padding: 12px 8px; margin-bottom: 8px; background: var(--bg-hover); border-radius: 8px; display: flex; align-items: center; gap:8px; text-decoration:none; cursor:pointer;">
                <div style="width:32px; height:32px; border-radius:50%; background:var(--bg-active); color:var(--text-tertiary); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;">
                    <span class="material-symbols-rounded" style="font-size:20px;">person</span>
                </div>
                <div style="flex:1;">
                    <div style="font-size:13px; font-weight:600; color:var(--text-primary);">로그인이 필요합니다</div>
                    <div style="font-size:11px; color:var(--text-tertiary);">커뮤니티 글쓰기</div>
                </div>
                <span class="material-symbols-rounded" style="font-size:16px; color:var(--text-tertiary);">chevron_right</span>
            </a>
        `;

        if (authHeader) {
            authHeader.outerHTML = authHtml;
        } else {
            const sectionTitle = communitySection.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.insertAdjacentHTML('afterend', authHtml);
            }
        }
    }
}
