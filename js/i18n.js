/**
 * Utilsly i18n Engine
 * High-performance translation and SEO optimization
 */

var Utilsly = window.Utilsly || {};

Utilsly.i18n = {
    currentLang: 'ko',

    dictionary: {
        en: {
            // General UI
            home: "Home",
            hero_badge: "Use directly in browser without installation",
            hero_title: "All Tools<br>In One Place.",
            hero_subtitle: "Image editing, file conversion, calculators and more.<br>Use all essential tools for free.",
            search_placeholder: "Search for tools...",
            stat_tools: "Tools",
            stat_free: "Free",
            stat_install: "No Install",
            all_tools: "All Tools",
            search_results: "Search Results",
            no_results: "No results found.",

            // Categories
            cat_random: "🎲 Random",
            cat_image: "🖼️ Image",
            cat_video: "🎬 Video",
            cat_pdf: "📄 PDF",
            cat_text: "✏️ Text",
            cat_dev: "💻 Dev",
            cat_math: "🔢 Math",
            cat_date: "⏰ Time",
            cat_health: "💪 Health",
            cat_color: "🎨 Color",
            cat_finance: "💰 Finance",
            cat_security: "🛡️ Security",
            cat_file: "📁 File",
            cat_ai: "🤖 AI",
            cat_audio: "🎵 Audio",
            cat_memo: "📝 Memo",

            // Category Titles (Home Page)
            '🎲 랜덤 도구': "🎲 Random Tools",
            '🖼️ 이미지 도구': "🖼️ Image Tools",
            '🎬 비디오 도구': "🎬 Video Tools",
            '📄 PDF 도구': "📄 PDF Tools",
            '✏️ 텍스트 도구': "✏️ Text Tools",
            '💻 개발 도구': "💻 Developer Tools",
            '🔢 계산 도구': "🔢 Calculation Tools",
            '⏰ 시간 도구': "⏰ Time Tools",
            '💪 건강 도구': "💪 Health Tools",
            '🎨 색상 도구': "🎨 Color Tools",
            '💰 금융 도구': "💰 Finance Tools",
            '🛡️ 보안 도구': "🛡️ Security Tools",
            '📁 파일 도구': "📁 File Tools",
            '🤖 AI 도구': "🤖 AI Tools",

            // Tools (Dictionary for common.js and index.html)
            "룰렛 돌리기": "Roulette Spinner",
            "점심 메뉴 결정장애 해결!": "Solve lunch menu indecision!",
            "제비뽑기": "Random Picker",
            "랜덤으로 하나 뽑기": "Pick one at random",
            "주사위 굴리기": "Dice Roller",
            "1~6 주사위 굴리기": "Roll 1-6 sided dice",
            "투표 하기": "Vote Creator",
            "간단한 투표 만들기": "Create simple polls",
            "비밀번호 생성": "Password Generator",
            "강력한 비밀번호 생성": "Generate strong passwords",
            "이미지 리사이저": "Image Resizer",
            "이미지 크기 조절": "Resize image dimensions",
            "이미지 일괄 변환기": "Batch Image Converter",
            "JPG, PNG, WEBP 변환": "Convert JPG, PNG, WEBP",
            "이미지 자르기": "Image Cropper",
            "이미지 원하는 부분 자르기": "Crop images easily",
            "이미지 필터": "Image Filters",
            "다양한 필터 적용": "Apply various photo filters",
            "이미지 색상 추출": "Color Extractor",
            "이미지에서 색상 뽑기": "Extract colors from image",
            "OCR 텍스트 추출": "OCR Text Extractor",
            "이미지 글자 인식": "Extract text from images",
            "이미지 정렬/분류": "Image Sorter",
            "이미지 파일 일괄 정렬 및 분류": "Organize images in batches",
            "더미 이미지 생성": "Placeholder Generator",
            "테스트용 플레이스홀더 이미지": "Generate test placeholder images",
            "HEIC JPG 변환": "HEIC to JPG",
            "아이폰 사진을 JPG로 변환": "Convert iPhone photos to JPG",
            "HEIC PNG 변환": "HEIC to PNG",
            "아이폰 사진을 PNG로 변환": "Convert iPhone photos to PNG",
            "ASCII 아트": "ASCII Art Generator",
            "이미지를 문자로 변환": "Convert images to ASCII characters",
            "비디오 플레이어": "Video Player",
            "배속 재생, 거울 모드": "Playback speed, mirror mode",
            "GIF 변환기": "Video to GIF",
            "동영상을 GIF로 변환": "Convert video to GIF",
            "화면 녹화": "Screen Recorder",
            "설치 없는 화면 녹화": "Record screen without install",
            "PDF 합치기": "Merge PDF",
            "여러 PDF를 하나로": "Combine multiple PDFs",
            "PDF 분할": "Split PDF",
            "PDF 페이지 나누기": "Extract or split PDF pages",
            "PDF → 이미지": "PDF to Image",
            "PDF를 이미지로 변환": "Convert PDF pages to images",
            "음성 녹음기": "Voice Recorder",
            "간편한 웹 녹음기": "Simple web audio recorder",
            "주파수 생성기": "Tone Generator",
            "특정 주파수 소리 생성": "Generate specific frequencies",
            "백색 소음": "White Noise",
            "집중을 위한 백색 소음": "Ambient noise for focus",
            "빠른 메모장": "Quick Notepad",
            "서식 지원, 자동 저장": "Rich text, auto-save",
            "스마트 화이트보드": "Smart Whiteboard",
            "무한 캔버스 드로잉": "Infinite canvas drawing",
            "EPUB 리더": "EPUB Reader",
            "전자책 바로 읽기": "Read eBooks in browser",
            "텍스트 비교": "Text Diff",
            "두 텍스트 차이점 비교": "Compare two text contents",
            "글자수 세기": "Word Counter",
            "공백 포함/제외 글자수": "Count words and characters",
            "대소문자 변환": "Case Converter",
            "영어 대소문자 변환": "Change text casing",
            "로렘 입숨 생성": "Lorem Ipsum Generator",
            "더미 텍스트 생성": "Generate placeholder text",
            "줄바꿈 제거": "Remove Line Breaks",
            "불필요한 줄바꿈 삭제": "Clean up text line breaks",
            "마크다운 미리보기": "Markdown Preview",
            "마크다운 실시간 렌더링": "Real-time MD rendering",
            "HTML 플레이그라운드": "HTML Playground",
            "실시간 코드 미리보기": "Live HTML/CSS/JS preview",
            "QR 코드 생성": "QR Code Generator",
            "링크를 QR 코드로 변환": "Create QR codes for links",
            "코드 미니파이어": "Code Minifier",
            "코드 용량 줄이기": "Minify code size",
            "정규식 테스터": "Regex Tester",
            "정규표현식 검사": "Test regular expressions",
            "JSON 포맷터": "JSON Formatter",
            "JSON 예쁘게 정렬": "Prettify JSON data",
            "SQL 포맷터": "SQL Formatter",
            "SQL 쿼리 정렬": "Format SQL queries",
            "URL 인코더": "URL Encoder",
            "URL 인코딩/디코딩": "Encode or decode URLs",
            "Base64 인코더": "Base64 Encoder",
            "Base64 변환": "Encode/Decode Base64",
            "UUID 생성기": "UUID Generator",
            "고유 식별자 생성": "Generate unique identifiers",
            "CSV ↔ JSON 변환": "CSV ↔ JSON Converter",
            "엑셀 데이터 형식 교차 변환": "Convert between CSV and JSON",
            "YAML ↔ JSON 변환": "YAML ↔ JSON Converter",
            "설정 파일 형식 즉시 변환": "Convert between YAML and JSON",
            "Crontab 생성기": "Crontab Generator",
            "주기적 실행 구문 GUI 제작": "Generate cron expressions",
            "공학용 계산기": "Scientific Calculator",
            "복잡한 수식 계산": "Calculate complex equations",
            "단위 변환기": "Unit Converter",
            "길이, 무게, 넓이 변환": "Convert length, weight, etc.",
            "퍼센트 계산기": "Percentage Calculator",
            "백분율 계산": "Calculate percentages",
            "복리 이자 계산기": "Compound Interest",
            "복리 이자 및 수익률 계산": "Calculate compound returns",
            "물타기 계산기": "Cost Basis Calculator",
            "주식/코인 추가 매수 평단 계산": "Calculate new average price",
            "목표 평단 계산기": "Target Price Calculator",
            "원하는 평단 도달을 위한 매수량": "Buy amount for target price",
            "수익률 계산기": "Profit Calculator",
            "매수/매도 수익 및 수익률": "Calculate trading returns",
            "환율 변환기": "Currency Converter",
            "전 세계 실시간 환율 계산": "Real-time global currency rates",
            "원달러 환율": "KRW-USD Rate",
            "실시간 원달러 환율 및 계산기": "Live KRW/USD exchange rate",
            "엔화 환율": "KRW-JPY Rate",
            "실시간 원엔 환율 및 계산기": "Live KRW/JPY exchange rate",
            "유로 환율": "KRW-EUR Rate",
            "실시간 원유로 환율 및 계산기": "Live KRW/EUR exchange rate",
            "위안화 환율": "KRW-CNY Rate",
            "실시간 원위안 환율 및 계산기": "Live KRW/CNY exchange rate",
            "타이머": "Timer",
            "간편한 카운트다운": "Simple countdown timer",
            "뽀모도로 타이머": "Pomodoro Timer",
            "집중력 향상 타이머": "Focus enhancement timer",
            "스톱워치": "Stopwatch",
            "시간 측정": "Measure elapsed time",
            "D-Day 계산기": "D-Day Counter",
            "기념일 계산": "Calculate special dates",
            "세계 시간": "World Clock",
            "전 세계 현재 시간": "Current time around the world",
            "컬러 피커": "Color Picker",
            "색상 코드 추출": "Pick and identify colors",
            "그라데이션 생성": "Gradient Generator",
            "CSS 그라데이션 만들기": "Create CSS gradients",
            "BMI 계산기": "BMI Calculator",
            "나의 비만도 확인": "Check Body Mass Index",
            "BMR 계산기": "BMR Calculator",
            "기초대사량 계산": "Calculate Basal Metabolic Rate",
            "호흡 운동": "Breathing Exercise",
            "스트레스 완화 호흡": "Relieve stress with breathing",
            "AI 글쓰기": "AI Writing Assistant",
            "글 작성 보조 및 교정": "AI-powered writing and proofreading",
            "AI 번역기": "AI Translator",
            "자연스러운 AI 번역": "Natural AI-powered translation",
            "스마트 배경 제거": "Background Remover",
            "브라우저에서 직접 배경(누끼) 제거": "Free AI background removal",
            "JWT 디코더": "JWT Decoder",
            "JWT 즉시 디코딩 및 페이로드 확인": "Decode JWT payloads instantly",
            "실시간 파일 공유": "File Share (P2P)",
            "서버 저장 없이 즉시 파일 공유": "Serverless peer-to-peer sharing",
            "Zip 파일 압축": "Zip Compressor",
            "여러 파일을 하나의 Zip으로 압축": "Bundle files into a Zip",
            "Zip 압축 해제": "Zip Decompressor",
            "Zip 파일의 압축을 브라우저에서 해제": "Extract Zip files in browser",
            "만 나이 계산기": "International Age",
            "생일 기준 만 나이 계산": "Calculate international age by birthday",
            "텍스트 인코딩 복구": "Encoding Fixer",
            "깨진 글자(EUC-KR 등) 복구": "Fix broken character encodings",
            "예적금 만기 계산기": "Savings Maturity",
            "예금, 적금 만기 수령액 계산": "Calculate savings maturity amount",
            "PDF 비밀번호 제거": "PDF Password Remover",
            "비밀번호 걸린 PDF 암호 해제": "Unlock password protected PDFs",
            "손상된 PDF 복구": "Repair PDF",
            "열리지 않는 PDF 파일 복구": "Fix corrupted PDF files",
            "PPT 수정 제한 해제": "PPT Password Remover",
            "PPT 수정 암호 및 읽기 전용 해제": "Remove PPT edit protection",
            "파일 메타데이터 삭제": "Metadata Remover",
            "사진/파일의 개인정보(GPS 등) 제거": "Remove personal metadata from files",
            "정규식 빌더": "Regex Builder",
            "시각적인 정규표현식 제작 도구": "Visual regular expression builder",
            "파비콘 생성기": "Favicon Generator",
            "이미지로 멀티 사이즈 파비콘 제작": "Generate multi-size favicons",

            // Common Placeholders/Labels
            drop_zone_text: "Click or drag file here to upload",
            drop_zone_hint: "Files are processed only in your browser.",
            "선택된 파일: ": "Selected file: ",
            "변환하기": "Convert",
            "다운로드": "Download",
            "결과": "Result",
            "입력": "Input",
            "설정": "Settings"
        }
    },

    init: function () {
        // Detect language based on path
        this.currentLang = window.location.pathname.includes('/en/') ? 'en' : 'ko';

        // Immediate translation of critical items
        if (this.currentLang === 'en') {
            document.documentElement.lang = 'en';
            this.translatePage();
        }

        // Always inject SEO tags for KR <-> EN cross-referencing
        this.injectSEOTags();
    },

    translate: function (text) {
        if (this.currentLang === 'ko') return text;
        return this.dictionary.en[text] || text;
    },

    translatePage: function (container) {
        if (this.currentLang === 'ko') return;

        const root = container || document;

        // 1. Translate elements with data-i18n attributes
        root.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.dictionary.en[key]) {
                el.innerHTML = this.dictionary.en[key];
            }
        });

        // 2. Translate placeholders
        root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (this.dictionary.en[key]) {
                el.placeholder = this.dictionary.en[key];
            }
        });

        // 3. Greedy translation for breadcrumbs and specific text labels (Search by content)
        // This handles cases where tools don't have data-i18n on their breadcrumbs
        root.querySelectorAll('.breadcrumb-item, .breadcrumb').forEach(el => {
            const text = el.textContent.trim();
            if (this.dictionary.en[text]) {
                el.textContent = this.dictionary.en[text];
            }
        });

        // Update titles for tools dynamically (for home page cards)
        if (root === document) {
            this.updateMetaTags();
        }
    },

    updateMetaTags: function (toolName, toolDesc) {
        if (this.currentLang === 'ko') return;

        const titleSuffix = " - Utilsly";
        const defaultTitle = "Online Web Tools Collection";
        const defaultDesc = "Useful web tools for everyone! Utilsly offers image editing, file conversion, calculators and more for free.";

        let finalTitle = toolName ? (this.translate(toolName) + titleSuffix) : (defaultTitle + titleSuffix);
        let finalDesc = toolDesc ? this.translate(toolDesc) : defaultDesc;

        document.title = finalTitle;

        // Meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', finalDesc);

        // OG Tags
        const setOg = (property, content) => {
            let el = document.querySelector(`meta[property="${property}"]`);
            if (el) el.setAttribute('content', content);
        };

        setOg('og:title', finalTitle);
        setOg('og:description', finalDesc);
    },

    injectSEOTags: function () {
        const canonicalUrl = window.location.origin + window.location.pathname;
        const koUrl = canonicalUrl.replace('/en/', '/');
        const enUrl = canonicalUrl.includes('/en/') ? canonicalUrl : (window.location.origin + '/en' + window.location.pathname);

        const addLink = (rel, hreflang, href) => {
            let link = document.createElement('link');
            link.rel = rel;
            if (hreflang) link.hreflang = hreflang;
            link.href = href;
            document.head.appendChild(link);
        };

        // Canonical
        addLink('canonical', null, canonicalUrl);

        // hreflang
        addLink('alternate', 'ko', koUrl);
        addLink('alternate', 'en', enUrl);
        addLink('alternate', 'x-default', koUrl);
    }
};

// Auto-init immediately for head execution
Utilsly.i18n.init();
