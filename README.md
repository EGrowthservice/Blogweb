# PULSE Entertainment - Website Blog Chuẩn SEO & Google AdSense (Thị Trường Mỹ)

Website blog tin tức giải trí (Hollywood, Movies, TV Shows, Celebrities, Music, Gaming) cao cấp, thiết kế riêng cho độc giả Mỹ, sử dụng **Next.js 14 (App Router)** và **MongoDB**, hỗ trợ đăng nhập tùy chọn bằng **Google OAuth** (NextAuth).

---

## 🌟 Tính Năng Nổi Bật

1. **Chuẩn SEO & URL Tối Ưu (Google Search & Discover)**:
   - Cấu trúc Clean URL: `/[category]/[slug]` (ví dụ: `/movies/inside-christopher-nolans-next-sci-fi-epic-hollywood-project`).
   - Dynamic XML Sitemap: `http://localhost:3000/sitemap.xml` tự động cập nhật khi có bài viết mới.
   - Dynamic Robots.txt: `http://localhost:3000/robots.txt` điều hướng bot tìm kiếm chuẩn chỉ.
   - Dữ liệu có cấu trúc JSON-LD: Schema `NewsArticle`, `Organization`, `WebSite`, `BreadcrumbList`.
   - OpenGraph & Twitter Cards chuẩn hiển thị khi chia sẻ link trên X, Facebook, Reddit.
2. **Chuẩn 100% Điều Kiện Xét Duyệt Google AdSense**:
   - Đầy đủ **5 trang pháp lý bắt buộc**:
     - `/about`: Giới thiệu ban biên tập, Fact-checking Policy, E-E-A-T.
     - `/contact`: Biểu mẫu liên hệ, địa chỉ tòa soạn tại Mỹ (Los Angeles & New York).
     - `/privacy-policy`: Tuyên bố về cookie Google AdSense, DoubleClick DART, CCPA/CPRA (California) và COPPA.
     - `/terms-of-service`: Điều khoản dịch vụ và quy trình xử lý bản quyền DMCA.
     - `/disclaimer`: Tuyên bố miễn trừ trách nhiệm & Fair Use (17 U.S. Code § 107).
   - Tệp `public/ads.txt` đã cấu hình sẵn.
   - Các vị trí đặt quảng cáo (`AdBanner`) chuẩn kích thước: Leaderboard (728x90), In-Article, Sticky Sidebar (300x250/300x600), Multiplex footer, **cam kết không giật trang (Zero CLS)**.
3. **Trải Nghiệm Đọc Độc Lập & Đăng Nhập Bằng Google**:
   - **Khách vãng lai (Guest)**: Đọc toàn bộ tin tức, tìm kiếm, xem chuyên mục bình thường 100% mà không bị chặn.
   - **Đăng nhập Google**: Khi bấm lưu bài viết (Bookmark) hoặc gửi bình luận (Comment), hệ thống sẽ mở modal popup đăng nhập Google.
   - Trang `/bookmarks`: Quản lý danh sách bài viết đã lưu cho từng tài khoản Google.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Cài đặt Dependencies
Dự án đã được cài đặt sẵn dependencies trong thư mục:
```bash
npm install
```

### 2. Cấu hình Biến Môi Trường (`.env.local`)
Mở file `.env.local` và điền thông tin của bạn:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=pulse_entertainment_super_secret_key_32chars

# 1. MongoDB (Có thể để trống để dùng mock data chất lượng cao, hoặc điền MongoDB Atlas / Local)
MONGODB_URI=mongodb://localhost:27017/pulse_entertainment

# 2. Google OAuth (Lấy từ Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# 3. Google AdSense ID (Sau khi được duyệt)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-0000000000000000
```

> **Cách lấy Google OAuth Client ID & Secret**:
> 1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
> 2. Tạo một Project mới.
> 3. Vào **APIs & Services** > **Credentials** > **Create Credentials** > **OAuth client ID**.
> 4. Chọn Application type: **Web application**.
> 5. Thêm Authorized redirect URI: `http://localhost:3000/api/auth/callback/google` (và domain thật khi deploy).
> 6. Copy Client ID và Client Secret vào file `.env.local`.

### 3. Nạp Dữ Liệu Mẫu vào MongoDB (Tùy chọn)
Khi đã có `MONGODB_URI`, bạn có thể chạy lệnh sau để nạp các bài viết giải trí chuẩn E-E-A-T vào database:
```bash
npm run seed
```

### 4. Chạy Môi Trường Phát Triển
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## 📁 Cấu Trúc Thư Mục

