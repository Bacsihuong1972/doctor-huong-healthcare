"use client";
import { motion } from "framer-motion";

interface Props {
  type: string;
  alt: string;
  src?: string; // override — use directly if provided
}

// Map lesson slugs to illustration types
const slugMap: Record<string, string> = {
  "truoc-khi-bat-dau": "safety",
  "duong-huyet-la-gi": "glucose",
  "com-khoai-banh-trai-cay": "carbs",
  "sau-khi-an-thuc-an-di-dau": "digestion",
  "do-che-bien-san-va-duong-huyet": "processed",
  "hieu-duong-cong-duong-huyet": "curve",
  "co-the-lam-viec-vat-va-hon": "complications",
  "met-sau-an-bien-chung-lau-dai": "fatigue",
  "an-theo-thu-tu": "meal-order",
  "them-dia-rau-nho": "vegetables",
  "khong-chi-nhin-calo": "calories",
  "bua-sang-no-lau": "breakfast",
  "mat-ong-duong-phen-van-la-duong": "sweeteners",
  "neu-an-mon-ngot": "dessert",
  "giam-trong-bua-an": "vinegar",
  "sau-an-van-dong-nhe": "walk",
  "bua-phu-thong-minh": "snack",
  "dung-an-tinh-bot-mot-minh": "balanced-plate",
  "lich-7-ngay-thuc-hanh": "calendar",
  "tai-kham-hoi-bac-si": "doctor",
};

// Real Unsplash images mapped to lesson types
const imageMap: Record<string, string> = {
  safety: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85&fit=crop&auto=format",
  glucose: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=85&fit=crop&auto=format",
  carbs: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=1200&q=85&fit=crop&auto=format",
  digestion: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=85&fit=crop&auto=format",
  processed: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&q=85&fit=crop&auto=format",
  curve: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&fit=crop&auto=format",
  complications: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=85&fit=crop&auto=format",
  fatigue: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=1200&q=85&fit=crop&auto=format",
  "meal-order": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=85&fit=crop&auto=format",
  vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=85&fit=crop&auto=format",
  calories: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=1200&q=85&fit=crop&auto=format",
  breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=85&fit=crop&auto=format",
  sweeteners: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&q=85&fit=crop&auto=format",
  dessert: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=85&fit=crop&auto=format",
  vinegar: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=85&fit=crop&auto=format",
  walk: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=1200&q=85&fit=crop&auto=format",
  snack: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=1200&q=85&fit=crop&auto=format",
  "balanced-plate": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=85&fit=crop&auto=format",
  calendar: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=85&fit=crop&auto=format",
  doctor: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=85&fit=crop&auto=format",
};

export function LessonIllustration({ type, alt, src }: Props) {
  // Use src directly if provided, otherwise fall back to slug/type map
  const imageKey = slugMap[type] ?? type;
  const imageUrl = src ?? imageMap[imageKey] ?? imageMap["glucose"];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden shadow-card border border-white/40 my-8 group"
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-heading/40 via-transparent to-transparent pointer-events-none" />
      </div>
      <figcaption className="absolute bottom-4 left-4 right-4 glass-strong rounded-2xl px-4 py-2.5 text-sm text-heading font-500 leading-snug">
        {alt}
      </figcaption>
    </motion.figure>
  );
}
