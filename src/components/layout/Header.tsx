"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User as UserIcon, LogOut, BookMarked, ChevronDown, FileText, ClipboardList, Calculator } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { CourseLink } from "@/components/ui/CourseLink";
import { cn } from "@/lib/utils";

// ─── Nav data ─────────────────────────────────────────────────────────────────

interface DropdownItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
}

interface NavLink {
  href: string;
  label: string;
  gated: boolean;
  /** Extra paths that count as "active" for this nav item */
  activeAlso?: string[];
  dropdown?: DropdownItem[];
}

const navLinks: NavLink[] = [
  { href: "/", label: "Trang chủ", gated: false },
  { href: "/khoa-hoc", label: "Khóa học", gated: true, activeAlso: ["/chuong-trinh", "/tham-gia"] },
  {
    href: "/tai-lieu",
    label: "Tài liệu",
    gated: false,
    dropdown: [
      {
        href: "/tai-lieu",
        icon: <FileText className="w-5 h-5" />,
        label: "Tất cả tài liệu",
        desc: "10 tài liệu PDF miễn phí",
      },
      {
        href: "/tai-lieu/trac-nghiem",
        icon: <ClipboardList className="w-5 h-5" />,
        label: "Trắc nghiệm đường huyết",
        desc: "14 câu hỏi · 6 kết quả",
      },
      {
        href: "/tai-lieu/tinh-luong-dan",
        icon: <Calculator className="w-5 h-5" />,
        label: "Tính lượng đạm",
        desc: "Theo cân nặng & độ tuổi",
      },
    ],
  },
  { href: "/lien-he", label: "Liên hệ", gated: false },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group"
      aria-label="Doctor Hương Healthcare - Trang chủ"
    >
      <div className="relative w-10 h-10 rounded-full bg-heading flex items-center justify-center shrink-0">
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" aria-hidden="true">
          <path d="M16 4 L16 28 M4 16 L28 16" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="3" fill="#D97745" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-700 text-heading text-[15px] tracking-tight">Doctor Hương</div>
        <div className="text-[11px] text-muted -mt-0.5 tracking-wider uppercase">Healthcare</div>
      </div>
    </Link>
  );
}

// ─── Dropdown menu ────────────────────────────────────────────────────────────

