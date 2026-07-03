// --- Mock Database ---
const CATEGORIES = [
    { id: 'all', name: '전체 상품', icon: '✨' },
    { id: 'fashion', name: '패션의류/잡화', icon: '👕' },
    { id: 'beauty', name: '뷰티/화장품', icon: '✨' },
    { id: 'baby', name: '출산/유아동', icon: '🍼' },
    { id: 'food', name: '신선/가공식품', icon: '🍎' },
    { id: 'kitchen', name: '주방용품', icon: '🍳' },
    { id: 'living', name: '생활용품', icon: '🧼' },
    { id: 'digital', name: '가전디지털', icon: '💻' },
    { id: 'sports', name: '스포츠/레저', icon: '🚴' }
];

const PRODUCTS = [
    // Fashion
    { id: 1, name: '오버핏 쿨에어 반팔 티셔츠 3팩', brand: '에센셜프로', price: 29800, originalPrice: 49000, discountRate: 39, site: 'coupang', rating: 4.8, reviews: 2453, salesCount: 8420, category: 'fashion', rank: 1, link: 'https://coupang.com' },
    { id: 2, name: '초경량 스트레치 컴포트 카고 슬랙스', brand: '아웃핏랩', price: 34900, originalPrice: 59000, discountRate: 40, site: 'naver', rating: 4.6, reviews: 1120, salesCount: 5120, category: 'fashion', rank: 2, link: 'https://shopping.naver.com' },
    { id: 3, name: '이탈리안 레더 클래식 스니커즈', brand: '벨루티노', price: 89000, originalPrice: 159000, discountRate: 44, site: 'cjmall', rating: 4.7, reviews: 489, salesCount: 2310, category: 'fashion', rank: 3, link: 'https://cjmall.co.kr' },
    { id: 4, name: '데일리 리넨 와이드 밴딩 팬츠', brand: '에센셜프로', price: 19800, originalPrice: 29000, discountRate: 31, site: 'coupang', rating: 4.5, reviews: 3120, salesCount: 6420, category: 'fashion', rank: 4, link: 'https://coupang.com' },
    { id: 5, name: '프리미엄 하프 프레임 편광 선글라스', brand: '아이웨어X', price: 42000, originalPrice: 85000, discountRate: 50, site: 'naver', rating: 4.9, reviews: 752, salesCount: 3920, category: 'fashion', rank: 5, link: 'https://shopping.naver.com' },

    // Beauty
    { id: 6, name: '시카 릴리프 수분 진정 크림 80ml', brand: '닥터덤', price: 18500, originalPrice: 28000, discountRate: 33, site: 'naver', rating: 4.9, reviews: 4230, salesCount: 12500, category: 'beauty', rank: 1, link: 'https://shopping.naver.com' },
    { id: 7, name: '히알루론산 딥 수분 앰플 50ml 더블기획', brand: '워터글로우', price: 24900, originalPrice: 42000, discountRate: 40, site: 'coupang', rating: 4.7, reviews: 5210, salesCount: 9850, category: 'beauty', rank: 2, link: 'https://coupang.com' },
    { id: 8, name: '콜라겐 펩타이드 멀티밤 스틱', brand: '골드에이지', price: 19800, originalPrice: 35000, discountRate: 43, site: 'cjmall', rating: 4.5, reviews: 1890, salesCount: 4560, category: 'beauty', rank: 3, link: 'https://cjmall.co.kr' },
    { id: 9, name: '무기자차 마일드 톤업 선크림 SPF50+', brand: '닥터덤', price: 15800, originalPrice: 24000, discountRate: 34, site: 'coupang', rating: 4.6, reviews: 2980, salesCount: 7120, category: 'beauty', rank: 4, link: 'https://coupang.com' },
    { id: 10, name: '티트리 아크네 약산성 클렌징 폼 200ml', brand: '그린테라피', price: 12900, originalPrice: 19000, discountRate: 32, site: 'naver', rating: 4.8, reviews: 3670, salesCount: 8840, category: 'beauty', rank: 5, link: 'https://shopping.naver.com' },

    // Baby
    { id: 11, name: '1등급 유기농 순면 아기 물티슈 70매 10팩', brand: '베베앙', price: 16900, originalPrice: 25000, discountRate: 32, site: 'coupang', rating: 4.9, reviews: 12450, salesCount: 23100, category: 'baby', rank: 1, link: 'https://coupang.com' },
    { id: 12, name: '부드러운 에어핏 소프트 기저귀 대형 4팩', brand: '맘스프렌드', price: 48900, originalPrice: 65000, discountRate: 24, site: 'coupang', rating: 4.8, reviews: 8900, salesCount: 14500, category: 'baby', rank: 2, link: 'https://coupang.com' },
    { id: 13, name: '무독성 실리콘 안심 흡착 이유식 식기 세트', brand: '토이맘', price: 29800, originalPrice: 45000, discountRate: 33, site: 'naver', rating: 4.7, reviews: 1205, salesCount: 3120, category: 'baby', rank: 3, link: 'https://shopping.naver.com' },
    { id: 14, name: '자연유래 유아 안심 젖병정제 세제 리필형 3개', brand: '베베앙', price: 14900, originalPrice: 22000, discountRate: 32, site: 'cjmall', rating: 4.8, reviews: 2430, salesCount: 5410, category: 'baby', rank: 4, link: 'https://cjmall.co.kr' },

    // Food
    { id: 15, name: '당도보장 고당도 프리미엄 성주참외 3kg', brand: '산지직송', price: 21900, originalPrice: 32900, discountRate: 33, site: 'naver', rating: 4.8, reviews: 5430, salesCount: 14200, category: 'food', rank: 1, link: 'https://shopping.naver.com' },
    { id: 16, name: '무항생제 신선한 특란 30구', brand: '프레시팜', price: 7980, originalPrice: 9900, discountRate: 19, site: 'coupang', rating: 4.7, reviews: 34100, salesCount: 58000, category: 'food', rank: 2, link: 'https://coupang.com' },
    { id: 17, name: '저염 숙성 부드러운 훈제닭가슴살 100g 10팩', brand: '헬시밀', price: 18900, originalPrice: 29000, discountRate: 34, site: 'coupang', rating: 4.6, reviews: 15430, salesCount: 32900, category: 'food', rank: 3, link: 'https://coupang.com' },
    { id: 18, name: '프리미엄 1++등급 한우 꽃등심 400g 냉장', brand: '횡성축협', price: 59000, originalPrice: 89000, discountRate: 33, site: 'cjmall', rating: 4.9, reviews: 852, salesCount: 1840, category: 'food', rank: 4, link: 'https://cjmall.co.kr' },

    // Kitchen
    { id: 19, name: 'IH 인덕션 세라믹 쿡웨어 프라이팬 3종 세트', brand: '키친마스터', price: 54900, originalPrice: 89000, discountRate: 38, site: 'coupang', rating: 4.8, reviews: 2310, salesCount: 4890, category: 'kitchen', rank: 1, link: 'https://coupang.com' },
    { id: 20, name: '초미세 항균 안심 롤 수세미 60매 2롤', brand: '클린탭', price: 9900, originalPrice: 15000, discountRate: 34, site: 'naver', rating: 4.7, reviews: 5120, salesCount: 11200, category: 'kitchen', rank: 2, link: 'https://shopping.naver.com' },
    { id: 21, name: '내열 강화 유리 밀폐용기 8개 풀세트', brand: '글라스락스', price: 29800, originalPrice: 49000, discountRate: 39, site: 'cjmall', rating: 4.7, reviews: 1450, salesCount: 3420, category: 'kitchen', rank: 3, link: 'https://cjmall.co.kr' },

    // Living
    { id: 22, name: '고농축 고체 드럼세탁기 세제 캡슐 90개입', brand: '클린스마트', price: 22900, originalPrice: 39000, discountRate: 41, site: 'coupang', rating: 4.8, reviews: 7560, salesCount: 16500, category: 'living', rank: 1, link: 'https://coupang.com' },
    { id: 23, name: '호텔식 고중량 프리미엄 타올 400g 10장', brand: '코튼데이', price: 28900, originalPrice: 45000, discountRate: 35, site: 'naver', rating: 4.9, reviews: 3420, salesCount: 9120, category: 'living', rank: 2, link: 'https://shopping.naver.com' },
    { id: 24, name: '항균 탈취 편백수 피톤치드 스프레이 500ml', brand: '포레스트', price: 14800, originalPrice: 24000, discountRate: 38, site: 'cjmall', rating: 4.6, reviews: 2120, salesCount: 5210, category: 'living', rank: 3, link: 'https://cjmall.co.kr' },

    // Digital
    { id: 25, name: '스마트 블루투스 액티브 노이즈캔슬링 헤드폰', brand: '사운드맥스', price: 129000, originalPrice: 229000, discountRate: 43, site: 'coupang', rating: 4.8, reviews: 3120, salesCount: 5410, category: 'digital', rank: 1, link: 'https://coupang.com' },
    { id: 26, name: '27인치 보더리스 IPS 75Hz 오피스 모니터', brand: '뷰소닉스', price: 149000, originalPrice: 199000, discountRate: 25, site: 'naver', rating: 4.7, reviews: 1540, salesCount: 3120, category: 'digital', rank: 2, link: 'https://shopping.naver.com' },
    { id: 27, name: '초고속 무선 마그네틱 3-in-1 거치 충전기', brand: '테크차지', price: 39800, originalPrice: 59000, discountRate: 32, site: 'cjmall', rating: 4.6, reviews: 950, salesCount: 2850, category: 'digital', rank: 3, link: 'https://cjmall.co.kr' },
    { id: 28, name: '음파 진동 마이크로 전동 칫솔 더블세트', brand: '덴탈케어', price: 79000, originalPrice: 129000, discountRate: 38, site: 'coupang', rating: 4.8, reviews: 1850, salesCount: 4210, category: 'digital', rank: 4, link: 'https://coupang.com' },

    // Sports
    { id: 29, name: '초정밀 아웃도어 스포츠 스마트 스마트워치', brand: '핏트래커', price: 69000, originalPrice: 129000, discountRate: 46, site: 'naver', rating: 4.7, reviews: 1204, salesCount: 3120, category: 'sports', rank: 1, link: 'https://shopping.naver.com' },
    { id: 30, name: '방수 아웃도어 트레킹 백팩 40L', brand: '마운틴기어', price: 39000, originalPrice: 59000, discountRate: 33, site: 'coupang', rating: 4.8, reviews: 2310, salesCount: 4560, category: 'sports', rank: 2, link: 'https://coupang.com' },
    { id: 31, name: '고밀도 와이드 논슬립 피트니스 요가매트 15mm', brand: '홈핏', price: 18900, originalPrice: 29000, discountRate: 34, site: 'cjmall', rating: 4.5, reviews: 1980, salesCount: 3890, category: 'sports', rank: 3, link: 'https://cjmall.co.kr' }
];

