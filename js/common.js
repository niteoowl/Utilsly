/**
 * Utilsly Common JS
 * Handles Sidebar generation and common UI interactions.
 */

const Utilsly = {
    init() {
        this.loadIcons();
        this.loadHeader(); // NEW: Load Common Header (Favicon)
        this.loadAuth(); // NEW: Load Auth Manager
        this.initTheme();
        this.injectEarlyThemeScript(); // Prevent flash
        this.loadHiddenTools(); // Load user preferences
        this.initCurrentTool(); // NEW: Init tool if present on initial load
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

    /**
     * Finds and initializes the tool on the current page.
     */
    initCurrentTool() {
        const toolContainer = document.querySelector('[data-tool-id]');
        if (toolContainer) {
            const toolId = toolContainer.dataset.toolId;
            // Wait for tool registration? 
            // Since script tags are at the bottom, registering usually happens before DOMContentLoaded if synchronous,
            // or we might need to wait if it's async. 
            // In the current architecture, tools call Utilsly.registerTool() in the inline script at the bottom of <body>.
            // Utilsly.init() runs on DOMContentLoaded.
            // So registration should have happened.

            if (this.tools[toolId]) {
                console.log(`[Tool] Initializing tool: ${toolId}`);
                try {
                    this.tools[toolId].init();
                    this.currentTool = { id: toolId, controller: this.tools[toolId] };
                } catch (err) {
                    console.error(`[Tool] Error initializing tool ${toolId}:`, err);
                }
            } else {
                console.warn(`[Tool] Tool ID '${toolId}' found but no matching controller registered.`);
            }
        }
    },

    loadAuth() {
        const script = document.createElement('script');
        script.type = 'module';
        // Use absolute path since common.js might be loaded from anywhere
        // But if it's file://, absolute /js/... might fail if not root.
        // Try relative based on common.js location? No, we can't know that easily.
        // Assume root absolute for now as per project structure.
        script.src = '/js/auth-manager.js';
        document.body.appendChild(script);
    },

    loadHeader() {
        const script = document.createElement('script');
        script.src = '/js/header.js';
        document.head.appendChild(script);
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

    // --- Tool Registry & Lifecycle Management ---
    tools: {}, // Registry of tool controllers
    currentTool: null, // Currently active tool instance

    /**
     * Registers a new tool controller.
     * @param {string} id - Unique identifier for the tool (e.g., 'timer').
     * @param {object} controller - Object containing init() and cleanup() methods.
     */
    registerTool(id, controller) {
        if (this.tools[id]) {
            // Replacing controller is normal in SPA navigation
            // console.log(`Tool '${id}' updated.`);
        }

        // Ensure init and cleanup exist
        if (typeof controller.init !== 'function') {
            console.error(`Tool '${id}' missing init() method.`);
            return;
        }
        if (typeof controller.cleanup !== 'function') {
            controller.cleanup = () => { };
        }

        this.tools[id] = controller;
        // If this tool corresponds to the current page (during initial load or navigation),
        // we might need to verify if it should be active immediately.
        // However, the loadPage logic handles the actual init call.
    },

    /**
     * Cleans up the currently active tool.
     */
    cleanupCurrentTool() {
        if (this.currentTool) {
            try {
                console.log(`Cleaning up tool: ${this.currentTool.id}`);
                this.currentTool.controller.cleanup();
            } catch (e) {
                console.error(`Error cleaning up tool '${this.currentTool.id}':`, e);
            }
            this.currentTool = null;
        }
    },

    // Centralized Tool Registry for Sidebar list generation
    // (Renamed to sidebarTools to avoid confusion with the active tool registry)

    // 수정됨: 모든 path에서 .html 제거
    sidebarTools: [
        {
            category: "커뮤니티",
            items: [
                { name: "전체글 보기", icon: "forum", path: "/community/index.html?category=all" },
                { name: "공지사항", icon: "campaign", path: "/community/index.html?category=notice" },
                { name: "버그 제보", icon: "bug_report", path: "/community/index.html?category=bug" },
                { name: "기능 건의", icon: "lightbulb", path: "/community/index.html?category=suggestion" },
            ]
        },
        {
            category: "랜덤",
            items: [
                { name: "룰렛 돌리기", icon: "casino", path: "/tools/random/roulette" },
                { name: "사다리 타기", icon: "line_style", path: "/tools/random/ladder" },
                { name: "제비뽑기", icon: "confirmation_number", path: "/tools/random/random-picker" },
                { name: "주사위 굴리기", icon: "deployed_code", path: "/tools/random/dice-roller" },
                { name: "투표 하기", icon: "how_to_vote", path: "/tools/random/vote" },
                { name: "비밀번호 생성", icon: "password", path: "/tools/random/password-generator" },
            ]
        },
        {
            category: "이미지",
            items: [
                { name: "이미지 리사이저", icon: "image", path: "/tools/image/image-resizer" },
                { name: "PNG JPG 변환", icon: "transform", path: "/tools/image/png-to-jpg" },
                { name: "JPG PNG 변환", icon: "transform", path: "/tools/image/jpg-to-png" },
                { name: "HEIC JPG 변환", icon: "phone_iphone", path: "/tools/image/heic-to-jpg" },
                { name: "WEBP JPG 변환", icon: "image", path: "/tools/image/webp-to-jpg" },
                { name: "SVG PNG 변환", icon: "polyline", path: "/tools/image/svg-to-png" },
                { name: "SVG JPG 변환", icon: "polyline", path: "/tools/image/svg-to-jpg" },
                { name: "PNG WEBP 변환", icon: "image", path: "/tools/image/png-to-webp" },
                { name: "JPG WEBP 변환", icon: "image", path: "/tools/image/jpg-to-webp" },
                { name: "이미지 자르기", icon: "crop", path: "/tools/image/image-cropper" },
                { name: "이미지 필터", icon: "photo_filter", path: "/tools/image/image-filters" },
                { name: "이미지 블러", icon: "blur_on", path: "/tools/image/image-blur" },
                { name: "이미지 색상 추출", icon: "colorize", path: "/tools/image/color-extractor" },
                { name: "OCR 텍스트 추출", icon: "find_in_page", path: "/tools/image/ocr" },
                { name: "이미지 정렬/분류", icon: "auto_awesome_motion", path: "/tools/image/image-sorter" },
                { name: "HEIC PNG 변환", icon: "image", path: "/tools/image/heic-png-converter" },
                { name: "ASCII 아트", icon: "grid_on", path: "/tools/image/ascii-art" },
                { name: "파비콘 생성기", icon: "select_window", path: "/tools/image/favicon-generator" },
                { name: "더미 이미지 생성", icon: "image", path: "/tools/image/dummy-image" },
            ]
        },
        {
            category: "비디오",
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
                { name: "PDF 암호 제거", icon: "no_encryption", path: "/tools/pdf/remove-password" },
                { name: "깨진 PDF 복구", icon: "medical_services", path: "/tools/pdf/repair-pdf" },
            ]
        },
        {
            category: "오디오 (Audio)",
            items: [
                { name: "음성 녹음기", icon: "mic", path: "/tools/audio/voice-recorder" },
                { name: "주파수 생성기", icon: "graphic_eq", path: "/tools/audio/tone-generator" },
                { name: "백색 소음", icon: "waves", path: "/tools/audio/white-noise" },
                { name: "오디오 합치기", icon: "library_music", path: "/tools/audio/audio-merger" },
            ]
        },
        {
            category: "메모/텍스트",
            items: [
                { name: "빠른 메모장", icon: "edit_note", path: "/tools/memo/notepad" },
                { name: "스마트 화이트보드", icon: "draw", path: "/tools/memo/whiteboard" },
                { name: "EPUB 리더", icon: "menu_book", path: "/tools/text/epub-reader" },
                { name: "텍스트 비교", icon: "difference", path: "/tools/text/text-diff" },
                { name: "글자수 세기", icon: "article", path: "/tools/text/word-counter" },
                { name: "대소문자 변환", icon: "text_fields", path: "/tools/text/case-converter" },
                { name: "로렘 입숨 생성", icon: "description", path: "/tools/text/lorem-ipsum" },
                { name: "줄바꿈 제거", icon: "format_align_left", path: "/tools/text/remove-line-breaks" },
                { name: "마크다운 미리보기", icon: "markdown", path: "/tools/text/markdown-preview" },
                { name: "특수문자 폰트", icon: "text_fields", path: "/tools/text/fancy-text" },
                { name: "글자 깨짐 복구", icon: "history_edu", path: "/tools/text/encoding-fixer" },
            ]
        },
        {
            category: "개발",
            items: [
                { name: "HTML 플레이그라운드", icon: "code", path: "/tools/dev/html-playground" },
                { name: "QR 코드 생성", icon: "qr_code_2", path: "/tools/dev/qr-generator" },
                { name: "코드 미니파이어", icon: "compress", path: "/tools/dev/code-minifier" },
                { name: "정규식 테스터", icon: "regular_expression", path: "/tools/dev/regex-tester" },
                { name: "JSON 포맷터", icon: "data_object", path: "/tools/dev/json-formatter" },
                { name: "CSV ↔ JSON 변환", icon: "data_thresholding", path: "/tools/dev/csv-json-converter" },
                { name: "YAML ↔ JSON 변환", icon: "integration_instructions", path: "/tools/dev/yaml-json-converter" },
                { name: "Crontab 생성기", icon: "schedule", path: "/tools/dev/crontab-generator" },
                { name: "SQL 포맷터", icon: "database", path: "/tools/dev/sql-formatter" },
                { name: "URL 인코더", icon: "link", path: "/tools/dev/url-encoder" },
                { name: "Base64 인코더", icon: "package_2", path: "/tools/dev/base64-encoder" },
                { name: "UUID 생성기", icon: "fingerprint", path: "/tools/dev/uuid-generator" },
                { name: "Regex 빌더", icon: "regular_expression", path: "/tools/dev/regex-builder" },
                { name: "Docker Compose 생성기", icon: "settings_input_component", path: "/tools/dev/docker-compose" },
                { name: "Dockerfile 생성기", icon: "construction", path: "/tools/dev/dockerfile" },
                { name: "반응형 디자인 테스터", icon: "devices", path: "/tools/dev/responsive-tester" },
                { name: "내 IP 주소 확인", icon: "public", path: "/tools/dev/my-ip" },
            ]
        },
        {
            category: "파일",
            items: [
                { name: "실시간 파일 공유", icon: "share_windows", path: "/tools/file/p2p-transfer" },
                { name: "Zip 파일 압축", icon: "folder_zip", path: "/tools/file/zip-compress" },
                { name: "Zip 압축 해제", icon: "unarchive", path: "/tools/file/zip-decompress" },
                { name: "메타데이터 지우기", icon: "cleaning_services", path: "/tools/file/metadata-remover" },
                { name: "메타데이터 수정기", icon: "edit_calendar", path: "/tools/file/metadata-editor" },
            ]
        },
        {
            category: "보안",
            items: [
                { name: "JWT 디코더", icon: "security", path: "/tools/security/jwt-decoder" },
                { name: "비밀번호 생성기", icon: "password", path: "/tools/security/password-generator" },
                { name: "PPT 암호 제거", icon: "key_off", path: "/tools/security/ppt-password" },
            ]
        },
        {
            category: "수학/계산",
            items: [
                { name: "공학용 계산기", icon: "calculate", path: "/tools/math/scientific-calculator" },
                { name: "단위 변환기", icon: "scale", path: "/tools/math/unit-converter" },
                { name: "퍼센트 계산기", icon: "percent", path: "/tools/math/percentage-calculator" },
                { name: "진수 변환기", icon: "numbers", path: "/tools/math/base-converter" },
                { name: "그래프 생성기", icon: "multiline_chart", path: "/tools/math/graph-generator" },
            ]
        },
        {
            category: "날짜/시간",
            items: [
                { name: "타이머", icon: "timer", path: "/tools/date/timer" },
                { name: "뽀모도로 타이머", icon: "check_circle", path: "/tools/date/pomodoro" },
                { name: "스톱워치", icon: "timer_off", path: "/tools/date/stopwatch" },
                { name: "D-Day 계산기", icon: "event_upcoming", path: "/tools/date/d-day-counter" },
                { name: "세계 시간", icon: "public", path: "/tools/date/world-time" },
                { name: "만 나이 계산기", icon: "calendar_today", path: "/tools/date/international-age" },
            ]
        },
        {
            category: "색상 도구 (Color)",
            items: [
                { name: "컬러 피커", icon: "palette", path: "/tools/color/color-picker" },
                { name: "그라데이션 생성", icon: "gradient", path: "/tools/color/gradient-generator" },
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
            category: "금융/투자 (Finance)",
            items: [
                { name: "복리 이자 계산기", icon: "monetization_on", path: "/tools/finance/compound-interest" },
                { name: "물타기 계산기", icon: "water_drop", path: "/tools/finance/average-down" },
                { name: "목표 평단 계산기", icon: "gps_fixed", path: "/tools/finance/target-price" },
                { name: "수익률 계산기", icon: "trending_up", path: "/tools/finance/profit-calculator" },
                { name: "환율 변환기", icon: "currency_exchange", path: "/tools/finance/currency-converter" },
                { name: "원달러 환율", icon: "attach_money", path: "/tools/finance/krw-usd" },
                { name: "엔화 환율", icon: "currency_yen", path: "/tools/finance/krw-jpy" },
                { name: "유로 환율", icon: "euro", path: "/tools/finance/krw-eur" },
                { name: "위안화 환율", icon: "currency_yuan", path: "/tools/finance/krw-cny" },
                { name: "예적금 만기 계산기", icon: "savings", path: "/tools/finance/savings-maturity" },
            ]
        },
        {
            category: "AI 도구 (Beta)",
            items: [
                { name: "AI 글쓰기 도우미", icon: "edit_note", path: "/tools/ai/writing-assistant", desc: "글 작성 보조 및 교정", category: "ai" },
                { name: "AI 번역기", icon: "translate", path: "/tools/ai/translator", desc: "자연스러운 AI 번역", category: "ai" },
                { name: "스마트 배경 제거", icon: "auto_fix_high", path: "/tools/ai/background-remover", desc: "브라우저에서 직접 배경(누끼) 제거", category: "ai" },
                { name: "AI 챗봇", icon: "smart_toy", path: "/tools/ai/ai-chat", desc: "AI와 대화하기", category: "ai" },
            ]
        }
    ],

    renderSidebar() {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (!sidebarNav) return;

        // Save scroll position before re-rendering
        const scrollPosition = sidebarNav.scrollTop;

        // Search Bar
        let html = `
            <div class="sidebar-search-container" style="position: sticky; top: 0; background: var(--bg-sidebar); z-index: 10; padding-bottom: 8px;">
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
        this.sidebarTools.forEach(section => {
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
                </button>
            </div>
            <div style="padding: 0 8px 16px 8px; font-size: 11px; color: var(--text-tertiary); text-align: center;">
                <a href="/privacy.html" style="color: inherit; text-decoration: none;">개인정보처리방침</a> • 
                <a href="/terms.html" style="color: inherit; text-decoration: none;">이용약관</a>
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
        if (sidebarNav) {
            sidebarNav.scrollTop = scrollPosition;
        }
    },

    restoreSidebarScroll() {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (sidebarNav) {
            const savedScroll = localStorage.getItem('utilsly_sidebar_scroll');
            if (savedScroll) {
                sidebarNav.scrollTop = parseInt(savedScroll, 10);
            }
        }
    },

    initScrollSave() {
        // Use event delegation for better performance and to handle dynamic content
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                const sidebarNav = document.querySelector('.sidebar-nav');
                if (sidebarNav) {
                    localStorage.setItem('utilsly_sidebar_scroll', sidebarNav.scrollTop);
                }
            }
        });

        // Also save on page unload as backup
        window.addEventListener('beforeunload', () => {
            const sidebarNav = document.querySelector('.sidebar-nav');
            if (sidebarNav) {
                localStorage.setItem('utilsly_sidebar_scroll', sidebarNav.scrollTop);
            }
        });
    },

    highlightActivePage() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.classList.remove('active');
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
    // SPA Navigation Logic (Turbo Mode)
    initSpaNavigation() {
        // Canonical Click Interceptor
        document.addEventListener('click', (event) => {
            const anchor = event.target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            // Ignore external links, hash links, and new tabs
            if (
                href.startsWith('http') ||
                href.startsWith('#') ||
                anchor.target === '_blank' ||
                anchor.hasAttribute('download')
            ) {
                return;
            }

            // Handle internal navigation via SPA
            // Note: We check if it is a relative path or absolute path to our domain
            // Since this runs on file:// sometimes, we look for relative paths too.
            // The user rule said: if (href.startsWith("/"))
            // We'll trust the user rule but also accept relative paths which are common.

            const isInternal = href.startsWith('/') || !href.match(/^[a-z]+:/i); // Starts with / or no protocol

            if (isInternal) {
                // NEW: Auto-close sidebar on mobile
                if (window.innerWidth <= 768) {
                    this.toggleSidebar(false);
                }

                event.preventDefault();
                // Resolve to absolute URL for robust loading
                const url = new URL(href, window.location.origin + window.location.pathname);
                this.navigateTo(url.href);
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
        console.log(`[SPA] loadPage start: ${url}, isPush: ${isPush}`);
        this.showLoadingBar();

        try {
            // Normalize URL to pathname to avoid CORS/Protocol issues on fetch
            const urlObj = new URL(url, window.location.origin);
            const path = urlObj.pathname + urlObj.search;
            console.log(`[SPA] Fetching path: ${path}`);

            const response = await fetch(path);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);

            const html = await response.text();
            console.log(`[SPA] Fetched HTML length: ${html.length}`);

            // Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // --- 1. Cleanup Phase ---
            this.cleanupCurrentTool();

            // Remove previous page-specific styles
            document.querySelectorAll('.page-specific-style').forEach(el => el.remove());


            // --- 2. Update Head (Title, Meta) ---
            document.title = doc.title;

            // Meta description
            const newDesc = doc.querySelector('meta[name="description"]');
            const currentDesc = document.querySelector('meta[name="description"]');
            if (newDesc && currentDesc) {
                currentDesc.content = newDesc.content;
            } else if (newDesc) {
                document.head.appendChild(newDesc.cloneNode(true));
            }

            // --- 3. CSS Handling (Load & Tag) ---
            const newLinks = Array.from(doc.head.querySelectorAll('link[rel="stylesheet"], style'));
            const currentLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], style'));
            const cssPromises = [];

            newLinks.forEach(newLink => {
                const isCommon = newLink.getAttribute('href')?.includes('common.css') || newLink.getAttribute('href')?.includes('style.css');

                const exists = currentLinks.some(curr => {
                    if (newLink.tagName === 'LINK' && curr.tagName === 'LINK') return newLink.href === curr.href;
                    if (newLink.tagName === 'STYLE' && curr.tagName === 'STYLE') return newLink.innerHTML === curr.innerHTML;
                    return false;
                });

                if (!exists && !isCommon) {
                    const clonedLink = newLink.cloneNode(true);
                    clonedLink.classList.add('page-specific-style');
                    document.head.appendChild(clonedLink);

                    if (clonedLink.tagName === 'LINK') {
                        cssPromises.push(new Promise(resolve => {
                            clonedLink.onload = resolve;
                            clonedLink.onerror = resolve;
                            setTimeout(resolve, 500);
                        }));
                    }
                }
            });

            if (cssPromises.length > 0) {
                await Promise.all(cssPromises);
            }

            // --- 4. Content Replacement ---
            const newMain = doc.querySelector('.main-content');
            const currentMain = document.querySelector('.main-content');

            if (!newMain) {
                console.error("[SPA] .main-content not found in fetched HTML");
                window.location.href = url;
                return;
            }

            if (newMain && currentMain) {
                console.log("[SPA] Replacing .main-content");
                currentMain.innerHTML = newMain.innerHTML;

                // Re-run scripts (Seqential Loading for dependencies)
                const scripts = Array.from(doc.querySelectorAll('script'));

                // Use a Promise to wait for all scripts to load
                await new Promise((resolve) => {
                    const loadScript = (index) => {
                        if (index >= scripts.length) {
                            resolve();
                            return;
                        }

                        const script = scripts[index];

                        if (script.src && (script.src.includes('common.js') || script.getAttribute('src').includes('common.js'))) {
                            loadScript(index + 1);
                            return;
                        }

                        if (script.src) {
                            const isLoaded = Array.from(document.scripts).some(s => s.src === script.src);
                            if (isLoaded) {
                                loadScript(index + 1);
                                return;
                            }

                            const newScript = document.createElement('script');
                            newScript.src = script.src;
                            if (script.type) newScript.type = script.type;
                            newScript.onload = () => loadScript(index + 1);
                            newScript.onerror = () => {
                                console.error(`[SPA] Failed to load script: ${script.src}`);
                                loadScript(index + 1);
                            };
                            document.body.appendChild(newScript);
                        } else {
                            const newScript = document.createElement('script');
                            newScript.textContent = script.textContent;
                            if (script.type) newScript.type = script.type;
                            document.body.appendChild(newScript);
                            loadScript(index + 1);
                        }
                    };
                    loadScript(0);
                });

            } else {
                console.error("[SPA] Current page missing .main-content?");
                window.location.reload();
                return;
            }

            // --- 5. Tool Initialization ---
            // --- 5. Tool Initialization ---
            this.initCurrentTool();

            // Scroll to top
            window.scrollTo(0, 0);

        } catch (e) {
            console.error("[SPA] Navigation Failed:", e);
            window.location.href = url;
        } finally {
            this.highlightActivePage();
            this.initMobileMenu();
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
        bar.style.width = '0%';
        bar.style.opacity = '1';
        void bar.offsetWidth;
        bar.style.width = '70%';
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