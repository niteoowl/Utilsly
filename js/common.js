/**
 * Utilsly Common JS
 * Handles Sidebar generation and common UI interactions.
 */

const Utilsly = {
    init() {
        this.renderSidebar();
        this.highlightActivePage();
        this.initMobileMenu();
    },

    // Centralized Tool Registry for Sidebar
    tools: [
        {
            category: "랜덤 (Random)",
            items: [
                { name: "룰렛 돌리기", icon: "casino", path: "/tools/random/roulette.html" },
                { name: "제비뽑기", icon: "confirmation_number", path: "/tools/random/random-picker.html" },
                { name: "비밀번호 생성", icon: "password", path: "/tools/random/password-generator.html" },
                { name: "주사위 굴리기", icon: "deployed_code", path: "/tools/random/dice-roller.html" },
                { name: "투표 하기", icon: "how_to_vote", path: "/tools/random/vote.html" }, // New Vote Tool
            ]
        },
        {
            category: "이미지 (Image)",
            items: [
                { name: "이미지 리사이저", icon: "image", path: "/tools/image/image-resizer.html" },
            ]
        },
        {
            category: "텍스트 (Text)",
            items: [
                { name: "글자수 세기", icon: "article", path: "/tools/text/word-counter.html" },
                { name: "대소문자 변환", icon: "text_fields", path: "/tools/text/case-converter.html" },
                { name: "로렘 입숨 생성", icon: "description", path: "/tools/text/lorem-ipsum.html" },
                { name: "줄바꿈 제거", icon: "format_align_left", path: "/tools/text/remove-line-breaks.html" },
                { name: "마크다운 미리보기", icon: "markdown", path: "/tools/text/markdown-preview.html" },
            ]
        },
        {
            category: "개발 (Dev)",
            items: [
                { name: "JSON 포맷터", icon: "data_object", path: "/tools/dev/json-formatter.html" },
                { name: "SQL 포맷터", icon: "database", path: "/tools/dev/sql-formatter.html" },
                { name: "URL 인코더", icon: "link", path: "/tools/dev/url-encoder.html" },
                { name: "Base64 인코더", icon: "package_2", path: "/tools/dev/base64-encoder.html" },
                { name: "UUID 생성기", icon: "fingerprint", path: "/tools/dev/uuid-generator.html" },
            ]
        },
        {
            category: "수학/계산 (Math)",
            items: [
                { name: "단위 변환기", icon: "scale", path: "/tools/math/unit-converter.html" },
                { name: "퍼센트 계산기", icon: "percent", path: "/tools/math/percentage-calculator.html" },
            ]
        },
        {
            category: "날짜/시간 (Date)",
            items: [
                { name: "스톱워치", icon: "timer", path: "/tools/date/stopwatch.html" },
                { name: "D-Day 계산기", icon: "event_upcoming", path: "/tools/date/d-day-counter.html" },
                { name: "세계 시간", icon: "public", path: "/tools/date/world-time.html" },
            ]
        },
        {
            category: "색상 (Color)",
            items: [
                { name: "컬러 피커", icon: "palette", path: "/tools/color/color-picker.html" },
            ]
        }
    ],

    renderSidebar() {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (!sidebarNav) return;

        // Home Link
        let html = `
            <div class="nav-section">
                <a href="/index.html" class="nav-item" id="nav-home">
                    <span class="material-symbols-rounded icon">dashboard</span>
                    <span class="label">대시보드</span>
                </a>
            </div>
        `;

        // Tools
        this.tools.forEach(section => {
            html += `
                <div class="nav-section">
                    <div class="section-title">${section.category}</div>
                    ${section.items.map(item => `
                        <a href="${item.path}" class="nav-item">
                            <span class="material-symbols-rounded icon">${item.icon}</span>
                            <span class="label">${item.name}</span>
                        </a>
                    `).join('')}
                </div>
            `;
        });

        sidebarNav.innerHTML = html;

        // Add Close Button for Mobile
        const sidebarHeader = document.querySelector('.sidebar-header');
        if (sidebarHeader && !sidebarHeader.querySelector('.close-sidebar-btn')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-sidebar-btn';
            closeBtn.innerHTML = '<span class="material-symbols-rounded">close</span>';
            closeBtn.onclick = () => this.toggleSidebar(false);
            sidebarHeader.appendChild(closeBtn);
        }
    },

    highlightActivePage() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (currentPath.endsWith(href) || (currentPath === '/' && href === '/index.html')) {
                item.classList.add('active');
            }
        });
    },

    initMobileMenu() {
        // Add Menu Toggle Button to Top Bar if not exists
        const topBar = document.querySelector('.top-bar');
        if (topBar && !topBar.querySelector('.menu-toggle-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'menu-toggle-btn';
            menuBtn.innerHTML = '<span class="material-symbols-rounded">menu</span>';
            menuBtn.onclick = () => this.toggleSidebar(true);
            topBar.insertBefore(menuBtn, topBar.firstChild);
        }
    },

    toggleSidebar(show) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            if (show) {
                sidebar.classList.add('active');
            } else {
                sidebar.classList.remove('active');
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Utilsly.init();
});
