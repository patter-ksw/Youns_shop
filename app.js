// ==========================================
// Supabase Configuration
// ==========================================
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabaseClientInstance = null;
let useSupabase = false;

// Initialize Supabase correctly from window.supabase loaded via CDN
if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
    try {
        if (window.supabase) {
            supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            useSupabase = true;
            console.log("Supabase Client Initialized Successfully.");
        } else {
            console.warn("Supabase library not found on window object.");
        }
    } catch (e) {
        console.error("Supabase Initialization Error:", e);
    }
}

// ==========================================
// Product Categories & Keywords
// ==========================================
const CATEGORIES = [
    { id: 'electronics', name: '전자제품', icon: 'devices' },
    { id: 'accessories', name: '악세사리', icon: 'watch' },
    { id: 'food', name: '먹거리', icon: 'restaurant' },
    { id: 'automotive', name: '자동차 용품', icon: 'directions_car' }
];

const TRENDING_KEYWORDS = [
    '#노트북',
    '#헤드폰',
    '#손목시계',
    '#토트백',
    '#밀키트',
    '#거치대'
];

// ==========================================
// Database Generators
// ==========================================
const MALLS = ['coupang', 'naver', '11st', 'gmarket', 'musinsa', 'cjmall'];

const TEMPLATE_PRODUCTS = {
    electronics: [
        { name: '삼성전자 갤럭시북5 프로 NT960QJV-KD72G 노트북 (대화면 터치패널)', brand: '삼성전자', basePrice: 1890000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKsWkDXLFuEWUtyDE03lVpOca6OpxKJpqkK7psQSrIdK807-4eAU-GkuRdgwZey3DrDD-9aI2tT1oxA9JZsav77OhCagOx2VpiRka_bpzh00DjdU7gOyBE7BEQRC-Rwm_ZatxFwcENXKx4BtBBg9TQJ6oF4w0r10EclpVs7yFWplk5yooUym69In9_0mzT-OozGInegHGX3A6lakq7mHhUTQO3FtToLovop1bqHqQwzmDuQFRFViv8' },
        { name: 'LG전자 그램 16인치 초경량 인텔 14세대 노트북', brand: 'LG전자', basePrice: 1450000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF1s1jVHHxM-D3E64HM0wGt0SDw53v35Maun4w-GgIwWwGRA3VxAKkcKapjwLc0tZGxaRrWViNGwc6NQw1scJloxHS_-UKURWJjRhZQoFUrMw9dJ5wMGGvF1qMA8RZt5WI5PQ6q0B2N9NZ4tn7OhCDve9etIejHiokCN6HivZlHwYm75IOccXashdFqxp5mAlZC9RLOrzUyogHD3huvEME7bNFBWZ9mrbGgl3aQXEIdGKGEsrMmhgH' },
        { name: '애플 맥북에어 M3 13인치 노트북 (MacBook Air)', brand: 'Apple', basePrice: 1390000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEAOZnoMKSjsUbGQzXBPTrWlnESHLdUp7Wuw-qyw4_6LOkaTLTHwqeqfSMmuNB1vAVzM6wfXLuT_WkZUqrBz3aEtvAWeMFh12HHuesZuXtPIzQVqCCdyY9bAJu1cSeIiGb16UsNfGsuODwvpblToPjOfU0S1G-0fPSJbBSVjUEHyJwycuDFPytW53WpkNqMwx8pHnX2luqTDu4ev2dQdvA8P8XiwRAljf_OJR9BB7XprwHgxB2i09Q' },
        { name: 'Aether Pro 노이즈캔슬링 무선 헤드폰', brand: 'Tech Core', basePrice: 349000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyClXPV3HhZIcAnrVNtY_SvyLX9fvaZEbVSuwRqCEAxUCbWPN3gQrvgsjyG4ucr--AC9KNs_5c4oQWKaEiJxUCeAv2UxZFLXdxMa0RlPz21li_YELKFZcEDU7m1xfrn9etOcHXimNL0kQnEVckMvRFlsj1Va7GpPdQOuGrOzroOFJwdUreZ8zm2Sj-keHy6ou9reNDMm76_RcVA4puS2rGivX4cS_xN3RZ2WQ_oTKPv6gzNkqdgPoJ' },
        { name: 'Lumina Tab X12 Ultra OLED 태블릿 PC', brand: 'Lumina', basePrice: 1120000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3mrcRKxNc2IIgZ2QdFZBXxmTcfYh8xctf_H1QIimzkaIJNTNBDpIMRyEnBHj41PK_RLydkQ-m-kMF8oYgxLRIp40ikgggVB1ZenGLDhCjzL_0CvrJqf-VL2VuJBVCatrEoWJoxCleG72DpGyas4w84BUFP-637zbgs3LRgVu4KO2iPah3P25RnDmUUGfDFqIP7KI-UjhN0yAa_a6IcwGNIgCwHzFR0VB3i1D3CpzVVQvZesGwkPEb' },
        { name: '기계식 게이밍 키보드 갈축 (텐키리스)', brand: 'NeoType', basePrice: 129000, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80' },
        { name: '인체공학적 무선 수직 마우스 버티컬', brand: 'Ergo', basePrice: 49000, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80' },
        { name: 'C타입 고성능 고속 충전 보조배터리', brand: 'PowerVolt', basePrice: 29000, img: 'https://images.unsplash.com/photo-1609592424109-dd8251e604f3?auto=format&fit=crop&w=300&q=80' },
        { name: '4K Ultra 빔프로젝터 미니 홈시네마', brand: 'Cinemax', basePrice: 490000, img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=300&q=80' },
        { name: '스마트 모니터 조명 바 LED 스탠드', brand: 'LiteUp', basePrice: 39000, img: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80' }
    ],
    accessories: [
        { name: '모던 메탈 크로노그래프 아날로그 손목시계', brand: 'Maison', basePrice: 198000, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80' },
        { name: '천연 가죽 클래식 숄더 토트백', brand: 'Vero', basePrice: 245000, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80' },
        { name: '써지컬 스틸 패션 체인 링크 목걸이', brand: 'Aura', basePrice: 38000, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80' },
        { name: '심플 슬림 가죽 남성 반지갑', brand: 'Vero', basePrice: 65000, img: 'https://images.unsplash.com/photo-1627124718515-e23938556f8a?auto=format&fit=crop&w=300&q=80' },
        { name: '프리미엄 자외선 차단 스포츠 선글라스', brand: 'Retro', basePrice: 89000, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80' },
        { name: '데일리 캔버스 미니 크로스백', brand: 'Urban', basePrice: 29000, img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80' },
        { name: '14K 골드 플레티늄 패션 커플링 반지', brand: 'Aura', basePrice: 120000, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80' },
        { name: '미니멀 가죽 벨트 골드 버클', brand: 'Maison', basePrice: 45000, img: 'https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?auto=format&fit=crop&w=300&q=80' },
        { name: '베이직 볼캡 캐주얼 야구모자', brand: 'Urban', basePrice: 19000, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80' },
        { name: '자카드 패턴 겨울 머플러 목도리', brand: 'Maison', basePrice: 35000, img: 'https://images.unsplash.com/photo-1520903781418-b3274ab57d51?auto=format&fit=crop&w=300&q=80' }
    ],
    food: [
        { name: 'CJ제일제당 햇반 백미 즉석밥 24공기 번들', brand: '햇반', basePrice: 23500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDCZunIY5_JgeNY93_F-Ix9x00SU2dG43vMkW5--HEU20B8s09j3yAcIzjb6vsj41ly6aGyE6DX4T0Pq_lA0ZqTJ1rCCreRlPAfnBmy_I-x-h9wcDVvxEVa9Rvxmq-BIv3NzNXnZvEakgdp1cL7qFCmDJmHe7GwyH8fH-yfzvisSP9c0tOpm_TVhYz_mCYlabX5ZoRFlDYNL08Lqb3XQMfUb9ak91N-ITgzVQXCjmRQ99eMdYsNN1R' },
        { name: 'CJ제일제당 비비고 왕교자 만두 세트 (대용량)', brand: '비비고', basePrice: 28900, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL' },
        { name: '무설탕 유기농 아몬드 밀크 음료 1L x 6개', brand: 'Fresh', basePrice: 18000, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=300&q=80' },
        { name: 'CJ제일제당 스팸 클래식 200g x 8캔 세트', brand: '스팸', basePrice: 29000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt9_vb8PCR9N5g3UvKP3BCjqnjaFo73cN04CJ4SWUslYjfOvhWEfhjOVyEfLObOcg59vDZdWj6P3dQ7AxZpyjygK-eg99sqUlAY5g5cMufMSx_pwP16SVXrg0SnKArSZlK5nLj4faEG9uyD1bg1t80cNvSIyr9F0ukt3qF-W-YPhJMgV-ewLZYv82pLby85F2Q1LIBXbG5dcYH1kY7Y6h4GTO1mDDimgpJ2BQ8-SWlQDjKF_EndPNr' },
        { name: '1등급 한우 꽃등심 냉장 구이용 300g', brand: 'Vero', basePrice: 59000, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80' },
        { name: 'CJ제일제당 비비고 포기 배추김치 국산 5kg', brand: '비비고', basePrice: 32000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL' },
        { name: '훈제 닭가슴살 슬라이스 10팩 패키지', brand: 'Fit', basePrice: 15000, img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80' },
        { name: '고소한 단백질 하루견과 믹스넛 30봉', brand: 'Nut', basePrice: 19900, img: 'https://images.unsplash.com/photo-1596560548464-f01068e601c7?auto=format&fit=crop&w=300&q=80' },
        { name: 'CJ제일제당 맛밤 영양간식 패키지 12봉', brand: '맛밤', basePrice: 19900, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL' },
        { name: '자연산 저염 명란젓 파지 1kg', brand: 'Fresh', basePrice: 24900, img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80' }
    ],
    automotive: [
        { name: '차량용 맥세이프 고속 무선충전 거치대', brand: 'AutoPro', basePrice: 39000, img: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=300&q=80' },
        { name: '인체공학 차량용 메모리폼 목쿠션 허리받침', brand: 'AutoPro', basePrice: 28000, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80' },
        { name: '차량용 듀얼 QC3.0 시가잭 고속 충전기', brand: 'PowerVolt', basePrice: 15000, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80' },
        { name: '차량용 미니 공기청정기 고성능 헤파필터', brand: 'EcoAuto', basePrice: 45000, img: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80' },
        { name: '4K 초고화질 전후방 2채널 스마트 블랙박스', brand: 'NeoCapture', basePrice: 189000, img: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=300&q=80' },
        { name: '극세사 차량 세차 드라잉 타월 10장 세트', brand: 'CleanAuto', basePrice: 12000, img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80' },
        { name: '김서림 방지 차량 세정제 유리크리너', brand: 'CleanAuto', basePrice: 9800, img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80' },
        { name: '차량용 프리미엄 방향제 카 디퓨저 우드링', brand: 'EcoAuto', basePrice: 24000, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80' },
        { name: '셀프 세차 고흡수 드라잉 타월 대형', brand: 'CleanAuto', basePrice: 14900, img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80' },
        { name: '가죽 시트 케어 클리너 보호 코팅제', brand: 'CleanAuto', basePrice: 26000, img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80' }
    ]
};

// Programmatic Fallback Database Creator (6 Malls * 4 Categories * 10 items = 240 products)
const LOCAL_FALLBACK_PRODUCTS = [];
let productIdCounter = 1;

MALLS.forEach((mall) => {
    Object.keys(TEMPLATE_PRODUCTS).forEach((category) => {
        const templates = TEMPLATE_PRODUCTS[category];
        templates.forEach((tpl, idx) => {
            const rank = idx + 1;
            let price = tpl.basePrice;
            let discountRate = 0;
            
            // Vary price slightly per mall so they aren't identical
            const mallFactors = {
                'coupang': { priceOffset: 0, discount: 10 },
                'naver': { priceOffset: -1000, discount: 5 },
                '11st': { priceOffset: -2000, discount: 15 },
                'gmarket': { priceOffset: 1000, discount: 8 },
                'musinsa': { priceOffset: -3000, discount: 12 },
                'cjmall': { priceOffset: 2000, discount: 20 }
            };
            const factor = mallFactors[mall] || { priceOffset: 0, discount: 0 };
            
            let originalPrice = price + factor.priceOffset;
            discountRate = factor.discount;
            if (discountRate > 0) {
                price = Math.floor((originalPrice * (100 - discountRate)) / 10000) * 100;
            } else {
                price = originalPrice;
            }

            const mallLabels = {
                'coupang': '쿠팡 파트너',
                'naver': '네이버 셀러',
                '11st': '11st 우수샵',
                'gmarket': 'G마켓 베스트',
                'musinsa': '무신사 스탠다드',
                'cjmall': 'CJ 온스타일'
            };
            const brand = `${tpl.brand} (${mallLabels[mall] || mall})`;

            LOCAL_FALLBACK_PRODUCTS.push({
                id: productIdCounter++,
                name: tpl.name,
                brand: brand,
                price: price,
                originalPrice: originalPrice,
                discountRate: discountRate,
                site: mall,
                rating: Number((4.5 + (productIdCounter % 6) * 0.1).toFixed(1)),
                reviews: 120 + (productIdCounter % 15) * 65,
                salesCount: 1500 - rank * 80 + (productIdCounter % 8) * 120,
                category: category,
                rank: rank,
                isCurated: rank === 1 || (rank === 2 && mall === 'coupang'), // some items curated
                tag: rank === 1 ? '베스트' : rank === 2 ? '추천' : '',
                image: tpl.image || tpl.img || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                link: getMallLink(mall)
            });
        });
    });
});

function getMallLink(mall) {
    const links = {
        'coupang': 'https://coupang.com',
        'naver': 'https://shopping.naver.com',
        '11st': 'https://11st.co.kr',
        'gmarket': 'https://gmarket.co.kr',
        'musinsa': 'https://musinsa.com',
        'cjmall': 'https://display.cjonstyle.com'
    };
    return links[mall] || 'https://google.com';
}

// ==========================================
// State Management
// ==========================================
let currentCategory = 'all';
let currentSite = 'all';
let currentSort = 'rank';
let searchQuery = '';
let currentView = 'home';
let isAdmin = false;

// ==========================================
// Initializer & Data Loader
// ==========================================
async function init() {
    // 1. Setup Initial Browser History State
    history.replaceState({ view: 'home' }, '');
    
    // 2. Fetch products from Supabase (if configured) or fallback to local
    await loadProducts();

    // 3. Render Views
    renderHomeView();
    setupEventListeners();
}

async function loadProducts() {
    if (useSupabase && supabaseClientInstance) {
        try {
            console.log("Fetching products from Supabase database...");
            const { data, error } = await supabaseClientInstance.from('products').select('*');
            if (error) throw error;
            if (data && data.length > 0) {
                // Map DB snake_case properties to JS camelCase properties
                productsDB = data.map(item => ({
                    id: item.id,
                    name: item.name,
                    brand: item.brand,
                    price: Number(item.price),
                    originalPrice: item.original_price ? Number(item.original_price) : Number(item.price),
                    discountRate: item.discount_rate ? Number(item.discount_rate) : 0,
                    site: item.site,
                    rating: item.rating ? Number(item.rating) : 4.5,
                    reviews: item.reviews ? Number(item.reviews) : 0,
                    salesCount: item.sales_count ? Number(item.sales_count) : 0,
                    category: item.category,
                    rank: item.rank,
                    isCurated: item.is_curated || false,
                    tag: item.tag || '',
                    image: item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                    link: item.link || 'https://google.com'
                }));
                console.log(`Loaded ${productsDB.length} products from Supabase.`);
                
                // Update Console Log
                const dbStatus = document.getElementById('db-status-text');
                const dbCount = document.getElementById('db-products-count');
                if (dbStatus) {
                    dbStatus.textContent = "연동 성공 (DB 실시간 데이터)";
                    dbStatus.className = "font-bold text-green-600";
                }
                if (dbCount) dbCount.textContent = `${productsDB.length}개`;
                return;
            }
        } catch (e) {
            console.error("Supabase load failed. Falling back to local data.", e);
        }
    }
    
    // Fallback or Initial setup
    console.log("Using local mock products fallback.");
    productsDB = [...LOCAL_FALLBACK_PRODUCTS];
    
    const dbStatus = document.getElementById('db-status-text');
    const dbCount = document.getElementById('db-products-count');
    if (dbStatus) {
        dbStatus.textContent = useSupabase ? "Supabase 연동 실패 (로컬 모드)" : "Supabase 미연동 (로컬 대기 모드)";
        dbStatus.className = "font-bold text-yellow-600";
    }
    if (dbCount) dbCount.textContent = `${productsDB.length}개`;
}

// ==========================================
// Views Rendering (Home & List)
// ==========================================
function renderHomeView() {
    // 1. Desktop keywords
    const desktopTrending = document.getElementById('desktop-trending-chips');
    const mobileTrending = document.getElementById('mobile-trending-chips');
    
    const trendingHTML = TRENDING_KEYWORDS.map(kw => `
        <span class="px-4 py-2 bg-white border border-border-light rounded-full text-label-lg text-primary hover:border-primary-container hover:bg-surface-subtle cursor-pointer transition-all trending-chip">${kw}</span>
    `).join('');
    if (desktopTrending) desktopTrending.innerHTML = trendingHTML;
    
    // 2. Mobile keywords
    const mobileTrendingHTML = TRENDING_KEYWORDS.map((kw, index) => `
        <div class="trend-chip flex items-center gap-2 bg-white border border-border-light px-4 py-2 rounded-xl whitespace-nowrap shadow-sm trending-chip cursor-pointer">
            <span class="text-primary font-bold">${index + 1}</span>
            <span class="font-body-md">${kw.replace('#', '')}</span>
            <span class="material-symbols-outlined text-error text-[16px]">trending_up</span>
        </div>
    `).join('');
    if (mobileTrending) mobileTrending.innerHTML = mobileTrendingHTML;

    // 3. Desktop Curated Picks (First 4 items marked isCurated)
    const desktopCurated = document.getElementById('desktop-curated-picks');
    const curatedItems = productsDB.filter(p => p.isCurated).slice(0, 4);
    
    if (desktopCurated) {
        desktopCurated.innerHTML = curatedItems.map(prod => `
            <div class="group bg-white rounded-2xl border border-border-light hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full product-card-click cursor-pointer" data-id="${prod.id}">
                <div class="relative aspect-[4/5] overflow-hidden bg-surface-container">
                    <div class="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style="background-image: url('${prod.image}')"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/80 backdrop-blur-md">
                        <button class="w-full bg-primary text-white py-3 rounded-xl font-label-lg flex items-center justify-center gap-2 active:scale-95 transition-all">
                            상세보기 <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
                <div class="p-5 flex-grow flex flex-col">
                    <p class="text-label-sm text-outline mb-1 uppercase tracking-wider">${prod.brand}</p>
                    <h3 class="font-body-lg text-body-lg text-on-surface mb-2 line-clamp-2">${prod.name}</h3>
                    <div class="mt-auto flex items-baseline gap-2">
                        <span class="font-headline-md text-headline-md text-primary">${prod.price.toLocaleString()}원</span>
                        ${prod.discountRate > 0 ? `<span class="text-label-sm text-outline line-through">${prod.originalPrice.toLocaleString()}원</span>` : ''}
                    </div>
                    <div class="flex items-center gap-1 mt-3">
                        <span class="material-symbols-outlined text-yellow-400 text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="text-label-sm font-label-sm text-on-surface">${prod.rating}</span>
                        <span class="text-label-sm text-outline">(${prod.reviews})</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 4. Mobile Curated Picks
    const mobileCurated = document.getElementById('mobile-curated-picks');
    if (mobileCurated) {
        mobileCurated.innerHTML = curatedItems.map(prod => `
            <div class="group bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm flex flex-col h-full product-card-click cursor-pointer" data-id="${prod.id}">
                <div class="h-40 relative overflow-hidden bg-surface-container">
                    <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${prod.image}"/>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <p class="text-secondary text-[10px] uppercase mb-1">${prod.brand}</p>
                        <h4 class="font-body-md text-body-md font-bold truncate">${prod.name}</h4>
                    </div>
                    <div class="flex items-baseline gap-1 mt-2">
                        <span class="text-primary font-bold text-body-md">${prod.price.toLocaleString()}원</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function renderListView() {
    const filtered = productsDB.filter(prod => {
        // Category filter
        if (currentCategory !== 'all' && prod.category !== currentCategory) return false;
        
        // Site filter
        if (currentSite !== 'all' && prod.site !== currentSite) return false;
        
        // Search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            return prod.name.toLowerCase().includes(query) || prod.brand.toLowerCase().includes(query);
        }
        
        return true;
    }).sort((a, b) => {
        if (currentSort === 'rank') return a.rank - b.rank;
        if (currentSort === 'sales') return b.salesCount - a.salesCount;
        if (currentSort === 'discount') return b.discountRate - a.discountRate;
        return 0;
    });

    const categoryObj = CATEGORIES.find(c => c.id === currentCategory) || { name: '전체 상품' };
    const titleText = searchQuery ? `'${searchQuery}' 검색 결과` : categoryObj.name;

    // Desktop
    const desktopTitle = document.getElementById('desktop-list-title');
    const desktopCount = document.getElementById('desktop-list-count');
    const desktopGrid = document.getElementById('desktop-products-grid');

    if (desktopTitle) desktopTitle.textContent = titleText;
    if (desktopCount) desktopCount.textContent = `${filtered.length}개 상품`;

    if (desktopGrid) {
        if (filtered.length === 0) {
            desktopGrid.innerHTML = `
                <div class="py-16 text-center text-text-secondary w-full">
                    <span class="material-symbols-outlined text-5xl">inventory_2</span>
                    <p class="mt-4">일치하는 큐레이션 상품이 없습니다.</p>
                </div>
            `;
        } else {
            desktopGrid.innerHTML = filtered.map((prod, index) => `
                <div class="group relative flex bg-white rounded-2xl overflow-hidden border border-border-light hover:shadow-lg transition-all duration-300 p-6 gap-6 product-card-click cursor-pointer" data-id="${prod.id}">
                    <div class="relative w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl bg-surface-container">
                        <img class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" src="${prod.image}"/>
                        <div class="absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center font-bold text-lg rounded-br-lg shadow-md">${index + 1}</div>
                    </div>
                    <div class="flex flex-col justify-between flex-grow">
                        <div>
                            <div class="flex items-center gap-2 mb-2">
                                <span class="px-2 py-0.5 bg-secondary-container text-primary text-[10px] font-bold rounded-full uppercase">${getSiteName(prod.site)}</span>
                                ${prod.tag ? `<span class="px-2 py-0.5 bg-tertiary-fixed text-tertiary text-[10px] font-bold rounded-full uppercase">${prod.tag}</span>` : ''}
                            </div>
                            <h3 class="font-headline-md text-headline-md text-on-background line-clamp-2">${prod.name}</h3>
                            <div class="flex items-center gap-1 mt-1 text-primary">
                                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
                                <span class="text-label-lg font-label-lg">${prod.rating}</span>
                                <span class="text-text-secondary text-label-sm">(${prod.reviews} 리뷰)</span>
                            </div>
                        </div>
                        <div class="flex items-end justify-between mt-4">
                            <div class="flex flex-col">
                                ${prod.discountRate > 0 ? `<span class="text-error text-label-sm font-bold">${prod.discountRate}% 할인</span>` : ''}
                                <span class="text-headline-md font-bold text-primary">${prod.price.toLocaleString()}원</span>
                            </div>
                            <button class="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-transform active:scale-95 btn-buy-now" data-id="${prod.id}">
                                <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                                <span class="font-label-lg">상세 정보</span>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Mobile
    const mobileTitle = document.getElementById('mobile-list-title');
    const mobileCount = document.getElementById('mobile-list-count');
    const mobileGrid = document.getElementById('mobile-products-grid');

    if (mobileTitle) mobileTitle.textContent = titleText;
    if (mobileCount) mobileCount.textContent = `${filtered.length}개`;

    if (mobileGrid) {
        if (filtered.length === 0) {
            mobileGrid.innerHTML = `
                <div class="py-16 text-center text-text-secondary w-full">
                    <span class="material-symbols-outlined text-4xl">inventory_2</span>
                    <p class="mt-4">일치하는 큐레이션 상품이 없습니다.</p>
                </div>
            `;
        } else {
            mobileGrid.innerHTML = filtered.map((prod, index) => `
                <div class="group relative flex bg-white rounded-xl overflow-hidden border border-border-light p-3 gap-3 product-card-click cursor-pointer" data-id="${prod.id}">
                    <div class="relative w-28 h-28 flex-shrink-0 bg-surface-container">
                        <img class="w-full h-full object-cover rounded-lg" src="${prod.image}"/>
                        <div class="absolute top-0 left-0 bg-primary text-white w-6 h-6 flex items-center justify-center font-bold text-sm rounded-br-lg shadow-sm">${index + 1}</div>
                    </div>
                    <div class="flex flex-col justify-between flex-grow">
                        <div>
                            <div class="flex items-center gap-1.5 mb-1">
                                <span class="px-1.5 py-0.5 bg-secondary-container text-primary text-[8px] font-bold rounded-full uppercase">${getSiteName(prod.site)}</span>
                            </div>
                            <h4 class="font-body-md text-body-md text-on-background line-clamp-2 leading-snug">${prod.name}</h4>
                            <div class="flex items-center gap-0.5 mt-0.5 text-primary">
                                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                                <span class="text-[12px] font-bold">${prod.rating}</span>
                                <span class="text-text-secondary text-[10px]">(${prod.reviews})</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <div class="flex flex-col">
                                ${prod.discountRate > 0 ? `<span class="text-error text-[10px] font-bold">${prod.discountRate}%</span>` : ''}
                                <span class="text-body-md font-bold text-primary">${prod.price.toLocaleString()}원</span>
                            </div>
                            <button class="bg-primary text-white p-1.5 rounded-full active:scale-95 btn-buy-now" data-id="${prod.id}">
                                <span class="material-symbols-outlined text-[16px]">open_in_new</span>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

function getSiteName(site) {
    const names = {
        'coupang': '쿠팡',
        'naver': '네이버',
        '11st': '11번가',
        'gmarket': 'G마켓',
        'musinsa': '무신사',
        'cjmall': 'CJ 몰'
    };
    return names[site] || site.toUpperCase();
}

// ==========================================
// SPA Router: History State Sync
// ==========================================
function switchView(viewName, pushHistory = true) {
    currentView = viewName;
    
    // Hide detail modal when switching main views
    const detailModal = document.getElementById('detail-modal');
    if (detailModal) detailModal.classList.add('opacity-0', 'pointer-events-none');

    if (viewName === 'home') {
        document.getElementById('desktop-home-view').classList.remove('hidden');
        document.getElementById('desktop-list-view').classList.add('hidden');
        document.getElementById('mobile-home-view').classList.remove('hidden');
        document.getElementById('mobile-list-view').classList.add('hidden');
        
        // Header styling sync
        document.querySelectorAll('.header-logo-btn').forEach(btn => btn.classList.add('text-primary'));
        document.querySelectorAll('.mobile-nav-home').forEach(btn => btn.classList.add('text-primary', 'font-bold'));
        document.querySelectorAll('.mobile-nav-search').forEach(btn => btn.classList.remove('text-primary', 'font-bold'));

        if (pushHistory) {
            history.pushState({ view: 'home' }, '');
        }
    } else if (viewName === 'list') {
        document.getElementById('desktop-home-view').classList.add('hidden');
        document.getElementById('desktop-list-view').classList.remove('hidden');
        document.getElementById('mobile-home-view').classList.add('hidden');
        document.getElementById('mobile-list-view').classList.remove('hidden');
        
        document.querySelectorAll('.header-logo-btn').forEach(btn => btn.classList.remove('text-primary'));

        if (pushHistory) {
            history.pushState({
                view: 'list',
                category: currentCategory,
                site: currentSite,
                sort: currentSort,
                searchQuery: searchQuery
            }, '');
        }
    }
}

// Browser Back/Forward navigation listener
window.addEventListener('popstate', (e) => {
    const state = e.state;
    if (!state) {
        // Fallback to home
        switchView('home', false);
        return;
    }

    if (state.view === 'home') {
        switchView('home', false);
    } else if (state.view === 'list') {
        currentCategory = state.category || 'all';
        currentSite = state.site || 'all';
        currentSort = state.sort || 'rank';
        searchQuery = state.searchQuery || '';
        
        // Sync Inputs
        document.getElementById('desktop-search-input').value = searchQuery;
        document.getElementById('mobile-search-input').value = searchQuery;

        // Sync filters ui
        syncFiltersUI();
        
        switchView('list', false);
        renderListView();
    } else if (state.view === 'detail') {
        const prod = productsDB.find(p => p.id === state.productId);
        if (prod) {
            openDetailModal(prod, false);
        }
    }
});

function syncFiltersUI() {
    // Sync platform active class
    const updateActiveBtn = (containerId, selectedVal) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.querySelectorAll('button').forEach(btn => {
            if (btn.getAttribute('data-site') === selectedVal) {
                btn.classList.remove('bg-white', 'border-border-light', 'text-on-surface');
                btn.classList.add('bg-primary', 'text-white');
            } else {
                btn.classList.add('bg-white', 'border-border-light', 'text-on-surface');
                btn.classList.remove('bg-primary', 'text-white');
            }
        });
    };
    updateActiveBtn('desktop-mall-filters', currentSite);
    updateActiveBtn('mobile-mall-filters', currentSite);

    // Sync sort options
    const updateSortBtn = (containerId, selectedVal) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.querySelectorAll('button').forEach(btn => {
            if (btn.getAttribute('data-sort') === selectedVal) {
                btn.classList.remove('text-text-secondary');
                btn.classList.add('text-primary', 'border-b-2', 'border-primary', 'font-bold');
            } else {
                btn.classList.add('text-text-secondary');
                btn.classList.remove('text-primary', 'border-b-2', 'border-primary', 'font-bold');
            }
        });
    };
    updateSortBtn('desktop-sort-options', currentSort);
    updateSortBtn('mobile-sort-options', currentSort);
}

// ==========================================
// Detail Modal & Redirect Logic
// ==========================================
function openDetailModal(prod, pushHistory = true) {
    const detailBody = document.getElementById('detail-modal-body');
    const siteLabel = getSiteName(prod.site);
    const siteBtnColors = {
        'coupang': '#E52528',
        'naver': '#03C75A',
        '11st': '#FF323C',
        'gmarket': '#1E90FF',
        'musinsa': '#000000',
        'cjmall': '#53437b'
    };
    const siteBtnColor = siteBtnColors[prod.site] || '#53437b';
    
    detailBody.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-stack-lg lg:gap-16">
            <section class="relative md:rounded-xl overflow-hidden pt-12 md:pt-0">
                <div class="aspect-[4/5] relative bg-surface-container overflow-hidden rounded-2xl border border-border-light">
                    <img class="w-full h-full object-cover" src="${prod.image}" alt="${prod.name}"/>
                </div>
            </section>
            
            <section class="flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-label-sm text-outline uppercase tracking-widest">${prod.brand}</span>
                        <button class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined">share</span>
                        </button>
                    </div>
                    <h2 class="font-headline-lg text-headline-lg text-on-surface mb-4 leading-snug">${prod.name}</h2>
                    <div class="flex items-center gap-4 mt-2 mb-6 border-b border-border-light pb-4">
                        <div class="flex items-center gap-1 text-primary">
                            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
                            <span class="font-bold text-body-lg">${prod.rating}</span>
                            <span class="text-text-secondary text-label-sm">(${prod.reviews} 리뷰)</span>
                        </div>
                        <span class="px-3 py-1 bg-secondary-container text-primary text-label-sm rounded-full">실시간 인기 상품</span>
                    </div>

                    <div class="bg-surface-subtle p-6 rounded-2xl border border-border-light space-y-2 mb-8">
                        ${prod.discountRate > 0 ? `
                            <div class="text-label-sm text-outline line-through">정상가 ${prod.originalPrice.toLocaleString()}원</div>
                            <div class="flex items-baseline gap-3">
                                <span class="text-error font-bold text-2xl">${prod.discountRate}%</span>
                                <span class="font-bold text-3xl text-primary">${prod.price.toLocaleString()}원</span>
                            </div>
                        ` : `
                            <div class="flex items-baseline gap-3">
                                <span class="font-bold text-3xl text-primary">${prod.price.toLocaleString()}원</span>
                            </div>
                        `}
                        <div class="text-label-sm text-text-secondary mt-2 flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">local_mall</span>
                            최저가 판매처: <strong style="color: ${siteBtnColor}">${siteLabel}</strong>
                        </div>
                    </div>
                </div>

                <div class="space-y-4">
                    <button class="w-full text-white py-4 px-6 rounded-xl font-headline-md text-body-lg shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2" id="detail-buy-btn" style="background-color: ${siteBtnColor}">
                        <span class="material-symbols-outlined text-lg">open_in_new</span>
                        <span>${siteLabel}에서 상품 정보 보기</span>
                    </button>
                </div>
            </section>
        </div>
    `;

    const detailModal = document.getElementById('detail-modal');
    detailModal.classList.remove('opacity-0', 'pointer-events-none');
    
    if (pushHistory) {
        history.pushState({ view: 'detail', productId: prod.id }, '');
    }

    document.getElementById('detail-buy-btn').addEventListener('click', () => {
        detailModal.classList.add('opacity-0', 'pointer-events-none');
        triggerRedirect(prod);
    });
}

// ==========================================
// Redirect Overlay Trigger
// ==========================================
function triggerRedirect(prod) {
    const redirectOverlay = document.getElementById('redirect-overlay');
    const redirectTitle = document.getElementById('redirect-title');
    const redirectBrandIcon = document.getElementById('redirect-brand-icon');
    const redirectProgressBar = document.getElementById('redirect-progress-fill');
    
    const siteLabel = getSiteName(prod.site);
    const siteColors = {
        'coupang': '#E52528',
        'naver': '#03C75A',
        '11st': '#FF323C',
        'gmarket': '#1E90FF',
        'musinsa': '#000000',
        'cjmall': '#53437b'
    };
    const siteColor = siteColors[prod.site] || '#53437b';
    const charIcon = prod.site === '11st' ? '11' : prod.site === 'gmarket' ? 'G' : prod.site === 'musinsa' ? 'M' : prod.site === 'coupang' ? 'C' : prod.site === 'cjmall' ? 'CJ' : 'N';

    redirectTitle.textContent = `${siteLabel}으로 이동 중입니다...`;
    redirectBrandIcon.textContent = charIcon;
    redirectBrandIcon.style.backgroundColor = siteColor;
    redirectProgressBar.style.width = '0%';
    
    redirectOverlay.classList.remove('opacity-0', 'pointer-events-none');

    let progress = 0;
    const interval = setInterval(() => {
        progress += 4;
        redirectProgressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                redirectOverlay.classList.add('opacity-0', 'pointer-events-none');
                window.open(prod.link, '_blank');
            }, 300);
        }
    }, 50);

    document.getElementById('redirect-continue-btn').onclick = () => {
        clearInterval(interval);
        redirectOverlay.classList.add('opacity-0', 'pointer-events-none');
        window.open(prod.link, '_blank');
    };
    
    document.getElementById('redirect-cancel-btn').onclick = () => {
        clearInterval(interval);
        redirectOverlay.classList.add('opacity-0', 'pointer-events-none');
    };
}

// ==========================================
// Admin Authentication & Supabase Sync
// ==========================================
async function attemptAdminLogin(username, password) {
    if (useSupabase && supabaseClientInstance) {
        try {
            console.log("Checking admin role in Supabase tr_users table...");
            // Query Supabase for patter matching username, password and role 관리자
            const { data, error } = await supabaseClientInstance
                .from('tr_users')
                .select('*')
                .eq('id', username)
                .eq('password', password)
                .eq('role', '관리자')
                .single();

            if (error) {
                // If query fails (auth failed), throw custom error to enter catch block
                throw new Error("비밀번호 또는 사용자 계정이 일치하지 않습니다.");
            }

            if (data) {
                isAdmin = true;
                showToast("로그인 성공! 관리자 콘솔이 실행됩니다.");
                openSyncConsole();
            } else {
                showToast(`로그인 실패: 아이디 또는 패스워드가 틀렸습니다. 입력한 패스워드: [${password}]. 로컬 패스워드('patter123!')를 입력해야 합니다.`);
            }
        } catch (e) {
            console.error("Supabase Admin Check Failed:", e);
            // Fallback for user ease: if offline local password is correct, let them login
            if (username === 'patter' && password === 'patter123!') {
                isAdmin = true;
                showToast("로컬 우회 모드로 관리자 로그인 성공!");
                openSyncConsole();
            } else {
                showToast(`로그인 실패: 비밀번호가 일치하지 않습니다. 입력한 패스워드: [${password}]. 로컬 패스워드('patter123!')를 입력해야 합니다.`);
            }
        }
    } else {
        // Fallback Offline admin bypass
        if (username === 'patter' && password === 'patter123!') {
            isAdmin = true;
            showToast("오프라인 모드로 로그인 성공! (Supabase 미연동)");
            openSyncConsole();
        } else {
            showToast(`로그인 실패: 비밀번호가 일치하지 않습니다. 입력한 패스워드: [${password}]. 로컬 패스워드('patter123!')를 입력해야 합니다.`);
        }
    }
}

function openSyncConsole() {
    // Close login modal
    document.getElementById('admin-login-modal').classList.add('opacity-0', 'pointer-events-none');
    
    // Open Sync modal
    const syncModal = document.getElementById('admin-sync-modal');
    syncModal.classList.remove('opacity-0', 'pointer-events-none');
    
    const dbCount = document.getElementById('db-products-count');
    if (dbCount) dbCount.textContent = `${productsDB.length}개`;
}

async function triggerSupabaseSync() {
    if (!useSupabase || !supabaseClientInstance) {
        showToast("Supabase 설정이 기입되어 있지 않아 실제 DB에 저장할 수 없습니다. sync_malls.py 스크립트 실행을 참조하세요.");
        return;
    }

    const startBtn = document.getElementById('sync-start-btn');
    startBtn.disabled = true;
    startBtn.textContent = "동기화 진행 중...";

    try {
        console.log("Starting DB Syncing from client side...");
        const itemsToUpload = LOCAL_FALLBACK_PRODUCTS.map(p => ({
            name: p.name,
            brand: p.brand,
            price: p.price,
            original_price: p.originalPrice,
            discount_rate: p.discountRate,
            site: p.site,
            rating: p.rating,
            reviews: p.reviews,
            sales_count: p.salesCount,
            category: p.category,
            rank: p.rank,
            is_curated: p.isCurated,
            tag: p.tag,
            image: p.image,
            link: p.link
        }));

        // Clear products
        const { error: delError } = await supabaseClientInstance.from('products').delete().neq('name', '');
        if (delError) console.warn("Deletion may require RLS privileges:", delError);

        // Insert products in chunks (Supabase limits size, 50 at a time)
        const chunkSize = 50;
        for (let i = 0; i < itemsToUpload.length; i += chunkSize) {
            const chunk = itemsToUpload.slice(i, i + chunkSize);
            const { error: insError } = await supabaseClientInstance.from('products').insert(chunk);
            if (insError) throw insError;
        }

        showToast("동기화 완료! Supabase DB 상품 리스트가 갱신되었습니다.");
        
        // Reload products
        await loadProducts();
        renderHomeView();
        
    } catch (e) {
        console.error("Client Sync Error:", e);
        showToast(`CORS/RLS 정책으로 인해 웹 브라우저 동기화 실패: ${e.message || "서비스 롤 권한 필요"}`);
    } finally {
        startBtn.disabled = false;
        startBtn.textContent = "동기화 시작 (Supabase에 갱신)";
    }
}

// ==========================================
// Event Listeners Configuration
// ==========================================
function setupEventListeners() {
    // Navigation logo/home button triggers
    document.querySelectorAll('.header-logo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('home');
        });
    });

    document.querySelectorAll('.mobile-nav-home').forEach(btn => {
        btn.addEventListener('click', () => {
            switchView('home');
        });
    });

    document.querySelectorAll('.mobile-nav-search').forEach(btn => {
        btn.addEventListener('click', () => {
            switchView('home');
            document.getElementById('mobile-search-input').focus();
            document.querySelectorAll('.mobile-nav-home').forEach(b => b.classList.remove('text-primary', 'font-bold'));
            btn.classList.add('text-primary', 'font-bold');
        });
    });

    // Category Buttons Click
    document.querySelectorAll('.bento-category-btn, .mobile-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.getAttribute('data-category');
            switchView('list');
            
            // Sync filters ui
            currentSite = 'all';
            syncFiltersUI();
            renderListView();
        });
    });

    // Search inputs
    const handleSearchInput = (e) => {
        searchQuery = e.target.value;
        if (searchQuery.trim()) {
            currentCategory = 'all';
            switchView('list');
            renderListView();
        } else {
            switchView('home');
        }
    };
    document.getElementById('desktop-search-input').addEventListener('input', handleSearchInput);
    document.getElementById('mobile-search-input').addEventListener('input', handleSearchInput);

    // Platform Mall filters (Desktop & Mobile)
    const setupMallFilters = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                currentSite = btn.getAttribute('data-site');
                syncFiltersUI();
                renderListView();
            });
        });
    };
    setupMallFilters('desktop-mall-filters');
    setupMallFilters('mobile-mall-filters');

    // Sorting options (Desktop & Mobile)
    const setupSortOptions = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                currentSort = btn.getAttribute('data-sort');
                syncFiltersUI();
                renderListView();
            });
        });
    };
    setupSortOptions('desktop-sort-options');
    setupSortOptions('mobile-sort-options');

    // Global Product Cards Click Delegations
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card-click');
        if (card) {
            const id = parseInt(card.getAttribute('data-id'));
            const prod = productsDB.find(p => p.id === id);
            if (prod) {
                openDetailModal(prod);
            }
        }
        
        // Buy now button clicks inside listings
        const buyBtn = e.target.closest('.btn-buy-now');
        if (buyBtn) {
            e.stopPropagation();
            const id = parseInt(buyBtn.getAttribute('data-id'));
            const prod = productsDB.find(p => p.id === id);
            if (prod) {
                triggerRedirect(prod);
            }
        }
    });

    // Close detail modal events
    const detailModal = document.getElementById('detail-modal');
    document.getElementById('detail-modal-close-btn').onclick = () => {
        detailModal.classList.add('opacity-0', 'pointer-events-none');
        switchView(currentView, false); // PopState triggers close
    };
    document.getElementById('detail-modal-back-btn').onclick = () => {
        detailModal.classList.add('opacity-0', 'pointer-events-none');
        window.history.back();
    };
    detailModal.onclick = (e) => {
        if (e.target === detailModal) {
            detailModal.classList.add('opacity-0', 'pointer-events-none');
            window.history.back();
        }
    };

    // Hero Shop Now
    document.querySelectorAll('.hero-shop-now-btn').forEach(btn => {
        btn.onclick = () => {
            currentCategory = 'electronics';
            switchView('list');
            renderListView();
        };
    });

    // Trending chips
    document.addEventListener('click', (e) => {
        const chip = e.target.closest('.trending-chip');
        if (chip) {
            const query = chip.textContent.replace('#', '').trim();
            searchQuery = query;
            document.getElementById('desktop-search-input').value = query;
            document.getElementById('mobile-search-input').value = query;
            currentCategory = 'all';
            switchView('list');
            renderListView();
        }
    });

    // ==========================================
    // Admin Console Handlers
    // ==========================================
    const loginModal = document.getElementById('admin-login-modal');
    const syncModal = document.getElementById('admin-sync-modal');

    // Click Sync Buttons
    const triggerSyncBtnClick = () => {
        if (isAdmin) {
            openSyncConsole();
        } else {
            loginModal.classList.remove('opacity-0', 'pointer-events-none');
        }
    };
    document.getElementById('desktop-sync-btn').onclick = triggerSyncBtnClick;
    document.getElementById('mobile-sync-btn').onclick = triggerSyncBtnClick;

    // Login close
    document.getElementById('admin-login-close-btn').onclick = () => {
        loginModal.classList.add('opacity-0', 'pointer-events-none');
    };

    // Login submit
    document.getElementById('admin-login-submit-btn').onclick = () => {
        const user = document.getElementById('admin-username').value;
        const pass = document.getElementById('admin-password').value;
        attemptAdminLogin(user, pass);
    };

    // Sync close
    document.getElementById('admin-sync-close-btn').onclick = () => {
        syncModal.classList.add('opacity-0', 'pointer-events-none');
    };
    document.getElementById('admin-sync-close-action-btn').onclick = () => {
        syncModal.classList.add('opacity-0', 'pointer-events-none');
    };

    // Logout
    document.getElementById('admin-logout-btn').onclick = () => {
        isAdmin = false;
        showToast("로그아웃되었습니다.");
        syncModal.classList.add('opacity-0', 'pointer-events-none');
    };

    // Sync Start Trigger
    document.getElementById('sync-start-btn').onclick = () => {
        triggerSupabaseSync();
    };
}

// Helper: Show floating toast notice
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'bg-primary text-white px-6 py-3 rounded-full font-label-lg shadow-xl translate-y-10 opacity-0 transition-all duration-500 flex items-center gap-2 pointer-events-auto mt-2';
    toast.innerHTML = `<span class="material-symbols-outlined">info</span> ${message}`;
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Run init
window.addEventListener('DOMContentLoaded', init);