// --- State Management ---
let currentCategory = 'all';
let currentSite = 'all';
let currentSort = 'rank';
let searchQuery = '';
let countdownTimer = 1800; // 30 mins in seconds

// --- SVG Gradient Mock Image Generator ---
// We generate highly stylized, modern abstract gradients based on the category of the item.
const getSVGImageSrc = (category, name) => {
    // Generate a deterministically distinct gradient based on name hash
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue1 = Math.abs(hash % 360);
    const hue2 = (hue1 + 60) % 360;
    
    // Choose icon representation
    const catObj = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
    const emoji = catObj.icon;
    
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
            <linearGradient id="grad-${Math.abs(hash)}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="hsl(${hue1}, 65%, 25%)" />
                <stop offset="100%" stop-color="hsl(${hue2}, 70%, 12%)" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="white" stop-opacity="0.15"/>
                <stop offset="100%" stop-color="white" stop-opacity="0"/>
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad-${Math.abs(hash)})" />
        <circle cx="200" cy="200" r="160" fill="url(#glow)" />
        <circle cx="200" cy="200" r="80" fill="white" fill-opacity="0.03" stroke="white" stroke-opacity="0.1" stroke-width="2" />
        
        <!-- Large Floating Emoji representing product type -->
        <text x="50%" y="54%" font-family="system-ui, sans-serif" font-size="72" text-anchor="middle" dominant-baseline="middle" opacity="0.85">${emoji}</text>
        
        <!-- Decorative Grid Lines for high-tech premium feel -->
        <path d="M 0 100 L 400 100 M 0 200 L 400 200 M 0 300 L 400 300 M 100 0 L 100 400 M 200 0 L 200 400 M 300 0 L 300 400" 
              stroke="white" stroke-opacity="0.03" stroke-width="1" />
    </svg>
    `;
    
    // Encodes SVG into base64 data URI
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// --- DOM References ---
const pcCategoryList = document.getElementById('pc-category-list');
const mobileCategoryList = document.getElementById('mobile-category-list');
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const searchClearBtn = document.getElementById('search-clear-btn');
const totalItemsCount = document.getElementById('total-items-count');
const categoryItemsCount = document.getElementById('category-items-count');
const currentCategoryName = document.getElementById('current-category-name');
const sortButtons = document.querySelectorAll('.sort-btn');
const filterChips = document.querySelectorAll('.filter-chip');
const detailModal = document.getElementById('product-detail-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalContent = document.getElementById('modal-body-content');
const redirectOverlay = document.getElementById('redirect-overlay');
const redirectProgressBar = document.getElementById('redirect-progress-bar');
const redirectSiteBadge = document.getElementById('redirect-site-badge');
const redirectProductName = document.getElementById('redirect-product-name');
const timerDisplay = document.getElementById('update-timer');

// --- Initialization ---
function init() {
    renderCategoryMenus();
    renderProducts();
    setupEventListeners();
    startCountdown();
    simulateLiveActivity();
    totalItemsCount.textContent = PRODUCTS.length;
}

// --- Render Categories ---
function renderCategoryMenus() {
    // Render PC Sidebar
    pcCategoryList.innerHTML = CATEGORIES.map(cat => `
        <li class="category-item ${cat.id === currentCategory ? 'active' : ''}" data-id="${cat.id}">
            <span class="category-icon">${cat.icon}</span>
            <span>${cat.name}</span>
        </li>
    `).join('');

    // Render Mobile List
    mobileCategoryList.innerHTML = CATEGORIES.map(cat => `
        <div class="mobile-cat-item ${cat.id === currentCategory ? 'active' : ''}" data-id="${cat.id}">
            ${cat.icon} ${cat.name}
        </div>
    `).join('');
}

// --- Filter and Sort Products ---
function getFilteredProducts() {
    return PRODUCTS.filter(prod => {
        // Category filter
        if (currentCategory !== 'all' && prod.category !== currentCategory) return false;
        
        // Site filter
        if (currentSite !== 'all' && prod.site !== currentSite) return false;
        
        // Search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesName = prod.name.toLowerCase().includes(query);
            const matchesBrand = prod.brand.toLowerCase().includes(query);
            if (!matchesName && !matchesBrand) return false;
        }
        
        return true;
    }).sort((a, b) => {
        // Sort order
        if (currentSort === 'rank') {
            // Smaller rank values are better
            return a.rank - b.rank;
        } else if (currentSort === 'sales') {
            // More sales are better
            return b.salesCount - a.salesCount;
        } else if (currentSort === 'discount') {
            // More discount is better
            return b.discountRate - a.discountRate;
        }
        return 0;
    });
}

// --- Render Products ---
function renderProducts() {
    productsGrid.innerHTML = '';
    const filtered = getFilteredProducts();
    categoryItemsCount.textContent = `${filtered.length}개`;
    
    const catObj = CATEGORIES.find(c => c.id === currentCategory);
    currentCategoryName.textContent = catObj ? catObj.name : '전체 상품';

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <span>⚠️</span>
                <p>일치하는 상품이 없습니다. 다른 키워드로 검색해 보세요.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((prod, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-id', prod.id);
        
        // We display top ranking numbers 1, 2, 3 differently
        const rankDisplay = currentSort === 'rank' ? prod.rank : (index + 1);
        const imageSrc = getSVGImageSrc(prod.category, prod.name);
        
        const siteLabel = prod.site === 'coupang' ? '쿠팡' : prod.site === 'naver' ? '네이버' : 'CJ Mall';
        
        card.innerHTML = `
            <div class="product-rank">${rankDisplay}</div>
            <div class="product-image-container">
                <img class="product-image" src="${imageSrc}" alt="${prod.name}" loading="lazy">
                <div class="product-badges">
                    <span class="site-badge ${prod.site}">${siteLabel}</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${prod.brand}</div>
                <h3 class="product-title">${prod.name}</h3>
                <div class="product-price-row">
                    <span class="product-discount">${prod.discountRate}%</span>
                    <span class="product-price">${prod.price.toLocaleString()}원</span>
                    <span class="product-original-price">${prod.originalPrice.toLocaleString()}원</span>
                </div>
                <div class="product-stats">
                    <div class="stat-item">
                        <span class="rating-star">★</span>
                        <span>${prod.rating}</span>
                    </div>
                    <div class="stat-item">
                        <span>리뷰</span>
                        <span>${prod.reviews.toLocaleString()}</span>
                    </div>
                    <div class="stat-item">
                        <span>판매</span>
                        <span>${prod.salesCount.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => openDetailModal(prod));
        productsGrid.appendChild(card);
    });
}

