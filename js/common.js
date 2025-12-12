/**
 * Utilsly Common JS
 * Handles Sidebar generation and common UI interactions.
 */

const Utilsly = {
    init() {
        this.loadIcons();
        this.initTheme();
        this.injectEarlyThemeScript(); // Prevent flash
        this.loadHiddenTools(); // Load user preferences
        this.renderSidebar();
        this.highlightActivePage();
        this.initMobileMenu();
        this.restoreSidebarScroll(); // Restore scroll position
        this.initScrollSave(); // Save scroll on navigation

        // Mark page as loaded to enable transitions and show content
        requestAnimationFrame(() => {
            document.documentElement.classList.add('loaded');
        });
    },

    hiddenTools: new Set(),
    isEditingSidebar: false,

    injectEarlyThemeScript() {
        // This function is called but the script should be inline in HTML head
        // We'll add this to each HTML file to prevent flash
    },

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        localStorage.setItem('theme', newTheme);

        // Update checkbox if exists
        const checkbox = document.getElementById('darkModeCheckbox');
        if (checkbox) checkbox.checked = (newTheme === 'dark');
    },

    loadIcons() {
        if (!document.getElementById('material-symbols-link')) {
            const link = document.createElement('link');
            link.id = 'material-symbols-link';
            link.rel = 'preload';
            link.as = 'style';
            link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0';
            link.onload = function () { this.rel = 'stylesheet'; };
            document.head.appendChild(link);

            // Add noscript fallback
            const noscript = document.createElement('noscript');
            const fallbackLink = document.createElement('link');
            fallbackLink.rel = 'stylesheet';
            fallbackLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0';
            noscript.appendChild(fallbackLink);
            document.head.appendChild(noscript);
        }
    },

    loadHiddenTools() {
        const saved = localStorage.getItem('utilsly_hidden_tools');
        if (saved) {
            this.hiddenTools = new Set(JSON.parse(saved));
        }
    },

    saveHiddenTools() {
        localStorage.setItem('utilsly_hidden_tools', JSON.stringify(Array.from(this.hiddenTools)));
    },

    toggleToolVisibility(toolName) {
        if (this.hiddenTools.has(toolName)) {
            this.hiddenTools.delete(toolName);
        } else {
            this.hiddenTools.add(toolName);
        }
        this.saveHiddenTools();
        this.renderSidebar(); // Re-render to update UI
    },

    toggleSidebarEditMode() {
        this.isEditingSidebar = !this.isEditingSidebar;
        this.renderSidebar();
    },

    // Centralized Tool Registry for Sidebar
    // 수정됨: 모든 path에서 .html 제거
    tools: [
        {
            category: "랜덤 (Random)",
            items: [
                { name: "룰렛 돌리기", icon: "casino", path: "/tools/random/roulette" },
                { name: "제비뽑기", icon: "confirmation_number", path: "/tools/random/random-picker" },
                { name: "주사위 굴리기", icon: "deployed_code", path: "/tools/random/dice-roller" },
                { name: "투표 하기", icon: "how_to_vote", path: "/tools/random/vote" },
            ]
        },
        {
            category: "이미지 (Image)",
            items: [
                { name: "이미지 리사이저", icon: "image", path: "/tools/image/image-resizer" },
                { name: "JPG ↔ PNG 변환", icon: "transform", path: "/tools/image/jpg-png-converter" },
                { name: "PNG ↔ WebP 변환", icon: "transform", path: "/tools/image/png-webp-converter" },
                { name: "WebP → JPG 변환", icon: "transform", path: "/tools/image/webp-jpg-converter" },
                { name: "SVG → PNG 변환", icon: "transform", path: "/tools/image/svg-png-converter" },
                { name: "HEIC → JPG 변환", icon: "transform", path: "/tools/image/heic-jpg-converter" },
                { name: "HEIC → PNG 변환", icon: "transform", path: "/tools/image/heic-png-converter" },
                { name: "이미지 자르기", icon: "crop", path: "/tools/image/image-cropper" },
                { name: "이미지 필터", icon: "photo_filter", path: "/tools/image/image-filters" },
                { name: "이미지 색상 추출", icon: "colorize", path: "/tools/image/color-extractor" },
                { name: "플레이스홀더 생성", icon: "image", path: "/tools/image/placeholder-generator" },
                { name: "ASCII 아트", icon: "grid_on", path: "/tools/image/ascii-art" },
            ]
        },
        {
            category: "비디오 (Video)",
            items: [
                { name: "비디오 플레이어", icon: "play_circle", path: "/tools/video/video-player" },
                { name: "GIF 변환기", icon: "gif", path: "/tools/video/video-to-gif" },
                { name: "화면 녹화", icon: "screen_record", path: "/tools/video/screen-recorder" },
            ]
        },
        {
            category: "PDF",
            items: [
                { name: "PDF 합치기", icon: "picture_as_pdf", path: "/tools/pdf/pdf-merge" },
                { name: "PDF 분할", icon: "cut", path: "/tools/pdf/pdf-split" },
                { name: "PDF → 이미지", icon: "image_search", path: "/tools/pdf/pdf-to-image" },
            ]
        },
        {
            category: "오디오 (Audio)",
            items: [
                { name: "음성 녹음기", icon: "mic", path: "/tools/audio/voice-recorder" },
                { name: "주파수 생성기", icon: "graphic_eq", path: "/tools/audio/tone-generator" },
                { name: "백색 소음", icon: "waves", path: "/tools/audio/white-noise" },
            ]
        },
        {
            category: "메모/텍스트 (Memo)",
            items: [
                { name: "Utilsly Docs (문서)", icon: "description", path: "/tools/memo/docs" },
                { name: "빠른 메모장", icon: "edit_note", path: "/tools/memo/notepad" },
                { name: "스마트 화이트보드", icon: "draw", path: "/tools/memo/whiteboard" },
                { name: "EPUB 리더", icon: "menu_book", path: "/tools/text/epub-reader" },
                { name: "텍스트 비교", icon: "difference", path: "/tools/text/text-diff" },
                { name: "글자수 세기", icon: "article", path: "/tools/text/word-counter" },
                { name: "대소문자 변환", icon: "text_fields", path: "/tools/text/case-converter" },
                { name: "로눘 입숨 생성", icon: "description", path: "/tools/text/lorem-ipsum" },
                { name: "줄바꿈 제거", icon: "format_align_left", path: "/tools/text/remove-line-breaks" },
                { name: "마크다운 미리보기", icon: "markdown", path: "/tools/text/markdown-preview" },
                { name: "특수문자 폰트", icon: "text_fields", path: "/tools/text/fancy-text" },
            ]
        },
        {
            category: "개발 (Dev)",
            items: [
                { name: "HTML 플레이그라운드", icon: "code", path: "/tools/dev/html-playground" },
                { name: "QR 코드 생성", icon: "qr_code_2", path: "/tools/dev/qr-generator" },
                { name: "코드 미니파이어", icon: "compress", path: "/tools/dev/code-minifier" },
                { name: "정규식 테스터", icon: "regular_expression", path: "/tools/dev/regex-tester" },
                { name: "JSON 포맷터", icon: "data_object", path: "/tools/dev/json-formatter" },
                { name: "SQL 포맷터", icon: "database", path: "/tools/dev/sql-formatter" },
                { name: "URL 인코더", icon: "link", path: "/tools/dev/url-encoder" },
                { name: "Base64 인코더", icon: "package_2", path: "/tools/dev/base64-encoder" },
                { name: "UUID 생성기", icon: "fingerprint", path: "/tools/dev/uuid-generator" },
            ]
        },
        {
            category: "수학/계산 (Math)",
            items: [
                { name: "공학용 계산기", icon: "calculate", path: "/tools/math/scientific-calculator" },
                { name: "단위 변환기", icon: "scale", path: "/tools/math/unit-converter" },
                { name: "퍼센트 계산기", icon: "percent", path: "/tools/math/percentage-calculator" },
            ]
        },
        {
            category: "날짜/시간 (Date)",
            items: [
                { name: "타이머", icon: "timer", path: "/tools/date/timer" },
                { name: "뽀모도로 타이머", icon: "check_circle", path: "/tools/date/pomodoro" },
                { name: "스톱워치", icon: "timer_off", path: "/tools/date/stopwatch" },
                { name: "D-Day 계산기", icon: "event_upcoming", path: "/tools/date/d-day-counter" },
                { name: "세계 시간", icon: "public", path: "/tools/date/world-time" },
            ]
        },
        {
            category: "색상 (Color)",
            items: [
                { name: "컬러 피커", icon: "palette", path: "/tools/color/color-picker" },
                { name: "그라디언트 생성", icon: "gradient", path: "/tools/color/gradient-generator" },
            ]
        },
        {
            category: "건강 (Health)",
            items: [
                { name: "BMI 계산기", icon: "monitor_weight", path: "/tools/health/bmi-calculator" },
                { name: "BMR 계산기", icon: "local_fire_department", path: "/tools/health/bmr-calculator" },
                { name: "호흡 운동", icon: "self_improvement", path: "/tools/health/breathing" },
            ]
        },
        {
            category: "보안 (Security)",
            items: [
                { name: "비밀번호 생성", icon: "password", path: "/tools/security/password-generator" },
            ]
        },
        {
            category: "AI 도구 (Beta)",
            items: [
                { name: "AI 글쓰기 도우미", icon: "edit_note", path: "/tools/ai/writing-assistant" },
                { name: "AI 번역기", icon: "translate", path: "/tools/ai/translator" },
            ]
        }
    ],

    renderSidebar() {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (!sidebarNav) return;

        // Save scroll position before re-rendering
        const sidebar = document.querySelector('.sidebar');
        const scrollPosition = sidebar ? sidebar.scrollTop : 0;

        // Search Bar
        let html = `
            <div class="sidebar-search-container">
                <div style="position: relative;">
                    <span class="material-symbols-rounded" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 18px; color: var(--text-tertiary);">search</span>
                    <input type="text" id="sidebarSearch" placeholder="검색..." style="padding-left: 36px; background: rgba(0,0,0,0.03); border: none; width: 100%;">
                </div>
            </div>
        `;

        // Home Link (수정됨: /index.html -> /)
        html += `
            <div class="nav-section">
                <a href="/" class="nav-item" id="nav-home">
                    <span class="material-symbols-rounded icon">home</span>
                    <span class="label">홈</span>
                </a>
                <a href="/settings" class="nav-item" id="nav-settings">
                    <span class="material-symbols-rounded icon">settings</span>
                    <span class="label">설정</span>
                </a>
            </div>
        `;

        // Tools
        this.tools.forEach(section => {
            // Filter hidden items unless in edit mode
            const visibleItems = this.isEditingSidebar
                ? section.items
                : section.items.filter(item => !this.hiddenTools.has(item.name));

            if (visibleItems.length === 0) return;

            html += `
                <div class="nav-section tool-section" data-category="${section.category}">
                    <div class="section-title">${section.category}</div>
                    ${visibleItems.map(item => {
                const isHidden = this.hiddenTools.has(item.name);
                const opacity = isHidden ? '0.5' : '1';
                const icon = isHidden ? 'visibility_off' : 'visibility';

                let itemHtml = `
                            <a href="${item.path}" class="nav-item tool-item" data-name="${item.name}" style="opacity: ${opacity}">
                                <span class="material-symbols-rounded icon">${item.icon}</span>
                                <span class="label">${item.name}</span>
                        `;

                if (this.isEditingSidebar) {
                    itemHtml += `
                                <button onclick="event.preventDefault(); Utilsly.toggleToolVisibility('${item.name}')" 
                                    style="margin-left: auto; background: none; border: none; cursor: pointer; color: var(--text-tertiary);">
                                    <span class="material-symbols-rounded" style="font-size: 16px;">${icon}</span>
                                </button>
                            `;
                }

                itemHtml += `</a>`;
                return itemHtml;
            }).join('')}
                </div>
            `;
        });

        // Edit Button
        html += `
            <div style="padding: 16px 8px; margin-top: auto;">
                <button onclick="Utilsly.toggleSidebarEditMode()" style="width: 100%; padding: 8px; border: 1px dashed var(--border-color); background: transparent; color: var(--text-secondary); border-radius: 6px; cursor: pointer; font-size: 13px;">
                    ${this.isEditingSidebar ? '완료' : '사이드바 편집'}
                </button>
            </div>
        `;

        sidebarNav.innerHTML = html;

        // Search Logic
        const searchInput = document.getElementById('sidebarSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();

                document.querySelectorAll('.tool-item').forEach(item => {
                    const name = item.dataset.name.toLowerCase();
                    if (name.includes(query)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Hide empty sections
                document.querySelectorAll('.tool-section').forEach(section => {
                    const items = Array.from(section.querySelectorAll('.tool-item'));
                    const hasVisible = items.some(item => item.style.display !== 'none');
                    section.style.display = hasVisible ? 'block' : 'none';
                });
            });
        }

        // Add Close Button for Mobile
        const sidebarHeader = document.querySelector('.sidebar-header');
        if (sidebarHeader) {
            sidebarHeader.innerHTML = `
                <div class="user-profile" style="padding: 0;">
                    <div style="font-size: 24px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px;">Utilsly.</div>
                </div>
            `;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-sidebar-btn';
            closeBtn.innerHTML = '<span class="material-symbols-rounded">close</span>';
            closeBtn.onclick = () => this.toggleSidebar(false);
            sidebarHeader.appendChild(closeBtn);
        }

        // Restore scroll position after re-rendering
        if (sidebar) {
            sidebar.scrollTop = scrollPosition;
        }
    },

    restoreSidebarScroll() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const savedScroll = localStorage.getItem('utilsly_sidebar_scroll');
            if (savedScroll) {
                sidebar.scrollTop = parseInt(savedScroll, 10);
            }
        }
    },

    initScrollSave() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        // Save scroll position when clicking any link
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                localStorage.setItem('utilsly_sidebar_scroll', sidebar.scrollTop);
            }
        });

        // Also save on page unload as backup
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('utilsly_sidebar_scroll', sidebar.scrollTop);
        });
    },

    highlightActivePage() {
        // 수정됨: Clean URL 대응을 위해 로직 단순화
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            // 정확히 일치하거나(홈), 해당 경로로 끝나면서 홈이 아닌 경우
            if (currentPath === href || (currentPath.endsWith(href) && href !== '/')) {
                item.classList.add('active');
            }
        });
    },

    initMobileMenu() {
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
    },

    // Modal System
    showAlert(message, title = '알림') {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <div class="modal-title">${title}</div>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <span class="material-symbols-rounded" style="font-size: 20px;">close</span>
                        </button>
                    </div>
                    <div class="modal-body">${message}</div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">확인</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.remove();
                    resolve();
                }
            });
            overlay.querySelector('.btn-primary').addEventListener('click', () => resolve());
        });
    },

    showConfirm(message, title = '확인') {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <div class="modal-title">${title}</div>
                        <button class="modal-close" data-action="cancel">
                            <span class="material-symbols-rounded" style="font-size: 20px;">close</span>
                        </button>
                    </div>
                    <div class="modal-body">${message}</div>
                    <div class="modal-footer">
                        <button class="btn" data-action="cancel">취소</button>
                        <button class="btn btn-primary" data-action="confirm">확인</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            const handleAction = (confirmed) => {
                overlay.remove();
                resolve(confirmed);
            };

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) handleAction(false);
                if (e.target.closest('[data-action="cancel"]')) handleAction(false);
                if (e.target.closest('[data-action="confirm"]')) handleAction(true);
            });
        });
    },
    // SPA Navigation Logic (Turbo Mode)
    initSpaNavigation() {
        // Handle clicks on internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (
                link &&
                link.href &&
                link.origin === location.origin &&
                !link.hasAttribute('download') &&
                !link.target && // Ignore _blank etc.
                !e.ctrlKey && !e.metaKey && !e.shiftKey // Ignore modifier keys
            ) {
                const url = new URL(link.href);
                // Only intercept internal pages, not anchors on same page
                if (url.pathname !== location.pathname) {
                    e.preventDefault();
                    this.navigateTo(url.href);
                }
            }
        });

        // Handle Back/Forward buttons
        window.addEventListener('popstate', (e) => {
            this.loadPage(location.href, false);
        });
    },

    async navigateTo(url) {
        history.pushState(null, '', url);
        await this.loadPage(url, true);
    },

    async loadPage(url, isPush) {
        this.showLoadingBar();

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const html = await response.text();

            // Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Replace Content
            // We expect a .main-content or .app-container structure. 
            // Ideally we just replace .content-area to keep sidebar state if possible,
            // but for full correctness (like breadcrumbs, title) we might need to replace more or update fields.
            // Let's try to replace .main-content to be safe, or just .content-area if we want to be faster.
            // However, Sidebar might change active state.

            const newMain = doc.querySelector('.main-content');
            const currentMain = document.querySelector('.main-content');

            if (newMain && currentMain) {
                currentMain.innerHTML = newMain.innerHTML;

                // Update specific head elements
                document.title = doc.title;
                const newDesc = doc.querySelector('meta[name="description"]');
                const currentDesc = document.querySelector('meta[name="description"]');
                if (newDesc && currentDesc) currentDesc.content = newDesc.content;
            } else {
                // Fallback if structure is different
                window.location.reload();
                return;
            }

            // re-init sidebar active state (URL changed)
            this.highlightActivePage();

            // Re-run any scripts found in the new content
            // internal scripts in the new body need to be executed
            const scripts = currentMain.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Re-init any common listeners
            this.initMobileMenu();

            // Scroll to top
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Navigation failed:', error);
            window.location.href = url; // Fallback to full reload
        } finally {
            this.hideLoadingBar();
        }
    },

    showLoadingBar() {
        let bar = document.getElementById('turbo-progress-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'turbo-progress-bar';
            document.body.appendChild(bar);
        }
        // Force reflow
        bar.style.width = '0%';
        bar.style.opacity = '1';
        void bar.offsetWidth;
        bar.style.width = '70%'; // Simulation
    },

    hideLoadingBar() {
        const bar = document.getElementById('turbo-progress-bar');
        if (bar) {
            bar.style.width = '100%';
            setTimeout(() => {
                bar.style.opacity = '0';
                setTimeout(() => {
                    bar.style.width = '0%';
                }, 200);
            }, 200);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Utilsly.init();
    setTimeout(() => Utilsly.initSpaNavigation(), 100); // Init SPA after initial render
});