// ==========================================
// Supabase Configuration
// ==========================================
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabase = null;
let useSupabase = false;

if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
    try {
        supabase = supabaseClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        useSupabase = true;
        console.log("Supabase Client Initialized Successfully.");
    } catch (e) {
        console.error("Supabase Initialization Error:", e);
    }
}

// ==========================================
// Product Categories & Keywords
// ==========================================
const CATEGORIES = [
    { id: 'fashion', name: '패션', icon: 'apparel' },
    { id: 'digital', name: '가전', icon: 'devices' },
    { id: 'food', name: '식품', icon: 'restaurant' },
    { id: 'beauty', name: '뷰티', icon: 'content_cut' },
    { id: 'home', name: '홈데코', icon: 'chair' },
    { id: 'sports', name: '스포츠', icon: 'directions_run' }
];

const TRENDING_KEYWORDS = [
    '#노트북',
    '#미니멀리즘',
    '#가을신상',
    '#프리미엄가전',
    '#헤드폰',
    '#인테리어소품'
];

// ==========================================
// Local Fallback Database (Top 10 items per mall)
// ==========================================
let productsDB = [];
const LOCAL_FALLBACK_PRODUCTS = [
    // --- Coupang (10 items) ---
    {
        id: 1, name: '삼성전자 갤럭시북5 프로 NT960QJV-KD72G 노트북 (대화면 터치패널)', brand: '삼성전자',
        price: 1890000, originalPrice: 2100000, discountRate: 10, site: 'coupang', rating: 4.9, reviews: 320, salesCount: 5400,
        category: 'digital', rank: 1, isCurated: true, tag: '베스트',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKsWkDXLFuEWUtyDE03lVpOca6OpxKJpqkK7psQSrIdK807-4eAU-GkuRdgwZey3DrDD-9aI2tT1oxA9JZsav77OhCagOx2VpiRka_bpzh00DjdU7gOyBE7BEQRC-Rwm_ZatxFwcENXKx4BtBBg9TQJ6oF4w0r10EclpVs7yFWplk5yooUym69In9_0mzT-OozGInegHGX3A6lakq7mHhUTQO3FtToLovop1bqHqQwzmDuQFRFViv8', link: 'https://coupang.com'
    },
    {
        id: 2, name: '애플 맥북에어 M3 13인치 노트북 (MacBook Air)', brand: 'Apple',
        price: 1390000, originalPrice: 1590000, discountRate: 12, site: 'coupang', rating: 5.0, reviews: 1240, salesCount: 4820,
        category: 'digital', rank: 2, isCurated: true, tag: '강력추천',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEAOZnoMKSjsUbGQzXBPTrWlnESHLdUp7Wuw-qyw4_6LOkaTLTHwqeqfSMmuNB1vAVzM6wfXLuT_WkZUqrBz3aEtvAWeMFh12HHuesZuXtPIzQVqCCdyY9bAJu1cSeIiGb16UsNfGsuODwvpblToPjOfU0S1G-0fPSJbBSVjUEHyJwycuDFPytW53WpkNqMwx8pHnX2luqTDu4ev2dQdvA8P8XiwRAljf_OJR9BB7XprwHgxB2i09Q', link: 'https://coupang.com'
    },
    {
        id: 3, name: 'Aether Pro Wireless Noise Cancelling Headphones', brand: 'Tech Core',
        price: 349000, originalPrice: 410000, discountRate: 15, site: 'coupang', rating: 4.9, reviews: 1240, salesCount: 8940,
        category: 'digital', rank: 3, isCurated: true, tag: '베스트셀러',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyClXPV3HhZIcAnrVNtY_SvyLX9fvaZEbVSuwRqCEAxUCbWPN3gQrvgsjyG4ucr--AC9KNs_5c4oQWKaEiJxUCeAv2UxZFLXdxMa0RlPz21li_YELKFZcEDU7m1xfrn9etOcHXimNL0kQnEVckMvRFlsj1Va7GpPdQOuGrOzroOFJwdUreZ8zm2Sj-keHy6ou9reNDMm76_RcVA4puS2rGivX4cS_xN3RZ2WQ_oTKPv6gzNkqdgPoJ', link: 'https://coupang.com'
    },
    {
        id: 4, name: '미니멀리스트 퍼플 글라스 테이블 램프', brand: 'Antigravity Home',
        price: 89000, originalPrice: 120000, discountRate: 25, site: 'coupang', rating: 4.8, reviews: 124, salesCount: 1890,
        category: 'home', rank: 4, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDsqCBJjcAx_Cs5bZNvnUhrr7k8Y2AHUVMbeIPE_Evlb7Bv4WKfFchldby78qq7INv7LId6utydpC8F1xxOHdx_aFfz3Zos1kRn1LZWLafxnmqDRDzY1rmygVLRvq5vPIIWEGrRv8tUKJj6wxYWbOktv4Oz2ty3etOZQQRLjlROhrgifHKH_sdNGl8xbQEBrTuCL5rG73PD4-DZrqdm9Pzq23t-lBomS1XrIkSaBnA3tHxFc0B3swq', link: 'https://coupang.com'
    },
    {
        id: 5, name: '제니스 인체공학 오피스 체어 시리즈', brand: '홈 오피스',
        price: 299000, originalPrice: 399000, discountRate: 25, site: 'coupang', rating: 4.9, reviews: 380, salesCount: 4500,
        category: 'home', rank: 5, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxsqxq38aRVGibSwxhW9cEGeSRxLLLRuyUFQmVYHf4te99eqMiI3zFQV8M4Nv_CgmeXXfVKUlizFtq4ZAlHf6Eu_1ADlWKUT4Nvk1GJE-wcze0lgvU6usEfYCIKmTR3zO3EfzV79Rts62RdwMUOeiq6sFYeLLZuB8cr9UUcisJuZAxux4MYZJ92WRb0V_cU7OV_wvC_AlLCjvEW7q6YJ8eC0eaPxltiB6WeD0XHOUJ1Xcts4-R49KY', link: 'https://coupang.com'
    },
    {
        id: 6, name: 'NeoCapture ZV Mirrorless Vlogging Kit', brand: 'Coupang',
        price: 980000, originalPrice: 980000, discountRate: 0, site: 'coupang', rating: 4.6, reviews: 310, salesCount: 1450,
        category: 'digital', rank: 6, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz-aAPctq9yfObf9x67cd4-DlpuiqgxvhC2Wk8OgOAV_RS0F2anoQu6Q250fw1fb_6XecXJmSHbFS3lvdRD38n6ZZttGjhxgEe2TnC0Dnj8fBUN7l2oqibj56dSK5sIl2aaJMwv7uJ6qboqYu6AXK3yn8g3QbSUHOZIf6mcGwXdqnI5HvZG1OddNBp2DFRqUsJWjPs-Zr3ybPDDifogWM6cVJDflTv9eB8TgyZmSbXbKTj4CqDB01h', link: 'https://coupang.com'
    },
    {
        id: 7, name: '유기농 보리차 번들 세트 24입', brand: '쿠팡 프레시',
        price: 12900, originalPrice: 15000, discountRate: 14, site: 'coupang', rating: 4.8, reviews: 2400, salesCount: 12000,
        category: 'food', rank: 7, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL', link: 'https://coupang.com'
    },
    {
        id: 8, name: '오가닉 스낵 믹스 대용량', brand: '쿠팡 프레시',
        price: 18900, originalPrice: 18900, discountRate: 0, site: 'coupang', rating: 4.7, reviews: 1100, salesCount: 8900,
        category: 'food', rank: 8, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt9_vb8PCR9N5g3UvKP3BCjqnjaFo73cN04CJ4SWUslYjfOvhWEfhjOVyEfLObOcg59vDZdWj6P3dQ7AxZpyjygK-eg99sqUlAY5g5cMufMSx_pwP16SVXrg0SnKArSZlK5nLj4faEG9uyD1bg1t80cNvSIyr9F0ukt3qF-W-YPhJMgV-ewLZYv82pLby85F2Q1LIBXbG5dcYH1kY7Y6h4GTO1mDDimgpJ2BQ8-SWlQDjKF_EndPNr', link: 'https://coupang.com'
    },
    {
        id: 9, name: '프리미엄 세안 폼클렌징 더블 세트', brand: 'Aura Beauty',
        price: 28900, originalPrice: 38000, discountRate: 23, site: 'coupang', rating: 4.8, reviews: 850, salesCount: 3400,
        category: 'beauty', rank: 9, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9af5zRNIxnhIgxaxOL6CUqQfQcEXDtlMAXGSYLEi3K5RYyydmfokzf1vWbK9W2Oeth9gTdWR_ml2f6Op_s3Dxt_7BKNckYD6hjMuNLOZaY20Lt4MpS4iH_lqMw3d6k-JJl2GlPdz4O-vYdLe060Nw1FEWx9ogLODN2QnAH-DePlVDhc-Q9RKOX4KnfshzCQNxE1XSxmMGUpn6Kh8TR8hVRUogjTRI_pVL9uFrTRQvTG4WyufB-9vG', link: 'https://coupang.com'
    },
    {
        id: 10, name: '남성용 데일리 드레스 셔츠 화이트', brand: 'Coupang Fashion',
        price: 19900, originalPrice: 25000, discountRate: 20, site: 'coupang', rating: 4.6, reviews: 1940, salesCount: 14200,
        category: 'fashion', rank: 10, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://coupang.com'
    },

    // --- Naver (10 items) ---
    {
        id: 11, name: 'LG전자 그램 16인치 초경량 인텔 14세대 노트북 (Gram 16)', brand: 'LG전자',
        price: 1450000, originalPrice: 1680000, discountRate: 13, site: 'naver', rating: 4.8, reviews: 480, salesCount: 2310,
        category: 'digital', rank: 1, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF1s1jVHHxM-D3E64HM0wGt0SDw53v35Maun4w-GgIwWwGRA3VxAKkcKapjwLc0tZGxaRrWViNGwc6NQw1scJloxHS_-UKURWJjRhZQoFUrMw9dJ5wMGGvF1qMA8RZt5WI5PQ6q0B2N9NZ4tn7OhCDve9etIejHiokCN6HivZlHwYm75IOccXashdFqxp5mAlZC9RLOrzUyogHD3huvEME7bNFBWZ9mrbGgl3aQXEIdGKGEsrMmhgH', link: 'https://shopping.naver.com'
    },
    {
        id: 12, name: 'Lumina Tab X12 Ultra OLED', brand: 'Naver Shop',
        price: 1120000, originalPrice: 1120000, discountRate: 0, site: 'naver', rating: 4.8, reviews: 850, salesCount: 3120,
        category: 'digital', rank: 2, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3mrcRKxNc2IIgZ2QdFZBXxmTcfYh8xctf_H1QIimzkaIJNTNBDpIMRyEnBHj41PK_RLydkQ-m-kMF8oYgxLRIp40ikgggVB1ZenGLDhCjzL_0CvrJqf-VL2VuJBVCatrEoWJoxCleG72DpGyas4w84BUFP-637zbgs3LRgVu4KO2iPah3P25RnDmUUGfDFqIP7KI-UjhN0yAa_a6IcwGNIgCwHzFR0VB3i1D3CpzVVQvZesGwkPEb', link: 'https://shopping.naver.com'
    },
    {
        id: 13, name: '클래식 레더 토트백 (딥 퍼플 에디션)', brand: 'Maison Seoul',
        price: 245000, originalPrice: 245000, discountRate: 0, site: 'naver', rating: 4.9, reviews: 82, salesCount: 950,
        category: 'fashion', rank: 3, isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNjYdz8gcZxFx9M11ol2Eu8g4v57QoJ9OkuOOPfyJlw2WarohBPyhU0aaQwR75U5L52kK0Ikdw5HsFIEcFFQYCgII2LM-elSb94BiHw_UbPcMBjRsc4AH4vUZrxCkTkqA7JAQXJaeQuLCeX89XMAqU6fLTGJJ4KtAAvNnDGFvlZQeXvK_Qy4oyVOdgytmjfDE9ILJ-rvUAG_hYixL2qlLGA60tooQlv3DkFla4Y8Osqv8oF-P3mGRO', link: 'https://shopping.naver.com'
    },
    {
        id: 14, name: '오가닉 라벤더 세럼 & 크림 기프트 세트', brand: 'Aura Beauty',
        price: 64000, originalPrice: 64000, discountRate: 0, site: 'naver', rating: 4.7, reviews: 45, salesCount: 1200,
        category: 'beauty', rank: 4, isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3yYKp5YutcDtbMASJt3ackqK9nECVuwFjtyRSi5I-u5flYkwxjsM2yPV2v6Cb-hafF_xUGuy2WPS-toR5KnBrz3ES0xOf4pWukVTcmDh3DK6UU1BNXMsQRXTBmVZADX20AV60ovNhJ4skUod5vsJSJgwh6qUjp8RAida08Iwa1vtWr8I86-Qsdx3SImqiugUEq0aagHjvyA-zusIErZQhkElEX34436khr66vtVxnJ2uMo7W8Z3Bt', link: 'https://shopping.naver.com'
    },
    {
        id: 15, name: '글로우 에센스 리커버리 세럼 50ml', brand: 'Aura Beauty',
        price: 45000, originalPrice: 59000, discountRate: 24, site: 'naver', rating: 4.8, reviews: 1120, salesCount: 8400,
        category: 'beauty', rank: 5, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9af5zRNIxnhIgxaxOL6CUqQfQcEXDtlMAXGSYLEi3K5RYyydmfokzf1vWbK9W2Oeth9gTdWR_ml2f6Op_s3Dxt_7BKNckYD6hjMuNLOZaY20Lt4MpS4iH_lqMw3d6k-JJl2GlPdz4O-vYdLe060Nw1FEWx9ogLODN2QnAH-DePlVDhc-Q9RKOX4KnfshzCQNxE1XSxmMGUpn6Kh8TR8hVRUogjTRI_pVL9uFrTRQvTG4WyufB-9vG', link: 'https://shopping.naver.com'
    },
    {
        id: 16, name: '퓨어사운드 무선 헤드폰 클래식 에디션', brand: 'Tech Core',
        price: 189000, originalPrice: 220000, discountRate: 14, site: 'naver', rating: 4.8, reviews: 950, salesCount: 3950,
        category: 'digital', rank: 6, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuSelfYUXgSXHbRJcnuRgBKQermfXJg2Z5b-Itct1M373OoxBjhVTD0skBhV0fKeA4MD3c0lhwCssRJmycooWFhMf8qgbzAxXWo8nEPA-asUh2qqH6H42mnEwVzHKuk6vmrylZkGgQeQCNLP91oFQ9aWTMcByRs4ak5nCkJrIEGRxXcKXJzhV_S5jnAoPo8yu7Cg4_JmpqLoLP_K3bRphgnxYoP8_ox5jq6qzS-5nKQ5jvjdgzdINz', link: 'https://shopping.naver.com'
    },
    {
        id: 17, name: '어드밴스드 세라마이드 리커버리 세럼 (50ml)', brand: 'LUMINA ESSENTIALS',
        price: 48500, originalPrice: 62000, discountRate: 22, site: 'naver', rating: 4.8, reviews: 1284, salesCount: 9480,
        category: 'beauty', rank: 7, isCurated: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbfHitV9msXhDQ5H3nVRZcGhS6asdSC3naLwseVvCJixWCqzrkyaM1FFvYt3d4sop7SiJNT8vLWhSirGYJK7S8HcO0_axBO1j80ekTKHUsukDP2D8T5VMCLcC63x7o8ChtRUy4LKYlImUMIPMTBFxFZuEvzm4RvhWUdSYwFLHnPGge_hVfyEcO8HBT3LLFEhLT1c6J-3z_Fqw3RGUum-pckixCN6ilY-CVJ_lFxDlwm-mOjAbXgZMx', link: 'https://shopping.naver.com'
    },
    {
        id: 18, name: '유기농 무설탕 아몬드 밀크 1L', brand: '네이버 푸드',
        price: 3800, originalPrice: 4500, discountRate: 15, site: 'naver', rating: 4.8, reviews: 1800, salesCount: 9500,
        category: 'food', rank: 8, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDCZunIY5_JgeNY93_F-Ix9x00SU2dG43vMkW5--HEU20B8s09j3yAcIzjb6vsj41ly6aGyE6DX4T0Pq_lA0ZqTJ1rCCreRlPAfnBmy_I-x-h9wcDVvxEVa9Rvxmq-BIv3NzNXnZvEakgdp1cL7qFCmDJmHe7GwyH8fH-yfzvisSP9c0tOpm_TVhYz_mCYlabX5ZoRFlDYNL08Lqb3XQMfUb9ak91N-ITgzVQXCjmRQ99eMdYsNN1R', link: 'https://shopping.naver.com'
    },
    {
        id: 19, name: '오가닉 건조 무화과 슬라이스 300g', brand: '네이버 푸드',
        price: 14900, originalPrice: 14900, discountRate: 0, site: 'naver', rating: 4.6, reviews: 420, salesCount: 2100,
        category: 'food', rank: 9, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbqUf5q2Ou04hqBdMnStvFf8gHPmfi8stZQ6g62TVrp1l3hozwDM6zEKmMOmWyhp3e36O2iW4L_9B6NTWhrbOCsQMbZTz2jk8nzhEChGInlS21Tvd8iJTudfH0fExyldZPJxrI7T3DQJpWuJc_QFVGwoCuRo7_wcvPyz4W91iS9KlPIp_zKcIMR5nQdGCQQyOAeXklGT_NRsHm9OKPFZW-VFvxcmLxF0iiAL8vxehZZtx0JqFbzsqP', link: 'https://shopping.naver.com'
    },
    {
        id: 20, name: '수분 진정 수딩 젤 크림 100ml', brand: 'Aura Beauty',
        price: 16900, originalPrice: 22000, discountRate: 23, site: 'naver', rating: 4.8, reviews: 920, salesCount: 4800,
        category: 'beauty', rank: 10, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBil3lJVeQX9r8hiGhM7vX_n_9vfaaf6MWe9fYtUjI7rrLRxSS98LBR49gsf-KlmW_ZhiAH0jiCMTPFoiNw1oprMbqk3TMmsCz0wi2zBIHKheawLIJKXDwOAqwUW_9hd_dKL3oeRpuOijn76QDh8SYH6YiENm9xoW2ZAuaQi3dbgscjx1DUWkyGtXMzJX4yYqax-rWhSNg5kgoVrE-hFXt_SjCNIaPTHbaKdA5BWv41odIo36rVCVO7', link: 'https://shopping.naver.com'
    },

    // --- 11st (10 items) ---
    {
        id: 21, name: '레노버 아이디어패드 Slim3 가성비 노트북 15인치', brand: 'Lenovo',
        price: 549000, originalPrice: 620000, discountRate: 11, site: '11st', rating: 4.6, reviews: 190, salesCount: 890,
        category: 'digital', rank: 1, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3mrcRKxNc2IIgZ2QdFZBXxmTcfYh8xctf_H1QIimzkaIJNTNBDpIMRyEnBHj41PK_RLydkQ-m-kMF8oYgxLRIp40ikgggVB1ZenGLDhCjzL_0CvrJqf-VL2VuJBVCatrEoWJoxCleG72DpGyas4w84BUFP-637zbgs3LRgVu4KO2iPah3P25RnDmUUGfDFqIP7KI-UjhN0yAa_a6IcwGNIgCwHzFR0VB3i1D3CpzVVQvZesGwkPEb', link: 'https://11st.co.kr'
    },
    {
        id: 22, name: '노바 크로노 클래식 메탈 워치', brand: 'Maison Seoul',
        price: 220000, originalPrice: 220000, discountRate: 0, site: '11st', rating: 4.7, reviews: 310, salesCount: 1210,
        category: 'fashion', rank: 2, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAemnj4nziNXQNGY9ADP5gSbYpffsq--lIzkYWYrj4PrZu-1x4-dBfSnx59fb0W-CJp5qlxjlqtWOnnBmZQ3FNqJoK52aWoV3BYV1Z8RnUXNn5-43aYny3AFwF0TKPrnI1uBBddFnH5QNstY8MWSsHElJkn7Sr6NRDoLVgpodjqnFoSBPvRHFJhUAn0wmNFq1XkFPlRPFpMrnGIBlBT7_TVpMJ6M58KBtR5EWwz-bucbvXKHURcCtk4', link: 'https://11st.co.kr'
    },
    {
        id: 23, name: '유기농 세라믹 머그 4인조 홈세트', brand: 'Antigravity Home',
        price: 32000, originalPrice: 48000, discountRate: 33, site: '11st', rating: 4.9, reviews: 580, salesCount: 2950,
        category: 'home', rank: 3, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL', link: 'https://11st.co.kr'
    },
    {
        id: 24, name: '인체공학 무선 수직 마우스', brand: 'Tech Core',
        price: 49000, originalPrice: 65000, discountRate: 24, site: '11st', rating: 4.7, reviews: 180, salesCount: 950,
        category: 'digital', rank: 4, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsP4qLDefzedDC_shc7NEjXqtB3VvlSLe788o2uxexku_mkFA4_ZKSYTPWpLB-2_zJCIS8FPoVzmJGmX09MqdVPgZfbJXqPr091aloPZa0NgryUtWCXAEPtC02zu6J68vZQH6aaVNbkIU-ESOlp7kJhLCmiyIHiuk6s8oigpuYGf8UR7llULh6lJ0cyaC2xhBZFa1HuCSrKKolJXewcGeeKf83buNhEu4E3VVyYjSSiw0YXSXPcpBg', link: 'https://11st.co.kr'
    },
    {
        id: 25, name: '스마트 LED 무드 테이블 램프', brand: 'Antigravity Home',
        price: 45000, originalPrice: 45000, discountRate: 0, site: '11st', rating: 4.8, reviews: 92, salesCount: 650,
        category: 'home', rank: 5, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDsqCBJjcAx_Cs5bZNvnUhrr7k8Y2AHUVMbeIPE_Evlb7Bv4WKfFchldby78qq7INv7LId6utydpC8F1xxOHdx_aFfz3Zos1kRn1LZWLafxnmqDRDzY1rmygVLRvq5vPIIWEGrRv8tUKJj6wxYWbOktv4Oz2ty3etOZQQRLjlROhrgifHKH_sdNGl8xbQEBrTuCL5rG73PD4-DZrqdm9Pzq23t-lBomS1XrIkSaBnA3tHxFc0B3swq', link: 'https://11st.co.kr'
    },
    {
        id: 26, name: '데일리 면 베이직 티셔츠 3팩', brand: 'Maison Seoul',
        price: 29900, originalPrice: 39000, discountRate: 23, site: '11st', rating: 4.6, reviews: 420, salesCount: 3100,
        category: 'fashion', rank: 6, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://11st.co.kr'
    },
    {
        id: 27, name: '유기농 건라즈베리 팩 250g', brand: '11번가 푸드',
        price: 9800, originalPrice: 12000, discountRate: 18, site: '11st', rating: 4.8, reviews: 110, salesCount: 1500,
        category: 'food', rank: 7, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbqUf5q2Ou04hqBdMnStvFf8gHPmfi8stZQ6g62TVrp1l3hozwDM6zEKmMOmWyhp3e36O2iW4L_9B6NTWhrbOCsQMbZTz2jk8nzhEChGInlS21Tvd8iJTudfH0fExyldZPJxrI7T3DQJpWuJc_QFVGwoCuRo7_wcvPyz4W91iS9KlPIp_zKcIMR5nQdGCQQyOAeXklGT_NRsHm9OKPFZW-VFvxcmLxF0iiAL8vxehZZtx0JqFbzsqP', link: 'https://11st.co.kr'
    },
    {
        id: 28, name: '모이스처 하이드레이팅 스킨 로션 150ml', brand: 'Aura Beauty',
        price: 24000, originalPrice: 32000, discountRate: 25, site: '11st', rating: 4.7, reviews: 156, salesCount: 1980,
        category: 'beauty', rank: 8, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9af5zRNIxnhIgxaxOL6CUqQfQcEXDtlMAXGSYLEi3K5RYyydmfokzf1vWbK9W2Oeth9gTdWR_ml2f6Op_s3Dxt_7BKNckYD6hjMuNLOZaY20Lt4MpS4iH_lqMw3d6k-JJl2GlPdz4O-vYdLe060Nw1FEWx9ogLODN2QnAH-DePlVDhc-Q9RKOX4KnfshzCQNxE1XSxmMGUpn6Kh8TR8hVRUogjTRI_pVL9uFrTRQvTG4WyufB-9vG', link: 'https://11st.co.kr'
    },
    {
        id: 29, name: '아웃도어 경량 윈드브레이커 자켓', brand: 'Maison Seoul',
        price: 79000, originalPrice: 99000, discountRate: 20, site: '11st', rating: 4.8, reviews: 310, salesCount: 2200,
        category: 'sports', rank: 9, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://11st.co.kr'
    },
    {
        id: 30, name: '스마트 러닝 스포츠 트래커 밴드', brand: 'Tech Core',
        price: 89000, originalPrice: 110000, discountRate: 19, site: '11st', rating: 4.6, reviews: 95, salesCount: 1100,
        category: 'sports', rank: 10, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEAOZnoMKSjsUbGQzXBPTrWlnESHLdUp7Wuw-qyw4_6LOkaTLTHwqeqfSMmuNB1vAVzM6wfXLuT_WkZUqrBz3aEtvAWeMFh12HHuesZuXtPIzQVqCCdyY9bAJu1cSeIiGb16UsNfGsuODwvpblToPjOfU0S1G-0fPSJbBSVjUEHyJwycuDFPytW53WpkNqMwx8pHnX2luqTDu4ev2dQdvA8P8XiwRAljf_OJR9BB7XprwHgxB2i09Q', link: 'https://11st.co.kr'
    },

    // --- Gmarket (10 items) ---
    {
        id: 31, name: '가성비 데일리 기모 후드집업 파카', brand: 'Maison Seoul',
        price: 49000, originalPrice: 49000, discountRate: 0, site: 'gmarket', rating: 4.8, reviews: 310, salesCount: 1950,
        category: 'fashion', rank: 1, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://gmarket.co.kr'
    },
    {
        id: 32, name: '기계식 키보드 청축 아메지스트 에디션', brand: 'Tech Core',
        price: 139000, originalPrice: 169000, discountRate: 17, site: 'gmarket', rating: 4.9, reviews: 240, salesCount: 1540,
        category: 'digital', rank: 2, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsP4qLDefzedDC_shc7NEjXqtB3VvlSLe788o2uxexku_mkFA4_ZKSYTPWpLB-2_zJCIS8FPoVzmJGmX09MqdVPgZfbJXqPr091aloPZa0NgryUtWCXAEPtC02zu6J68vZQH6aaVNbkIU-ESOlp7kJhLCmiyIHiuk6s8oigpuYGf8UR7llULh6lJ0cyaC2xhBZFa1HuCSrKKolJXewcGeeKf83buNhEu4E3VVyYjSSiw0YXSXPcpBg', link: 'https://gmarket.co.kr'
    },
    {
        id: 33, name: '올인원 미니 믹서기 초고속 믹서 텀블러', brand: 'Tech Core',
        price: 79000, originalPrice: 99000, discountRate: 20, site: 'gmarket', rating: 4.7, reviews: 180, salesCount: 1100,
        category: 'digital', rank: 3, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsP4qLDefzedDC_shc7NEjXqtB3VvlSLe788o2uxexku_mkFA4_ZKSYTPWpLB-2_zJCIS8FPoVzmJGmX09MqdVPgZfbJXqPr091aloPZa0NgryUtWCXAEPtC02zu6J68vZQH6aaVNbkIU-ESOlp7kJhLCmiyIHiuk6s8oigpuYGf8UR7llULh6lJ0cyaC2xhBZFa1HuCSrKKolJXewcGeeKf83buNhEu4E3VVyYjSSiw0YXSXPcpBg', link: 'https://gmarket.co.kr'
    },
    {
        id: 34, name: '인스턴트 유기농 핸드드립 커피 30팩', brand: '지마켓 푸드',
        price: 24900, originalPrice: 24900, discountRate: 0, site: 'gmarket', rating: 4.8, reviews: 520, salesCount: 4200,
        category: 'food', rank: 4, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbqUf5q2Ou04hqBdMnStvFf8gHPmfi8stZQ6g62TVrp1l3hozwDM6zEKmMOmWyhp3e36O2iW4L_9B6NTWhrbOCsQMbZTz2jk8nzhEChGInlS21Tvd8iJTudfH0fExyldZPJxrI7T3DQJpWuJc_QFVGwoCuRo7_wcvPyz4W91iS9KlPIp_zKcIMR5nQdGCQQyOAeXklGT_NRsHm9OKPFZW-VFvxcmLxF0iiAL8vxehZZtx0JqFbzsqP', link: 'https://gmarket.co.kr'
    },
    {
        id: 35, name: '스마트 홈 시큐리티 룸 카메라', brand: 'Tech Core',
        price: 89000, originalPrice: 120000, discountRate: 25, site: 'gmarket', rating: 4.6, reviews: 154, salesCount: 980,
        category: 'digital', rank: 5, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz-aAPctq9yfObf9x67cd4-DlpuiqgxvhC2Wk8OgOAV_RS0F2anoQu6Q250fw1fb_6XecXJmSHbFS3lvdRD38n6ZZttGjhxgEe2TnC0Dnj8fBUN7l2oqibj56dSK5sIl2aaJMwv7uJ6qboqYu6AXK3yn8g3QbSUHOZIf6mcGwXdqnI5HvZG1OddNBp2DFRqUsJWjPs-Zr3ybPDDifogWM6cVJDflTv9eB8TgyZmSbXbKTj4CqDB01h', link: 'https://gmarket.co.kr'
    },
    {
        id: 36, name: '내추럴 카모마일 바디샤워 500ml', brand: 'Aura Beauty',
        price: 15000, originalPrice: 19800, discountRate: 24, site: 'gmarket', rating: 4.8, reviews: 480, salesCount: 2310,
        category: 'beauty', rank: 6, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9af5zRNIxnhIgxaxOL6CUqQfQcEXDtlMAXGSYLEi3K5RYyydmfokzf1vWbK9W2Oeth9gTdWR_ml2f6Op_s3Dxt_7BKNckYD6hjMuNLOZaY20Lt4MpS4iH_lqMw3d6k-JJl2GlPdz4O-vYdLe060Nw1FEWx9ogLODN2QnAH-DePlVDhc-Q9RKOX4KnfshzCQNxE1XSxmMGUpn6Kh8TR8hVRUogjTRI_pVL9uFrTRQvTG4WyufB-9vG', link: 'https://gmarket.co.kr'
    },
    {
        id: 37, name: '다목적 홈트 요가 매트 8mm', brand: 'Sports Fit',
        price: 22000, originalPrice: 22000, discountRate: 0, site: 'gmarket', rating: 4.7, reviews: 120, salesCount: 1450,
        category: 'sports', rank: 7, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEAOZnoMKSjsUbGQzXBPTrWlnESHLdUp7Wuw-qyw4_6LOkaTLTHwqeqfSMmuNB1vAVzM6wfXLuT_WkZUqrBz3aEtvAWeMFh12HHuesZuXtPIzQVqCCdyY9bAJu1cSeIiGb16UsNfGsuODwvpblToPjOfU0S1G-0fPSJbBSVjUEHyJwycuDFPytW53WpkNqMwx8pHnX2luqTDu4ev2dQdvA8P8XiwRAljf_OJR9BB7XprwHgxB2i09Q', link: 'https://gmarket.co.kr'
    },
    {
        id: 38, name: '스포츠 워터 보틀 1L 텀블러', brand: 'Sports Fit',
        price: 18000, originalPrice: 25000, discountRate: 28, site: 'gmarket', rating: 4.8, reviews: 310, salesCount: 2500,
        category: 'sports', rank: 8, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL', link: 'https://gmarket.co.kr'
    },
    {
        id: 39, name: '스탠다드 치노 팬츠 베이지', brand: 'Maison Seoul',
        price: 39000, originalPrice: 49000, discountRate: 20, site: 'gmarket', rating: 4.7, reviews: 140, salesCount: 1200,
        category: 'fashion', rank: 9, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://gmarket.co.kr'
    },
    {
        id: 40, name: '알루미늄 롤 테이프 캠핑 테이블', brand: 'Antigravity Home',
        price: 68000, originalPrice: 85000, discountRate: 20, site: 'gmarket', rating: 4.9, reviews: 85, salesCount: 750,
        category: 'home', rank: 10, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-AvqjRDx9vu8uTDEfsr1URBFca8IUt-tWFhx4p_e8TtcB40YLuxnOyW5AM7CvELhZlScx75tjcCCtepK5fueLAoy-w9AH3I8d1xn4SfYFandRcaAu-ORWf5Rw31X7EFMLIO0wh4Y09uQB7KMU9N9BhDkqh3bZShXrEsYOLcw3JGs1m1D03dIWFOaMzilK4raMfyMAaLLI4FxbtmF9_e0Zsvz9OrYU-TbI9hAdJc6i88JKOXLvWauo', link: 'https://gmarket.co.kr'
    },

    // --- Musinsa (10 items) ---
    {
        id: 41, name: '오버핏 드롭숄더 솔리드 옥스포드 셔츠', brand: 'Musinsa Standard',
        price: 29900, originalPrice: 35000, discountRate: 14, site: 'musinsa', rating: 4.9, reviews: 1100, salesCount: 8500,
        category: 'fashion', rank: 1, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 42, name: '와이드 데님 진 (연청 워싱 에디션)', brand: 'Musinsa Standard',
        price: 39900, originalPrice: 48000, discountRate: 17, site: 'musinsa', rating: 4.8, reviews: 920, salesCount: 6500,
        category: 'fashion', rank: 2, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 43, name: '유니섹스 오버사이즈 헤비 스웨트 셔츠', brand: 'Maison Seoul',
        price: 49900, originalPrice: 59000, discountRate: 15, site: 'musinsa', rating: 4.8, reviews: 850, salesCount: 5200,
        category: 'fashion', rank: 3, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 44, name: '베이직 피그먼트 다잉 티셔츠', brand: 'Musinsa Standard',
        price: 19900, originalPrice: 19900, discountRate: 0, site: 'musinsa', rating: 4.7, reviews: 310, salesCount: 2300,
        category: 'fashion', rank: 4, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 45, name: '데일리 조거 파카 트레이닝 세트', brand: 'Sports Fit',
        price: 69900, originalPrice: 89000, discountRate: 21, site: 'musinsa', rating: 4.8, reviews: 450, salesCount: 3400,
        category: 'sports', rank: 5, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 46, name: '카고 코튼 스트링 팬츠 카키', brand: 'Musinsa Standard',
        price: 34900, originalPrice: 39000, discountRate: 10, site: 'musinsa', rating: 4.7, reviews: 290, salesCount: 1800,
        category: 'fashion', rank: 6, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 47, name: '레트로 스트릿 바람막이 아노락', brand: 'Sports Fit',
        price: 59900, originalPrice: 79000, discountRate: 24, site: 'musinsa', rating: 4.8, reviews: 180, salesCount: 1200,
        category: 'sports', rank: 7, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 48, name: '스탠다드 코튼 블루종 자켓 블랙', brand: 'Musinsa Standard',
        price: 59900, originalPrice: 59900, discountRate: 0, site: 'musinsa', rating: 4.8, reviews: 310, salesCount: 1950,
        category: 'fashion', rank: 8, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 49, name: '슬림 무릎 스트레치 컴포트 카고 진', brand: 'Maison Seoul',
        price: 49900, originalPrice: 62000, discountRate: 19, site: 'musinsa', rating: 4.6, reviews: 120, salesCount: 1100,
        category: 'fashion', rank: 9, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    },
    {
        id: 50, name: '스탠다드 코튼 버킷햇 리버시블', brand: 'Musinsa Standard',
        price: 22900, originalPrice: 29000, discountRate: 21, site: 'musinsa', rating: 4.7, reviews: 95, salesCount: 890,
        category: 'fashion', rank: 10, isCurated: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArxqtDl5gOesoScPSA2qBTVXdB4JeNy4JjVVMmhy4K7m0R3q1hFDAQa6g-u762RKVN7A5BxJDTf715OQoj-eL3D1YzqrohK2lBPk0lTKABpat0WtfmINTyG-Am0PC_3C3uiSSyQ50fiiw6gxKVXD8_o5fgXJkT_kXa-5TH1L01vLItLf5MXIjSDyXMmBtUU33W64322mhltav3BLW27A4vMiD2VemzdtpFzZ5jwBf4NNlpeNeNwEvE', link: 'https://musinsa.com'
    }
];

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
    if (useSupabase) {
        try {
            console.log("Fetching products from Supabase database...");
            const { data, error } = await supabase.from('products').select('*');
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
        'musinsa': '무신사'
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
        'musinsa': '#000000'
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
        'musinsa': '#000000'
    };
    const siteColor = siteColors[prod.site] || '#53437b';
    const charIcon = prod.site === '11st' ? '11' : prod.site === 'gmarket' ? 'G' : prod.site === 'musinsa' ? 'M' : prod.site === 'coupang' ? 'C' : 'N';

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
    if (useSupabase) {
        try {
            console.log("Checking admin role in Supabase tr_users table...");
            // Query Supabase for patter matching username, password and role 관리자
            const { data, error } = await supabase
                .from('tr_users')
                .select('*')
                .eq('id', username)
                .eq('password', password)
                .eq('role', '관리자')
                .single();

            if (error) throw error;

            if (data) {
                isAdmin = true;
                showToast("로그인 성공! 관리자 콘솔이 실행됩니다.");
                openSyncConsole();
            } else {
                showToast("관리자 권한이 없거나 계정이 일치하지 않습니다.");
            }
        } catch (e) {
            console.error("Supabase Admin Check Failed:", e);
            // Fallback for user ease: if password is 'patter123!' locally, let them login
            if (username === 'patter' && password === 'patter123!') {
                isAdmin = true;
                showToast("로컬 우회 모드로 관리자 로그인 성공!");
                openSyncConsole();
            } else {
                showToast(`로그인 실패: ${e.message || "비밀번호를 확인하세요"}`);
            }
        }
    } else {
        // Fallback Offline admin bypass
        if (username === 'patter' && password === 'patter123!') {
            isAdmin = true;
            showToast("오프라인 모드로 로그인 성공! (Supabase 미연동)");
            openSyncConsole();
        } else {
            showToast("아이디 patter 및 로컬 테스트 비밀번호(patter123!)를 확인하세요.");
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
    if (!useSupabase) {
        showToast("Supabase 설정이 기입되어 있지 않아 실제 DB에 저장할 수 없습니다. sync_malls.py 스크립트 실행을 참조하세요.");
        return;
    }

    const startBtn = document.getElementById('sync-start-btn');
    startBtn.disabled = true;
    startBtn.textContent = "동기화 진행 중...";

    try {
        console.log("Starting DB Syncing from client side...");
        // Truncate previous (requires Service Role, Anon key may fail due to policy,
        // so we explain that python script is ideal for full crawling, but we populate current local items)
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
        const { error: delError } = await supabase.from('products').delete().neq('name', '');
        if (delError) console.warn("Deletion may require RLS privileges:", delError);

        // Insert products
        const { data, error: insError } = await supabase.from('products').insert(itemsToUpload).select();
        if (insError) throw insError;

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
            currentCategory = 'digital';
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