function NavDropdown({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    // pt-2 = vùng trong suốt lấp khoảng trống giữa nút và card, giữ hover liên tục
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60 z-50">
      <div className="bg-white rounded-2xl shadow-premium border border-heading/8 overflow-hidden">
        <div className="p-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cream transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-heading/5 group-hover:bg-heading/10 flex items-center justify-center text-heading shrink-0 transition-colors">
                {item.icon}
              </span>
              <span className="text-[14px] font-600 text-heading">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isFormPage = pathname?.startsWith("/tham-gia");

  return (
    <>
      <a href="#main-content" className="skip-link">Bỏ qua điều hướng</a>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream/85 backdrop-blur-xl border-b border-heading/8"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">
            <Logo />

            {/* Desktop nav */}
            {!isFormPage && (
              <nav
                className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
                aria-label="Điều hướng chính"
                ref={dropdownRef}
              >
                {navLinks.map((link) => {
                  const active =
                    pathname === link.href ||
                    (link.href !== "/" && pathname?.startsWith(link.href)) ||
                    (link.activeAlso?.some((p) => pathname === p || pathname?.startsWith(p + "/")) ?? false);

                  // Link with dropdown
                  if (link.dropdown) {
                    const isOpen = openDropdown === link.href;
                    return (
                      <div
                        key={link.href}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(link.href)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <button
                          className={cn(
                            "relative px-5 py-2 text-[15px] font-500 transition-colors flex items-center gap-1.5",
                            active ? "text-heading" : "text-muted hover:text-heading"
                          )}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                        >
                          {link.label}
                          <ChevronDown
                            className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")}
                          />
                          {active && (
                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                          )}
                        </button>

                        {isOpen && (
                          <NavDropdown
                            items={link.dropdown}
                            onClose={() => setOpenDropdown(null)}
                          />
                        )}
                      </div>
                    );
                  }

                  // Regular link
                  const cls = cn(
                    "relative px-5 py-2 text-[15px] font-500 transition-colors",
                    active ? "text-heading" : "text-muted hover:text-heading"
                  );
                  const dot = active ? (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  ) : null;

                  return link.gated ? (
                    <CourseLink key={link.href} to={link.href} className={cls}>
                      {link.label}{dot}
                    </CourseLink>
                  ) : (
                    <Link key={link.href} href={link.href} className={cls}>
                      {link.label}{dot}
                    </Link>
                  );
                })}
              </nav>
            )}

            <div className="flex items-center gap-3">
              {/* Profile menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 min-h-[44px] pr-3 pl-1.5 py-1 rounded-full border border-heading/10 hover:border-heading/20 bg-white transition-colors"
                    aria-label="Menu hồ sơ"
                    aria-expanded={profileOpen}
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-700 text-sm flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden md:block text-[14px] font-600 text-heading max-w-[120px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown
                      className={cn("w-4 h-4 text-muted transition-transform", profileOpen && "rotate-180")}
                    />
                  </button>

                  {profileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setProfileOpen(false)}
                        aria-hidden="true"
                      />
                      <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-premium border border-heading/8 overflow-hidden z-40">
                        <div className="p-5 border-b border-heading/8">
                          <div className="flex items-center gap-3">
                            <span className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-700 flex items-center justify-center">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                            <div className="min-w-0">
                              <div className="font-700 text-heading truncate">{user.name}</div>
                              <div className="text-xs text-muted truncate">{user.phone || "—"}</div>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/ho-so"
                            className="flex items-center gap-3 px-5 py-3 hover:bg-cream transition-colors text-[14px]"
                          >
                            <UserIcon className="w-4 h-4 text-muted" />
                            Hồ sơ của tôi
                          </Link>
                          <Link
                            href="/khoa-hoc"
                            className="flex items-center gap-3 px-5 py-3 hover:bg-cream transition-colors text-[14px]"
                          >
                            <BookMarked className="w-4 h-4 text-muted" />
                            Bài học của tôi
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setProfileOpen(false);
                              router.push("/");
                            }}
                            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-warning transition-colors text-[14px]"
                          >
                            <LogOut className="w-4 h-4" />
                            Thoát tài khoản
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : !isFormPage ? (
                <Link
                  href="/chuong-trinh"
                  className="hidden sm:flex min-h-[44px] items-center px-5 rounded-full bg-heading text-cream font-600 text-[14px] hover:bg-heading/85 transition-colors"
                >
                  Xem khoá học
                </Link>
              ) : null}

              {/* Mobile hamburger */}
              {!isFormPage && (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-heading hover:bg-heading/5"
                  aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                >
                  {menuOpen ? (
                    <X className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-heading/8 bg-cream">
            <nav
              className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1"
              aria-label="Điều hướng mobile"
            >
              {navLinks.map((link) => {
                const baseCls =
                  "px-4 py-3 rounded-xl text-base text-heading hover:bg-heading/5 transition-colors font-500 min-h-[52px] flex items-center";

                if (link.dropdown) {
                  const isExpanded = mobileExpanded === link.href;
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : link.href)}
                        className={`w-full ${baseCls} justify-between`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={cn("w-4 h-4 text-muted transition-transform", isExpanded && "rotate-180")} />
                      </button>
                      {isExpanded && (
                        <div className="ml-4 mt-1 mb-2 space-y-1 border-l-2 border-heading/10 pl-4">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] text-heading hover:bg-heading/5 transition-colors font-600"
                            >
                              <span className="text-muted">{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return link.gated ? (
                  <CourseLink key={link.href} to={link.href} className={baseCls}>
                    {link.label}
                  </CourseLink>
                ) : (
                  <Link key={link.href} href={link.href} className={baseCls}>
                    {link.label}
                  </Link>
                );
              })}

              {!user ? (
                <Link
                  href="/chuong-trinh"
                  className="mt-4 min-h-[52px] flex items-center justify-center px-5 rounded-full bg-heading text-cream font-600"
                >
                  Xem khoá học
                </Link>
              ) : (
                <Link
                  href="/ho-so"
                  className="mt-4 min-h-[52px] flex items-center gap-3 px-4 rounded-2xl bg-paper border border-heading/8"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-700 flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span>
                    <span className="block font-700 text-heading text-sm">{user.name}</span>
                    <span className="block text-xs text-muted">Hồ sơ của tôi</span>
                  </span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
