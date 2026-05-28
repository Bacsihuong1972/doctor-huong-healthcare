import type { Lesson } from "@/types";

export const lessons: Lesson[] = [
  // ─────────────────────────────────────────────
  // CHẶNG 1: HIỂU BỆNH & CHỈ SỐ (bài 1–4)
  // ─────────────────────────────────────────────
  {
    id: 1,
    slug: "cuoc-song-binh-thuong-voi-tieu-duong",
    title: "Tôi bị tiểu đường rồi — cuộc sống có còn bình thường không?",
    chapter: "hieu-benh-va-chi-so",
    estimatedMinutes: 10,
    icon: "Heart",
    previewText:
      "Nhận chẩn đoán tiểu đường là một cú sốc — nhưng cuộc sống vẫn có thể tiếp tục bình thường và đầy đủ ý nghĩa.",
    hasSafetyAlert: true,
    videoUrl: undefined,
    content: {
      openingLine:
        "Cô chú vừa cầm tờ kết quả xét nghiệm và đọc hai từ 'tiểu đường' — cảm giác đó như thế nào?",
      simpleSummary:
        "Tiểu đường type 2 là bệnh mạn tính, nhưng hoàn toàn có thể kiểm soát được. Hàng triệu người đang sống tốt với bệnh này khi hiểu và chăm sóc bản thân đúng cách.",
      actionToday:
        "Hôm nay, hãy nói chuyện với một người thân về việc cô chú bắt đầu tìm hiểu về bệnh — sự đồng hành của gia đình là nguồn động lực lớn nhất.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Gia đình sum họp bên mâm cơm — niềm vui giản dị của cuộc sống hằng ngày",
      body: [
        "Nhận chẩn đoán tiểu đường không có nghĩa là cuộc sống của cô chú kết thúc. Ngược lại, đây là lúc cô chú bắt đầu hiểu cơ thể mình hơn để chăm sóc nó tốt hơn.",
        "Tiểu đường type 2 khác với tiểu đường type 1. Ở type 2, cơ thể vẫn sản xuất insulin nhưng không sử dụng nó hiệu quả — gọi là 'đề kháng insulin'. Đây là quá trình phát triển dần dần trong nhiều năm, và cũng có thể được cải thiện dần dần.",
        "Bệnh này không cần phải dẫn đến mù mắt, cắt chân hay suy thận. Những biến chứng đó chỉ xảy ra khi đường huyết cao kéo dài nhiều năm mà không được kiểm soát. Cô chú đang học bài này — nghĩa là cô chú đã đi đúng hướng.",
        "Bữa cơm Việt Nam — với cơm, rau, canh, thịt cá — hoàn toàn có thể điều chỉnh để phù hợp với người tiểu đường mà không cần bỏ cơm hay kiêng cữ cực đoan.",
        "Trong 28 ngày tới, chúng ta sẽ cùng nhau xây dựng từng thói quen nhỏ, áp dụng ngay trong bữa ăn hằng ngày. Không áp lực, không hoàn hảo — chỉ cần tiến từng bước.",
        "Điều quan trọng nhất cô chú cần nhớ: thuốc, bữa ăn, vận động và theo dõi là bốn trụ cột — không thứ nào thay thế được thứ kia. Cả bốn cùng hoạt động mới cho kết quả tốt nhất.",
      ],
      safetyAlerts: [
        {
          type: "default",
          message:
            "Nội dung này nhằm mục đích giáo dục sức khỏe. Không tự ý ngưng thuốc, đổi liều thuốc hoặc thay đổi insulin khi chưa trao đổi với bác sĩ điều trị.",
        },
      ],
      quiz: [
        {
          id: "q1-1",
          question:
            "Tiểu đường type 2 là do cơ thể không sản xuất được insulin nào cả — đúng hay sai?",
          options: [
            "Sai — type 2 vẫn có insulin nhưng tế bào không dùng được hiệu quả",
            "Đúng — type 2 hoàn toàn không có insulin",
          ],
          correctIndex: 0,
          explanation:
            "Đúng rồi! Tiểu đường type 2 đặc trưng bởi 'đề kháng insulin' — tụy vẫn tiết insulin nhưng tế bào không phản ứng tốt với nó. Khác với type 1, nơi tụy hầu như không còn tiết insulin.",
        },
        {
          id: "q1-2",
          question:
            "Biến chứng tiểu đường (mù mắt, tổn thương thận) xảy ra như thế nào?",
          options: [
            "Là kết quả của đường huyết cao kéo dài nhiều năm không kiểm soát",
            "Xảy ra ngay sau khi được chẩn đoán tiểu đường",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Biến chứng không xảy ra tức thì — đây là kết quả tích lũy nhiều năm. Điều đó có nghĩa là cô chú còn thời gian và cơ hội để thay đổi hướng đi.",
        },
      ],
      sources: [
        "Hội Nội tiết - Đái tháo đường Việt Nam (VADE), Hướng dẫn chẩn đoán và điều trị đái tháo đường type 2 (2023)",
        "American Diabetes Association, Standards of Medical Care in Diabetes (2024)",
        "Bác sĩ Nguyễn Thị Hương, Khung chương trình 'Hiểu đúng tiểu đường' (2024)",
      ],
    },
  },
  {
    id: 2,
    slug: "duong-huyet-va-chia-khoa-insulin",
    title: "Đường huyết và chiếc chìa khóa insulin",
    chapter: "hieu-benh-va-chi-so",
    estimatedMinutes: 10,
    icon: "Key",
    previewText:
      "Hiểu cơ chế đường huyết và insulin qua hình ảnh chiếc chìa khóa — nền tảng để hiểu tất cả các bài học tiếp theo.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Mỗi tế bào trong cơ thể cô chú cần glucose để sống — nhưng glucose không thể tự vào tế bào. Nó cần một chiếc chìa khóa.",
      simpleSummary:
        "Insulin là chiếc chìa khóa mở cửa tế bào để glucose vào tạo năng lượng. Ở người tiểu đường type 2, ổ khóa bị kẹt — tụy phải làm việc nhiều hơn nhưng ít hiệu quả hơn.",
      actionToday:
        "Khi ăn cơm hôm nay, hãy tưởng tượng glucose đang di chuyển trong máu và insulin đang cố gắng mở cửa tế bào — điều đó giúp cô chú hiểu tại sao bữa ăn quan trọng.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1576671414121-aa2d80e5f0d6?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Hình ảnh kính hiển vi cho thấy cấu trúc tế bào — nơi glucose và insulin hoạt động",
      body: [
        "Mỗi khi cô chú ăn cơm, bánh, trái cây — thức ăn được tiêu hóa thành glucose và đổ vào máu. Đường huyết bắt đầu tăng.",
        "Tụy tạng (lá tụy) nhận được tín hiệu 'đường huyết đang tăng' và tiết ra insulin. Insulin là một loại hormone — và hãy hình dung nó như chiếc chìa khóa.",
        "Mỗi tế bào có một ổ khóa đặc biệt. Khi insulin (chìa) gắn vào ổ khóa, cửa tế bào mở ra và glucose đi vào. Trong tế bào, glucose được 'đốt cháy' tạo ra năng lượng để cô chú đi đứng, suy nghĩ, thở.",
        "Ở người tiểu đường type 2, qua nhiều năm ăn nhiều tinh bột và ít vận động, tế bào dần 'quen' với insulin và bắt đầu phớt lờ nó — gọi là đề kháng insulin. Ổ khóa bị kẹt.",
        "Tụy phải tiết ngày càng nhiều insulin hơn để bù lại. Sau nhiều năm 'làm việc quá tải', tụy mệt mỏi dần và không còn tiết đủ insulin nữa. Glucose tích lại trong máu — đường huyết cao.",
        "Hiểu điều này giúp cô chú thấy rõ: mỗi bữa ăn ít tinh bột hơn, mỗi lần vận động sau ăn đều giúp giảm gánh nặng cho tụy và cải thiện độ nhạy của tế bào với insulin.",
      ],
      quiz: [
        {
          id: "q2-1",
          question: "Insulin có vai trò gì trong cơ thể?",
          options: [
            "Mở cửa tế bào để glucose đi vào tạo năng lượng",
            "Trực tiếp đốt cháy glucose trong máu",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Insulin như chiếc chìa khóa mở cửa tế bào. Không có insulin (hoặc tế bào không phản ứng với insulin), glucose không vào được tế bào và tích lại trong máu.",
        },
        {
          id: "q2-2",
          question: "Đề kháng insulin là gì?",
          options: [
            "Tế bào không còn phản ứng tốt với insulin, nên glucose khó vào tế bào",
            "Cơ thể tiết quá nhiều insulin đến mức nguy hiểm",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Đề kháng insulin là trung tâm của tiểu đường type 2. Tụy vẫn tiết insulin nhưng tế bào 'không nghe lời' — glucose ở lại trong máu cao hơn bình thường.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, NXB Hachette",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Tài liệu giáo dục bệnh nhân tiểu đường type 2 (2023)",
      ],
    },
  },
  {
    id: 3,
    slug: "ba-con-so-can-thuoc",
    title: "Ba con số cô chú cần thuộc lòng",
    chapter: "hieu-benh-va-chi-so",
    estimatedMinutes: 12,
    icon: "BarChart2",
    previewText:
      "HbA1c, đường huyết lúc đói, đường huyết sau ăn — ba chỉ số này nói lên tất cả về tình trạng kiểm soát đường huyết của cô chú.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "HbA1c 7.2%, đường huyết lúc đói 8.4 mmol/L — những con số này có nghĩa gì? Hôm nay cô chú sẽ hiểu rõ.",
      simpleSummary:
        "Ba chỉ số cốt lõi: HbA1c (tình trạng 3 tháng qua), đường huyết lúc đói (nền tảng), và đường huyết sau ăn (phản ứng với bữa ăn). Hiểu ba số này giúp cô chú tự đánh giá tiến trình.",
      actionToday:
        "Lấy phiếu xét nghiệm gần nhất ra và tìm ba chỉ số này. Ghi chúng vào một tờ giấy nhỏ giữ trong ví để nhớ.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Phiếu kết quả xét nghiệm máu với các chỉ số được đánh dấu rõ ràng",
      body: [
        "**Chỉ số 1 — HbA1c (%):** Đây là chỉ số phản ánh mức đường huyết trung bình trong 2–3 tháng qua. Bình thường: dưới 5.7%. Tiền tiểu đường: 5.7–6.4%. Tiểu đường: từ 6.5% trở lên. Mục tiêu điều trị thông thường cho người tiểu đường type 2: dưới 7% (hỏi bác sĩ mục tiêu cụ thể của cô chú).",
        "**Tại sao HbA1c quan trọng?** Đường huyết đo tại chỗ chỉ cho biết tình trạng lúc đó. HbA1c cho biết 'điểm trung bình của 3 tháng' — không thể giả vờ bằng cách nhịn ăn trước khi xét nghiệm.",
        "**Chỉ số 2 — Đường huyết lúc đói (mmol/L):** Đo sau khi nhịn ăn tối thiểu 8 tiếng (thường buổi sáng). Bình thường: 3.9–5.6 mmol/L. Người tiểu đường type 2 (mục tiêu điều trị): 4.4–7.2 mmol/L.",
        "**Chỉ số 3 — Đường huyết sau ăn (mmol/L):** Đo 2 giờ sau bữa ăn. Bình thường: dưới 7.8 mmol/L. Mục tiêu cho người tiểu đường type 2: dưới 10 mmol/L (2 giờ sau ăn).",
        "**Đọc phiếu xét nghiệm:** Cột 'Kết quả' là số đo của cô chú. Cột 'Tham chiếu' là khoảng bình thường. Kết quả nằm ngoài khoảng tham chiếu sẽ có dấu * hoặc in đậm.",
        "**Lưu ý:** Mục tiêu đường huyết khác nhau với mỗi người. Người lớn tuổi, có bệnh đi kèm có thể có mục tiêu HbA1c khác (ví dụ dưới 8%). Hỏi bác sĩ mục tiêu cụ thể của cô chú.",
      ],
      quiz: [
        {
          id: "q3-1",
          question: "HbA1c cho biết điều gì?",
          options: [
            "Mức đường huyết trung bình trong 2–3 tháng qua",
            "Đường huyết tại thời điểm lấy máu xét nghiệm",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! HbA1c phản ánh mức đường huyết trung bình dài hạn, không thể thay đổi bằng cách nhịn ăn trước xét nghiệm — đó là lý do nó là chỉ số quan trọng nhất trong theo dõi tiểu đường.",
        },
        {
          id: "q3-2",
          question:
            "Mục tiêu đường huyết sau ăn 2 tiếng cho người tiểu đường type 2 thường là bao nhiêu?",
          options: ["Dưới 10 mmol/L", "Dưới 15 mmol/L"],
          correctIndex: 0,
          explanation:
            "Chính xác! Mục tiêu chung là dưới 10 mmol/L sau ăn 2 tiếng — nhưng mục tiêu có thể khác nhau với từng người. Hỏi bác sĩ điều trị của cô chú.",
        },
      ],
      sources: [
        "Hội Nội tiết - Đái tháo đường Việt Nam (VADE), Hướng dẫn chẩn đoán và điều trị đái tháo đường type 2 (2023)",
        "American Diabetes Association, Standards of Medical Care in Diabetes (2024), Section 6",
      ],
    },
  },
  {
    id: 4,
    slug: "ban-do-suc-khoe-cua-toi",
    title: "Lập bản đồ sức khỏe của tôi",
    chapter: "hieu-benh-va-chi-so",
    estimatedMinutes: 10,
    icon: "Map",
    previewText:
      "Nhìn tổng thể tình trạng sức khỏe của mình — không chỉ đường huyết mà còn huyết áp, mỡ máu, chức năng thận và mắt.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Tiểu đường không phải chỉ là đường huyết — nó ảnh hưởng đến toàn bộ cơ thể. Biết 'bản đồ' sức khỏe của mình giúp cô chú chủ động hơn.",
      simpleSummary:
        "Người tiểu đường cần theo dõi nhiều hơn chỉ đường huyết: huyết áp, mỡ máu (LDL), chức năng thận (creatinine, microalbumin), và khám mắt định kỳ. Đây là 'bản đồ toàn diện'.",
      actionToday:
        "Kiểm tra xem trong phiếu xét nghiệm gần nhất có mấy trong số các chỉ số này chưa: HbA1c, huyết áp, cholesterol LDL, creatinine. Chưa có thì hỏi bác sĩ trong lần tái khám tới.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Bác sĩ và bệnh nhân ngồi trao đổi thân thiện về kết quả xét nghiệm",
      body: [
        "**Đường huyết và HbA1c:** Chúng ta đã học ở bài 3. Đây là chỉ số trung tâm nhưng không phải là duy nhất.",
        "**Huyết áp:** Người tiểu đường type 2 thường có nguy cơ cao huyết áp — và hai bệnh này cộng hưởng làm tăng nguy cơ tim mạch. Mục tiêu huyết áp cho người tiểu đường: dưới 130/80 mmHg (nhiều người đạt được bằng thuốc và điều chỉnh lối sống).",
        "**Mỡ máu (Lipid):** Đặc biệt là LDL-cholesterol ('mỡ xấu'). Mục tiêu thông thường: LDL dưới 2.6 mmol/L (với người có nguy cơ tim mạch cao, có thể cần dưới 1.8 mmol/L).",
        "**Chức năng thận:** Xét nghiệm creatinine và eGFR đánh giá thận đang hoạt động tốt đến đâu. Microalbumin niệu (microalbuminuria) phát hiện sớm tổn thương thận khi chưa có triệu chứng.",
        "**Khám mắt:** Khám đáy mắt (fundus) ít nhất 1 lần mỗi năm để phát hiện sớm bệnh võng mạc tiểu đường — thường không có triệu chứng ở giai đoạn sớm.",
        "**Khám bàn chân:** Kiểm tra cảm giác và tuần hoàn ở bàn chân ít nhất 1 lần mỗi năm. Nhiều vấn đề ở bàn chân có thể ngăn ngừa được nếu phát hiện sớm.",
        "**Lịch theo dõi gợi ý:** HbA1c — 3–6 tháng/lần; Huyết áp — mỗi lần tái khám; Lipid — ít nhất 1 lần/năm; Chức năng thận — 1 lần/năm; Khám mắt — 1 lần/năm.",
      ],
      quiz: [
        {
          id: "q4-1",
          question:
            "Ngoài đường huyết, người tiểu đường cần theo dõi thêm những gì?",
          options: [
            "Huyết áp, mỡ máu (LDL), chức năng thận và khám mắt định kỳ",
            "Chỉ cần theo dõi đường huyết là đủ",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Tiểu đường ảnh hưởng đến mạch máu toàn thân. Theo dõi toàn diện giúp phát hiện và ngăn ngừa biến chứng sớm hơn.",
        },
        {
          id: "q4-2",
          question: "Tại sao cần khám đáy mắt định kỳ dù mắt vẫn nhìn bình thường?",
          options: [
            "Vì bệnh võng mạc tiểu đường thường không có triệu chứng ở giai đoạn sớm",
            "Chỉ cần khám khi thấy mắt mờ",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Bệnh võng mạc tiểu đường giai đoạn sớm hoàn toàn không có triệu chứng. Khám định kỳ giúp phát hiện và điều trị trước khi ảnh hưởng đến thị lực.",
        },
      ],
      sources: [
        "American Diabetes Association, Standards of Medical Care in Diabetes (2024), Section 11–12",
        "Hội Nội tiết - Đái tháo đường Việt Nam (VADE), Hướng dẫn theo dõi biến chứng (2023)",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // CHẶNG 2: BỮA CƠM VIỆT (bài 5–8)
  // ─────────────────────────────────────────────
  {
    id: 5,
    slug: "mam-com-ba-vung-an-toan",
    title: "Mâm cơm ba vùng an toàn",
    chapter: "bua-com-viet",
    estimatedMinutes: 12,
    icon: "Layers",
    previewText:
      "Cách chia đĩa ăn theo 'ba vùng' đơn giản — nửa đĩa rau, một phần tư đạm, một phần tư tinh bột — áp dụng ngay vào bữa cơm Việt.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Không cần cân đo từng gram — chỉ cần nhìn vào đĩa và tự hỏi: 'Rau có đủ nửa đĩa không?'",
      simpleSummary:
        "Phương pháp 'ba vùng': nửa đĩa rau xanh và rau củ, một phần tư đạm (thịt/cá/đậu), một phần tư tinh bột (cơm/bún). Đơn giản, không cần cân, phù hợp với mâm cơm Việt.",
      actionToday:
        "Bữa cơm hôm nay, trước khi ăn hãy nhìn vào mâm và xếp thức ăn theo 'ba vùng'. Rau có chiếm đủ nửa đĩa không?",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Mâm cơm Việt cân đối với rau, cá kho và cơm — bố cục đẹp trên bàn gỗ",
      body: [
        "Phương pháp 'đĩa ăn' (plate method) được Hội Tiểu đường Mỹ và nhiều tổ chức y tế khuyến nghị vì đơn giản và hiệu quả — không cần cân, không cần tính calo.",
        "**Vùng 1 — Nửa đĩa: Rau xanh và rau củ.** Rau muống, rau lang, bắp cải, cà rốt, bí đỏ, cà chua, dưa leo — bất kỳ loại rau nào cô chú thích. Canh rau cũng tính. Rau không chỉ có ít calo mà còn giàu chất xơ giúp làm chậm đường huyết.",
        "**Vùng 2 — Một phần tư đĩa: Đạm.** Cá, thịt nạc, đậu phụ, trứng, tôm. Đạm giúp no lâu và làm chậm hấp thu glucose từ tinh bột. Ưu tiên cá và đậu phụ hơn thịt đỏ nhiều mỡ.",
        "**Vùng 3 — Một phần tư đĩa: Tinh bột.** Cơm, bún, khoai, bắp. Không phải bỏ tinh bột — chỉ cần giảm phần và cân bằng với rau và đạm. Một chén cơm nhỏ (khoảng 100–150g cơm chín) là phù hợp cho hầu hết mọi người.",
        "**Áp dụng vào mâm cơm Việt:** Bữa cơm Việt thường có canh, một món rau và một món mặn — đây là cấu trúc lý tưởng! Chỉ cần điều chỉnh tỉ lệ: ăn nhiều canh và rau hơn, ít cơm hơn một chút.",
        "**Bắt đầu từ rau:** Theo thứ tự ăn được khuyến nghị, hãy ăn phần rau/canh rau trước, sau đó đến đạm, cuối cùng mới ăn cơm. Thứ tự này giúp đường huyết sau ăn ổn định hơn.",
      ],
      quiz: [
        {
          id: "q5-1",
          question: "Trong phương pháp ba vùng, rau nên chiếm bao nhiêu phần đĩa?",
          options: ["Nửa đĩa (½)", "Một phần tư đĩa (¼)"],
          correctIndex: 0,
          explanation:
            "Đúng! Rau xanh và rau củ chiếm nửa đĩa — đây là nền tảng của bữa ăn cân đối cho người tiểu đường. Rau cung cấp chất xơ giúp kiểm soát đường huyết.",
        },
        {
          id: "q5-2",
          question:
            "Phương pháp ba vùng có nghĩa là cô chú phải bỏ hoàn toàn cơm không?",
          options: [
            "Không — tinh bột vẫn có một phần tư đĩa, chỉ giảm lượng",
            "Có — người tiểu đường không được ăn cơm",
          ],
          correctIndex: 0,
          explanation:
            "Hoàn toàn đúng! Cơm vẫn có trong bữa ăn, chỉ chiếm một phần nhỏ hơn và được cân bằng với rau và đạm. Bỏ hoàn toàn cơm không cần thiết và khó duy trì.",
        },
      ],
      sources: [
        "American Diabetes Association, Diabetes Plate Method (2023)",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn dinh dưỡng cho người tiểu đường type 2",
      ],
    },
  },
  {
    id: 6,
    slug: "com-bun-pho-chao-cach-doi",
    title: "Cơm, bún, phở, cháo — cách đổi",
    chapter: "bua-com-viet",
    estimatedMinutes: 14,
    icon: "RefreshCw",
    previewText:
      "Những món quen thuộc nhất của người Việt — cơm trắng, bún bò, phở, cháo — và cách điều chỉnh để phù hợp hơn với người tiểu đường.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Cô chú không cần bỏ bún, phở hay cháo — chỉ cần biết cách ăn khéo hơn một chút.",
      simpleSummary:
        "Cơm gạo lứt, bún chạo, phở với nhiều rau và ít sợi, cháo có thêm đạm — đây là những điều chỉnh nhỏ giúp giảm tác động lên đường huyết mà không mất đi hương vị quen thuộc.",
      actionToday:
        "Nếu hôm nay ăn phở hoặc bún, hãy thử ăn hết phần rau sống/giá đỗ trước khi ăn sợi bún hay bánh phở.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Tô phở Việt Nam với rau sống, giá đỗ phong phú — bữa ăn đầy màu sắc",
      body: [
        "**Cơm trắng:** Cơm trắng có chỉ số đường huyết (GI) khá cao. Cô chú có thể thay 30–50% cơm trắng bằng cơm gạo lứt (GI thấp hơn, nhiều chất xơ hơn). Hoặc trộn lẫn: 1 phần gạo lứt với 2 phần gạo trắng để thích nghi dần. Cũng có thể để cơm nguội trước khi ăn — tinh bột lạnh hấp thu chậm hơn.",
        "**Bún, bún bò, bún riêu:** Bún có GI tương tự cơm trắng. Hãy gọi 'nhỏ' hoặc ăn ít hơn nửa phần bún, thay vào đó ăn nhiều rau, giá đỗ và thịt/cá hơn. Ăn rau trước khi ăn bún.",
        "**Phở:** Phở có nhiều rau thơm, giá đỗ đi kèm — đây là lợi thế! Ăn rau và giá đỗ trước. Yêu cầu ít bánh phở hơn. Không thêm đường vào nước phở.",
        "**Cháo:** Cháo trắng có GI rất cao (cao hơn cơm) vì tinh bột đã bị phá vỡ hoàn toàn. Tuy nhiên, cháo cá, cháo thịt, cháo hải sản (có đạm) tốt hơn cháo trắng. Thêm rau vào cháo cũng giúp làm chậm hấp thu.",
        "**Mì, hủ tiếu:** Tương tự bún — ưu tiên ăn ít sợi, thêm nhiều rau và đạm.",
        "**Bánh mì:** Bánh mì trắng có GI cao. Ưu tiên bánh mì nguyên cám (whole wheat). Luôn ăn kèm trứng, thịt, rau — không ăn bánh mì không hay chỉ với bơ ngọt.",
        "**Nguyên tắc chung:** Ăn rau trước. Giảm lượng tinh bột xuống một phần tư bữa ăn. Tăng rau và đạm. Không bỏ hoàn toàn — chỉ điều chỉnh tỉ lệ.",
      ],
      quiz: [
        {
          id: "q6-1",
          question:
            "Cháo trắng so với cơm trắng thì ảnh hưởng đến đường huyết như thế nào?",
          options: [
            "Cháo trắng thường làm đường huyết tăng nhanh hơn vì tinh bột đã bị phá vỡ hoàn toàn",
            "Cháo trắng tốt hơn cơm vì dạng lỏng dễ tiêu hóa",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Nấu cháo phá vỡ cấu trúc tinh bột hoàn toàn, giúp glucose hấp thu rất nhanh. Cháo có đạm (cháo cá, cháo thịt) tốt hơn cháo trắng vì có đạm làm chậm lại.",
        },
        {
          id: "q6-2",
          question: "Khi ăn phở, cô chú nên làm gì để giảm tác động lên đường huyết?",
          options: [
            "Ăn rau và giá đỗ trước, yêu cầu ít bánh phở hơn",
            "Uống hết nước phở và bỏ phần rau vì không cần thiết",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Phở có rau thơm và giá đỗ kèm theo là lợi thế — hãy ăn chúng trước. Ít bánh phở hơn, nhiều rau hơn là điều chỉnh đơn giản nhưng hiệu quả.",
        },
      ],
      sources: [
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn dinh dưỡng (2023)",
        "Atkinson FS et al. (2021), International tables of glycemic index and glycemic load, American Journal of Clinical Nutrition",
      ],
    },
  },
  {
    id: 7,
    slug: "trai-cay-an-qua-dung-uong-duong",
    title: "Trái cây ăn quả đúng, uống đường",
    chapter: "bua-com-viet",
    estimatedMinutes: 10,
    icon: "Apple",
    previewText:
      "Trái cây có đường nhưng cũng có chất xơ — điều quan trọng là ăn như thế nào và khi nào, không phải là tránh hoàn toàn.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Nhiều cô chú nghĩ rằng bị tiểu đường thì không được ăn trái cây nữa. Điều này không đúng — và cũng làm cuộc sống thiếu đi một niềm vui.",
      simpleSummary:
        "Trái cây có đường tự nhiên kèm chất xơ — ăn cả quả tốt hơn ép nước. Ăn sau bữa cơm thay vì lúc đói. Lượng vừa phải là chìa khóa, không phải kiêng hoàn toàn.",
      actionToday:
        "Nếu muốn ăn trái cây hôm nay, hãy ăn sau bữa cơm — không phải lúc đói hoặc thay bữa. Ăn cả quả, không ép nước.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Các loại trái cây tươi nhiều màu sắc — cam, ổi, thanh long, mận",
      body: [
        "**Tại sao trái cây không phải là 'đường xấu'?** Trái cây chứa fructose, glucose và sucrose tự nhiên — nhưng cũng chứa chất xơ, vitamin và chất chống oxy hóa. Chất xơ trong trái cây làm chậm hấp thu đường vào máu.",
        "**Ăn cả quả, không ép nước:** Khi ép nước, chất xơ bị loại bỏ, còn lại là đường và nước. Một ly nước ép trái cây bằng 3–4 trái và không có gì làm chậm đường huyết. Ăn cả quả luôn tốt hơn uống nước ép.",
        "**Thời điểm quan trọng:** Ăn trái cây sau bữa cơm chính là tốt nhất — khi đã có rau và đạm trong ruột, glucose từ trái cây hấp thu chậm hơn. Tránh ăn trái cây lúc đói hoặc thay bữa.",
        "**Trái cây có GI thấp hơn (ưu tiên):** Ổi, thanh long, táo, lê, bơ, dâu tây, bưởi. Ăn một phần nhỏ (khoảng 100–150g mỗi lần).",
        "**Trái cây cần ăn ít hơn:** Xoài, chuối chín, nho, dứa, chôm chôm, sầu riêng — những loại này có hàm lượng đường cao hơn, nên ăn lượng nhỏ hơn và chỉ ăn sau bữa.",
        "**Nước ép và sinh tố:** Nếu làm sinh tố, giữ nguyên cả thịt quả (không lọc bã), thêm rau lá xanh (rau cải), không thêm đường hay mật ong. Nhưng ăn cả quả vẫn tốt hơn.",
      ],
      quiz: [
        {
          id: "q7-1",
          question:
            "Tại sao ăn cả quả tốt hơn uống nước ép trái cây đối với người tiểu đường?",
          options: [
            "Vì ăn cả quả giữ được chất xơ, giúp đường hấp thu chậm hơn",
            "Vì nước ép có ít đường hơn trái cây nguyên quả",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Khi ép nước, chất xơ bị loại ra, chỉ còn đường và nước. Một ly nước ép có thể tương đương đường từ 3–4 trái — và không có gì làm chậm hấp thu.",
        },
        {
          id: "q7-2",
          question: "Khi nào nên ăn trái cây để ít ảnh hưởng đến đường huyết nhất?",
          options: [
            "Sau bữa cơm chính, khi đã có rau và đạm trong dạ dày",
            "Lúc đói buổi sáng để bổ sung năng lượng",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Sau bữa cơm, rau và đạm đã có trong ruột — đây là 'lớp đệm' làm chậm hấp thu đường từ trái cây. Ăn trái cây lúc đói không có lớp đệm này.",
        },
      ],
      sources: [
        "Atkinson FS et al. (2021), American Journal of Clinical Nutrition",
        "Muraki I et al. (2013), Fruit consumption and risk of type 2 diabetes, BMJ",
      ],
    },
  },
  {
    id: 8,
    slug: "di-cho-doc-nhan-chon-mon",
    title: "Đi chợ, đọc nhãn, chọn món",
    chapter: "bua-com-viet",
    estimatedMinutes: 12,
    icon: "ShoppingBag",
    previewText:
      "Kỹ năng thiết thực: đọc nhãn thực phẩm, nhận biết đường ẩn và chọn thực phẩm tốt hơn khi đi chợ hay siêu thị.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Hàng nghìn sản phẩm trên kệ siêu thị — biết đọc nhãn là biết mình đang ăn gì.",
      simpleSummary:
        "Cách đọc nhãn thực phẩm: tìm lượng đường, chất xơ và thành phần. Nhận biết đường ẩn qua các tên gọi khác nhau. Nguyên tắc chọn thực phẩm ở chợ và siêu thị.",
      actionToday:
        "Hôm nay, lấy một sản phẩm đóng gói trong nhà ra và tìm dòng 'Đường' trong bảng thành phần dinh dưỡng. Con số đó có hơn 5g trong một khẩu phần không?",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Người phụ nữ đọc nhãn sản phẩm tại siêu thị — kỹ năng quan trọng khi mua sắm",
      body: [
        "**Đọc nhãn: bốn dòng quan trọng nhất.**\n1. Khẩu phần (serving size) — tất cả số liệu đều tính cho lượng này, không phải cả gói\n2. Carbohydrate tổng — lượng bột đường trong một khẩu phần\n3. Đường (sugar) — phần carbohydrate là đường đơn, hấp thu nhanh\n4. Chất xơ (fiber) — càng cao càng tốt",
        "**Đường ẩn:** Trên nhãn thành phần (ingredients), đường có thể được gọi là: đường (sugar), sucrose, glucose, fructose, corn syrup, high-fructose corn syrup, maltose, dextrose, mật ong (honey), siro ngô, đường mía... Nếu một trong những tên này nằm trong 3 thành phần đầu — sản phẩm có nhiều đường.",
        "**Nguyên tắc 5g:** Cẩn thận với sản phẩm có hơn 5g đường trong một khẩu phần. Dưới 5g là tương đối an toàn hơn.",
        "**Chọn thực phẩm ở chợ truyền thống:** Thực phẩm ở chợ thường ít qua chế biến hơn siêu thị — rau tươi, cá tươi, thịt tươi. Ưu tiên mua những thứ này. Tránh các loại gia vị đóng gói sẵn có nhiều đường và muối.",
        "**Ở siêu thị — khu vực an toàn hơn:** Rau củ quả tươi, cá và thịt tươi/đông lạnh không ướp sẵn, đậu phụ, trứng, sữa chua không đường, các loại hạt không rang muối.",
        "**Ở siêu thị — cẩn thận hơn:** Đồ hộp (nhiều muối/đường), sản phẩm 'ăn kiêng' hay 'low-fat' (thường thêm đường để bù vị), nước ép trái cây đóng hộp, bánh gói ngọt/mặn.",
      ],
      quiz: [
        {
          id: "q8-1",
          question:
            "Trên nhãn thực phẩm, khi tìm 'đường ẩn' cô chú cần chú ý đến phần nào?",
          options: [
            "Phần Thành phần (ingredients) — tìm các tên gọi khác của đường như sucrose, syrup, fructose",
            "Chỉ cần xem màu sắc và hình ảnh bên ngoài bao bì",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Đường được gọi bằng nhiều tên khác nhau trong danh sách thành phần. Nếu một trong những tên này xuất hiện đầu danh sách — sản phẩm chứa nhiều đường.",
        },
        {
          id: "q8-2",
          question:
            "Sản phẩm ghi 'low-fat' (ít béo) có nghĩa là tốt cho người tiểu đường không?",
          options: [
            "Không nhất thiết — sản phẩm ít béo thường thêm đường để bù vị",
            "Có — ít béo luôn tốt cho người tiểu đường",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! 'Low-fat' thường có nghĩa là nhà sản xuất đã thêm đường để bù lại vị ngậy từ chất béo. Luôn kiểm tra dòng 'Đường' trên nhãn.",
        },
      ],
      sources: [
        "US Food and Drug Administration, How to Understand and Use the Nutrition Facts Label (2022)",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn đọc nhãn thực phẩm cho người tiểu đường",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // CHẶNG 3: THEO DÕI TẠI NHÀ (bài 9–12)
  // ─────────────────────────────────────────────
  {
    id: 9,
    slug: "tham-tu-duong-huyet",
    title: "Thám tử đường huyết — đo đúng, hiểu đúng",
    chapter: "theo-doi-tai-nha",
    estimatedMinutes: 15,
    icon: "Search",
    previewText:
      "Hướng dẫn đo đường huyết tại nhà đúng cách: khi nào đo, đo lúc nào trong ngày, và cách đọc kết quả.",
    hasSafetyAlert: true,
    videoUrl: undefined,
    content: {
      openingLine:
        "Máy đo đường huyết tại nhà là người bạn đồng hành quan trọng — nhưng chỉ hữu ích khi cô chú biết dùng đúng.",
      simpleSummary:
        "Đo đường huyết đúng thời điểm (lúc đói, 2h sau ăn) và ghi chép nhật ký giúp cô chú và bác sĩ thấy rõ 'câu chuyện đường huyết' của mình.",
      actionToday:
        "Nếu đã có máy đo, hôm nay đo đường huyết lúc đói (trước bữa sáng) và 2 giờ sau bữa trưa. Ghi lại cả hai con số.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Máy đo đường huyết cầm tay — thiết bị theo dõi sức khỏe tại nhà",
      body: [
        "**Có cần máy đo đường huyết tại nhà không?** Không phải tất cả mọi người đều cần đo hằng ngày. Hỏi bác sĩ xem cô chú có cần không, và nếu có thì đo tần suất nào.",
        "**Khi nào đo cho có ý nghĩa nhất:**\n- Trước bữa sáng (lúc đói): cho biết 'nền tảng' đường huyết của cô chú\n- 2 giờ sau bắt đầu bữa ăn: cho biết bữa ăn đó ảnh hưởng thế nào\n- Trước khi ngủ: cho biết đường huyết ban đêm\n- Khi có triệu chứng bất thường (run rẩy, vã mồ hôi, chóng mặt)",
        "**Kỹ thuật đo đúng:**\n1. Rửa tay bằng xà phòng và nước ấm, lau khô\n2. Lấy que thử và cắm vào máy\n3. Chích đầu ngón tay bên (ít đau hơn đầu ngón)\n4. Lau giọt máu đầu tiên (có thể bị pha loãng bởi dịch mô)\n5. Áp giọt máu thứ hai vào que thử\n6. Đọc kết quả sau 5–10 giây",
        "**Ghi nhật ký:** Ghi ngày, giờ đo, kết quả, và ghi chú bữa ăn trước đó. Đây là dữ liệu quý giá để bàn với bác sĩ.",
        "**Hiểu kết quả:** Một số đo bất thường không phải lúc nào cũng đáng lo. Quan trọng là xu hướng qua nhiều lần đo — không phải một con số đơn lẻ.",
        "**Khi nào cần gọi bác sĩ ngay:**\n- Đường huyết dưới 3.9 mmol/L kèm triệu chứng (run, vã mồ hôi)\n- Đường huyết trên 16.7 mmol/L và cảm thấy không khỏe\n- Đường huyết cao liên tục nhiều ngày dù đã uống thuốc đầy đủ",
      ],
      safetyAlerts: [
        {
          type: "medication",
          message:
            "Người đang dùng insulin hoặc thuốc có nguy cơ gây hạ đường huyết cần mang theo đường/kẹo bên người và biết cách xử trí hạ đường huyết. Đo đường huyết trước khi lái xe hoặc vận động mạnh.",
        },
      ],
      quiz: [
        {
          id: "q9-1",
          question:
            "Đo đường huyết sau ăn nên thực hiện vào thời điểm nào?",
          options: [
            "2 giờ sau khi bắt đầu bữa ăn",
            "Ngay lập tức sau khi ăn xong",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Đường huyết sau ăn đạt đỉnh khoảng 1–2 giờ sau khi bắt đầu bữa ăn. Đo lúc 2 giờ cho biết bữa ăn đó ảnh hưởng đến đường huyết như thế nào.",
        },
        {
          id: "q9-2",
          question:
            "Khi đo đường huyết, giọt máu nào nên dùng để có kết quả chính xác hơn?",
          options: [
            "Giọt máu thứ hai sau khi lau bỏ giọt đầu tiên",
            "Giọt máu đầu tiên ra",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Giọt máu đầu tiên có thể bị pha loãng bởi dịch mô. Lau đi và dùng giọt thứ hai sẽ cho kết quả chính xác hơn.",
        },
      ],
      sources: [
        "American Diabetes Association, Standards of Medical Care in Diabetes (2024), Section 7: Diabetes Technology",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn tự theo dõi đường huyết tại nhà",
      ],
    },
  },
  {
    id: 10,
    slug: "doc-ket-qua-may-do",
    title: "Đọc kết quả máy đo — số nào là tốt?",
    chapter: "theo-doi-tai-nha",
    estimatedMinutes: 12,
    icon: "Activity",
    previewText:
      "Hiểu ý nghĩa của con số trên máy đo, xác định mục tiêu cá nhân và nhận biết khi nào cần liên hệ bác sĩ.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Máy báo 9.2 mmol/L — cô chú có biết đây là tốt, trung bình hay cần lo không?",
      simpleSummary:
        "Ngưỡng đường huyết mục tiêu cho người tiểu đường type 2: lúc đói 4.4–7.2 mmol/L, sau ăn 2h dưới 10 mmol/L. Nhưng mục tiêu cụ thể của mỗi người có thể khác nhau.",
      actionToday:
        "Ghi vào điện thoại hoặc tờ giấy nhỏ: 'Mục tiêu của tôi: lúc đói X mmol/L, sau ăn Y mmol/L' — điền số theo chỉ dẫn của bác sĩ.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Màn hình máy tính bảng hiển thị biểu đồ theo dõi sức khỏe — dữ liệu đường huyết theo thời gian",
      body: [
        "**Bảng tham chiếu đường huyết (theo VADE 2023):**\n- Người không tiểu đường: lúc đói 3.9–5.6 mmol/L; sau ăn 2h dưới 7.8 mmol/L\n- Người tiểu đường type 2 (mục tiêu điều trị thông thường): lúc đói 4.4–7.2 mmol/L; sau ăn 2h dưới 10 mmol/L; HbA1c dưới 7%",
        "**Mục tiêu không phải một size cho tất cả:** Người lớn tuổi, có bệnh tim mạch hoặc dễ hạ đường huyết có thể có mục tiêu HbA1c cao hơn (dưới 8%). Người trẻ, khỏe mạnh có thể đặt mục tiêu chặt hơn. Hỏi bác sĩ mục tiêu cụ thể.",
        "**Đọc xu hướng, không chỉ đọc từng số:** Một kết quả 8.5 mmol/L sau ăn tối không phải là thảm họa. Quan trọng là: kết quả này có thường xuyên không? Có xu hướng tăng hay giảm qua nhiều tuần?",
        "**Nhật ký đường huyết:** Ghi chép đơn giản: ngày, giờ đo, kết quả, ăn gì trước đó. Sau 2 tuần, cô chú sẽ nhìn thấy 'bản đồ' đường huyết của mình — bữa ăn nào làm đường tăng cao, thói quen nào giúp ổn định hơn.",
        "**Khi thấy số cao:** Không hoảng loạn. Uống một ly nước, đi bộ nhẹ 10 phút, kiểm tra lại sau 1–2 giờ. Nếu vẫn cao và có triệu chứng (khát nhiều, tiểu nhiều, mệt), liên hệ bác sĩ.",
        "**Khi thấy số thấp (dưới 3.9 mmol/L):** Xử trí ngay — xem bài 14 về túi cứu hộ hạ đường huyết.",
      ],
      quiz: [
        {
          id: "q10-1",
          question:
            "Đường huyết lúc đói 7.0 mmol/L ở người tiểu đường type 2 đang điều trị là:",
          options: [
            "Trong phạm vi mục tiêu điều trị thông thường (4.4–7.2 mmol/L)",
            "Quá cao, cần đến cấp cứu ngay",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! 7.0 mmol/L nằm trong phạm vi mục tiêu điều trị thông thường. Tuy nhiên, mục tiêu cụ thể của từng người khác nhau — hỏi bác sĩ để biết con số mục tiêu của cô chú.",
        },
        {
          id: "q10-2",
          question:
            "Tại sao ghi nhật ký đường huyết quan trọng hơn là chỉ xem từng số lẻ?",
          options: [
            "Vì nhật ký cho thấy xu hướng theo thời gian — giúp nhận ra bữa ăn hay thói quen nào ảnh hưởng đến đường huyết",
            "Vì bác sĩ bắt buộc mọi người phải ghi",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Một số đo đơn lẻ không nói lên nhiều. Nhật ký 2–4 tuần cho thấy 'bản đồ đường huyết' cá nhân — thông tin quý báu để điều chỉnh bữa ăn và thuốc.",
        },
      ],
      sources: [
        "Hội Nội tiết - Đái tháo đường Việt Nam (VADE), Hướng dẫn chẩn đoán và điều trị đái tháo đường type 2 (2023)",
        "American Diabetes Association, Standards of Medical Care in Diabetes (2024)",
      ],
    },
  },
  {
    id: 11,
    slug: "chiec-can-khong-phai-tham-phan",
    title: "Chiếc cân không phải thám phán",
    chapter: "theo-doi-tai-nha",
    estimatedMinutes: 14,
    icon: "Scale",
    previewText:
      "Cân nặng và vòng eo liên quan chặt chẽ đến tiểu đường — nhưng mục tiêu không phải là gầy, mà là giảm 5–10% cân nặng một cách bền vững.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Cái cân trong nhà tắm không phải là thám phán phán xét cô chú — nó chỉ là một trong nhiều công cụ theo dõi.",
      simpleSummary:
        "Giảm 5–10% cân nặng (ví dụ từ 70kg xuống 63–66kg) đã có thể cải thiện đáng kể đường huyết. Quan trọng hơn số cân là vòng eo — mỡ bụng ảnh hưởng đến đề kháng insulin nhiều nhất.",
      actionToday:
        "Đo vòng eo hôm nay: dùng thước dây đo quanh rốn. Nam: trên 90cm là cần giảm. Nữ: trên 80cm là cần giảm.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Người đi bộ trong công viên buổi sáng — vận động nhẹ nhàng là nền tảng kiểm soát cân nặng",
      body: [
        "**Tại sao cân nặng quan trọng với tiểu đường?** Mỡ thừa — đặc biệt là mỡ bụng — tiết ra các chất kích thích đề kháng insulin. Giảm mỡ bụng có thể cải thiện đường huyết rõ rệt ngay cả khi cân nặng chỉ giảm ít.",
        "**Mục tiêu thực tế:** Không cần đạt cân nặng 'lý tưởng'. Nghiên cứu cho thấy giảm 5–10% cân nặng ban đầu đã có thể:\n- Giảm HbA1c từ 0.5–1%\n- Giảm huyết áp\n- Cải thiện mỡ máu\n- Một số người đạt được 'thuyên giảm' tiểu đường (đường huyết trở về mức bình thường mà không cần thuốc)",
        "**Vòng eo quan trọng hơn BMI:** Mỡ nội tạng (mỡ bao quanh các cơ quan trong bụng) mới là loại mỡ nguy hiểm nhất. Người có cân nặng bình thường nhưng vòng eo lớn vẫn có nguy cơ cao. Ngược lại, người thừa cân nhưng vòng eo nhỏ hơn có nguy cơ thấp hơn.",
        "**Không cần giảm cân nhanh:** Giảm 0.5–1 kg mỗi tuần là an toàn và bền vững. Giảm nhanh hơn có thể làm mất cơ bắp và khó duy trì.",
        "**Cách giảm cân phù hợp với người tiểu đường:**\n- Giảm khẩu phần tinh bột theo phương pháp ba vùng\n- Thêm rau và đạm vào mỗi bữa\n- Vận động sau ăn mỗi ngày\n- Ngủ đủ giấc (thiếu ngủ làm tăng đề kháng insulin)\n- Không cần nhịn đói",
        "**Cân khi nào:** Cân vào buổi sáng sau khi đi vệ sinh, trước khi ăn sáng. Cân cùng điều kiện mỗi lần để so sánh chính xác. Cân 1–2 lần mỗi tuần là đủ.",
      ],
      quiz: [
        {
          id: "q11-1",
          question:
            "Giảm bao nhiêu phần trăm cân nặng đã có thể cải thiện đáng kể đường huyết?",
          options: [
            "5–10% cân nặng ban đầu",
            "Cần giảm ít nhất 30% mới có tác dụng",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Giảm 5–10% cân nặng (ví dụ từ 70kg xuống 63–66kg) đã có thể giảm HbA1c, huyết áp và cải thiện mỡ máu đáng kể. Mục tiêu nhỏ, kết quả thực tế.",
        },
        {
          id: "q11-2",
          question:
            "Tại sao vòng eo lại quan trọng hơn cân nặng tổng thể đối với nguy cơ tiểu đường?",
          options: [
            "Vì mỡ bụng (mỡ nội tạng) là loại mỡ gây đề kháng insulin nhiều nhất",
            "Vì cân nặng không liên quan đến tiểu đường",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Mỡ nội tạng (bao quanh các cơ quan trong bụng) tiết ra nhiều chất kích thích đề kháng insulin hơn so với mỡ dưới da ở đùi hay tay.",
        },
      ],
      sources: [
        "Look AHEAD Research Group (2013), Cardiovascular effects of intensive lifestyle intervention in type 2 diabetes, NEJM",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn kiểm soát cân nặng trong tiểu đường type 2",
      ],
    },
  },
  {
    id: 12,
    slug: "van-dong-sau-bua-an",
    title: "Vận động sau bữa ăn — 10 phút đủ rồi",
    chapter: "theo-doi-tai-nha",
    estimatedMinutes: 10,
    icon: "Footprints",
    previewText:
      "Vì sao 10 phút đi bộ nhẹ sau ăn hiệu quả hơn 30 phút tập gym lúc đói — và cách bắt đầu từ hôm nay.",
    hasSafetyAlert: true,
    videoUrl: undefined,
    content: {
      openingLine:
        "Không cần phòng gym, không cần quần áo thể thao — chỉ cần đôi dép và 10 phút.",
      simpleSummary:
        "Vận động nhẹ sau ăn giúp cơ bắp hấp thu glucose trực tiếp từ máu mà không cần insulin. 10 phút đi bộ nhẹ sau ăn có thể giảm đường huyết sau bữa đáng kể.",
      actionToday:
        "Sau bữa tối hôm nay, đứng dậy và đi bộ nhẹ 10 phút — quanh nhà, ra sân trước, hoặc trong ngõ. Bắt đầu trong vòng 30 phút sau khi ăn xong.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Người lớn tuổi đi bộ trong công viên buổi chiều — vận động nhẹ nhàng sau bữa ăn",
      body: [
        "**Tại sao vận động sau ăn đặc biệt hiệu quả?** Khi cơ bắp hoạt động, chúng có thể hấp thu glucose trực tiếp từ máu mà không cần insulin — thông qua một cơ chế khác. Đây là 'lối tắt' giúp hạ đường huyết nhanh và tự nhiên.",
        "**Nghiên cứu nói gì?** Chỉ 10–15 phút đi bộ nhẹ sau ăn có thể giảm đường huyết sau bữa đáng kể so với ngồi yên. Hiệu quả tốt nhất khi bắt đầu trong vòng 30 phút sau ăn.",
        "**Hình thức vận động phù hợp:**\n- Đi bộ nhẹ trong nhà hoặc quanh sân\n- Làm việc nhà nhẹ nhàng: rửa bát, tưới cây, quét nhà\n- Đứng lên đi lại thay vì nằm ngay sau ăn\n- Đạp xe đạp tại chỗ (loại nhỏ để trong nhà)\n- Bài tập ngồi ghế (chair exercises) nếu khó đi lại",
        "**Không cần mạnh — chỉ cần di chuyển:** Đi bộ chậm, thoải mái là đủ. Không cần đổ mồ hôi, không cần đau chân. Mục tiêu là cơ bắp hoạt động — dù nhẹ.",
        "**Vận động xa bữa ăn cũng tốt:** 30 phút đi bộ vào buổi sáng hoặc chiều cũng rất có ích — cải thiện độ nhạy insulin chung, giúp cơ thể 'nghe' insulin tốt hơn suốt ngày.",
        "**Bắt đầu từ đâu nếu chưa quen vận động:** Đi bộ 5 phút sau mỗi bữa ăn trong tuần đầu. Tăng dần lên 10, 15, 20 phút theo tuần. Không cần đặt mục tiêu quá lớn ngay từ đầu.",
      ],
      safetyAlerts: [
        {
          type: "exercise",
          message:
            "Người đang dùng insulin hoặc thuốc sulfonylure: đo đường huyết trước khi vận động. Mang theo kẹo hoặc đường trong người. Nếu thấy run rẩy, vã mồ hôi hoặc chóng mặt khi đang vận động — dừng lại ngay và ăn/uống gì đó có đường.",
        },
      ],
      quiz: [
        {
          id: "q12-1",
          question:
            "Tại sao vận động sau ăn đặc biệt có lợi cho đường huyết?",
          options: [
            "Vì cơ bắp hấp thu glucose trực tiếp từ máu mà không cần insulin khi đang hoạt động",
            "Vì vận động làm cơ thể tiết thêm insulin",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Đây là cơ chế đặc biệt của vận động — cơ bắp đang hoạt động có thể 'mở cửa' riêng để nhận glucose mà không cần chìa khóa insulin.",
        },
        {
          id: "q12-2",
          question:
            "Người dùng insulin cần làm gì trước khi bắt đầu vận động?",
          options: [
            "Đo đường huyết và mang theo kẹo/đường đề phòng hạ đường huyết",
            "Không cần chuẩn bị gì, vận động là luôn an toàn",
          ],
          correctIndex: 0,
          explanation:
            "Rất quan trọng! Vận động làm giảm đường huyết — với người dùng insulin, có thể xảy ra hạ đường huyết. Đo trước và mang theo đường dự phòng là biện pháp an toàn cần thiết.",
        },
      ],
      sources: [
        "DiPietro L et al. (2013), Three 15-min bouts of moderate postmeal walking, Diabetes Care",
        "Reynolds AN et al. (2020), Advice to walk after meals is more effective for lowering postprandial glycaemia in type 2 diabetes, Diabetologia",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // CHẶNG 4: SỐNG AN TOÀN (bài 13–16)
  // ─────────────────────────────────────────────
  {
    id: 13,
    slug: "thuoc-khong-phai-that-bai",
    title: "Thuốc không phải thất bại",
    chapter: "song-an-toan",
    estimatedMinutes: 10,
    icon: "Pill",
    previewText:
      "Nhiều người cảm thấy 'thất bại' khi phải dùng thuốc hoặc chuyển sang insulin. Bài này giúp thay đổi góc nhìn đó.",
    hasSafetyAlert: true,
    videoUrl: undefined,
    content: {
      openingLine:
        "Phải uống thuốc không có nghĩa là cô chú đã 'thua' — nó có nghĩa là cô chú đang được chăm sóc đúng cách.",
      simpleSummary:
        "Thuốc tiểu đường là công cụ giúp cơ thể làm những gì nó đang gặp khó khăn. Dùng thuốc đúng cách, đúng giờ kết hợp với lối sống là nền tảng điều trị hiệu quả.",
      actionToday:
        "Kiểm tra xem cô chú có đang uống thuốc đúng giờ và đúng liều không. Nếu có nghi ngờ, ghi câu hỏi ra để hỏi bác sĩ trong lần tái khám tới.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Hộp thuốc và máy đo đường huyết — dụng cụ chăm sóc sức khỏe hằng ngày",
      body: [
        "**Tại sao cần thuốc?** Tiểu đường type 2 là bệnh tiến triển — theo thời gian, tụy có thể mất dần khả năng tiết đủ insulin. Không phải lỗi của cô chú — đây là tiến trình tự nhiên của bệnh. Thuốc giúp bù đắp những gì cơ thể không còn làm được.",
        "**Các loại thuốc thường gặp:**\n- Metformin: thuốc đầu tay, giúp cơ thể dùng insulin hiệu quả hơn, ít gây hạ đường huyết\n- Nhóm sulfonylurea (glibenclamide, gliclazide): kích thích tụy tiết insulin thêm — CÓ nguy cơ hạ đường huyết nếu bỏ bữa\n- SGLT2 inhibitor (empagliflozin, dapagliflozin): thải đường qua nước tiểu — cũng bảo vệ tim và thận\n- GLP-1 (liraglutide, semaglutide): tiêm dưới da, giảm cân và đường huyết\n- Insulin: khi tụy không còn tiết đủ — không phải 'hình phạt' mà là điều trị cần thiết",
        "**Không tự ý giảm hoặc ngưng thuốc:** Đường huyết 'trông có vẻ ổn' là vì thuốc đang làm việc — không phải vì bệnh đã khỏi. Ngưng thuốc đột ngột có thể gây tăng đường huyết nhanh và nguy hiểm.",
        "**Câu hỏi thường gặp về insulin:** 'Tiêm insulin có đau không?' — Kim tiêm insulin hiện đại rất nhỏ, đa số bệnh nhân không thấy đau nhiều. 'Tiêm insulin có nghĩa là hết hy vọng không?' — Hoàn toàn không! Insulin chỉ là giai đoạn điều trị tiếp theo.",
        "**Dùng thuốc đúng cách:**\n- Uống đúng giờ theo hướng dẫn\n- Không bỏ liều dù cảm thấy khỏe\n- Báo bác sĩ nếu có tác dụng phụ\n- Hỏi bác sĩ trước khi thêm bất kỳ thuốc hay thực phẩm chức năng nào",
        "**Thuốc và lối sống không thay thế nhau:** Dùng thuốc tốt nhưng ăn uống không kiểm soát sẽ không đạt mục tiêu. Ăn uống và vận động tốt mà không dùng thuốc khi cần cũng không đủ. Cả hai phải cùng nhau.",
      ],
      safetyAlerts: [
        {
          type: "medication",
          message:
            "Không tự ý ngưng thuốc, giảm liều hoặc thay đổi insulin khi chưa trao đổi với bác sĩ điều trị. Nếu quên liều, hỏi bác sĩ hoặc dược sĩ về cách xử lý.",
        },
      ],
      quiz: [
        {
          id: "q13-1",
          question:
            "Khi đường huyết 'trông có vẻ ổn', cô chú có nên tự ý ngưng thuốc không?",
          options: [
            "Không — đường huyết ổn là vì thuốc đang làm việc, ngưng thuốc có thể gây tăng đột biến",
            "Có — nếu đường huyết ổn nghĩa là bệnh đã khỏi",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Thuốc đang kiểm soát đường huyết. Ngưng thuốc đột ngột mà không có hướng dẫn của bác sĩ có thể gây tăng đường huyết nguy hiểm trong vài ngày.",
        },
        {
          id: "q13-2",
          question: "Chuyển sang dùng insulin có nghĩa là gì?",
          options: [
            "Là giai đoạn điều trị tiếp theo khi tụy không còn tiết đủ insulin — không phải 'thất bại'",
            "Nghĩa là bệnh đã ở giai đoạn cuối và không còn hy vọng",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Insulin là điều trị y khoa cần thiết, không phải thất bại. Nhiều người dùng insulin vẫn sống tích cực, đi du lịch và làm việc bình thường.",
        },
      ],
      sources: [
        "American Diabetes Association, Standards of Medical Care in Diabetes (2024), Section 9: Pharmacologic Approaches",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn sử dụng thuốc điều trị tiểu đường type 2 (2023)",
      ],
    },
  },
  {
    id: 14,
    slug: "tui-cuu-ho-ha-duong-huyet",
    title: "Túi cứu hộ hạ đường huyết",
    chapter: "song-an-toan",
    estimatedMinutes: 12,
    icon: "AlertCircle",
    previewText:
      "Nhận biết triệu chứng hạ đường huyết, xử trí đúng cách và chuẩn bị sẵn 'túi cứu hộ' cho những tình huống khẩn cấp.",
    hasSafetyAlert: true,
    videoUrl: undefined,
    content: {
      openingLine:
        "Hạ đường huyết có thể xảy ra bất ngờ — nhưng nếu biết nhận ra và xử lý đúng, cô chú hoàn toàn an toàn.",
      simpleSummary:
        "Hạ đường huyết (dưới 3.9 mmol/L): nhận biết triệu chứng sớm (run, vã mồ hôi, chóng mặt), xử trí bằng quy tắc 15-15, và chuẩn bị sẵn thứ cần thiết trong túi.",
      actionToday:
        "Chuẩn bị ngay hôm nay: bỏ vào ví hoặc túi của cô chú 3–4 viên kẹo cứng hoặc gói đường nhỏ. Đây là 'bảo hiểm' đơn giản nhất.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Hộp sơ cứu nhỏ gọn — chuẩn bị sẵn sàng cho mọi tình huống",
      body: [
        "**Hạ đường huyết là gì?** Đường huyết xuống dưới 3.9 mmol/L. Với người dùng insulin hoặc thuốc sulfonylurea, đây là nguy cơ có thật. Người chỉ dùng metformin ít có nguy cơ hơn nhiều.",
        "**Nhận biết sớm — triệu chứng nhẹ:**\n- Run rẩy tay chân\n- Vã mồ hôi lạnh\n- Hồi hộp, tim đập nhanh\n- Cảm giác đói đột ngột\n- Chóng mặt nhẹ\n- Khó tập trung",
        "**Triệu chứng nặng hơn:** Lú lẫn, nói lắp, nhìn mờ, yếu người không đứng được. Cần người thân giúp đỡ ngay.",
        "**Quy tắc 15-15:**\n1. Ăn hoặc uống 15g đường nhanh (15g glucose): 3–4 viên kẹo cứng, hoặc 1/2 ly nước ngọt (không diet), hoặc 1 thìa đường pha nước, hoặc 1 gói đường nhỏ\n2. Chờ 15 phút\n3. Đo lại đường huyết\n4. Nếu vẫn dưới 3.9 mmol/L — lặp lại bước 1\n5. Khi ổn, ăn thêm một bữa nhẹ có tinh bột để đường huyết không hạ lại",
        "**'Túi cứu hộ' nên có:**\n- 3–4 viên kẹo cứng (loại có đường, không phải kẹo không đường)\n- Một gói đường nhỏ (gói đường cà phê)\n- Thẻ ghi thông tin tiểu đường và số điện thoại liên lạc khẩn\n- Máy đo đường huyết và que thử (nếu có)",
        "**Dạy người thân:** Hãy cho người sống cùng biết triệu chứng hạ đường huyết và cách xử lý. Nếu cô chú bất tỉnh — không cho uống hay ăn gì, gọi cấp cứu ngay.",
      ],
      safetyAlerts: [
        {
          type: "medication",
          message:
            "Hạ đường huyết dưới 3.9 mmol/L với triệu chứng cần xử trí ngay bằng quy tắc 15-15. Nếu bất tỉnh hoặc không cải thiện sau 15 phút — gọi cấp cứu 115 ngay lập tức.",
        },
      ],
      quiz: [
        {
          id: "q14-1",
          question:
            "Khi đường huyết xuống thấp và cô chú thấy run rẩy, vã mồ hôi — bước đầu tiên là gì?",
          options: [
            "Ăn/uống 15g đường nhanh (kẹo, nước ngọt, gói đường) rồi chờ 15 phút",
            "Nằm xuống nghỉ và chờ tự khỏi",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Quy tắc 15-15: 15g đường nhanh, chờ 15 phút, đo lại. Không tự chờ khỏi — hạ đường huyết không tự cải thiện mà có thể nặng hơn.",
        },
        {
          id: "q14-2",
          question:
            "Nếu người thân bị hạ đường huyết và bất tỉnh, nên làm gì?",
          options: [
            "Không cho ăn/uống gì, gọi cấp cứu 115 ngay lập tức",
            "Cố nhét kẹo vào miệng người bất tỉnh",
          ],
          correctIndex: 0,
          explanation:
            "Rất quan trọng! Khi đã bất tỉnh, cho ăn uống có thể gây sặc nguy hiểm. Gọi cấp cứu và giữ người bệnh an toàn (nằm nghiêng) là việc đúng cần làm.",
        },
      ],
      sources: [
        "American Diabetes Association, Hypoglycemia (Low Blood Sugar) (2024)",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn xử trí hạ đường huyết (2023)",
      ],
    },
  },
  {
    id: 15,
    slug: "ba-phut-moi-toi-giu-doi-chan",
    title: "Ba phút mỗi tối — giữ đôi chân",
    chapter: "song-an-toan",
    estimatedMinutes: 10,
    icon: "Eye",
    previewText:
      "Chăm sóc bàn chân là thói quen đơn giản nhất nhưng nhiều người bỏ qua — trong khi đây là cách phòng ngừa biến chứng bàn chân hiệu quả nhất.",
    hasSafetyAlert: true,
    videoUrl: undefined,
    content: {
      openingLine:
        "Mỗi tối trước khi ngủ, ba phút nhìn vào bàn chân — thói quen nhỏ này có thể giúp cô chú giữ được đôi chân của mình.",
      simpleSummary:
        "Biến chứng bàn chân tiểu đường thường bắt đầu từ những vết thương nhỏ bị bỏ qua. Kiểm tra bàn chân mỗi tối, giữ chân sạch và khô, chọn giày dép phù hợp là ba bước đơn giản nhất.",
      actionToday:
        "Tối nay, trước khi ngủ, ngồi kiểm tra bàn chân: có vết đỏ, phồng rộp, vết nứt, móng quặp hay tê ngứa không? Dùng gương nhỏ soi lòng bàn chân nếu khó nhìn.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1544161513-0179fe746fd5?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Đôi bàn chân trên sàn gỗ — cần được chăm sóc và kiểm tra thường xuyên",
      body: [
        "**Tại sao bàn chân quan trọng?** Đường huyết cao lâu ngày gây tổn thương thần kinh ở bàn chân (neuropathy) — cô chú có thể không cảm nhận được đau hay nóng lạnh bình thường. Một vết thương nhỏ không đau → bị bỏ qua → nhiễm trùng nặng → nguy cơ cắt bỏ.",
        "**Kiểm tra bàn chân mỗi tối — 5 điều cần nhìn:**\n1. Vết đỏ, phồng rộp, vết trầy xước\n2. Vết nứt ở gót chân hay giữa các ngón\n3. Móng quặp hoặc móng mọc vào trong\n4. Thay đổi màu da (tím, đen, trắng bất thường)\n5. Sưng hoặc nóng so với ngày thường",
        "**Chăm sóc hằng ngày:**\n- Rửa chân bằng nước ấm (thử nhiệt độ bằng tay, không dùng chân)\n- Lau khô hoàn toàn, đặc biệt giữa các ngón\n- Thoa kem dưỡng ẩm lên lòng bàn chân và gót (không thoa giữa ngón tay)\n- Cắt móng thẳng, không cắt quá sâu",
        "**Giày dép:** Không đi chân trần kể cả trong nhà. Luôn mang dép trong nhà để tránh đạp phải vật nhỏ. Chọn giày đủ rộng, không bóp ngón, không cao gót. Kiểm tra bên trong giày trước khi mang (sỏi nhỏ có thể gây vết thương mà không đau).",
        "**Khi nào cần gặp bác sĩ ngay:**\n- Vết thương không lành sau 3–5 ngày\n- Bàn chân đỏ, sưng, có mủ hoặc mùi hôi\n- Vùng da đen hoặc hoại tử\n- Tê bì, đau nhức nhiều bất thường",
        "**Khám bàn chân định kỳ:** Ít nhất 1 lần mỗi năm với bác sĩ — kiểm tra cảm giác (dây thần kinh) và tuần hoàn (mạch máu). Phát hiện sớm có thể phòng ngừa được nhiều biến chứng.",
      ],
      safetyAlerts: [
        {
          type: "default",
          message:
            "Nếu phát hiện vết thương ở bàn chân không lành trong 3–5 ngày, hoặc có dấu hiệu nhiễm trùng (đỏ, sưng, mủ, mùi hôi) — đến cơ sở y tế ngay. Đừng tự điều trị vết thương bàn chân ở nhà nếu không chắc.",
        },
      ],
      quiz: [
        {
          id: "q15-1",
          question:
            "Tại sao người tiểu đường có thể không cảm nhận được vết thương ở bàn chân?",
          options: [
            "Vì đường huyết cao lâu ngày gây tổn thương thần kinh (neuropathy) làm giảm cảm giác đau",
            "Vì da bàn chân người tiểu đường cứng hơn bình thường",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Biến chứng thần kinh làm giảm cảm giác ở bàn chân. Vết thương nhỏ không đau nên bị bỏ qua — nếu không được chăm sóc có thể dẫn đến nhiễm trùng nặng.",
        },
        {
          id: "q15-2",
          question:
            "Cô chú nên làm gì khi kiểm tra bàn chân vào mỗi tối?",
          options: [
            "Nhìn kỹ 5 điều: vết đỏ/phồng, vết nứt, móng quặp, thay đổi màu da, sưng/nóng",
            "Chỉ cần nhìn nhanh xem có máu không",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Kiểm tra toàn diện 5 dấu hiệu mỗi tối giúp phát hiện sớm vấn đề trước khi nó trở nên nghiêm trọng. Ba phút mỗi tối là đầu tư nhỏ với lợi ích lớn.",
        },
      ],
      sources: [
        "American Diabetes Association, Foot Care (2024)",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn chăm sóc bàn chân cho người tiểu đường (2023)",
        "Bus SA et al. (2020), IWGDF guidelines on the prevention of foot ulcers in persons with diabetes",
      ],
    },
  },
  {
    id: 16,
    slug: "ke-hoach-28-ngay",
    title: "Kế hoạch 28 ngày — sống chủ động mỗi ngày",
    chapter: "song-an-toan",
    estimatedMinutes: 15,
    icon: "CalendarCheck",
    previewText:
      "Tổng kết 28 ngày học — từ hiểu bệnh đến áp dụng hằng ngày — và kế hoạch tiếp tục từ ngày 29 trở đi.",
    hasSafetyAlert: false,
    videoUrl: undefined,
    content: {
      openingLine:
        "Cô chú đã đi được 28 ngày — đây là thành tích thực sự, không phải chuyện nhỏ.",
      simpleSummary:
        "Tổng kết 8 thói quen cốt lõi từ 4 chặng học. Kế hoạch duy trì và phát triển sau 28 ngày. Nhắc nhở quan trọng về tái khám và sống chủ động với bệnh tiểu đường.",
      actionToday:
        "Hôm nay, chọn 3 thói quen từ danh sách dưới đây mà cô chú đã làm được trong 28 ngày qua. Ghi vào giấy và dán ở chỗ dễ nhìn.",
      illustrationPlaceholder:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=85&fit=crop",
      illustrationAlt:
        "Trang nhật ký với những ghi chép và kế hoạch — hành trình 28 ngày được ghi lại",
      body: [
        "**8 thói quen cốt lõi của chương trình:**\n1. Hiểu ba chỉ số của mình (HbA1c, đường lúc đói, sau ăn)\n2. Ăn theo phương pháp ba vùng (½ rau, ¼ đạm, ¼ tinh bột)\n3. Ăn rau trước — đạm tiếp — cơm sau\n4. Vận động nhẹ 10 phút sau ít nhất một bữa mỗi ngày\n5. Đo và ghi đường huyết (nếu có máy)\n6. Kiểm tra bàn chân mỗi tối\n7. Uống thuốc đúng giờ, không tự ý bỏ\n8. Tái khám theo lịch và hỏi bác sĩ những gì chưa hiểu",
        "**Không cần hoàn hảo — cần kiên định:** Nếu cô chú làm được 5 trong 8 thói quen này, đó là thành công thực sự. Mỗi thói quen nhỏ duy trì đều đặn qua năm tháng mới tạo ra sự thay đổi thực sự trong HbA1c và chất lượng cuộc sống.",
        "**Từ ngày 29 trở đi:**\n- Tiếp tục 8 thói quen — thêm dần những thói quen còn thiếu\n- Đặt lịch tái khám tiếp theo và chuẩn bị câu hỏi\n- Chia sẻ những gì đã học với người thân — kiến thức có giá trị hơn khi lan rộng\n- Xem lại bài học bất kỳ khi cần nhắc nhở",
        "**Khi nào cần liên hệ bác sĩ ngay:**\n- Đường huyết liên tục cao (trên 13.9 mmol/L nhiều ngày)\n- Triệu chứng hạ đường huyết thường xuyên\n- Vết thương bàn chân không lành\n- Bất kỳ triệu chứng mới lạ nào đáng lo ngại",
        "**Nhớ rằng:** Cô chú không đơn độc trong hành trình này. Bác sĩ, gia đình, và kiến thức đều là đồng đội. Tiểu đường không phải là câu chuyện kết thúc — mà là hành trình cô chú học cách sống tốt hơn mỗi ngày.",
        "**Lời từ bác sĩ Hương:** 'Tôi không mong đợi cô chú hoàn hảo. Tôi chỉ mong cô chú hiểu cơ thể mình hơn một chút mỗi ngày, và tự tin hơn mỗi lần ngồi trước mâm cơm.'",
      ],
      quiz: [
        {
          id: "q16-1",
          question:
            "Trong 8 thói quen cốt lõi, thói quen nào liên quan đến an toàn hằng ngày?",
          options: [
            "Kiểm tra bàn chân mỗi tối và uống thuốc đúng giờ",
            "Chỉ cần ăn uống đúng là đủ, không cần lo về thuốc hay bàn chân",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! An toàn hằng ngày bao gồm cả việc chăm sóc bàn chân (phòng biến chứng bàn chân) và uống thuốc đúng cách (phòng tăng/hạ đường huyết nguy hiểm).",
        },
        {
          id: "q16-2",
          question:
            "Sau khi hoàn thành 28 ngày, cô chú nên làm gì tiếp theo?",
          options: [
            "Tiếp tục duy trì các thói quen đã học, tái khám theo lịch và hỏi bác sĩ khi cần",
            "Bệnh đã ổn, không cần tiếp tục lo lắng nữa",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Tiểu đường là bệnh mạn tính — cần quản lý lâu dài. 28 ngày đầu là nền tảng; từ ngày 29 trở đi là hành trình duy trì và phát triển.",
        },
      ],
      sources: [
        "Hội Nội tiết - Đái tháo đường Việt Nam, Chương trình giáo dục bệnh nhân tiểu đường (2023)",
        "American Diabetes Association, Diabetes Self-Management Education and Support (2024)",
        "Bác sĩ Nguyễn Thị Hương, Khung chương trình 'Hiểu đúng tiểu đường — 28 ngày' (2024)",
      ],
    },
  },
];

export const chapters = {
  "hieu-benh-va-chi-so": {
    title: "Chặng 1: Hiểu bệnh & chỉ số",
    description: "Từ chẩn đoán đến hiểu rõ cơ thể và các con số cần theo dõi",
    color: "#2D6A4F",
    lessonIds: [1, 2, 3, 4],
  },
  "bua-com-viet": {
    title: "Chặng 2: Bữa cơm Việt",
    description: "Điều chỉnh bữa ăn quen thuộc mà không cần từ bỏ cơm",
    color: "#D97745",
    lessonIds: [5, 6, 7, 8],
  },
  "theo-doi-tai-nha": {
    title: "Chặng 3: Theo dõi tại nhà",
    description: "Đo đường huyết, theo dõi cân nặng và xây dựng thói quen vận động",
    color: "#1B4D8E",
    lessonIds: [9, 10, 11, 12],
  },
  "song-an-toan": {
    title: "Chặng 4: Sống an toàn",
    description: "Thuốc, hạ đường huyết, chăm sóc bàn chân và kế hoạch dài hạn",
    color: "#153D32",
    lessonIds: [13, 14, 15, 16],
  },
} as const;

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
