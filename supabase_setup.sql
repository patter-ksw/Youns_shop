-- =======================================================
-- Supabase Table Creation Script for Youn's Shop
-- =======================================================

-- 1. tr_users 테이블 생성 (관리자 및 일반 사용자 관리)
CREATE TABLE IF NOT EXISTS public.tr_users (
    id VARCHAR(100) PRIMARY KEY,       -- 사용자 ID (예: 'patter')
    password VARCHAR(255) NOT NULL,   -- 사용자 비밀번호 (예: 'patter123!')
    role VARCHAR(50) DEFAULT '일반',   -- 권한 ('관리자' 또는 '일반')
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- tr_users 테이블에 기본 관리자 계정 생성 (patter / patter123!)
INSERT INTO public.tr_users (id, password, role)
VALUES ('patter', 'patter123!', '관리자')
ON CONFLICT (id) DO UPDATE 
SET password = EXCLUDED.password, role = EXCLUDED.role;


-- 2. products 테이블 생성 (각 쇼핑몰 큐레이션 인기 상품 목록)
CREATE TABLE IF NOT EXISTS public.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    discount_rate NUMERIC DEFAULT 0,
    site VARCHAR(50) NOT NULL,        -- 'coupang', 'naver', '11st', 'gmarket', 'musinsa', 'cjmall'
    rating NUMERIC(3,1) DEFAULT 4.5,
    reviews INTEGER DEFAULT 0,
    sales_count INTEGER DEFAULT 0,
    category VARCHAR(50) NOT NULL,    -- 'electronics', 'accessories', 'food', 'automotive'
    rank INTEGER NOT NULL,
    is_curated BOOLEAN DEFAULT FALSE,
    tag VARCHAR(50),
    image TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS(Row Level Security) 설정 안내:
-- Supabase에서 클라이언트(app.js)가 익명(Anon)으로 데이터를 읽을 수 있게 하려면
-- products 테이블에 대해 SELECT RLS 정책을 추가하거나 RLS를 비활성화해야 합니다.
-- 
-- ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read access" ON public.products FOR SELECT USING (true);
-- 
-- ALTER TABLE public.tr_users ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read users" ON public.tr_users FOR SELECT USING (true);
