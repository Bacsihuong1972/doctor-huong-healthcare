# Ổn định đường huyết mỗi ngày – Cùng Bác sĩ Hương

Website giáo dục sức khỏe tiếng Việt dành cho người mắc tiểu đường type 2, tiền tiểu đường và người cao tuổi.

**Doctor Hương Healthcare**

## Yêu cầu

- Node.js >= 18.0.0
- npm >= 9.0.0

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Cấu trúc project

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Trang chủ
│   ├── bat-dau/            # Khai báo thông tin & lưu ý an toàn
│   ├── khoa-hoc/           # Dashboard & nội dung bài học
│   ├── nhat-ky/            # Nhật ký 7 ngày
│   ├── tai-lieu/           # Tài liệu tải về
│   ├── nguon-tham-khao/    # Nguồn sách và khoa học
│   └── lien-he/            # Liên hệ
├── components/
│   ├── layout/             # Header, Footer
│   ├── home/               # Các section trang chủ
│   ├── lesson/             # Component bài học
│   └── ui/                 # UI dùng chung
├── data/                   # Dữ liệu bài học, hình ảnh
├── hooks/                  # Custom hooks
├── lib/                    # Utilities
└── types/                  # TypeScript types
```

## Công nghệ

- Next.js 15 (App Router)
- TypeScript strict mode
- Tailwind CSS
- Framer Motion
- lucide-react icons

## Lưu ý y khoa

Website này nhằm mục đích **giáo dục sức khỏe**, không thay thế bác sĩ điều trị. Không tự ý ngưng thuốc hoặc thay đổi phác đồ điều trị.

## Nguồn nội dung

Jessie Inchauspé (2022), *Glucose Revolution: The Life-Changing Power of Balancing Your Blood Sugar*, Simon & Schuster. Nội dung được Việt hóa và biên tập an toàn cho người mắc đái tháo đường.
