"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** The lesson URL the user wants to reach (e.g. "/khoa-hoc/duong-huyet-la-gi") */
  to: string;
  children: React.ReactNode;
}

/**
 * Link wrapper that routes EVERY path leading to the course through /tham-gia.
 * - If user already has name+phone → navigate directly to `to`
 * - If not → navigate to `/tham-gia?next=<to>` so they fill the form first
 *
 * Use this for any "Read this lesson", "Continue learning", chapter link,
 * featured image caption, etc. — never `<Link href="/khoa-hoc/...">` directly
 * from public surfaces.
 */
export const CourseLink = forwardRef<HTMLAnchorElement, Props>(function CourseLink(
  { to, children, onClick, ...rest },
  ref
) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    if (loading) return;
    if (user) {
      router.push(to);
    } else {
      router.push("/chuong-trinh");
    }
  };

  // Render the destination href so it's visible/copyable, but intercept the click.
  const visibleHref = user ? to : "/chuong-trinh";

  return (
    <a ref={ref} href={visibleHref} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});
