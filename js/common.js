/**
 * Utilsly Common JS
 * Handles Sidebar generation and common UI interactions.
 */

const Utilsly = {
    init() {
        this.loadIcons();
        this.initTheme();
        this.loadHiddenTools(); // Load user preferences
        this.renderSidebar();
        this.highlightActivePage();
        this.initMobileMenu();
    },

    hiddenTools: new Set(),
    isEditingSidebar: false,

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
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0';
            document.head.appendChild(link);
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
    tools: [
        {
            category: "랜덤 (Random)",
            items: [
                { name: "룰렛 돌리기", icon: "casino", path: "/tools/random/roulette.html" },
                { name: "제비뽑기", icon: "confirmation_number", path: "/tools/random/random-picker.html" },
                { name: "주사위 굴리기", icon: "deployed_code", path: "/tools/random/dice-roller.html" },
                { name: "투표 하기", icon: "how_to_vote", path: "/tools/random/vote.html" },
            ]
        },
        {
            category: "이미지 (Image)",
            items: [
                { name: "이미지 리사이저", icon: "image", path: "/tools/image/image-resizer.html" },
                { name: "이미지 변환기", icon: "transform", path: "/tools/image/image-converter.html" },
                { name: "이미지 자르기", icon: "crop", path: "/tools/image/image-cropper.html" },
                { name: "이미지 필터", icon: "photo_filter", path: "/tools/image/image-filters.html" },
                { name: "이미지 색상 추출", icon: "colorize", path: "/tools/image/color-extractor.html" },
            ]
        },
        {
            category: "비디오 (Video)",
            items: [
                { name: "비디오 플레이어", icon: "play_circle", path: "/tools/video/video-player.html" },
                { name: "GIF 변환기", icon: "gif", path: "/tools/video/video-to-gif.html" },
                { name: "화면 녹화", icon: "screen_record", path: "/tools/video/screen-recorder.html" },
            ]
        },
        {
            category: "PDF",
            items: [
                { name: "PDF 합치기", icon: "picture_as_pdf", path: "/tools/pdf/pdf-merge.html" },
                { name: "PDF 분할", icon: "cut", path: "/tools/pdf/pdf-split.html" },
                { name: "PDF → 이미지", icon: "image_search", path: "/tools/pdf/pdf-to-image.html" },
            ]
        },
        {
            category: "오디오 (Audio)",
            items: [
                { name: "음성 녹음기", icon: "mic", path: "/tools/audio/voice-recorder.html" },
                { name: "주파수 생성기", icon: "graphic_eq", path: "/tools/audio/tone-generator.html" },
                { name: "백색 소음", icon: "waves", path: "/tools/audio/white-noise.html" },
            ]
        },
        {
            category: "메모/텍스트 (Memo)",
            items: [
                { name: "Utilsly Docs (문서)", icon: "description", path: "/tools/memo/docs.html" },
                { name: "빠른 메모장", icon: "edit_note", path: "/tools/memo/notepad.html" },
                { name: "EPUB 리더", icon: "menu_book", path: "/tools/text/epub-reader.html" },
                { name: "텍스트 비교", icon: "difference", path: "/tools/text/text-diff.html" },
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
                { name: "HTML 플레이그라운드", icon: "code", path: "/tools/dev/html-playground.html" },
                { name: "QR 코드 생성", icon: "qr_code_2", path: "/tools/dev/qr-generator.html" },
                { name: "코드 미니파이어", icon: "compress", path: "/tools/dev/code-minifier.html" },
                { name: "정규식 테스터", icon: "regular_expression", path: "/tools/dev/regex-tester.html" },
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
                { name: "공학용 계산기", icon: "calculate", path: "/tools/math/scientific-calculator.html" },
                { name: "단위 변환기", icon: "scale", path: "/tools/math/unit-converter.html" },
                { name: "퍼센트 계산기", icon: "percent", path: "/tools/math/percentage-calculator.html" },
            ]
        },
        {
            category: "날짜/시간 (Date)",
            items: [
                { name: "타이머", icon: "timer", path: "/tools/date/timer.html" },
                { name: "뽀모도로 타이머", icon: "check_circle", path: "/tools/date/pomodoro.html" },
                { name: "스톱워치", icon: "timer_off", path: "/tools/date/stopwatch.html" },
                { name: "D-Day 계산기", icon: "event_upcoming", path: "/tools/date/d-day-counter.html" },
                { name: "세계 시간", icon: "public", path: "/tools/date/world-time.html" },
            ]
        },
        {
            category: "색상 (Color)",
            items: [
                { name: "컬러 피커", icon: "palette", path: "/tools/color/color-picker.html" },
            ]
        },
        {
            category: "건강 (Health)",
            items: [
                { name: "BMI 계산기", icon: "monitor_weight", path: "/tools/health/bmi-calculator.html" },
                { name: "BMR 계산기", icon: "local_fire_department", path: "/tools/health/bmr-calculator.html" },
                { name: "호흡 운동", icon: "self_improvement", path: "/tools/health/breathing.html" },
            ]
        },
        {
            category: "보안 (Security)",
            items: [
                { name: "비밀번호 생성", icon: "password", path: "/tools/security/password-generator.html" },
            ]
        },
        {
            category: "AI 도구 (Beta)",
            items: [
                { name: "AI 글쓰기 도우미", icon: "edit_note", path: "/tools/ai/writing-assistant.html" },
                { name: "AI 번역기", icon: "translate", path: "/tools/ai/translator.html" },
            ]
        }
    ],

    renderSidebar() {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (!sidebarNav) return;

        // Search Bar
        let html = `
            <div class="sidebar-search-container">
                <div style="position: relative;">
                    <span class="material-symbols-rounded" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 18px; color: var(--text-tertiary);">search</span>
                    <input type="text" id="sidebarSearch" placeholder="검색..." style="padding-left: 36px; background: rgba(0,0,0,0.03); border: none; width: 100%;">
                </div>
            </div>
        `;

        // Home Link
        html += `
            <div class="nav-section">
                <a href="/index.html" class="nav-item" id="nav-home">
                    <span class="material-symbols-rounded icon">home</span>
                    <span class="label">홈</span>
                </a>
                <a href="/settings.html" class="nav-item" id="nav-settings">
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
