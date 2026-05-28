"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, X, FileText, Phone, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const DOWNLOAD_PHONE_KEY = "dh_download_phone";

// ─── Documents ────────────────────────────────────────────────────────────────

const documents = [
  {
    id: 1,
    title: "7 Bữa Trưa Dân Dã Việt Nam",
    subtitle: "Dành cho người tiểu đường",
    description: "Bảy bữa trưa quen thuộc, dễ nấu, phù hợp khẩu vị Việt — được điều chỉnh để không làm tăng đường huyết đột ngột.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/bua-trua-7-ngay-viet-nam.pdf",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80&fit=crop&auto=format",
    alt: "Bữa trưa Việt Nam dân dã",
    tag: "Thực đơn",
  },
  {
    id: 2,
    title: "7 Loại Rau Tốt Nhất",
    subtitle: "Cho người tiểu đường",
    description: "Danh sách 7 loại rau quen thuộc trong bữa cơm Việt, giúp làm chậm hấp thu đường và bổ sung chất xơ cần thiết.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/7-loai-rau-tot-tieu-duong.pdf",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80&fit=crop&auto=format",
    alt: "Các loại rau xanh tươi",
    tag: "Dinh dưỡng",
  },
  {
    id: 3,
    title: "50 Thực Phẩm GI Thấp",
    subtitle: "Có lợi cho người tiểu đường",
    description: "Danh sách 50 thực phẩm chỉ số đường huyết thấp, giúp cô chú chọn đúng nguyên liệu khi đi chợ mỗi ngày.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/50-thuc-pham-gi-thap.pdf",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&fit=crop&auto=format",
    alt: "Bữa ăn cân đối",
    tag: "Chỉ số GI",
  },
  {
    id: 4,
    title: "Bảng Theo Dõi Tiểu Đường",
    subtitle: "Ghi chép hàng ngày",
    description: "Biểu mẫu in sẵn để ghi chép đường huyết, bữa ăn và cảm giác cơ thể mỗi ngày — giúp bác sĩ đánh giá chính xác hơn.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/bang-theo-doi-tieu-duong.pdf",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&fit=crop&auto=format",
    alt: "Ghi chép theo dõi sức khỏe",
    tag: "Theo dõi",
  },
  {
    id: 5,
    title: "Bữa Phụ 7 Ngày GI Thấp",
    subtitle: "Ăn vặt lành mạnh",
    description: "Bảy ý tưởng ăn nhẹ giữa các bữa chính — no đủ, không tăng đường huyết, dễ chuẩn bị tại nhà.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/bua-phu-7-ngay-gi-thap.pdf",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80&fit=crop&auto=format",
    alt: "Bữa phụ lành mạnh",
    tag: "Bữa phụ",
  },
  {
    id: 6,
    title: "7 Bữa Sáng GI Thấp",
    subtitle: "Dân dã, dễ nấu",
    description: "Bảy bữa sáng phù hợp khẩu vị Việt Nam — có đạm, có rau, chỉ số GI thấp, giúp no bền cả buổi sáng.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/bua-sang-7-ngay-gi-thap.pdf",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80&fit=crop&auto=format",
    alt: "Bữa sáng dinh dưỡng",
    tag: "Bữa sáng",
  },
  {
    id: 7,
    title: "Bữa Tối 7 Ngày GI Thấp",
    subtitle: "Nhẹ nhàng cho buổi tối",
    description: "Thực đơn bữa tối một tuần — ít tinh bột, nhiều rau và đạm, phù hợp khi cơ thể ít vận động vào buổi tối.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/bua-toi-7-ngay-gi-thap.pdf",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop&auto=format",
    alt: "Bữa tối nhẹ nhàng",
    tag: "Bữa tối",
  },
  {
    id: 8,
    title: "Thực Đơn 30 Ngày",
    subtitle: "Cho người tiểu đường",
    description: "Kế hoạch ăn uống đầy đủ cho một tháng — ba bữa mỗi ngày, cân đối dinh dưỡng, dễ áp dụng trong cuộc sống thực.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/thuc-don-30-ngay-tieu-duong.pdf",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&fit=crop&auto=format",
    alt: "Lập kế hoạch thực đơn 30 ngày",
    tag: "Thực đơn 30 ngày",
  },
  {
    id: 9,
    title: "Khung Ăn Mẫu",
    subtitle: "Cho người tiểu đường",
    description: "Mẫu khung ăn uống theo tuần, giúp cô chú tự lên thực đơn riêng dựa trên nguyên tắc GI thấp và cân đối bữa ăn.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/khung-an-mau-tieu-duong.pdf",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80&fit=crop&auto=format",
    alt: "Lên kế hoạch bữa ăn theo tuần",
    tag: "Lập kế hoạch",
  },
  {
    id: 10,
    title: "Thực Đơn 30 Ngày",
    subtitle: "Hỗ trợ kiểm soát mỡ máu",
    description: "Kế hoạch ăn uống 30 ngày dành cho người vừa tiểu đường vừa cần kiểm soát cholesterol và mỡ máu.",
    file: "https://github.com/Bacsihuong1972/doctor-huong-healthcare/releases/download/v1.0-documents/thuc-don-30-ngay-mo-mau.pdf",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80&fit=crop&auto=format",
    alt: "Thực đơn hỗ trợ kiểm soát mỡ máu",
    tag: "Mỡ máu",
  },
];

