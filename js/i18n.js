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

            // Tool Descriptions (Bulk Added)
            "동영상을 GIF로 변환하세요. (브라우저 성능에 따라 시간이 소요될 수 있습니다)": "Convert video to GIF. (Processing time may vary based on browser performance)",
            "영상을 업로드하여 배속 재생, 거울 모드, 회전 기능을 사용해보세요.": "Upload video to use playback speed, mirror mode, and rotation features.",
            "전체 화면, 창, 또는 브라우저 탭을 녹화하세요.": "Record your full screen, window, or browser tab.",
            "실시간 글자수, 단어수, 줄수를 계산합니다.": "Calculate character, word, and line counts in real-time.",
            "두 텍스트를 입력하여 변경된 부분(추가/삭제)을 확인하세요.": "Enter two texts to see additions and deletions.",
            "불필요한 줄바꿈을 제거하고 텍스트를 한 줄로 정리합니다.": "Remove unnecessary line breaks and organize text into a single line.",
            "마크다운 문법을 실시간으로 미리보고 HTML로 변환합니다.": "Preview Markdown syntax and convert to HTML in real-time.",
            "디자인 시안용 더미 텍스트를 생성합니다.": "Generate dummy text for design mockups.",
            "영어 텍스트를 다양한 특수문자 폰트로 변환하세요.": "Convert English text into various fancy fonts.",
            "EPUB 파일을 업로드하여 브라우저에서 편하게 읽으세요.": "Upload and read EPUB files comfortably in your browser.",
            "인코딩 문제로 깨져 보이는 문자를 올바르게 복구합니다.": "Fix characters that look broken due to encoding issues.",
            "영어 텍스트의 대소문자를 간편하게 변환합니다.": "Easily convert case of English text.",
            "PPTX 파일의 '수정 암호' 또는 '읽기 전용' 설정을 제거하여 자유롭게 편집할 수 있도록 합니다.": "Remove 'Modify Password' or 'Read-only' settings from PPTX files to edit freely.",
            "옵션을 선택하여 강력한 보안 비밀번호를 생성하세요.": "Generate strong, secure passwords with various options.",
            "JSON Web Token을 로컬에서 즉시 디코딩하여 페이로드를 확인합니다. 데이터는 서버로 전송되지 않습니다.": "Decode JWTs locally to view payloads. Data is never sent to a server.",
            "후보를 등록하고 공정한 투표를 진행하세요.": "Register candidates and conduct a fair vote.",
            "무엇을 선택할지 고민되시나요? 룰렛을 돌려 운명에 맡겨보세요.": "Can't decide? Spin the roulette and leave it to fate.",
            "공정한 추첨을 위해 참여자 목록에서 무작위로 당첨자를 선정합니다.": "Randomly select winners from a list for a fair draw.",
            "친구, 동료들과 함께 즐기는 스릴 만점 사다리 게임!": "Thrilling Ladder Game to enjoy with friends and colleagues!",
            "3D 주사위를 굴려 랜덤한 숫자를 얻으세요.": "Roll 3D dice to get random numbers.",
            "구조가 손상되어 열리지 않는 PDF 파일을 다시 작성하여 복구 시도를 합니다.": "Attempt to repair corrupted PDF files by rewriting their structure.",
            "비밀번호를 입력하여 PDF의 암호 잠금을 해제하고 보호되지 않은 파일로 저장합니다.": "Enter password to unlock PDF and save as unprotected file.",
            "PDF의 각 페이지를 이미지 파일로 변환하여 다운로드하세요.": "Convert each page of PDF to an image file.",
            "PDF 파일을 페이지별로 나누어 저장할 수 있습니다.": "Split PDF files into separate pages.",
            "여러 개의 PDF 파일을 순서대로 하나로 합치세요.": "Merge multiple PDF files into one in order.",
            "비율, 증감, 변화율 등 다양한 퍼센트 계산을 쉽게 해결하세요.": "Easily calculate ratios, increases, and change rates.",
            "삼각함수, 로그 등 다양한 수학 기능을 사용하세요.": "Use trigonometric functions, logs, and more complex math features.",
            "자유롭게 그리고, 저장하고, 공유하세요. 전체화면으로 교실 수업에 활용하세요.": "Draw, save, and share freely. Use fullscreen for classroom teaching.",
            "Notion 스타일의 블록 기반 에디터. 자동 저장되어 내용이 유지됩니다.": "Notion-style block-based editor. Auto-saves to keep your content.",
            "길이, 무게, 부피, 온도 등 다양한 단위를 간편하게 변환합니다.": "Easily convert length, weight, volume, temperature, and more.",
            "4초간 들이마시고, 7초간 멈추고, 8초간 내뱉으며 안정을 찾으세요.": "Inhale for 4s, hold for 7s, exhale for 8s to find peace.",
            "iPhone HEIC 사진을 JPG로 무료 변환하세요.": "Convert iPhone HEIC photos to JPG for free.",
            "iPhone/iPad의 HEIC 이미지를 넓리 쓰이는 JPG로 변환하세요. 여러 파일을 한번에 처리할 수 있습니다.": "Convert iPhone/iPad HEIC images to widely used JPG. Batch processing supported.",
            "이미지 전체에 블러 효과를 적용하여 부드럽게 연출하거나 내용을 흐리게 만드세요.": "Apply blur effect to soften images or obscure content.",
            "이미지를 원하는 영역만큼 잘라내고 저장하세요.": "Crop images to your desired area and save.",
            "밝기, 대비, 채도 등을 조절하여 이미지를 보정하세요.": "Adjust brightness, contrast, saturation to enhance images.",
            "이미지 크기를 조절하고 포맷을 변경하여 저장하세요.": "Resize images and change formats.",
            "iPhone HEIC 사진을 PNG로 무료 변환하세요.": "Convert iPhone HEIC photos to PNG for free.",
            "키보드 숫자키(1-9)로 이미지를 빠르게 분류하세요.": "Quickly sort images using keyboard number keys (1-9).",
            "JPG를 PNG로, PNG를 JPG로 무료 변환하세요.": "Convert JPG to PNG and PNG to JPG for free.",
            "여러 JPG 이미지를 한번에 PNG 포맷으로 변환하세요.": "Batch convert multiple JPG images to PNG format.",
            "이미지 속의 글자를 텍스트로 변환하세요. Ctrl+V로 붙여넣기도 지원합니다.": "Convert text inside images to editable text. Paste (Ctrl+V) supported.",
            "커스텀 크기와 색상의 플레이스홀더 이미지를 만드세요.": "Create custom sized and colored placeholder images.",
            "여러 PNG 이미지를 한번에 JPG로 변환하세요. 투명한 배경은 흰색으로 변환됩니다.": "Batch convert PNGs to JPG. Transparent backgrounds become white.",
            "여러 PNG 이미지를 최신 웹 포맷인 WEBP로 변환하여 용량을 최적화하세요.": "Convert PNGs to modern WEBP format to optimize size.",
            "PNG를 WebP로, WebP를 PNG로 무료 변환하세요. SEO 최적화에 완벽!": "Convert PNG to WebP and vice versa. Perfect for SEO!",
            "SVG 벡터 이미지를 PNG로 무료 변환하세요.": "Convert SVG vector images to PNG for free.",
            "SVG 벡터 파일을 JPG 이미지로 변환하세요. 스케일, 배경색, 품질 조절이 가능합니다.": "Convert SVG vector files to JPG. Adjust scale, background, and quality.",
            "벡터 SVG 파일을 PNG 이미지로 변환하세요. 스케일(해상도)을 조절할 수 있습니다.": "Convert vector SVG files to PNG. Adjust scale (resolution).",
            "WEBP 이미지를 JPG로 변환하세요.": "Convert WEBP images to JPG.",
            "이미지 파일을 최적화된 WebP 포맷으로 변환하세요.": "Convert image files to optimized WebP format.",
            "WEBP를 JPG로, JPG를 WEBP로 무료 변환하세요.": "Convert WEBP to JPG and JPG to WEBP for free.",

            // Common Placeholders/Labels
            drop_zone_text: "Click or drag file here to upload",
            drop_zone_hint: "Files are processed only in your browser.",
            "선택된 파일: ": "Selected file: ",
            "변환하기": "Convert",
            "다운로드": "Download",
            "결과": "Result",
            "입력": "Input",
            "설정": "Settings",
            "초기화": "Reset",
            "복사": "Copy",
            "복사됨": "Copied",
            "삭제": "Delete",
            "추가": "Add",
            "닫기": "Close",
            "확인": "Confirm",
            "취소": "Cancel",
            "저장": "Save",
            "미리보기": "Preview",
            "옵션": "Options",
            "너비": "Width",
            "높이": "Height",
            "크기": "Size",
            "용량": "File Size",
            "타입": "Type",
            "파일 선택": "Select File",
            "파일을 여기에 드롭하세요": "Drop files here",
            "또는 클릭하여 선택": "or click to select",
            "이미지": "Image",
            "텍스트": "Text",
            "파일": "File",
            "색상": "Color",
            "배경색": "Background Color",
            "글자색": "Text Color",
            "투명도": "Opacity",
            "품질": "Quality",
            "확장자": "Extension",
            "다운로드 포맷": "Download Format",
            "변환된 이미지": "Converted Image",
            "원본 이미지": "Original Image",
            "비밀번호": "Password",
            "비밀번호 입력": "Enter Password",
            "비밀번호 확인": "Confirm Password",
            "암호": "Password",
            "생성": "Generate",
            "생성하기": "Generate",
            "계산하기": "Calculate",
            "계산": "Calculate",
            "시작": "Start",
            "중지": "Stop",
            "일어설 시간": "Puase",
            "기록": "History",
            "기록 지우기": "Clear History",
            "공유": "Share",
            "공유하기": "Share",
            "링크 복사": "Copy Link",
            "오류": "Error",
            "성공": "Success",
            "실패": "Failed",
            "처리 중...": "Processing...",
            "잠시만 기다려주세요": "Please wait...",
            "완료": "Done",
            "모든 파일": "All Files",
            "이미지 파일": "Image Files",
            "문서 파일": "Document Files",
            "오디오 파일": "Audio Files",
            "비디오 파일": "Video Files",

            // Date & Time
            "년": "Year",
            "월": "Month",
            "일": "Day",
            "시": "Hour",
            "분": "Minute",
            "초": "Second",
            "날짜": "Date",
            "시간": "Time",
            "오늘": "Today",
            "내일": "Tomorrow",
            "어제": "Yesterday",
            "기간": "Duration",
            "시작일": "Start Date",
            "종료일": "End Date",
            "남은 시간": "Time Left",
            "경과 시간": "Time Eloapsed",

            // Math & Unit
            "길이": "Length",
            "무게": "Weight",
            "넓이": "Area",
            "부피": "Volume",
            "온도": "Temperature",
            "속도": "Speed",
            "데이터": "Data",
            "압력": "Pressure",
            "에너지": "Energy",
            "연비": "Fuel Economy",
            "평": "Pyeong",
            "센티미터": "Centimeters",
            "미터": "Meters",
            "킬로미터": "Kilometers",
            "인치": "Inches",
            "피트": "Feet",
            "야드": "Yards",
            "마일": "Miles",
            "그램": "Grams",
            "킬로그램": "Kilograms",
            "파운드": "Pounds",
            "온스": "Ounces",
            "제곱미터": "Square Meters",
            "에이커": "Acres",
            "헥타르": "Hectares",
            "섭씨": "Celsius",
            "화씨": "Fahrenheit",
            "켈빈": "Kelvin",

            // Calculator Specific
            "더하기": "Add",
            "빼기": "Subtract",
            "곱하기": "Multiply",
            "나누기": "Divide",
            "나머지": "Remainder",
            "제곱": "Square",
            "루트": "Square Root",
            "로그": "Logarithm",
            "사인": "Sine",
            "코사인": "Cosine",
            "탄젠트": "Tangent",

            // Finance
            "원금": "Principal",
            "이자율": "Interest Rate",
            "기간 (년)": "Period (Years)",
            "기간 (개월)": "Period (Months)",
            "복리": "Compound Interest",
            "단리": "Simple Interest",
            "세금": "Tax",
            "세후": "After Tax",
            "세전": "Before Tax",
            "총액": "Total Amount",
            "수익금": "Profit",
            "수익률": "Return Rate",
            "매수가": "Buy Price",
            "매도가": "Sell Price",
            "수량": "Quantity",
            "평단가": "Average Price",
            "보유량": "Holdings",
            "추가 매수": "Additional Buy",
            "목표가": "Target Price",
            "현재가": "Current Price",

            // Text Tools
            "글자수": "Character Count",
            "공백 포함": "With Spaces",
            "공백 제외": "Without Spaces",
            "단어수": "Word Count",
            "줄수": "Line Count",
            "대문자로": "To Uppercase",
            "소문자로": "To Lowercase",
            "줄바꿈 제거": "Remove Line Breaks",
            "공백 제거": "Remove Whitespace",
            "변경 전": "Before",
            "변경 후": "After",
            "찾을 내용": "Find",
            "바꿀 내용": "Replace",

            // Image Tools
            "픽셀": "Pixels",
            "비율 유지": "Keep Aspect Ratio",
            "자르기": "Crop",
            "회전": "Rotate",
            "뒤집기": "Flip",
            "필터": "Filter",
            "밝기": "Brightness",
            "채도": "Saturation",
            "대비": "Contrast",
            "흐림": "Blur",
            "선명하게": "Sharpen",
            "흑백": "Grayscale",
            "반전": "Invert",
            "세피아": "Sepia",

            // PDF/File Tools
            "페이지": "Pages",
            "모든 페이지": "All Pages",
            "페이지 범위": "Page Range",
            "분할": "Split",
            "합치기": "Merge",
            "추출": "Extract",
            "압축": "Compress",
            "암호 설정": "Set Password",
            "암호 해제": "Unlock",

            // Random/Vote
            "항목": "Items",
            "항목 추가": "Add Item",
            "추첨": "Draw",
            "결과 확인": "Check Result",
            "다시 하기": "Retry",
            "돌리기": "Spin",
            "섞기": "Shuffle",
            "팀 나누기": "Split Teams",
            "순서 정하기": "Set Order"
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

        // 3. Robust TreeWalker for full content translation
        // This ensures "English versions for everything" without manual file edits.
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            const text = node.nodeValue.trim();
            if (text && this.dictionary.en[text]) {
                node.nodeValue = node.nodeValue.replace(text, this.dictionary.en[text]);
            }
        }

        // Update titles for tools dynamically (for home page cards and SEO)
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
