"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const pains = [
  {
    id: "bien-chung",
    title: "Biến chứng có thể phòng được không?",
    body: [
      "Từ ngày cầm tờ kết quả xét nghiệm, nhiều cô chú bắt đầu nghĩ đến mù mắt, cắt bàn chân, suy thận... Những biến chứng này có thật, nhưng chúng không xảy ra trong một sớm một chiều.",
      "Biến chứng tiểu đường là kết quả của đường huyết cao kéo dài nhiều năm không được kiểm soát. Điều đó có nghĩa là cô chú còn thời gian để thay đổi hướng đi.",
      "Ngay cả khi đã có một số dấu hiệu ban đầu, việc kiểm soát đường huyết tốt hơn vẫn giúp làm chậm và giảm nguy cơ biến chứng đáng kể. Mỗi bước nhỏ đều có ý nghĩa.",
    ],
  },
  {
    id: "bua-an",
    title: "Mỗi bữa ăn trở thành nỗi lo?",
    body: [
      "Nhiều cô chú chia sẻ rằng từ khi biết mình bị tiểu đường, không còn dám ăn thoải mái nữa. Nhìn vào bát cơm cũng phân vân, ăn trái cây cũng lo.",
      "Điều này không phải do cô chú yếu đuối — đây là phản ứng bình thường khi chúng ta không có đủ thông tin để tin tưởng vào lựa chọn của mình.",
      "Thực ra, bữa cơm Việt Nam hoàn toàn có thể điều chỉnh để phù hợp với người tiểu đường mà không cần bỏ cơm hay kiêng cữ cực đoan. Điều cần thay đổi là sự hiểu biết, không phải toàn bộ thực đơn.",
    ],
  },
  {
    id: "met-sau-an",
    title: "Mệt sau ăn, nhanh đói trở lại?",
    body: [
      "Ăn xong mà vẫn buồn ngủ, chưa đến 2 tiếng đã thấy đói lại — đây không phải vấn đề ý chí hay 'ăn ít đi là hết'. Đây là tín hiệu cơ thể đang gửi về cách bữa ăn ảnh hưởng đến đường huyết.",
      "Khi bữa ăn khiến đường huyết tăng vọt rồi hạ nhanh, não sẽ phát tín hiệu 'cần thêm năng lượng' rất sớm. Kết quả là cô chú ăn thêm, đường huyết lại tăng — một vòng lặp khó thoát.",
      "Thay đổi thứ tự ăn và bổ sung rau, đạm vào bữa ăn có thể làm phẳng đường cong đường huyết đáng kể — giúp cô chú có năng lượng đều hơn và no lâu hơn.",
    ],
  },
  {
    id: "chi-so",
    title: "Không hiểu con số xét nghiệm có nghĩa gì?",
    body: [
      "HbA1c 7.2%, đường huyết lúc đói 8.4 mmol/L, triglyceride 2.1 mmol/L... Nhiều cô chú cầm phiếu xét nghiệm mà không biết những con số này muốn nói gì về cơ thể mình.",
      "Khi không hiểu con số, rất khó để biết mình đang tiến bộ hay đang đi thụt lùi. Khám xong vẫn mơ hồ — và khó đặt câu hỏi đúng với bác sĩ.",
      "Chỉ cần hiểu 3 chỉ số cơ bản là đã có thể tự theo dõi và trao đổi hiệu quả hơn với bác sĩ điều trị của mình.",
    ],
  },
  {
    id: "phai-bo-com",
    title: "Phải bỏ cơm và đồ ăn quen thuộc?",
    body: [
      "'Bị tiểu đường rồi không ăn cơm được nữa' — đây là điều nhiều cô chú nghe và tin. Nhưng bỏ cơm không phải câu trả lời, và cũng không cần thiết.",
      "Cơm là một phần của văn hóa ăn uống Việt Nam. Bỏ hoàn toàn không chỉ khó duy trì mà còn không cần thiết nếu biết điều chỉnh lượng và cách kết hợp đúng.",
      "Điều quan trọng không phải là 'ăn gì' mà là 'ăn bao nhiêu, ăn theo thứ tự nào và kết hợp với rau đạm ra sao'. Đó là điều cô chú hoàn toàn có thể học và áp dụng.",
    ],
  },
  {
    id: "thuoc",
    title: "Lo ngại về thuốc và điều trị lâu dài?",
    body: [
      "Nhiều người bệnh cảm thấy 'thất bại' khi phải dùng thuốc, hoặc tự ý giảm liều rồi ngừng thuốc vì thấy đường huyết 'có vẻ ổn hơn'. Điều này rất phổ biến — và rất nguy hiểm.",
      "Thuốc, bữa ăn, vận động và theo dõi không thay thế nhau — chúng phối hợp với nhau. Đường huyết khá hơn khi dùng thuốc đúng cách không có nghĩa là có thể bỏ thuốc.",
      "Hiểu vai trò của từng loại thuốc, chuẩn bị câu hỏi khi tái khám và biết khi nào cần liên hệ bác sĩ là những kỹ năng giúp cô chú chủ động hơn trong hành trình điều trị.",
    ],
  },
];

export function PainPoints() {
  const [open, setOpen] = useState<string | null>(pains[0].id);

  return (
    <section className="py-24 md:py-32 bg-cream border-t border-heading/8">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mb-14 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-heading leading-[1.05] tracking-tight not-italic lg:whitespace-nowrap" style={{ fontWeight: 800 }}>
            Cô chú đang{" "}
            <span className="not-italic text-accent">gặp điều này không?</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-heading/10">
          {pains.map((item) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between py-7 md:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <h3
                    className={`font-display text-lg md:text-xl lg:text-2xl tracking-tight leading-tight transition-colors ${
                      isOpen ? "text-heading" : "text-heading/70 group-hover:text-heading"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <span
                    className={`ml-6 shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-heading text-cream"
                        : "bg-heading/6 text-heading group-hover:bg-heading/10"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 lg:columns-2 lg:gap-x-14 xl:gap-x-20">
                        {item.body.map((para, i) => (
                          <p key={i} className="text-text text-[17px] leading-[1.75] mb-4 last:mb-0 break-inside-avoid">
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
