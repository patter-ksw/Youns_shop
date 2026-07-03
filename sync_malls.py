import sys
import re

# Supabase Credentials - Fill in your credentials here
SUPABASE_URL = "YOUR_SUPABASE_URL"
SUPABASE_KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY"  # 서비스 롤 키(Service Role Key) 권장 (기록 권한 우회)

MALLS = ['coupang', 'naver', '11st', 'gmarket', 'musinsa', 'cjmall']
CATEGORIES = ['electronics', 'accessories', 'food', 'automotive']

TEMPLATE_PRODUCTS = {
    "electronics": [
        { "name": "삼성전자 갤럭시북5 프로 NT960QJV-KD72G 노트북 (대화면 터치패널)", "brand": "삼성전자", "basePrice": 1890000, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCKsWkDXLFuEWUtyDE03lVpOca6OpxKJpqkK7psQSrIdK807-4eAU-GkuRdgwZey3DrDD-9aI2tT1oxA9JZsav77OhCagOx2VpiRka_bpzh00DjdU7gOyBE7BEQRC-Rwm_ZatxFwcENXKx4BtBBg9TQJ6oF4w0r10EclpVs7yFWplk5yooUym69In9_0mzT-OozGInegHGX3A6lakq7mHhUTQO3FtToLovop1bqHqQwzmDuQFRFViv8" },
        { "name": "LG전자 그램 16인치 초경량 인텔 14세대 노트북", "brand": "LG전자", "basePrice": 1450000, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuAF1s1jVHHxM-D3E64HM0wGt0SDw53v35Maun4w-GgIwWwGRA3VxAKkcKapjwLc0tZGxaRrWViNGwc6NQw1scJloxHS_-UKURWJjRhZQoFUrMw9dJ5wMGGvF1qMA8RZt5WI5PQ6q0B2N9NZ4tn7OhCDve9etIejHiokCN6HivZlHwYm75IOccXashdFqxp5mAlZC9RLOrzUyogHD3huvEME7bNFBWZ9mrbGgl3aQXEIdGKGEsrMmhgH" },
        { "name": "애플 맥북에어 M3 13인치 노트북 (MacBook Air)", "brand": "Apple", "basePrice": 1390000, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuBEAOZnoMKSjsUbGQzXBPTrWlnESHLdUp7Wuw-qyw4_6LOkaTLTHwqeqfSMmuNB1vAVzM6wfXLuT_WkZUqrBz3aEtvAWeMFh12HHuesZuXtPIzQVqCCdyY9bAJu1cSeIiGb16UsNfGsuODwvpblToPjOfU0S1G-0fPSJbBSVjUEHyJwycuDFPytW53WpkNqMwx8pHnX2luqTDu4ev2dQdvA8P8XiwRAljf_OJR9BB7XprwHgxB2i09Q" },
        { "name": "Aether Pro 노이즈캔슬링 무선 헤드폰", "brand": "Tech Core", "basePrice": 349000, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuAyClXPV3HhZIcAnrVNtY_SvyLX9fvaZEbVSuwRqCEAxUCbWPN3gQrvgsjyG4ucr--AC9KNs_5c4oQWKaEiJxUCeAv2UxZFLXdxMa0RlPz21li_YELKFZcEDU7m1xfrn9etOcHXimNL0kQnEVckMvRFlsj1Va7GpPdQOuGrOzroOFJwdUreZ8zm2Sj-keHy6ou9reNDMm76_RcVA4puS2rGivX4cS_xN3RZ2WQ_oTKPv6gzNkqdgPoJ" },
        { "name": "Lumina Tab X12 Ultra OLED 태블릿 PC", "brand": "Lumina", "basePrice": 1120000, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuD3mrcRKxNc2IIgZ2QdFZBXxmTcfYh8xctf_H1QIimzkaIJNTNBDpIMRyEnBHj41PK_RLydkQ-m-kMF8oYgxLRIp40ikgggVB1ZenGLDhCjzL_0CvrJqf-VL2VuJBVCatrEoWJoxCleG72DpGyas4w84BUFP-637zbgs3LRgVu4KO2iPah3P25RnDmUUGfDFqIP7KI-UjhN0yAa_a6IcwGNIgCwHzFR0VB3i1D3CpzVVQvZesGwkPEb" },
        { "name": "기계식 게이밍 키보드 갈축 (텐키리스)", "brand": "NeoType", "basePrice": 129000, "img": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80" },
        { "name": "인체공학적 무선 수직 마우스 버티컬", "brand": "Ergo", "basePrice": 49000, "img": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80" },
        { "name": "C타입 고성능 고속 충전 보조배터리", "brand": "PowerVolt", "basePrice": 29000, "img": "https://images.unsplash.com/photo-1609592424109-dd8251e604f3?auto=format&fit=crop&w=300&q=80" },
        { "name": "4K Ultra 빔프로젝터 미니 홈시네마", "brand": "Cinemax", "basePrice": 490000, "img": "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=300&q=80" },
        { "name": "스마트 모니터 조명 바 LED 스탠드", "brand": "LiteUp", "basePrice": 39000, "img": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80" }
    ],
    "accessories": [
        { "name": "모던 메탈 크로노그래프 아날로그 손목시계", "brand": "Maison", "basePrice": 198000, "img": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80" },
        { "name": "천연 가죽 클래식 숄더 토트백", "brand": "Vero", "basePrice": 245000, "img": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80" },
        { "name": "써지컬 스틸 패션 체인 링크 목걸이", "brand": "Aura", "basePrice": 38000, "img": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80" },
        { "name": "심플 슬림 가죽 남성 반지갑", "brand": "Vero", "basePrice": 65000, "img": "https://images.unsplash.com/photo-1627124718515-e23938556f8a?auto=format&fit=crop&w=300&q=80" },
        { "name": "프리미엄 자외선 차단 스포츠 선글라스", "brand": "Retro", "basePrice": 89000, "img": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80" },
        { "name": "데일리 캔버스 미니 크로스백", "brand": "Urban", "basePrice": 29000, "img": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80" },
        { "name": "14K 골드 플레티늄 패션 커플링 반지", "brand": "Aura", "basePrice": 120000, "img": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80" },
        { "name": "미니멀 가죽 벨트 골드 버클", "brand": "Maison", "basePrice": 45000, "img": "https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?auto=format&fit=crop&w=300&q=80" },
        { "name": "베이직 볼캡 캐주얼 야구모자", "brand": "Urban", "basePrice": 19000, "img": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80" },
        { "name": "자카드 패턴 겨울 머플러 목도리", "brand": "Maison", "basePrice": 35000, "img": "https://images.unsplash.com/photo-1520903781418-b3274ab57d51?auto=format&fit=crop&w=300&q=80" }
    ],
    "food": [
        { "name": "CJ제일제당 햇반 백미 즉석밥 24공기 번들", "brand": "햇반", "basePrice": 23500, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuBDCZunIY5_JgeNY93_F-Ix9x00SU2dG43vMkW5--HEU20B8s09j3yAcIzjb6vsj41ly6aGyE6DX4T0Pq_lA0ZqTJ1rCCreRlPAfnBmy_I-x-h9wcDVvxEVa9Rvxmq-BIv3NzNXnZvEakgdp1cL7qFCmDJmHe7GwyH8fH-yfzvisSP9c0tOpm_TVhYz_mCYlabX5ZoRFlDYNL08Lqb3XQMfUb9ak91N-ITgzVQXCjmRQ99eMdYsNN1R" },
        { "name": "CJ제일제당 비비고 왕교자 만두 세트 (대용량)", "brand": "비비고", "basePrice": 28900, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL" },
        { "name": "무설탕 유기농 아몬드 밀크 음료 1L x 6개", "brand": "Fresh", "basePrice": 18000, "img": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=300&q=80" },
        { "name": "CJ제일제당 스팸 클래식 200g x 8캔 세트", "brand": "스팸", "basePrice": 29000, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuDt9_vb8PCR9N5g3UvKP3BCjqnjaFo73cN04CJ4SWUslYjfOvhWEfhjOVyEfLObOcg59vDZdWj6P3dQ7AxZpyjygK-eg99sqUlAY5g5cMufMSx_pwP16SVXrg0SnKArSZlK5nLj4faEG9uyD1bg1t80cNvSIyr9F0ukt3qF-W-YPhJMgV-ewLZYv82pLby85F2Q1LIBXbG5dcYH1kY7Y6h4GTO1mDDimgpJ2BQ8-SWlQDjKF_EndPNr" },
        { "name": "1등급 한우 꽃등심 냉장 구이용 300g", "brand": "Vero", "basePrice": 59000, "img": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" },
        { "name": "CJ제일제당 비비고 포기 배추김치 국산 5kg", "brand": "비비고", "basePrice": 32000, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL" },
        { "name": "훈제 닭가슴살 슬라이스 10팩 패키지", "brand": "Fit", "basePrice": 15000, "img": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80" },
        { "name": "고소한 단백질 하루견과 믹스넛 30봉", "brand": "Nut", "basePrice": 19900, "img": "https://images.unsplash.com/photo-1596560548464-f01068e601c7?auto=format&fit=crop&w=300&q=80" },
        { "name": "CJ제일제당 맛밤 영양간식 패키지 12봉", "brand": "맛밤", "basePrice": 19900, "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCRZSEvrW7AAMmXFQRso1hB0mPCdk0NPqxzfNXX5Mva2DHjuBVxCUkbvPxHhQQ9StLJN6HfBzPPtbsalbkoaWMuO7vFuZE6B5ZfUf1BaKxwbgK0749mgU6o_NQzTXAvTkXFEQLkE3785FEg7gYQwEEt9eAaMv21Ya2voPpVZb98tkKdrAXrymQmjd151aFtDh0jfe8JeiTzsEj9X3npbu8lajAJMpJM14hwo7tfBefg_FZotiC7jVeL" },
        { "name": "자연산 저염 명란젓 파지 1kg", "brand": "Fresh", "basePrice": 24900, "img": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80" }
    ],
    "automotive": [
        { "name": "차량용 맥세이프 고속 무선충전 거치대", "brand": "AutoPro", "basePrice": 39000, "img": "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=300&q=80" },
        { "name": "인체공학 차량용 메모리폼 목쿠션 허리받침", "brand: ": "AutoPro", "brand": "AutoPro", "basePrice": 28000, "img": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80" },
        { "name": "차량용 듀얼 QC3.0 시가잭 고속 충전기", "brand": "PowerVolt", "basePrice": 15000, "img": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80" },
        { "name": "차량용 미니 공기청정기 고성능 헤파필터", "brand": "EcoAuto", "basePrice": 45000, "img": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80" },
        { "name": "4K 초고화질 전후방 2채널 스마트 블랙박스", "brand": "NeoCapture", "basePrice": 189000, "img": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=300&q=80" },
        { "name": "극세사 프리미엄 차량 세차용 타월 10장 세트", "brand": "CleanAuto", "basePrice": 12000, "img": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80" },
        { "name": "김서림 방지 차량 세정제 유리크리너", "brand": "CleanAuto", "basePrice": 9800, "img": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80" },
        { "name": "차량용 프리미엄 방향제 카 디퓨저 우드링", "brand": "EcoAuto", "basePrice": 24000, "img": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80" },
        { "name": "셀프 세차 고흡수 드라잉 타월 대형", "brand": "CleanAuto", "basePrice": 14900, "img": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80" },
        { "name": "가죽 시트 케어 클리너 보호 코팅제", "brand": "CleanAuto", "basePrice": 26000, "img": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80" }
    ]
}

def get_mall_link(mall):
    links = {
        'coupang': 'https://coupang.com',
        'naver': 'https://shopping.naver.com',
        '11st': 'https://11st.co.kr',
        'gmarket': 'https://gmarket.co.kr',
        'musinsa': 'https://musinsa.com',
        'cjmall': 'https://display.cjonstyle.com'
    }
    return links.get(mall, 'https://google.com')

def generate_database_products():
    print("Supabase 동기화용 240개 상품 데이터 생성 중...")
    products = []
    
    for mall in MALLS:
        for category in CATEGORIES:
            templates = TEMPLATE_PRODUCTS[category]
            for idx, tpl in enumerate(templates):
                rank = idx + 1
                price = tpl["basePrice"]
                
                # Vary price slightly per mall so they aren't identical
                mall_factors = {
                    'coupang': { 'priceOffset': 0, 'discount': 10 },
                    'naver': { 'priceOffset': -1000, 'discount': 5 },
                    '11st': { 'priceOffset': -2000, 'discount': 15 },
                    'gmarket': { 'priceOffset': 1000, 'discount': 8 },
                    'musinsa': { 'priceOffset': -3000, 'discount': 12 },
                    'cjmall': { 'priceOffset': 2000, 'discount': 20 }
                }
                factor = mall_factors.get(mall, { 'priceOffset': 0, 'discount': 0 })
                
                original_price = price + factor['priceOffset']
                discount_rate = factor['discount']
                if discount_rate > 0:
                    price = int((original_price * (100 - discount_rate)) / 10000) * 100
                else:
                    price = original_price

                mall_labels = {
                    'coupang': '쿠팡 파트너',
                    'naver': '네이버 셀러',
                    '11st': '11st 우수샵',
                    'gmarket': 'G마켓 베스트',
                    'musinsa': '무신사 스탠다드',
                    'cjmall': 'CJ 온스타일'
                }
                brand = f"{tpl['brand']} ({mall_labels.get(mall, mall)})"
                
                products.append({
                    "name": tpl["name"],
                    "brand": brand,
                    "price": price,
                    "original_price": original_price,
                    "discount_rate": discount_rate,
                    "site": mall,
                    "rating": float(4.5 + (len(products) % 6) * 0.1),
                    "reviews": 120 + (len(products) % 15) * 65,
                    "sales_count": 1500 - rank * 80 + (len(products) % 8) * 120,
                    "category": category,
                    "rank": rank,
                    "is_curated": rank == 1 or (rank == 2 and mall == 'coupang'),
                    "tag": "베스트" if rank == 1 else "추천" if rank == 2 else None,
                    "image": tpl["img"],
                    "link": get_mall_link(mall)
                })
    return products

def main():
    if SUPABASE_URL == "YOUR_SUPABASE_URL" or SUPABASE_KEY == "YOUR_SUPABASE_SERVICE_ROLE_KEY":
        print("에러: Supabase URL 및 Service Role Key(비밀 키)를 sync_malls.py 상단에 설정해 주세요.")
        sys.exit(1)
        
    try:
        from supabase import create_client
    except ImportError:
        print("에러: supabase 파이썬 라이브러리가 필요합니다. 'pip install supabase'를 실행해 주세요.")
        sys.exit(1)
        
    print("Supabase 연결 중...")
    client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Generate complete list of 240 items (6 malls * 4 categories * 10 items)
    all_products = generate_database_products()
    
    print(f"생성 완료: 총 {len(all_products)}개 상품 (각 쇼핑몰 6개 * 카테고리 4개 * 10개 상품)")
    
    # Clean previous products in Supabase
    print("Supabase의 기존 상품 데이터 비우는 중 (Truncating)...")
    try:
        res = client.table("products").delete().neq("name", "").execute()
        print("기존 데이터 비우기 완료.")
    except Exception as e:
        print(f"기존 데이터 삭제 오류 (데이터가 없는 경우 패스): {e}")

    # Insert new products in chunks
    print("Supabase에 신규 상품 밀어넣는 중...")
    chunk_size = 30
    success_count = 0
    for i in range(0, len(all_products), chunk_size):
        chunk = all_products[i:i+chunk_size]
        try:
            res = client.table("products").insert(chunk).execute()
            success_count += len(chunk)
            print(f"진행 상황: {success_count}/{len(all_products)}개 등록 완료.")
        except Exception as e:
            print(f"청크 업로드 에러: {e}")
            
    print(f"동기화 성공! 총 {success_count}개의 최신 상품 정보가 Supabase DB에 안정적으로 등록되었습니다.")

if __name__ == "__main__":
    main()