// ─── Download Modal ───────────────────────────────────────────────────────────

interface DownloadModalProps {
  doc: (typeof documents)[0] | null;
  onClose: () => void;
  savedPhone: string;
  onDownload: (phone: string) => void;
}

function DownloadModal({ doc, onClose, savedPhone, onDownload }: DownloadModalProps) {
  const [phone, setPhone] = useState(savedPhone);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setPhone(savedPhone); }, [savedPhone]);
  useEffect(() => { if (doc) setTimeout(() => inputRef.current?.focus(), 120); }, [doc]);

  if (!doc) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 9) { setError("Vui lòng nhập số điện thoại hợp lệ."); return; }
    onDownload(phone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-heading/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md bg-cream rounded-3xl shadow-premium overflow-hidden">
        <div className="h-1 bg-primary w-full" />
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-heading/5 hover:bg-heading/10 transition-colors" aria-label="Đóng">
            <X className="w-4 h-4 text-heading" />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <div className="eyebrow text-muted mb-2">Tải miễn phí</div>
          <h2 className="font-display text-2xl text-heading leading-tight mb-1">{doc.title}</h2>
          <p className="text-sm text-muted mb-8">{doc.subtitle}</p>
          <p className="text-sm text-text mb-6 leading-relaxed">
            Để tải tài liệu, cô chú vui lòng để lại số điện thoại — Bác sĩ Hương sẽ giữ liên lạc nếu có tài liệu mới.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
              <label htmlFor="dl-phone" className="block text-sm font-600 text-heading mb-2">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                <input ref={inputRef} id="dl-phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError(""); }} placeholder="09x xxx xxxx"
                  className="w-full h-[52px] pl-11 pr-4 rounded-2xl border border-heading/15 bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 text-heading placeholder:text-muted/50 text-[15px] transition-all" />
              </div>
              {error && <p className="text-warning text-xs mt-2">{error}</p>}
            </div>
            <button type="submit" className="w-full h-[52px] rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/85 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Tải tài liệu về máy
            </button>
          </form>
          <p className="text-center text-xs text-muted mt-5">Không quảng cáo. Không chia sẻ thông tin.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TaiLieuPage() {
  const { user } = useAuth();
  const [selectedDoc, setSelectedDoc] = useState<(typeof documents)[0] | null>(null);
  const [savedPhone, setSavedPhone] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(DOWNLOAD_PHONE_KEY) || "";
    setSavedPhone(user?.phone || stored);
  }, [user]);

  const handleDownload = (phone: string) => {
    localStorage.setItem(DOWNLOAD_PHONE_KEY, phone);
    setSavedPhone(phone);
    const link = document.createElement("a");
    link.href = selectedDoc!.file;
    link.download = selectedDoc!.file.split("/").pop() || "tai-lieu.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSelectedDoc(null);
  };

  return (
    <>
      <DownloadModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} savedPhone={savedPhone} onDownload={handleDownload} />

      <div className="bg-cream min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-heading/8">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between mb-12 md:mb-16">
              <div className="eyebrow text-muted">№ — Tài liệu miễn phí</div>
              <div className="hidden md:flex items-center gap-2 text-xs text-muted">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {documents.length} tài liệu
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <h1 className="font-display text-5xl md:text-6xl lg:text-[88px] text-heading leading-[1.05] tracking-tight">
                  Tài liệu
                  <br />
                  tiểu đường
                </h1>
              </div>
              <div className="lg:col-span-5 lg:pb-3">
                <p className="font-display italic text-xl lg:text-2xl text-heading leading-snug mb-6 tracking-tight">
                  Tổng hợp tài liệu thực hành từ Bác sĩ Hương — tải về, in ra, và dùng ngay trong bếp.
                </p>
                <div className="flex items-center gap-5 pt-6 border-t border-heading/10">
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-display text-4xl md:text-5xl text-muted line-through leading-none"
                  >
                    2.000.000đ
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="text-2xl text-muted"
                  >
                    →
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.8 }}
                    className="font-display text-4xl md:text-5xl text-heading leading-none"
                  >
                    0đ
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Documents label ──────────────────────────────────────────────── */}
        <section className="pt-14 md:pt-18">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
            <div className="mb-10 md:mb-14">
              <div className="eyebrow text-muted mb-3">№ 01 — Tài liệu</div>
              <h2 className="font-display text-4xl md:text-5xl text-heading tracking-tight">
                Bác sĩ Hương kính tặng cô chú anh chị
              </h2>
            </div>
          </div>
        </section>

        {/* ── Documents grid ───────────────────────────────────────────────── */}
        <section className="pb-20 md:pb-24">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {documents.map((doc) => (
                <article key={doc.id} className="group bg-paper rounded-3xl overflow-hidden border border-heading/8 hover:border-heading/20 transition-all hover:shadow-card flex flex-col">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={doc.image} alt={doc.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-heading/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-cream/90 backdrop-blur text-xs font-600 text-heading">{doc.tag}</span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="font-display italic text-cream/80 text-sm">№{String(doc.id).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-heading leading-tight mb-1">{doc.title}</h3>
                      <p className="text-xs text-primary font-600 mb-3">{doc.subtitle}</p>
                      <p className="text-sm text-muted leading-relaxed">{doc.description}</p>
                    </div>
                    <button onClick={() => setSelectedDoc(doc)}
                      className="mt-6 w-full h-[46px] rounded-full bg-heading text-cream font-600 text-[13px] hover:bg-heading/85 transition-colors flex items-center justify-center gap-2 group/btn">
                      <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                      Tải về miễn phí
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Protein calculator teaser ────────────────────────────────────── */}
        <section className="border-t border-heading/8 bg-paper">
          <div className="min-h-[340px] grid grid-cols-1 lg:grid-cols-2">
            {/* Left image */}
            <div className="hidden lg:block relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1200&q=90&fit=crop&auto=format" alt="Thực phẩm giàu đạm" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-paper/50 to-transparent" />
            </div>
            {/* Right */}
            <div className="flex flex-col justify-center px-8 py-14 sm:px-12 lg:px-16 xl:px-20">
              <div className="eyebrow text-muted mb-6">№ 02 — Công cụ dinh dưỡng</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[48px] text-heading leading-[1.1] tracking-tight mb-5">
                Cô chú cần
                <br />
                bao nhiêu đạm
                <br />
                mỗi ngày?
              </h2>
              <p className="text-text leading-relaxed mb-10 max-w-md">
                Tính theo cân nặng và độ tuổi — dựa trên khuyến nghị của WHO, ESPEN và PROT-AGE.
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <Link
                  href="/tai-lieu/tinh-luong-dan"
                  className="group inline-flex items-center gap-3 h-[56px] pl-7 pr-3 rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/85 transition-colors"
                >
                  <span>Tính lượng đạm ngay</span>
                  <span className="w-10 h-10 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
                <span className="text-sm text-muted">⏱ Khoảng 1 phút</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quiz teaser ──────────────────────────────────────────────────── */}
        <section className="border-t border-heading/8 bg-paper">
          <div className="min-h-[400px] grid grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col justify-center px-8 py-14 sm:px-12 lg:px-16 xl:px-20">
              <div className="eyebrow text-muted mb-6">№ 03 — Trắc nghiệm</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-heading leading-[1.1] tracking-tight mb-6">
                Cô chú có đang bị
                <br />
                tăng đột biến
                <br />
                đường huyết không?
              </h2>
              <p className="text-text leading-relaxed mb-10 max-w-md">
                Bác sĩ Hương giúp cô chú nhận ra dấu hiệu sớm và gợi ý phù hợp với tình trạng thực tế.
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <Link
                  href="/tai-lieu/trac-nghiem"
                  className="group inline-flex items-center gap-3 h-[56px] pl-7 pr-3 rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/85 transition-colors"
                >
                  <span>Làm trắc nghiệm</span>
                  <span className="w-10 h-10 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
                <span className="text-sm text-muted">⏱ Khoảng 3 phút</span>
              </div>
            </div>
            {/* Right image */}
            <div className="hidden lg:block relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=90&fit=crop&auto=format" alt="Bữa ăn Việt Nam cân đối" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-paper/50 to-transparent" />
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <section className="border-t border-heading/8 py-16 md:py-20 bg-paper">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 text-center">
            <div className="eyebrow text-muted mb-4">Muốn học sâu hơn?</div>
            <h2 className="font-display text-4xl md:text-5xl text-heading tracking-tight mb-6">Khóa học 20 bài — miễn phí</h2>
            <p className="text-text max-w-xl mx-auto mb-8 leading-relaxed">
              Ngoài tài liệu, Bác sĩ Hương còn có khóa học video ngắn giúp cô chú hiểu sâu hơn về tiểu đường và cách kiểm soát qua bữa ăn hàng ngày.
            </p>
            <a href="/chuong-trinh" className="inline-flex items-center gap-3 h-[56px] pl-7 pr-3 rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/85 transition-colors">
              <span>Xem các khoá học</span>
              <span className="w-10 h-10 rounded-full bg-cream/15 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
