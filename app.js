// --- Product Categories ---
const CATEGORIES = [
    { id: 'fashion', name: '패션', icon: 'apparel' },
    { id: 'digital', name: '가전', icon: 'devices' },
    { id: 'food', name: '식품', icon: 'restaurant' },
    { id: 'beauty', name: '뷰티', icon: 'content_cut' },
    { id: 'home', name: '홈데코', icon: 'chair' },
    { id: 'sports', name: '스포츠', icon: 'directions_run' }
];

const TRENDING_KEYWORDS = [
    '#미니멀리즘',
    '#홈카페인테리어',
    '#가을신상',
    '#프리미엄가전',
    '#친환경소재',
    '#Y2K패션'
];

// --- Product Database ---
const PRODUCTS = [
    {
        id: 1,
        name: 'Aether Pro Wireless Noise Cancelling Headphones',
        brand: 'Tech Core',
        price: 349000,
        originalPrice: 410000,
        discountRate: 15,
        site: 'coupang',
        rating: 4.9,
        reviews: 1240,
        salesCount: 8940,
        category: 'digital',
        rank: 1,
        isCurated: true,
        tag: '베스트셀러',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyClXPV3HhZIcAnrVNtY_SvyLX9fvaZEbVSuwRqCEAxUCbWPN3gQrvgsjyG4ucr--AC9KNs_5c4oQWKaEiJxUCeAv2UxZFLXdxMa0RlPz21li_YELKFZcEDU7m1xfrn9etOcHXimNL0kQnEVckMvRFlsj1Va7GpPdQOuGrOzroOFJwdUreZ8zm2Sj-keHy6ou9reNDMm76_RcVA4puS2rGivX4cS_xN3RZ2WQ_oTKPv6gzNkqdgPoJ',
        link: 'https://coupang.com'
    },
    {
        id: 2,
        name: 'Lumina Tab X12 Ultra OLED',
        brand: 'Naver Shop',
        price: 1120000,
        originalPrice: 1120000,
        discountRate: 0,
        site: 'naver',
        rating: 4.8,
        reviews: 850,
        salesCount: 3120,
        category: 'digital',
        rank: 2,
        isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3mrcRKxNc2IIgZ2QdFZBXxmTcfYh8xctf_H1QIimzkaIJNTNBDpIMRyEnBHj41PK_RLydkQ-m-kMF8oYgxLRIp40ikgggVB1ZenGLDhCjzL_0CvrJqf-VL2VuJBVCatrEoWJoxCleG72DpGyas4w84BUFP-637zbgs3LRgVu4KO2iPah3P25RnDmUUGfDFqIP7KI-UjhN0yAa_a6IcwGNIgCwHzFR0VB3i1D3CpzVVQvZesGwkPEb',
        link: 'https://shopping.naver.com'
    },
    {
        id: 3,
        name: 'KeyFlow TKL Mechanical - Amethyst Edition',
        brand: 'CJ OnStyle',
        price: 189000,
        originalPrice: 189000,
        discountRate: 0,
        site: 'cjmall',
        rating: 4.7,
        reviews: 420,
        salesCount: 2150,
        category: 'digital',
        rank: 3,
        isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsP4qLDefzedDC_shc7NEjXqtB3VvlSLe788o2uxexku_mkFA4_ZKSYTPWpLB-2_zJCIS8FPoVzmJGmX09MqdVPgZfbJXqPr091aloPZa0NgryUtWCXAEPtC02zu6J68vZQH6aaVNbkIU-ESOlp7kJhLCmiyIHiuk6s8oigpuYGf8UR7llULh6lJ0cyaC2xhBZFa1HuCSrKKolJXewcGeeKf83buNhEu4E3VVyYjSSiw0YXSXPcpBg',
        link: 'https://cjmall.co.kr'
    },
    {
        id: 4,
        name: 'NeoCapture ZV Mirrorless Vlogging Kit',
        brand: 'Coupang',
        price: 980000,
        originalPrice: 980000,
        discountRate: 0,
        site: 'coupang',
        rating: 4.6,
        reviews: 310,
        salesCount: 1450,
        category: 'digital',
        rank: 4,
        isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz-aAPctq9yfObf9x67cd4-DlpuiqgxvhC2Wk8OgOAV_RS0F2anoQu6Q250fw1fb_6XecXJmSHbFS3lvdRD38n6ZZttGjhxgEe2TnC0Dnj8fBUN7l2oqibj56dSK5sIl2aaJMwv7uJ6qboqYu6AXK3yn8g3QbSUHOZIf6mcGwXdqnI5HvZG1OddNBp2DFRqUsJWjPs-Zr3ybPDDifogWM6cVJDflTv9eB8TgyZmSbXbKTj4CqDB01h',
        link: 'https://coupang.com'
    },
    {
        id: 5,
        name: '미니멀리스트 퍼플 글라스 테이블 램프',
        brand: 'Antigravity Home',
        price: 89000,
        originalPrice: 120000,
        discountRate: 25,
        site: 'coupang',
        rating: 4.8,
        reviews: 124,
        salesCount: 1890,
        category: 'home',
        rank: 1,
        isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDsqCBJjcAx_Cs5bZNvnUhrr7k8Y2AHUVMbeIPE_Evlb7Bv4WKfFchldby78qq7INv7LId6utydpC8F1xxOHdx_aFfz3Zos1kRn1LZWLafxnmqDRDzY1rmygVLRvq5vPIIWEGrRv8tUKJj6wxYWbOktv4Oz2ty3etOZQQRLjlROhrgifHKH_sdNGl8xbQEBrTuCL5rG73PD4-DZrqdm9Pzq23t-lBomS1XrIkSaBnA3tHxFc0B3swq',
        link: 'https://coupang.com'
    },
    {
        id: 6,
        name: '클래식 레더 토트백 (딥 퍼플 에디션)',
        brand: 'Maison Seoul',
        price: 245000,
        originalPrice: 245000,
        discountRate: 0,
        site: 'naver',
        rating: 4.9,
        reviews: 82,
        salesCount: 950,
        category: 'fashion',
        rank: 1,
        isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNjYdz8gcZxFx9M11ol2Eu8g4v57QoJ9OkuOOPfyJlw2WarohBPyhU0aaQwR75U5L52kK0Ikdw5HsFIEcFFQYCgII2LM-elSb94BiHw_UbPcMBjRsc4AH4vUZrxCkTkqA7JAQXJaeQuLCeX89XMAqU6fLTGJJ4KtAAvNnDGFvlZQeXvK_Qy4oyVOdgytmjfDE9ILJ-rvUAG_hYixL2qlLGA60tooQlv3DkFla4Y8Osqv8oF-P3mGRO',
        link: 'https://shopping.naver.com'
    },
    {
        id: 7,
        name: '노이즈 캔슬링 무선 헤드폰 PRO 2',
        brand: 'Tech Core',
        price: 319000,
        originalPrice: 350000,
        discountRate: 9,
        site: 'cjmall',
        rating: 5.0,
        reviews: 256,
        salesCount: 3840,
        category: 'digital',
        rank: 5,
        isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZDRi0XyFYNXzvYCieNWA1VRpyYDjVU1QXLNaZFN-0hl2AOIaQwQWPd6hrG1Q1nZFvU425AkowrmsAMqca6d_yT1rMqdOdrieysNqWgPg7bqj1jOjbZX0MNfKgYLu6Cgp4cSVTGDXiI3mrdA7NiMLngoM02R3--VI8xWPzMqTJsecjhPDWF4r6xPw0ql-No7F0p67PmevpmETnCUrJpCBBHGEB32aaJjCCTPsPDT7Ml0Do53GMu4k7',
        link: 'https://cjmall.co.kr'
    },
    {
        id: 8,
        name: '오가닉 라벤더 세럼 & 크림 기프트 세트',
        brand: 'Aura Beauty',
        price: 64000,
        originalPrice: 64000,
        discountRate: 0,
        site: 'naver',
        rating: 4.7,
        reviews: 45,
        salesCount: 1200,
        category: 'beauty',
        rank: 1,
        isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3yYKp5YutcDtbMASJt3ackqK9nECVuwFjtyRSi5I-u5flYkwxjsM2yPV2v6Cb-hafF_xUGuy2WPS-toR5KnBrz3ES0xOf4pWukVTcmDh3DK6UU1BNXMsQRXTBmVZADX20AV60ovNhJ4skUod5vsJSJgwh6qUjp8RAida08Iwa1vtWr8I86-Qsdx3SImqiugUEq0aagHjvyA-zusIErZQhkElEX34436khr66vtVxnJ2uMo7W8Z3Bt',
        link: 'https://shopping.naver.com'
    },
    {
        id: 9,
        name: '제니스 인체공학 오피스 체어 시리즈',
        brand: '홈 오피스',
        price: 299000,
        originalPrice: 399000,
        discountRate: 25,
        site: 'coupang',
        rating: 4.9,
        reviews: 380,
        salesCount: 4500,
        category: 'home',
        rank: 2,
        isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxsqxq38aRVGibSwxhW9cEGeSRxLLLRuyUFQmVYHf4te99eqMiI3zFQV8M4Nv_CgmeXXfVKUlizFtq4ZAlHf6Eu_1ADlWKUT4Nvk1GJE-wcze0lgvU6usEfYCIKmTR3zO3EfzV79Rts62RdwMUOeiq6sFYeLLZuB8cr9UUcisJuZAxux4MYZJ92WRb0V_cU7OV_wvC_AlLCjvEW7q6YJ8eC0eaPxltiB6WeD0XHOUJ1Xcts4-R49KY',
        link: 'https://coupang.com'
    },
    {
        id: 10,
        name: '글로우 에센스 리커버리 세럼 50ml',
        brand: 'Aura Beauty',
        price: 45000,
        originalPrice: 59000,
        discountRate: 24,
        site: 'naver',
        rating: 4.8,
        reviews: 1120,
        salesCount: 8400,
        category: 'beauty',
        rank: 2,
        isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9af5zRNIxnhIgxaxOL6CUqQfQcEXDtlMAXGSYLEi3K5RYyydmfokzf1vWbK9W2Oeth9gTdWR_ml2f6Op_s3Dxt_7BKNckYD6hjMuNLOZaY20Lt4MpS4iH_lqMw3d6k-JJl2GlPdz4O-vYdLe060Nw1FEWx9ogLODN2QnAH-DePlVDhc-Q9RKOX4KnfshzCQNxE1XSxmMGUpn6Kh8TR8hVRUogjTRI_pVL9uFrTRQvTG4WyufB-9vG',
        link: 'https://shopping.naver.com'
    },
    {
        id: 11,
        name: '퓨어사운드 무선 헤드폰 클래식 에디션',
        brand: 'Tech Core',
        price: 189000,
        originalPrice: 220000,
        discountRate: 14,
        site: 'naver',
        rating: 4.8,
        reviews: 950,
        salesCount: 3950,
        category: 'digital',
        rank: 6,
        isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuSelfYUXgSXHbRJcnuRgBKQermfXJg2Z5b-Itct1M373OoxBjhVTD0skBhV0fKeA4MD3c0lhwCssRJmycooWFhMf8qgbzAxXWo8nEPA-asUh2qqH6H42mnEwVzHKuk6vmrylZkGgQeQCNLP91oFQ9aWTMcByRs4ak5nCkJrIEGRxXcKXJzhV_S5jnAoPo8yu7Cg4_JmpqLoLP_K3bRphgnxYoP8_ox5jq6qzS-5nKQ5jvjdgzdINz',
        link: 'https://shopping.naver.com'
    },
    {
        id: 12,
        name: '노바 크로노 클래식 메탈 워치',
        brand: 'Maison Seoul',
        price: 220000,
        originalPrice: 220000,
        discountRate: 0,
        site: 'cjmall',
        rating: 4.7,
        reviews: 310,
        salesCount: 1210,
        category: 'fashion',
        rank: 2,
        isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAemnj4nziNXQNGY9ADP5gSbYpffsq--lIzkYWYrj4PrZu-1x4-dBfSnx59fb0W-CJp5qlxjlqtWOnnBmZQ3FNqJoK52aWoV3BYV1Z8RnUXNn5-43aYny3AFwF0TKPrnI1uBBddFnH5QNstY8MWSsHElJkn7Sr6NRDoLVgpodjqnFoSBPvRHFJhUAn0wmNFq1XkFPlRPFpMrnGIBlBT7_TVpMJ6M58KBtR5EWwz-bucbvXKHURcCtk4',
        link: 'https://cjmall.co.kr'
    },
    {
        id: 13,
        name: '유기농 세라믹 머그 4인조 홈세트',
        brand: 'Antigravity Home',
        price: 32000,
        originalPrice: 48000,
        discountRate: 33,
        site: 'cjmall',
        rating: 4.9,
        reviews: 580,
        salesCount: 2950,
        category: 'home',
        rank: 3,
        isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL',
        link: 'https://cjmall.co.kr'
    },
    {
        id: 14,
        name: '어드밴스드 세라마이드 리커버리 세럼 (50ml)',
        brand: 'LUMINA ESSENTIALS',
        price: 48500,
        originalPrice: 62000,
        discountRate: 22,
        site: 'naver',
        rating: 4.8,
        reviews: 1284,
        salesCount: 9480,
        category: 'beauty',
        rank: 3,
        isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbfHitV9msXhDQ5H3nVRZcGhS6asdSC3naLwseVvCJixWCqzrkyaM1FFvYt3d4sop7SiJNT8vLWhSirGYJK7S8HcO0_axBO1j80ekTKHUsukDP2D8T5VMCLcC63x7o8ChtRUy4LKYlImUMIPMTBFxFZuEvzm4RvhWUdSYwFLHnPGge_hVfyEcO8HBT3LLFEhLT1c6J-3z_Fqw3RGUum-pckixCN6ilY-CVJ_lFxDlwm-mOjAbXgZMx',
        link: 'https://shopping.naver.com'
    }
];