// --- Detail Modal Open ---
function openDetailModal(prod) {
    const imageSrc = getSVGImageSrc(prod.category, prod.name);
    const siteLabel = prod.site === 'coupang' ? '쿠팡' : prod.site === 'naver' ? '네이버' : 'CJ Mall';
    
    modalContent.innerHTML = `
        <div class="detail-layout">
            <div class="detail-image-box">
                <img src="${imageSrc}" alt="${prod.name}">
            </div>
            <div class="detail-info-box">
                <div class="detail-header">
                    <div class="detail-brand">${prod.brand}</div>
                    <h2 class="detail-title">${prod.name}</h2>
                </div>
                
                <div class="detail-site-row">
                    <span class="site-badge ${prod.site}">${siteLabel}</span>
                    <span class="items-count-badge">실시간 선호도 1위</span>
                </div>
                
                <div class="detail-stats-row">
                    <div class="detail-stat">
                        <span class="detail-stat-val">★ ${prod.rating}</span>
                        <span class="detail-stat-label">평점 (만점 5.0)</span>
                    </div>
                    <div class="detail-stat">
                        <span class="detail-stat-val">${prod.reviews.toLocaleString()}개</span>
                        <span class="detail-stat-label">누적 리뷰 수</span>
                    </div>
                    <div class="detail-stat">
                        <span class="detail-stat-val">${prod.salesCount.toLocaleString()}개</span>
                        <span class="detail-stat-label">이번주 판매량</span>
                    </div>
                </div>
                
                <div class="detail-price-box">
                    <div class="original-row">정상가 ${prod.originalPrice.toLocaleString()}원</div>
                    <div class="price-row">
                        <span class="product-discount" style="font-size: 24px;">${prod.discountRate}%</span>
                        <span class="product-price" style="font-size: 28px;">${prod.price.toLocaleString()}원</span>
                    </div>
                </div>
                
                <div class="buy-action-box">
                    <button class="buy-btn" id="modal-buy-btn">
                        <span>구매 사이트로 이동하기</span>
                        <span>➔</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    detailModal.classList.add('active');
    
    // Add event listener to buying button
    document.getElementById('modal-buy-btn').addEventListener('click', () => {
        detailModal.classList.remove('active');
        triggerRedirect(prod);
    });
}

// --- Purchase Redirect Simulator ---
function triggerRedirect(prod) {
    const siteLabel = prod.site === 'coupang' ? '쿠팡' : prod.site === 'naver' ? '네이버' : 'CJ Mall';
    
    redirectSiteBadge.className = `redirect-site-badge ${prod.site}`;
    redirectSiteBadge.textContent = siteLabel;
    redirectProductName.textContent = prod.name;
    
    redirectOverlay.classList.add('active');
    
    let progress = 0;
    redirectProgressBar.style.width = '0%';
    
    const interval = setInterval(() => {
        progress += 4;
        redirectProgressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                redirectOverlay.classList.remove('active');
                // Redirect user to store
                window.open(prod.link, '_blank');
            }, 300);
        }
    }, 50); // Takes ~1.2 seconds
}

// --- Set up Event Listeners ---
function setupEventListeners() {
    // Sidebar Categories
    pcCategoryList.addEventListener('click', (e) => {
        const item = e.target.closest('.category-item');
        if (!item) return;
        currentCategory = item.getAttribute('data-id');
        renderCategoryMenus();
        renderProducts();
    });

    // Mobile Categories
    mobileCategoryList.addEventListener('click', (e) => {
        const item = e.target.closest('.mobile-cat-item');
        if (!item) return;
        currentCategory = item.getAttribute('data-id');
        renderCategoryMenus();
        renderProducts();
    });

    // Site filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentSite = chip.getAttribute('data-site');
            renderProducts();
        });
    });

    // Sorting buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.getAttribute('data-sort');
            renderProducts();
        });
    });

    // Search bar
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchQuery.trim()) {
            searchClearBtn.style.display = 'block';
        } else {
            searchClearBtn.style.display = 'none';
        }
        renderProducts();
    });

    // Clear search
    searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        renderProducts();
    });

    // Close modal
    modalCloseBtn.addEventListener('click', () => {
        detailModal.classList.remove('active');
    });

    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('active');
        }
    });
}

// --- Countdown Timer for Updates ---
function startCountdown() {
    setInterval(() => {
        countdownTimer--;
        if (countdownTimer <= 0) {
            countdownTimer = 1800; // reset to 30 mins
            triggerFullUpdateAnimation();
        }
        
        const mins = Math.floor(countdownTimer / 60);
        const secs = countdownTimer % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

// --- Simulates Periodic Live Activity ---
// Every 8-15 seconds, we modify some data (e.g. increase sales, slightly alter reviews/ratings, or trigger rank shifts)
// and show a visual flashing effect on the altered card.
function simulateLiveActivity() {
    const statusText = document.getElementById('refresh-status');
    
    setInterval(() => {
        if (PRODUCTS.length === 0) return;
        
        // Randomly pick a product
        const randomIndex = Math.floor(Math.random() * PRODUCTS.length);
        const prod = PRODUCTS[randomIndex];
        
        // Simulates a new sale!
        const salesAdd = Math.floor(Math.random() * 5) + 1;
        prod.salesCount += salesAdd;
        prod.reviews += Math.random() > 0.7 ? 1 : 0;
        
        // Randomly swap ranks sometimes!
        if (Math.random() > 0.6) {
            // Find another product in the same category
            const siblings = PRODUCTS.filter(p => p.category === prod.category && p.id !== prod.id);
            if (siblings.length > 0) {
                const partner = siblings[Math.floor(Math.random() * siblings.length)];
                // Swap ranks
                const tempRank = prod.rank;
                prod.rank = partner.rank;
                partner.rank = tempRank;
            }
        }
        
        // Update header indicator text
        statusText.textContent = `${prod.brand} 상품 판매량 증가 갱신됨`;
        statusText.style.color = '#38bdf8';
        
        // Reset indicator color after 3s
        setTimeout(() => {
            statusText.textContent = '실시간 데이터 갱신 중';
            statusText.style.color = 'var(--text-muted)';
        }, 3000);
        
        // Render updated products
        renderProducts();
        
        // Highlight the changed card if it is in the DOM
        const changedCard = document.querySelector(`.product-card[data-id="${prod.id}"]`);
        if (changedCard) {
            changedCard.style.transition = 'none';
            changedCard.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
            changedCard.style.borderColor = '#38bdf8';
            setTimeout(() => {
                changedCard.style.transition = 'all var(--transition-normal)';
                changedCard.style.boxShadow = '';
                changedCard.style.borderColor = '';
            }, 1000);
        }
    }, 12000); // Trigger every 12 seconds
}

function triggerFullUpdateAnimation() {
    const statusText = document.getElementById('refresh-status');
    statusText.textContent = '전체 마켓 데이터 동기화 중...';
    statusText.style.color = '#eab308';
    
    // Simulates api sync latency
    setTimeout(() => {
        statusText.textContent = '실시간 데이터 갱신 중';
        statusText.style.color = 'var(--text-muted)';
        renderProducts();
    }, 2000);
}

// Run init
window.addEventListener('DOMContentLoaded', init);
