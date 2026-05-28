import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { DoctorIntro } from "@/components/home/DoctorIntro";
import { SymptomCards } from "@/components/home/SymptomCards";
import { GlucoseExplainer } from "@/components/home/GlucoseExplainer";
import { LearningRoadmap } from "@/components/home/LearningRoadmap";
import { FirstThreeHabits } from "@/components/home/FirstThreeHabits";
import { MedicalSafetyBanner } from "@/components/home/MedicalSafetyBanner";
import { FAQ } from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "Ổn định đường huyết mỗi ngày – Cùng Bác sĩ Hương",
  description:
    "Khóa học giáo dục sức khỏe tiếng Việt dành cho người mắc tiểu đường type 2, tiền tiểu đường và người cao tuổi.",
};

export default function HomePage() {
  return (
    <>
      <DoctorIntro />
      <Hero />
      <SymptomCards />
      <GlucoseExplainer />
      <LearningRoadmap />
      <FirstThreeHabits />
      <FAQ />
      <MedicalSafetyBanner />
    </>
  );
}