// --- State Management ---
let currentCategory = 'all'; // 'all', 'fashion', 'digital', etc.
let currentSite = 'all';     // 'all', 'coupang', 'naver', 'cjmall'
let currentSort = 'rank';    // 'rank', 'sales', 'discount'
let searchQuery = '';
let currentView = 'home';    // 'home' or 'list'

// --- Initialize App ---
function init() {
    renderHomeView();
    setupEventListeners();
}

// --- Render Home View ---
function renderHomeView() {
    // 1. Render Desktop Trending Keywords
    const desktopTrending = document.getElementById('desktop-trending-chips');
    const mobileTrending = document.getElementById('mobile-trending-chips');
    
    const trendingHTML = TRENDING_KEYWORDS.map(kw => `
        <span class="px-4 py-2 bg-white border border-border-light rounded-full text-label-lg text-primary hover:border-primary-container hover:bg-surface-subtle cursor-pointer transition-all trending-chip">${kw}</span>
    `).join('');
    
    if (desktopTrending) desktopTrending.innerHTML = trendingHTML;
    
    // Render Mobile Trending Keywords
    const mobileTrendingHTML = TRENDING_KEYWORDS.map((kw, index) => `
        <div class="trend-chip flex items-center gap-2 bg-white border border-border-light px-4 py-2 rounded-xl whitespace-nowrap shadow-sm trending-chip">
            <span class="text-primary font-bold">${index + 1}</span>
            <span class="font-body-md">${kw.replace('#', '')}</span>
            <span class="material-symbols-outlined text-error text-[16px]">trending_up</span>
        </div>
    `).join('');
    if (mobileTrending) mobileTrending.innerHTML = mobileTrendingHTML;

    // 2. Render Desktop Curated Picks (4 items)
    const desktopCurated = document.getElementById('desktop-curated-picks');
    const curatedItems = PRODUCTS.filter(p => p.isCurated).slice(0, 4);
    
    if (desktopCurated) {
        desktopCurated.innerHTML = curatedItems.map(prod => `
            <div class="group bg-white rounded-2xl border border-border-light hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full product-card-click cursor-pointer" data-id="${prod.id}">
                <div class="relative aspect-[4/5] overflow-hidden">
                    <div class="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style="background-image: url('${prod.image}')"></div>
                    <button class="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-outline hover:text-error transition-colors btn-favorite">
                        <span class="material-symbols-outlined">favorite</span>
                    </button>
                    <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/80 backdrop-blur-md">
                        <button class="w-full bg-primary text-white py-3 rounded-xl font-label-lg flex items-center justify-center gap-2 active:scale-95 transition-all btn-add-cart">
                            <span class="material-symbols-outlined text-lg">shopping_cart</span> 장바구니 담기
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

    // 3. Render Mobile Curated Picks (2 items)
    const mobileCurated = document.getElementById('mobile-curated-picks');
    if (mobileCurated) {
        mobileCurated.innerHTML = curatedItems.slice(0, 4).map(prod => `
            <div class="group bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm flex flex-col h-full product-card-click cursor-pointer" data-id="${prod.id}">
                <div class="h-40 relative overflow-hidden">
                    <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${prod.image}"/>
                    <div class="absolute top-2 right-2 h-8 w-8 bg-white/85 rounded-full flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-sm">favorite</span>
                    </div>
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

// --- Render List View ---
function renderListView() {
    const filtered = PRODUCTS.filter(prod => {
        // Category filter
        if (currentCategory !== 'all' && prod.category !== currentCategory) return false;
        
        // Site filter
        if (currentSite !== 'all' && prod.site !== currentSite) return false;
        
        // Search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
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

    // Desktop List UI
    const desktopTitle = document.getElementById('desktop-list-title');
    const desktopCount = document.getElementById('desktop-list-count');
    const desktopGrid = document.getElementById('desktop-products-grid');

    if (desktopTitle) desktopTitle.textContent = titleText;
    if (desktopCount) desktopCount.textContent = `${filtered.length}개 상품`;

    if (desktopGrid) {
        if (filtered.length === 0) {
            desktopGrid.innerHTML = `
                <div class="py-16 text-center text-text-secondary">
                    <span class="material-symbols-outlined text-5xl">inventory_2</span>
                    <p class="mt-4">일치하는 큐레이션 상품이 없습니다.</p>
                </div>
            `;
        } else {
            desktopGrid.innerHTML = filtered.map((prod, index) => `
                <div class="group relative flex bg-white rounded-2xl overflow-hidden border border-border-light hover:shadow-lg transition-all duration-300 p-6 gap-6 product-card-click cursor-pointer" data-id="${prod.id}">
                    <div class="relative w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl">
                        <img class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" src="${prod.image}"/>
                        <div class="absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center font-bold text-lg rounded-br-lg shadow-md">${index + 1}</div>
                    </div>
                    <div class="flex flex-col justify-between flex-grow">
                        <div>
                            <div class="flex items-center gap-2 mb-2">
                                <span class="px-2 py-0.5 bg-secondary-container text-primary text-[10px] font-bold rounded-full uppercase">${prod.site.toUpperCase()}</span>
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
                                <span class="material-symbols-outlined text-[18px]">shopping_cart</span>
                                <span class="font-label-lg">구매하기</span>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Mobile List UI
    const mobileTitle = document.getElementById('mobile-list-title');
    const mobileCount = document.getElementById('mobile-list-count');
    const mobileGrid = document.getElementById('mobile-products-grid');

    if (mobileTitle) mobileTitle.textContent = titleText;
    if (mobileCount) mobileCount.textContent = `${filtered.length}개`;

    if (mobileGrid) {
        if (filtered.length === 0) {
            mobileGrid.innerHTML = `
                <div class="py-16 text-center text-text-secondary">
                    <span class="material-symbols-outlined text-4xl">inventory_2</span>
                    <p class="mt-4">일치하는 큐레이션 상품이 없습니다.</p>
                </div>
            `;
        } else {
            mobileGrid.innerHTML = filtered.map((prod, index) => `
                <div class="group relative flex bg-white rounded-xl overflow-hidden border border-border-light p-3 gap-3 product-card-click cursor-pointer" data-id="${prod.id}">
                    <div class="relative w-28 h-28 flex-shrink-0">
                        <img class="w-full h-full object-cover rounded-lg" src="${prod.image}"/>
                        <div class="absolute top-0 left-0 bg-primary text-white w-6 h-6 flex items-center justify-center font-bold text-sm rounded-br-lg shadow-sm">${index + 1}</div>
                    </div>
                    <div class="flex flex-col justify-between flex-grow">
                        <div>
                            <div class="flex items-center gap-1.5 mb-1">
                                <span class="px-1.5 py-0.5 bg-secondary-container text-primary text-[8px] font-bold rounded-full uppercase">${prod.site.toUpperCase()}</span>
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
                                <span class="material-symbols-outlined text-[16px]">shopping_cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// --- Route Switch ---
function switchView(viewName) {
    currentView = viewName;
    if (viewName === 'home') {
        document.getElementById('desktop-home-view').classList.remove('hidden');
        document.getElementById('desktop-list-view').classList.add('hidden');
        document.getElementById('mobile-home-view').classList.remove('hidden');
        document.getElementById('mobile-list-view').classList.add('hidden');
        
        // Active Navigation items
        document.querySelectorAll('.header-logo-btn').forEach(btn => btn.classList.add('text-primary'));
        document.querySelectorAll('.mobile-nav-home').forEach(btn => btn.classList.add('text-primary', 'font-bold'));
        document.querySelectorAll('.mobile-nav-search').forEach(btn => btn.classList.remove('text-primary', 'font-bold'));
    } else {
        document.getElementById('desktop-home-view').classList.add('hidden');
        document.getElementById('desktop-list-view').classList.remove('hidden');
        document.getElementById('mobile-home-view').classList.add('hidden');
        document.getElementById('mobile-list-view').classList.remove('hidden');
        
        // Active Navigation items
        document.querySelectorAll('.header-logo-btn').forEach(btn => btn.classList.remove('text-primary'));
    }
}

// --- Detail Modal Open ---
function openDetailModal(prod) {
    const detailBody = document.getElementById('detail-modal-body');
    const siteLabel = prod.site === 'coupang' ? '쿠팡' : prod.site === 'naver' ? '네이버 쇼핑' : 'CJ 몰';
    const siteBtnColor = prod.site === 'coupang' ? '#E52528' : prod.site === 'naver' ? '#03C75A' : '#FF5F00';
    
    detailBody.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-stack-lg lg:gap-16">
            <!-- Product Gallery Section -->
            <section class="relative md:rounded-xl overflow-hidden pt-12 md:pt-0">
                <div class="aspect-[4/5] relative bg-surface-container overflow-hidden rounded-2xl border border-border-light">
                    <img class="w-full h-full object-cover" src="${prod.image}" alt="${prod.name}"/>
                </div>
            </section>
            
            <!-- Product Info Section -->
            <section class="flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-label-sm font-label-sm text-outline uppercase tracking-widest">${prod.brand}</span>
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
                        <span class="px-3 py-1 bg-secondary-container text-primary text-label-sm rounded-full">구매 선호도 94% 긍정</span>
                    </div>

                    <!-- Pricing Info -->
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

                <!-- Purchase Trigger Button -->
                <div class="space-y-4">
                    <button class="w-full bg-primary hover:bg-primary-container text-white py-4 px-6 rounded-xl font-headline-md text-body-lg shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2" id="detail-buy-btn">
                        <span class="material-symbols-outlined text-lg">shopping_cart</span>
                        <span>${siteLabel}에서 구매하러 가기</span>
                    </button>
                </div>
            </section>
        </div>
    `;

    const detailModal = document.getElementById('detail-modal');
    detailModal.classList.remove('opacity-0', 'pointer-events-none');
    
    // Add buy click listener
    document.getElementById('detail-buy-btn').addEventListener('click', () => {
        detailModal.classList.add('opacity-0', 'pointer-events-none');
        triggerRedirect(prod);
    });
}

// --- Trigger Redirecting Transition Overlay ---
function triggerRedirect(prod) {
    const redirectOverlay = document.getElementById('redirect-overlay');
    const redirectTitle = document.getElementById('redirect-title');
    const redirectBrandIcon = document.getElementById('redirect-brand-icon');
    const redirectProgressBar = document.getElementById('redirect-progress-fill');
    
    const siteLabel = prod.site === 'coupang' ? '쿠팡' : prod.site === 'naver' ? '네이버 쇼핑' : 'CJ OnStyle';
    const siteColor = prod.site === 'coupang' ? '#E52528' : prod.site === 'naver' ? '#03C75A' : '#FF5F00';
    const charIcon = prod.site === 'coupang' ? 'C' : prod.site === 'naver' ? 'N' : 'CJ';

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
    }, 50); // Takes ~1.2s

    // Set up continue & cancel handlers
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

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Navigation logo/home button triggers
    document.querySelectorAll('.header-logo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('home');
        });
    });

    // Mobile nav home
    document.querySelectorAll('.mobile-nav-home').forEach(btn => {
        btn.addEventListener('click', () => {
            switchView('home');
        });
    });

    // Mobile nav search focus
    document.querySelectorAll('.mobile-nav-search').forEach(btn => {
        btn.addEventListener('click', () => {
            switchView('home');
            document.getElementById('mobile-search-input').focus();
            document.querySelectorAll('.mobile-nav-home').forEach(b => b.classList.remove('text-primary', 'font-bold'));
            btn.classList.add('text-primary', 'font-bold');
        });
    });

    // Category Buttons Click (Bento on desktop / icons on mobile)
    document.querySelectorAll('.bento-category-btn, .mobile-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.getAttribute('data-category');
            switchView('list');
            
            // Sync filter buttons
            document.querySelectorAll('#desktop-mall-filters button, #mobile-mall-filters button').forEach(b => {
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('bg-white', 'border-border-light', 'text-on-surface');
            });
            document.querySelectorAll('#desktop-mall-filters button[data-site="all"], #mobile-mall-filters button[data-site="all"]').forEach(b => {
                b.classList.remove('bg-white', 'border-border-light', 'text-on-surface');
                b.classList.add('bg-primary', 'text-white');
            });
            
            currentSite = 'all';
            renderListView();
        });
    });

    // Search input (Desktop)
    document.getElementById('desktop-search-input').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchQuery.trim()) {
            currentCategory = 'all';
            switchView('list');
            renderListView();
        } else {
            switchView('home');
        }
    });

    // Search input (Mobile)
    document.getElementById('mobile-search-input').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchQuery.trim()) {
            currentCategory = 'all';
            switchView('list');
            renderListView();
        } else {
            switchView('home');
        }
    });

    // Platform Mall filters (Desktop & Mobile)
    const setupMallFilters = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('button').forEach(b => {
                    b.classList.remove('bg-primary', 'text-white');
                    b.classList.add('bg-white', 'border-border-light', 'text-on-surface');
                });
                btn.classList.remove('bg-white', 'border-border-light', 'text-on-surface');
                btn.classList.add('bg-primary', 'text-white');
                currentSite = btn.getAttribute('data-site');
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
                container.querySelectorAll('button').forEach(b => {
                    b.classList.remove('text-primary', 'border-b-2', 'border-primary', 'font-bold');
                    b.classList.add('text-text-secondary');
                });
                btn.classList.remove('text-text-secondary');
                btn.classList.add('text-primary', 'border-b-2', 'border-primary', 'font-bold');
                currentSort = btn.getAttribute('data-sort');
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
            const prod = PRODUCTS.find(p => p.id === id);
            if (prod) {
                // If they clicked add to cart or favorite button specifically, don't open details modal
                if (e.target.closest('.btn-favorite') || e.target.closest('.btn-add-cart')) return;
                openDetailModal(prod);
            }
        }
        
        // Buy now button clicks inside listings
        const buyBtn = e.target.closest('.btn-buy-now');
        if (buyBtn) {
            e.stopPropagation();
            const id = parseInt(buyBtn.getAttribute('data-id'));
            const prod = PRODUCTS.find(p => p.id === id);
            if (prod) {
                triggerRedirect(prod);
            }
        }
    });

    // Close detail modal events
    const detailModal = document.getElementById('detail-modal');
    document.getElementById('detail-modal-close-btn').onclick = () => {
        detailModal.classList.add('opacity-0', 'pointer-events-none');
    };
    document.getElementById('detail-modal-back-btn').onclick = () => {
        detailModal.classList.add('opacity-0', 'pointer-events-none');
    };
    detailModal.onclick = (e) => {
        if (e.target === detailModal) {
            detailModal.classList.add('opacity-0', 'pointer-events-none');
        }
    };

    // Hero Shop Now
    document.querySelectorAll('.hero-shop-now-btn').forEach(btn => {
        btn.onclick = () => {
            currentCategory = 'digital';
            switchView('list');
            renderListView();
        };
    });

    // Toast triggers on cart additions
    document.addEventListener('click', (e) => {
        const cartBtn = e.target.closest('.btn-add-cart');
        if (cartBtn) {
            e.stopPropagation();
            const toast = document.createElement('div');
            toast.className = 'bg-primary text-white px-6 py-3 rounded-full font-label-lg shadow-xl translate-y-10 opacity-0 transition-all duration-500 flex items-center gap-2 pointer-events-auto mt-2';
            toast.innerHTML = '<span class="material-symbols-outlined">check_circle</span> 장바구니에 상품을 담았습니다.';
            document.getElementById('toast-container').appendChild(toast);
            
            setTimeout(() => {
                toast.classList.remove('translate-y-10', 'opacity-0');
            }, 100);
            
            setTimeout(() => {
                toast.classList.add('translate-y-10', 'opacity-0');
                setTimeout(() => toast.remove(), 500);
            }, 2500);
        }
    });
}

// Run init
window.addEventListener('DOMContentLoaded', init);
