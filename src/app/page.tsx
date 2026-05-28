import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { DoctorIntro } from "@/components/home/DoctorIntro";
import { PainPoints } from "@/components/home/PainPoints";
import { HomeQuiz } from "@/components/home/HomeQuiz";
import { GlucoseExplainer } from "@/components/home/GlucoseExplainer";
import { MedicalSafetyBanner } from "@/components/home/MedicalSafetyBanner";

export const metadata: Metadata = {
  title: "Hiểu Đúng Tiểu Đường – Cùng Bác sĩ Hương",
  description:
    "Khóa học 16 bài giảng thực hành dành cho người tiền tiểu đường và đái tháo đường type 2. Ăn đúng, đo đúng, sống chủ động hơn mỗi ngày.",
};

export default function HomePage() {
  return (
    <>
      <DoctorIntro />
      <Hero />
      <HomeQuiz />
      <PainPoints />
      <GlucoseExplainer />
      <MedicalSafetyBanner />
    </>
  );
}
