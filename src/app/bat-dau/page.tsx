"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function BatDauPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/khoa-hoc/truoc-khi-bat-dau");
    } else {
      router.replace("/tham-gia?next=" + encodeURIComponent("/khoa-hoc/truoc-khi-bat-dau"));
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <Loader2 className="w-6 h-6 animate-spin text-primary mb-4" />
      <p className="text-muted text-sm">Đang chuẩn bị bài học...</p>
    </div>
  );
}
