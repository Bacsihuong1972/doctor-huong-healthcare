"use client";
import { motion } from "framer-motion";

export function SimpleGlucoseChart() {
  return (
    <div
      className="w-full"
      role="img"
      aria-label="Biểu đồ đường huyết: đường màu cam tăng vọt sau bữa nhiều tinh bột, đường màu xanh tăng nhẹ sau bữa cân đối"
    >
      <svg
        viewBox="0 0 360 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Background */}
        <rect width="360" height="200" rx="16" fill="white" />

        {/* Y-axis label */}
        <text x="8" y="22" fill="#4A5568" fontSize="10" fontFamily="sans-serif">
          Đường huyết
        </text>
        <text x="8" y="34" fill="#4A5568" fontSize="9" fontFamily="sans-serif">
          (mmol/L)
        </text>

        {/* Grid */}
        {[50, 90, 130, 170].map((y) => (
          <line
            key={y}
            x1="50"
            y1={y}
            x2="340"
            y2={y}
            stroke="#237A57"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}

        {/* Y axis labels */}
        <text x="36" y="54" fill="#4A5568" fontSize="9" fontFamily="sans-serif" textAnchor="end">10</text>
        <text x="36" y="94" fill="#4A5568" fontSize="9" fontFamily="sans-serif" textAnchor="end">8</text>
        <text x="36" y="134" fill="#4A5568" fontSize="9" fontFamily="sans-serif" textAnchor="end">6</text>
        <text x="36" y="174" fill="#4A5568" fontSize="9" fontFamily="sans-serif" textAnchor="end">4</text>

        {/* Target zone */}
        <rect x="50" y="90" width="290" height="80" fill="#237A57" fillOpacity="0.05" rx="4" />
        <text x="325" y="100" fill="#237A57" fontSize="9" fontFamily="sans-serif" opacity="0.7">Mục tiêu</text>

        {/* Spike curve (orange) */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          d="M 55 150 C 80 148, 110 60, 145 40 C 165 30, 190 38, 215 70 C 235 95, 280 140, 340 148"
          stroke="#D97745"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Stable curve (green) */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          d="M 55 150 C 80 148, 115 110, 150 100 C 185 90, 220 95, 260 112 C 295 125, 325 140, 340 145"
          stroke="#237A57"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Green fill */}
        <path
          d="M 55 150 C 80 148, 115 110, 150 100 C 185 90, 220 95, 260 112 C 295 125, 325 140, 340 145 L 340 180 L 55 180 Z"
          fill="#237A57"
          fillOpacity="0.07"
        />

        {/* X axis labels */}
        <text x="55" y="195" fill="#4A5568" fontSize="9" fontFamily="sans-serif">Trước ăn</text>
        <text x="145" y="195" fill="#4A5568" fontSize="9" fontFamily="sans-serif">30 phút</text>
        <text x="240" y="195" fill="#4A5568" fontSize="9" fontFamily="sans-serif">1 giờ</text>
        <text x="315" y="195" fill="#4A5568" fontSize="9" fontFamily="sans-serif">2 giờ</text>

        {/* Legend */}
        <rect x="55" y="6" width="12" height="3" rx="2" fill="#D97745" />
        <text x="72" y="12" fill="#D97745" fontSize="9" fontFamily="sans-serif" fontWeight="600">Nhiều tinh bột</text>
        <rect x="160" y="6" width="12" height="3" rx="2" fill="#237A57" />
        <text x="177" y="12" fill="#237A57" fontSize="9" fontFamily="sans-serif" fontWeight="600">Bữa cân đối + rau trước</text>
      </svg>
    </div>
  );
}