```
├── public/
│   └── ads.txt                   # File xác thực người bán quảng cáo AdSense
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root Layout, Google Fonts, JSON-LD Schema, AdSense script
│   │   ├── page.tsx              # Trang chủ: Hero Spotlight, Trending Rail, Latest Stories
│   │   ├── [category]/
│   │   │   ├── page.tsx          # Trang chuyên mục (/movies, /tv-shows, /celebrities...)
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Trang chi tiết bài viết + NewsArticle Schema + Ad slots
│   │   ├── search/page.tsx       # Trang tìm kiếm bài viết
│   │   ├── bookmarks/page.tsx    # Trang bài viết đã lưu cho user đăng nhập Google
│   │   ├── about/page.tsx        # Trang About Us, Fact-checking, Masthead
│   │   ├── contact/page.tsx      # Trang Contact Us & Biểu mẫu liên hệ
│   │   ├── privacy-policy/page.tsx # Trang Privacy Policy (CCPA, Cookie DART, AdSense)
│   │   ├── terms-of-service/page.tsx # Trang Terms of Service & DMCA
│   │   ├── disclaimer/page.tsx   # Trang Disclaimer & Fair Use
│   │   ├── sitemap.ts            # Tự động xuất sitemap.xml
│   │   ├── robots.ts             # Tự động xuất robots.txt
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts # Route xử lý đăng nhập Google
│   │       ├── bookmarks/route.ts          # API lưu / xóa bài viết
│   │       └── comments/route.ts           # API bình luận
│   ├── components/
│   │   ├── Header.tsx            # Header, Trending Ticker, Navigation, Google Auth button
│   │   ├── Footer.tsx            # Footer đầy đủ 5 trang pháp lý và tuyên bố AdSense
│   │   ├── ArticleCard.tsx       # Thẻ bài viết chuẩn tạp chí
│   │   ├── AdBanner.tsx          # Khối hiển thị quảng cáo AdSense chống giật layout CLS
│   │   ├── BookmarkButton.tsx    # Nút lưu bài viết tích hợp Google Auth
│   │   ├── CommentSection.tsx    # Khu vực bình luận cộng đồng
│   │   ├── ShareButtons.tsx      # Nút chia sẻ mạng xã hội (X, Facebook, Reddit)
│   │   └── GoogleAuthModal.tsx   # Modal mời đăng nhập Google khi khách bấm lưu/bình luận
│   ├── lib/
│   │   ├── db.ts                 # Kết nối MongoDB với caching
│   │   ├── auth.ts               # Cấu hình NextAuth Google Provider
│   │   └── articles.ts           # Tầng truy vấn dữ liệu (MongoDB + Fallback)
│   ├── models/
│   │   ├── Article.ts            # Mongoose Schema bài viết chuẩn E-E-A-T
│   │   ├── User.ts               # Mongoose Schema người dùng Google
│   │   ├── Bookmark.ts           # Mongoose Schema bài viết đã lưu
│   │   └── Comment.ts            # Mongoose Schema bình luận
│   └── data/
│       └── mockArticles.ts       # Dữ liệu bài viết mẫu phong phú chuẩn báo chí Mỹ
├── scripts/
│   └── seed.mjs                  # Script nạp dữ liệu mẫu vào MongoDB
├── .env.example
├── .env.local
└── README.md
```

---

## 🔍 Checklist Kiểm Duyệt Google AdSense Thành Công

- [x] **Trang chính sách**: Đã có đầy đủ `/privacy-policy` (có điều khoản Google DART cookie & CCPA), `/about`, `/contact`, `/terms-of-service`, `/disclaimer`.
- [x] **Cấu trúc URL**: Clean URL, ngắn gọn, thân thiện, phân cấp rõ ràng theo chuyên mục.
- [x] **Sitemap & Robots**: `sitemap.xml` và `robots.txt` hoạt động động và tự động cập nhật.
- [x] **Nội dung chuẩn E-E-A-T**: Tác giả có tên tuổi, ảnh thật, bio, vai trò biên tập viên chuyên sâu, trích dẫn nguồn uy tín.
- [x] **Không bị giật giao diện (CLS < 0.1)**: Toàn bộ các vị trí quảng cáo (`AdBanner`) đều đặt kích thước cố định trước để khi quảng cáo tải không làm nhảy nội dung của độc giả.
- [x] **Trải nghiệm người dùng (UX)**: Khách đọc bài tự do không bị ép đăng nhập; chỉ đăng nhập khi muốn lưu bài hoặc thảo luận.
