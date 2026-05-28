import type { Lesson } from "@/types";

export const lessons: Lesson[] = [
  {
    id: 0,
    slug: "truoc-khi-bat-dau",
    title: "Trước khi bắt đầu: Cô chú cần nhớ điều này",
    chapter: "hieu-duong-huyet",
    estimatedMinutes: 4,
    icon: "Shield",
    previewText:
      "Lưu ý an toàn quan trọng và những điều cần biết trước khi học khóa này.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Trước khi bắt đầu, cô chú hãy đọc kỹ những lưu ý quan trọng dưới đây.",
      simpleSummary:
        "Khóa học này giúp cô chú hiểu hơn về đường huyết và cách ăn uống, vận động phù hợp. Đây là kiến thức giáo dục, không thay thế bác sĩ điều trị.",
      actionToday:
        "Đọc hết bài này và nói chuyện với bác sĩ hoặc người thân về việc cô chú bắt đầu tìm hiểu chủ đề này.",
      illustrationPlaceholder: "/images/placeholder-safety.svg",
      illustrationAlt:
        "Hình minh họa bác sĩ và bệnh nhân đang trao đổi thân thiện",
      body: [
        "Khóa học 'Ổn định đường huyết mỗi ngày' được xây dựng dựa trên kiến thức y khoa và được biên tập lại cho phù hợp với người Việt Nam.",
        "Nội dung ở đây nhằm mục đích **giáo dục sức khỏe**. Cô chú vẫn cần tuân thủ phác đồ điều trị của bác sĩ, uống thuốc đúng giờ, và đi tái khám đúng lịch.",
        "Những thay đổi trong bữa ăn hay thói quen vận động có thể ảnh hưởng đến đường huyết. Vì vậy, hãy chia sẻ với bác sĩ những gì cô chú học được để cùng điều chỉnh phù hợp.",
        "Nếu cô chú đang dùng insulin hoặc thuốc có nguy cơ gây hạ đường huyết, hãy đặc biệt thận trọng khi thay đổi bữa ăn hoặc bắt đầu tập luyện mới.",
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
          id: "q0-1",
          question: "Khóa học này có thay thế được bác sĩ điều trị không?",
          options: [
            "Không, đây là tài liệu giáo dục sức khỏe",
            "Có, cô chú không cần đi khám nữa",
          ],
          correctIndex: 0,
          explanation:
            "Đúng rồi! Khóa học chỉ cung cấp kiến thức giáo dục. Cô chú vẫn cần gặp bác sĩ điều trị để được tư vấn phù hợp với tình trạng cụ thể.",
        },
        {
          id: "q0-2",
          question:
            "Khi muốn thay đổi bữa ăn hoặc bắt đầu vận động, cô chú nên làm gì trước?",
          options: [
            "Trao đổi với bác sĩ điều trị",
            "Tự thay đổi ngay mà không cần hỏi ai",
          ],
          correctIndex: 0,
          explanation:
            "Rất tốt! Đặc biệt với người đang dùng insulin hoặc thuốc tiểu đường, mọi thay đổi đáng kể đều cần được thảo luận với bác sĩ trước.",
        },
      ],
      sources: [
        "Khuyến cáo của Hội Nội tiết - Đái tháo đường Việt Nam (VADE)",
        "American Diabetes Association Standards of Care (2024)",
      ],
    },
  },
  {
    id: 1,
    slug: "duong-huyet-la-gi",
    title: "Đường huyết là gì?",
    chapter: "hieu-duong-huyet",
    estimatedMinutes: 5,
    icon: "Droplets",
    previewText:
      "Tìm hiểu đường huyết là gì, tại sao cơ thể cần glucose và chỉ số bình thường là bao nhiêu.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Cô chú đã từng thắc mắc tại sao bác sĩ hay nói về 'đường trong máu' chưa?",
      simpleSummary:
        "Đường huyết (glucose trong máu) là nguồn năng lượng chính của cơ thể. Mức đường huyết cần được giữ trong một phạm vi nhất định để cơ thể hoạt động tốt.",
      actionToday:
        "Hôm nay, khi ăn bữa chính, hãy để ý xem sau khi ăn cô chú có cảm thấy buồn ngủ hoặc mệt không – đó là dấu hiệu đường huyết có thể đã tăng cao.",
      illustrationPlaceholder: "/images/placeholder-glucose-basic.svg",
      illustrationAlt:
        "Hình minh họa đơn giản: thức ăn chuyển thành glucose, glucose vào máu, insulin giúp đưa glucose vào tế bào",
      body: [
        "**Đường huyết** là lượng glucose (một loại đường đơn giản) có trong máu của cô chú tại một thời điểm nhất định.",
        "Glucose là nguồn năng lượng chính mà cơ thể dùng để hoạt động – từ việc thở, đi lại đến suy nghĩ. Não bộ đặc biệt phụ thuộc vào glucose.",
        "Mỗi khi cô chú ăn cơm, bánh mì, trái cây hay uống nước ngọt, thức ăn được tiêu hóa và chuyển thành glucose, sau đó đi vào máu.",
        "Tụy tạng (lá tụy) sẽ tiết ra **insulin** – một loại hormone giúp đưa glucose từ máu vào bên trong các tế bào để tạo năng lượng.",
        "Ở người mắc **tiểu đường type 2**, cơ thể không sản xuất đủ insulin, hoặc các tế bào không phản ứng tốt với insulin nữa. Kết quả là glucose tích lại trong máu nhiều hơn bình thường.",
        "**Chỉ số đường huyết bình thường** (theo hướng dẫn Việt Nam):\n- Lúc đói (trước ăn): 3.9 – 5.6 mmol/L\n- 2 giờ sau ăn: dưới 7.8 mmol/L\n- Người tiểu đường type 2 (mục tiêu điều trị): lúc đói 4.4–7.2 mmol/L, sau ăn 2h dưới 10 mmol/L (tùy từng người, cô chú hỏi bác sĩ mục tiêu cụ thể của mình).",
        "Điều quan trọng không chỉ là chỉ số lúc đói, mà còn là **mức độ tăng sau ăn** và tần suất tăng cao lặp đi lặp lại.",
      ],
      quiz: [
        {
          id: "q1-1",
          question: "Glucose trong máu đến từ đâu chủ yếu?",
          options: [
            "Từ thức ăn cô chú ăn vào, đặc biệt là cơm, bánh, trái cây",
            "Cơ thể tự tạo ra hoàn toàn, không liên quan đến thức ăn",
          ],
          correctIndex: 0,
          explanation:
            "Đúng rồi! Các thực phẩm chứa chất bột đường (carbohydrate) như cơm, bánh mì, khoai, trái cây khi tiêu hóa sẽ được chuyển thành glucose vào máu.",
        },
        {
          id: "q1-2",
          question: "Insulin có vai trò gì trong cơ thể?",
          options: [
            "Giúp đưa glucose từ máu vào các tế bào để tạo năng lượng",
            "Tạo thêm đường trong máu khi cơ thể thiếu năng lượng",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Insulin như một 'chìa khóa' mở cửa cho tế bào nhận glucose. Khi insulin không đủ hoặc không hiệu quả, glucose tích lại trong máu.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 15–40",
        "Hội Nội tiết - Đái tháo đường Việt Nam (VADE), Hướng dẫn chẩn đoán và điều trị đái tháo đường type 2 (2023)",
        "American Diabetes Association, Standards of Medical Care in Diabetes (2024)",
      ],
    },
  },
  {
    id: 2,
    slug: "com-khoai-banh-trai-cay",
    title: "Cơm, khoai, bánh và trái cây có điểm gì giống nhau?",
    chapter: "hieu-duong-huyet",
    estimatedMinutes: 5,
    icon: "Wheat",
    previewText:
      "Hiểu tại sao cơm, khoai, bánh mì và trái cây đều ảnh hưởng đến đường huyết theo cách tương tự.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Cô chú có biết cơm trắng, khoai lang, bánh mì và xoài đều có một điểm chung quan trọng không?",
      simpleSummary:
        "Chúng đều chứa chất bột đường (carbohydrate), khi tiêu hóa sẽ chuyển thành glucose và làm tăng đường huyết. Không phải tất cả đều tăng với tốc độ như nhau.",
      actionToday:
        "Hôm nay, nhìn vào đĩa ăn của mình và thử nhận ra: 'Thứ nào là tinh bột, thứ nào là rau, thứ nào là đạm (thịt/cá/đậu)?'",
      illustrationPlaceholder: "/images/placeholder-carbs.svg",
      illustrationAlt:
        "Hình minh họa: cơm, khoai, bánh mì, trái cây – tất cả đều có mũi tên chỉ về phía glucose",
      body: [
        "**Chất bột đường (carbohydrate)** là tên khoa học chỉ nhóm thực phẩm bao gồm: cơm, bún, phở, bánh mì, khoai, ngô, đồ ngọt, trái cây và nước ép.",
        "Khi cô chú ăn những thứ này, cơ thể tiêu hóa và phân giải chúng thành glucose – đây là lý do tại sao chúng làm tăng đường huyết.",
        "**Tinh bột** (starch) gồm: cơm, bún, phở, bánh mì, khoai, ngô. Đây là chuỗi glucose dài, cơ thể cần thời gian để tiêu hóa.",
        "**Đường** (sugars) gồm: đường cát, mật ong, đường trong trái cây, nước ngọt, bánh kẹo. Loại này được hấp thu nhanh hơn vào máu.",
        "**Chất xơ** (fiber) cũng là carbohydrate nhưng cơ thể người không tiêu hóa được. Chất xơ giúp làm chậm quá trình hấp thu glucose và rất tốt cho sức khỏe.",
        "Điểm khác biệt quan trọng: không phải mọi carbohydrate đều làm tăng đường huyết nhanh như nhau. Thực phẩm nhiều chất xơ (rau xanh, đậu đỗ) thường làm tăng đường huyết chậm hơn và ít hơn so với cơm trắng hay bánh ngọt.",
        "Cô chú không cần bỏ hoàn toàn cơm hay khoai – nhưng hiểu được điều này sẽ giúp cô chú chọn lượng phù hợp và phối hợp tốt hơn trong bữa ăn.",
      ],
      quiz: [
        {
          id: "q2-1",
          question:
            "Loại nào sau đây KHÔNG phải là chất bột đường (carbohydrate)?",
          options: ["Thịt gà, trứng, cá", "Cơm, bánh mì, khoai"],
          correctIndex: 0,
          explanation:
            "Đúng! Thịt, cá, trứng là thực phẩm giàu đạm (protein), không phải carbohydrate. Chúng gần như không làm tăng đường huyết trực tiếp.",
        },
        {
          id: "q2-2",
          question: "Loại carbohydrate nào giúp làm chậm tăng đường huyết?",
          options: [
            "Chất xơ (trong rau xanh, đậu đỗ)",
            "Đường (trong bánh kẹo, nước ngọt)",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Chất xơ giúp làm chậm quá trình hấp thu glucose vào máu, nên rau xanh rất hữu ích trong bữa ăn của người tiểu đường.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 33–55",
        "USDA Dietary Guidelines for Americans (2020–2025)",
      ],
    },
  },
  {
    id: 3,
    slug: "sau-khi-an-thuc-an-di-dau",
    title: "Sau khi ăn, thức ăn đi đâu trong cơ thể?",
    chapter: "hieu-duong-huyet",
    estimatedMinutes: 5,
    icon: "Activity",
    previewText:
      "Hành trình của thức ăn từ miệng đến tế bào và tại sao insulin đóng vai trò quan trọng.",
    hasSafetyAlert: false,
    content: {
      openingLine: "Bao giờ cô chú có tự hỏi cơm mình ăn đi đâu không?",
      simpleSummary:
        "Thức ăn được tiêu hóa thành glucose, glucose vào máu, insulin giúp đưa glucose vào tế bào. Ở người tiểu đường, bước cuối này gặp trở ngại.",
      actionToday:
        "Lần tới khi uống thuốc tiểu đường, hãy nhớ rằng thuốc đang giúp cơ thể xử lý glucose tốt hơn.",
      illustrationPlaceholder: "/images/placeholder-digestion.svg",
      illustrationAlt:
        "Sơ đồ tiêu hóa đơn giản: miệng → dạ dày → ruột non → máu → tế bào",
      body: [
        "Sau khi cô chú ăn, thức ăn bắt đầu được nghiền nát ở miệng rồi xuống dạ dày.",
        "Ở **dạ dày** và **ruột non**, các enzyme tiêu hóa phân giải tinh bột và đường thành glucose.",
        "Glucose được hấp thu qua thành ruột vào **máu**. Đây là lúc đường huyết bắt đầu tăng lên.",
        "Tụy tạng nhận tín hiệu đường huyết tăng và tiết ra **insulin**. Insulin hoạt động như một chiếc chìa khóa – mở cửa các tế bào để glucose đi vào.",
        "Trong tế bào, glucose được đốt cháy tạo ra **năng lượng**. Phần glucose dư thừa được gan chuyển thành glycogen dự trữ, hoặc thành mỡ.",
        "Ở người **tiểu đường type 2**: tế bào đã quen với insulin quá nhiều và bắt đầu 'phớt lờ' – gọi là **đề kháng insulin** (kháng insulin). Tụy phải tiết insulin nhiều hơn, nhưng vẫn không đủ hiệu quả. Kết quả: glucose ở lại trong máu lâu hơn và ở mức cao hơn.",
        "Hiểu điều này giúp cô chú thấy rõ hơn tại sao việc ăn đúng cách có thể giảm bớt gánh nặng cho tụy và giúp cơ thể xử lý glucose hiệu quả hơn.",
      ],
      quiz: [
        {
          id: "q3-1",
          question: "Đề kháng insulin có nghĩa là gì?",
          options: [
            "Tế bào không phản ứng tốt với insulin nữa, làm glucose khó đi vào tế bào",
            "Cơ thể không còn tiết insulin nào cả",
          ],
          correctIndex: 0,
          explanation:
            "Đúng rồi! Đề kháng insulin là đặc điểm điển hình của tiểu đường type 2. Tụy vẫn tiết insulin nhưng tế bào 'không nghe theo' như trước.",
        },
        {
          id: "q3-2",
          question:
            "Sau khi ăn cơm, đường huyết thay đổi như thế nào trong vài giờ đầu?",
          options: [
            "Tăng lên trong khoảng 30–60 phút, rồi từ từ giảm",
            "Không thay đổi gì cả",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Đường huyết thường đạt đỉnh khoảng 30–60 phút sau ăn rồi dần trở về mức bình thường. Mục tiêu là hạn chế mức đỉnh quá cao.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 25–50",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Tài liệu giáo dục bệnh nhân tiểu đường type 2",
      ],
    },
  },
  {
    id: 4,
    slug: "do-che-bien-san-va-duong-huyet",
    title: "Vì sao đồ chế biến sẵn dễ làm đường huyết tăng nhanh?",
    chapter: "hieu-duong-huyet",
    estimatedMinutes: 5,
    icon: "Package",
    previewText:
      "Bánh gói, mì ăn liền, nước ngọt – tại sao những thứ này dễ làm đường huyết tăng đột biến.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Cô chú có để ý thấy sau khi ăn bánh gói hay uống nước ngọt, cơ thể nhanh đói hơn không?",
      simpleSummary:
        "Thực phẩm chế biến sẵn thường đã được xử lý để tiêu hóa rất nhanh, làm đường huyết tăng đột biến. Lựa chọn thực phẩm ít qua chế biến hơn sẽ có lợi hơn.",
      actionToday:
        "Lần tới khi cầm gói bánh hay chai nước ngọt, thử nhìn vào nhãn và tìm dòng 'Đường' xem có bao nhiêu gram.",
      illustrationPlaceholder: "/images/placeholder-processed-food.svg",
      illustrationAlt:
        "Hình ảnh so sánh: bên trái thực phẩm tươi (rau, cá), bên phải thực phẩm chế biến (bánh gói, nước ngọt)",
      body: [
        "Thực phẩm chế biến sẵn là những sản phẩm đã trải qua nhiều bước gia công: bánh quy, bánh mì công nghiệp, mì ăn liền, nước ngọt, bánh kẹo, ngũ cốc ăn sáng đóng hộp...",
        "**Vì sao chúng nguy hiểm hơn?** Khi thực phẩm được chế biến nhiều, cấu trúc tự nhiên bị phá vỡ, chất xơ bị loại bỏ, tinh bột bị nghiền mịn. Điều này làm cho cơ thể tiêu hóa chúng cực nhanh.",
        "Tiêu hóa nhanh = glucose vào máu rất nhanh = đường huyết tăng vọt trong thời gian ngắn.",
        "Ngoài ra, nhà sản xuất thường thêm **đường ẩn** (sugar hiding) vào nhiều loại thực phẩm mà cô chú không ngờ tới: tương ớt, sốt nêm, bánh mặn, súp đóng hộp...",
        "**So sánh:**\n- Cơm gạo lứt + rau luộc: tiêu hóa chậm hơn, đường huyết tăng từ từ\n- Bánh mì trắng + jam + nước ngọt: tiêu hóa rất nhanh, đường huyết tăng cao và nhanh",
        "Cô chú không cần kiêng hoàn toàn, nhưng hạn chế và thay thế dần bằng thực phẩm ít qua chế biến là bước đi có ích.",
      ],
      safetyAlerts: [
        {
          type: "diet",
          message:
            "Nội dung này nhằm mục đích giáo dục sức khỏe. Không tự ý ngưng thuốc, đổi liều thuốc hoặc thay đổi insulin khi chưa trao đổi với bác sĩ điều trị.",
        },
      ],
      quiz: [
        {
          id: "q4-1",
          question:
            "Tại sao thực phẩm chế biến sẵn lại làm đường huyết tăng nhanh hơn?",
          options: [
            "Vì chất xơ bị loại bỏ, tinh bột được nghiền mịn nên tiêu hóa cực nhanh",
            "Vì chúng có nhiều protein hơn thực phẩm tươi",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Cấu trúc tự nhiên bị phá vỡ giúp tiêu hóa nhanh hơn, nhưng cũng có nghĩa là glucose đổ vào máu nhanh hơn và nhiều hơn.",
        },
        {
          id: "q4-2",
          question: "'Đường ẩn' là gì?",
          options: [
            "Đường được thêm vào thực phẩm mà nhìn bề ngoài không thấy rõ, như trong tương ớt hay sốt nêm",
            "Một loại đường đặc biệt không ảnh hưởng đến đường huyết",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Nhiều thực phẩm 'mặn' hoặc 'savory' lại chứa lượng đường đáng kể. Đọc nhãn thực phẩm giúp cô chú nhận ra điều này.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 60–80",
        "Monteiro CA et al. (2019), Ultra-processed foods: what they are and how to identify them, Public Health Nutrition",
      ],
    },
  },
  {
    id: 5,
    slug: "hieu-duong-cong-duong-huyet",
    title: "Hiểu đường cong đường huyết sau ăn",
    chapter: "hieu-duong-huyet",
    estimatedMinutes: 6,
    icon: "TrendingUp",
    previewText:
      "Đường huyết thay đổi thế nào sau bữa ăn và tại sao mức tăng nhẹ tốt hơn mức tăng đột biến.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Hãy tưởng tượng đường huyết như sóng biển – có sóng nhẹ và sóng lớn, và cơ thể thích sóng nhẹ hơn.",
      simpleSummary:
        "Sau ăn, đường huyết luôn tăng lên – đó là bình thường. Điều cần tránh là những lần tăng quá cao, quá nhanh và xảy ra thường xuyên.",
      actionToday:
        "Nếu cô chú có máy đo đường huyết, thử đo sau 1 giờ ăn bữa sáng thông thường và ghi lại kết quả.",
      illustrationPlaceholder: "/images/placeholder-glucose-curve.svg",
      illustrationAlt:
        "Biểu đồ đường cong đường huyết: một đường tăng vọt (bữa ăn nhiều tinh bột) và một đường tăng nhẹ (bữa ăn có rau và đạm)",
      body: [
        "Sau mỗi bữa ăn, đường huyết đều tăng lên – đây là điều bình thường và cần thiết vì cơ thể đang hấp thu glucose để lấy năng lượng.",
        "Điều quan trọng là **mức độ tăng** và **tốc độ tăng**:",
        "**Đường cong nhẹ** (tăng từ từ, không quá cao): cơ thể xử lý thoải mái, insulin vừa đủ để điều tiết, tế bào nhận đủ năng lượng đều đặn.",
        "**Đường cong đột biến** (tăng vọt cao, nhanh): tụy phải tiết nhiều insulin một lúc, cơ thể mệt mỏi hơn, cô chú có thể cảm thấy buồn ngủ, nhanh đói lại.",
        "Theo thời gian, những đột biến thường xuyên gây thêm gánh nặng cho tụy và có thể đẩy nhanh quá trình tiến triển của bệnh.",
        "**Yếu tố nào ảnh hưởng đến hình dạng đường cong?**\n- Loại và lượng carbohydrate ăn vào\n- Thứ tự ăn (rau trước hay cơm trước)\n- Có rau, đạm và chất béo trong bữa ăn không\n- Có vận động nhẹ sau ăn không",
        "Những bài học tiếp theo sẽ giúp cô chú áp dụng những yếu tố này vào bữa ăn hằng ngày.",
      ],
      quiz: [
        {
          id: "q5-1",
          question: "Sau bữa ăn, đường huyết tăng có phải là điều bất thường?",
          options: [
            "Không, tăng sau ăn là bình thường – vấn đề là tăng quá cao",
            "Có, đường huyết lý tưởng không bao giờ được tăng",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Tăng đường huyết sau ăn là quá trình sinh lý bình thường. Mục tiêu là hạn chế những cơn tăng quá cao và quá nhanh.",
        },
        {
          id: "q5-2",
          question: "Ăn rau trước bữa chính giúp ích gì cho đường cong đường huyết?",
          options: [
            "Giúp đường huyết tăng chậm và ổn định hơn",
            "Không có tác dụng gì với đường huyết",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Chất xơ trong rau tạo ra 'lớp đệm' trong ruột, giúp glucose hấp thu chậm hơn và đường cong sau ăn ổn định hơn.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 51–75",
        "Wolever TM et al. (2006), The glycemic index: methodology and clinical implications, American Journal of Clinical Nutrition",
      ],
    },
  },
  {
    id: 6,
    slug: "co-the-lam-viec-vat-va-hon",
    title: "Khi đường huyết thường xuyên tăng cao, cơ thể phải làm việc vất vả hơn",
    chapter: "nguy-co-va-theo-doi",
    estimatedMinutes: 6,
    icon: "HeartPulse",
    previewText:
      "Tác động tích lũy của đường huyết cao lặp đi lặp lại đến tim, thận, mắt và thần kinh.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Cô chú đã biết đường huyết cao gây hại – nhưng biết cụ thể nó gây hại như thế nào giúp cô chú có thêm động lực chăm sóc bản thân.",
      simpleSummary:
        "Đường huyết cao kéo dài gây tổn thương từ từ cho mạch máu và thần kinh trong toàn cơ thể. Kiểm soát tốt giúp làm chậm hoặc ngăn chặn những tổn thương này.",
      actionToday:
        "Kiểm tra lịch tái khám tiếp theo của mình – nếu chưa có, hãy đặt lịch với bác sĩ trong tuần này.",
      illustrationPlaceholder: "/images/placeholder-complications.svg",
      illustrationAlt:
        "Hình minh họa cơ thể người với các cơ quan bị ảnh hưởng bởi đường huyết cao: tim, thận, mắt, bàn chân",
      body: [
        "Glucose ở mức cao trong máu, đặc biệt khi kéo dài nhiều năm, dần dần làm tổn thương lớp trong của mạch máu.",
        "**Mạch máu nhỏ** (microvascular): bị tổn thương ở mắt (có thể gây mờ mắt, mù lòa), thận (suy thận) và thần kinh ngoại biên (tê bì, đau nhức bàn tay chân).",
        "**Mạch máu lớn** (macrovascular): tăng nguy cơ bệnh tim mạch, đột quỵ và bệnh động mạch ngoại vi (tuần hoàn kém ở chân).",
        "Tin tốt là: những tổn thương này **không xảy ra ngay lập tức** và **có thể được làm chậm lại** đáng kể khi đường huyết được kiểm soát tốt hơn.",
        "Kiểm soát đường huyết không nhất thiết phải hoàn hảo – ngay cả việc giảm đường huyết vừa phải cũng giúp giảm nguy cơ biến chứng.",
        "Đó là lý do tại sao mỗi bữa ăn tốt hơn, mỗi lần đi bộ sau ăn, mỗi lần uống thuốc đúng giờ đều có ý nghĩa.",
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
          id: "q6-1",
          question: "Kiểm soát đường huyết tốt hơn có giúp ngăn ngừa biến chứng không?",
          options: [
            "Có, giúp làm chậm và giảm nguy cơ biến chứng đáng kể",
            "Không, biến chứng sẽ xảy ra dù có kiểm soát hay không",
          ],
          correctIndex: 0,
          explanation:
            "Đúng rồi! Nhiều nghiên cứu lớn đã chứng minh rằng kiểm soát đường huyết tốt có thể giảm nguy cơ biến chứng từ 25% đến hơn 50%.",
        },
        {
          id: "q6-2",
          question:
            "Biến chứng của đường huyết cao thường ảnh hưởng đến cơ quan nào?",
          options: [
            "Mắt, thận, thần kinh và tim mạch",
            "Chỉ ảnh hưởng đến dạ dày",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Đường huyết cao ảnh hưởng đến mạch máu nhỏ và lớn khắp cơ thể, đặc biệt là mắt, thận, thần kinh và tim.",
        },
      ],
      sources: [
        "UK Prospective Diabetes Study (UKPDS) Group (1998), Lancet",
        "American Diabetes Association, Standards of Medical Care in Diabetes (2024), Section 10: Cardiovascular Disease",
      ],
    },
  },
  {
    id: 7,
    slug: "met-sau-an-bien-chung-lau-dai",
    title: "Mệt sau ăn, nhanh đói và biến chứng lâu dài",
    chapter: "nguy-co-va-theo-doi",
    estimatedMinutes: 5,
    icon: "Zap",
    previewText:
      "Kết nối giữa cảm giác mệt sau ăn, cơn đói nhanh và những nguy cơ lâu dài.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Bao giờ ăn xong mà vẫn thấy mệt, buồn ngủ hoặc nhanh đói lại? Đây không phải chuyện bình thường.",
      simpleSummary:
        "Mệt sau ăn và nhanh đói là dấu hiệu của đường cong đột biến. Nhận ra dấu hiệu này giúp cô chú điều chỉnh bữa ăn kịp thời.",
      actionToday:
        "Hôm nay, sau bữa cơm trưa, ghi lại: 'Sau 1 tiếng tôi cảm thấy thế nào? Buồn ngủ không? Đói không?'",
      illustrationPlaceholder: "/images/placeholder-fatigue.svg",
      illustrationAlt: "Hình minh họa người cảm thấy mệt sau bữa ăn nhiều tinh bột",
      body: [
        "**Mệt và buồn ngủ sau ăn**: Khi đường huyết tăng vọt, cơ thể tiết nhiều insulin để hạ đường nhanh. Đường huyết có thể xuống thấp nhanh chóng sau đó – gây cảm giác mệt mỏi, khó tập trung.",
        "**Nhanh đói trở lại**: Đường cong đột biến rồi hạ xuống nhanh khiến não nhận tín hiệu 'cần thêm năng lượng' – dù bữa trước chưa lâu.",
        "**Thèm đồ ngọt hoặc tinh bột**: Khi đường huyết xuống, cơ thể thường thèm thứ gì đó ngọt hoặc tinh bột để tăng năng lượng nhanh – tạo thành vòng lặp.",
        "**Về lâu dài**: Những đột biến thường xuyên này tích lũy dần, góp phần làm tăng tình trạng viêm nhiễm mạn tính trong cơ thể và đẩy nhanh quá trình lão hóa mạch máu.",
        "**Bữa ăn ổn định hơn** (đường cong phẳng hơn) giúp cô chú duy trì năng lượng đều đặn suốt ngày, không còn những cơn buồn ngủ hay đói bất chợt.",
      ],
      quiz: [
        {
          id: "q7-1",
          question:
            "Mệt mỏi buồn ngủ sau bữa ăn có thể liên quan đến điều gì?",
          options: [
            "Đường huyết tăng vọt rồi hạ nhanh sau khi ăn nhiều tinh bột",
            "Cơ thể đang tiêu hóa bình thường, không có gì đáng lo",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Mặc dù mệt sau ăn đôi khi là bình thường, nhưng nếu xảy ra thường xuyên và rõ ràng, đó thường là dấu hiệu của đường huyết tăng đột biến.",
        },
        {
          id: "q7-2",
          question:
            "Ăn bữa ăn ổn định hơn (ít gây đột biến đường huyết) có lợi ích gì?",
          options: [
            "Duy trì năng lượng đều đặn, ít đói bất chợt và ít thèm đồ ngọt hơn",
            "Chỉ tốt cho đường huyết, không ảnh hưởng đến cảm giác hằng ngày",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Bữa ăn cân bằng giúp đường cong ổn định, năng lượng đều suốt ngày, và giảm thèm đồ ngọt vào buổi chiều.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 95–120",
        "Benton D et al. (2020), Low glycemic index diets and cognitive performance, Nutrients",
      ],
    },
  },
  {
    id: 8,
    slug: "an-theo-thu-tu",
    title: "Ăn theo thứ tự: rau trước, món đạm sau, cơm cuối",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 7,
    icon: "Layers",
    previewText:
      "Một thay đổi đơn giản trong thứ tự ăn giúp giảm đường huyết sau ăn mà không cần thay đổi món ăn.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Cùng một bữa cơm, cùng những món ăn đó – nhưng ăn theo thứ tự khác nhau sẽ cho kết quả đường huyết khác nhau. Nghe có vẻ lạ, nhưng đây là sự thật.",
      simpleSummary:
        "Ăn rau trước, sau đó đến thịt/cá/đậu, và ăn cơm/bún cuối cùng giúp giảm mức đỉnh đường huyết đáng kể – mà không cần thay đổi món ăn hay khẩu phần.",
      actionToday:
        "Hôm nay ở bữa cơm, hãy thử: ăn hết phần rau trước, rồi mới ăn thịt hoặc cá, cuối cùng mới lấy cơm. Ghi lại cảm nhận.",
      illustrationPlaceholder: "/images/placeholder-meal-order.svg",
      illustrationAlt:
        "Hình minh họa đĩa cơm Việt: bước 1 ăn rau xanh, bước 2 ăn thịt/cá, bước 3 ăn cơm",
      body: [
        "Nghiên cứu đã chỉ ra rằng thứ tự ăn thực phẩm trong bữa ăn ảnh hưởng đáng kể đến mức đường huyết sau ăn.",
        "**Tại sao rau trước giúp ích?**\nChất xơ trong rau xanh tạo ra một lớp 'màng nhầy' nhẹ trong ruột non. Khi tinh bột từ cơm đi vào ruột sau đó, glucose được hấp thu chậm hơn và đều hơn.",
        "**Thứ tự được khuyến nghị:**\n1. **Rau xanh và rau củ** (ăn trước: canh rau, rau luộc, dưa chuột, cà chua...)\n2. **Đạm và chất béo** (ăn tiếp theo: thịt, cá, đậu phụ, trứng)\n3. **Tinh bột** (ăn cuối: cơm, bún, bánh mì)",
        "Một nghiên cứu nhỏ tại Nhật Bản cho thấy cùng một bữa ăn, nhưng ăn rau trước rồi mới ăn cơm giúp giảm mức đỉnh đường huyết sau ăn so với ăn cơm trước.",
        "**Điều này phù hợp với bữa cơm Việt Nam không?**\nRất phù hợp! Cô chú vẫn có đủ cơm, canh, thịt/cá – chỉ thay đổi thứ tự là bắt đầu bằng tô canh rau hoặc đĩa rau luộc trước khi gắp cơm.",
        "**Lưu ý thực tế:**\nKhông cần ăn hoàn toàn xong rau mới được đụng đến thứ khác. Chỉ cần **bắt đầu bằng rau** và để rau chiếm phần lớn những gắp đầu tiên.",
        "**Áp dụng tại nhà hàng, đám tiệc:**\nNhìn vào bàn ăn và tìm rau trước – dưa muối, gỏi, canh rau, rau sống – ăn những thứ đó trước khi đụng đến cơm hay bánh.",
      ],
      safetyAlerts: [
        {
          type: "diet",
          message:
            "Nội dung này nhằm mục đích giáo dục sức khỏe. Không tự ý ngưng thuốc, đổi liều thuốc hoặc thay đổi insulin khi chưa trao đổi với bác sĩ điều trị.",
        },
        {
          type: "medication",
          message:
            "Người đang dùng insulin hoặc thuốc có nguy cơ gây hạ đường huyết cần trao đổi với bác sĩ trước khi thay đổi nhiều trong chế độ ăn hoặc vận động.",
        },
      ],
      quiz: [
        {
          id: "q8-1",
          question: "Theo thứ tự ăn được khuyến nghị, cô chú nên ăn gì đầu tiên?",
          options: [
            "Rau xanh và rau củ",
            "Cơm hoặc bún để no lâu hơn",
          ],
          correctIndex: 0,
          explanation:
            "Đúng rồi! Ăn rau trước giúp chất xơ tạo lớp đệm trong ruột, làm chậm hấp thu glucose từ cơm và tinh bột ăn sau đó.",
        },
        {
          id: "q8-2",
          question:
            "Áp dụng thứ tự ăn có nghĩa là cô chú phải thay đổi hoàn toàn món ăn trong bữa không?",
          options: [
            "Không, vẫn ăn những món cũ, chỉ thay đổi thứ tự",
            "Có, phải bỏ hoàn toàn cơm và tinh bột",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Đây là điểm hay nhất của thói quen này – không cần thay đổi món ăn, không cần từ bỏ cơm. Chỉ cần bắt đầu bữa ăn bằng rau.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 89–100",
        "Imai S et al. (2013), A simple meal plan of 'eating vegetables before carbohydrates', Asia Pac J Clin Nutr",
        "Shukla AP et al. (2017), Food Order Has a Significant Impact on Postprandial Glucose and Insulin Levels, Diabetes Care",
      ],
    },
  },
  {
    id: 9,
    slug: "them-dia-rau-nho",
    title: "Thêm một đĩa rau nhỏ trước bữa chính",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 5,
    icon: "Salad",
    previewText:
      "Cách thực tế nhất để áp dụng thứ tự ăn vào bữa cơm Việt Nam hằng ngày.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Nếu bài trước nói về thứ tự ăn, bài này giúp cô chú làm điều đó thật dễ trong bữa cơm hằng ngày.",
      simpleSummary:
        "Thêm một đĩa rau nhỏ ăn đầu bữa – rau luộc, canh rau, rau sống – là cách đơn giản nhất để giảm đường huyết sau ăn.",
      actionToday:
        "Thêm một đĩa rau luộc (bất kỳ loại gì trong nhà) vào bữa tối hôm nay và ăn hết trước khi cầm đũa gắp cơm.",
      illustrationPlaceholder: "/images/placeholder-vegetable-plate.svg",
      illustrationAlt:
        "Hình minh họa đĩa rau luộc xanh tươi đặt trước bữa cơm Việt Nam",
      body: [
        "Gợi ý rau dễ làm cho bữa cơm hằng ngày:\n- **Rau luộc**: rau muống, rau lang, bông cải xanh, đậu cô ve\n- **Canh rau**: bất kỳ canh rau nào đều được\n- **Dưa leo, cà chua, giá đỗ** ăn sống\n- **Dưa muối** (ít muối, lượng vừa phải)\n- **Rau thơm** ăn kèm",
        "**Không cần chế biến phức tạp**: rau luộc chấm nước mắm, hoặc canh rau đơn giản là đủ.",
        "**Lượng bao nhiêu?** Một đĩa nhỏ hay một tô canh rau là đủ để tạo hiệu ứng làm chậm đường huyết.",
        "**Khi ăn ngoài hàng**: gọi thêm một đĩa rau hoặc tô súp rau trước. Nhiều quán bún/phở có rau sống kèm – hãy ăn rau đó trước khi ăn bún.",
        "**Khi bận không có rau**: một vài lát dưa leo hay cà chua sẵn trong tủ lạnh cũng là lựa chọn tốt.",
        "Đây là thói quen nhỏ nhưng dễ duy trì – và hiệu quả được khoa học hỗ trợ.",
      ],
      quiz: [
        {
          id: "q9-1",
          question: "Rau nào phù hợp để ăn trước bữa chính?",
          options: [
            "Bất kỳ rau xanh nào: luộc, sống, canh rau đều được",
            "Chỉ được dùng salad theo kiểu phương Tây",
          ],
          correctIndex: 0,
          explanation:
            "Hoàn toàn đúng! Không cần thay đổi phong cách ăn uống – rau muống luộc, canh cải, giá đỗ... tất cả đều phù hợp và tốt cho đường huyết.",
        },
        {
          id: "q9-2",
          question: "Khi ăn ngoài hàng bún/phở, cô chú có thể làm gì?",
          options: [
            "Ăn rau sống kèm theo trước khi ăn bún hoặc phở",
            "Tránh ăn rau vì không biết nguồn gốc",
          ],
          correctIndex: 0,
          explanation:
            "Rất thực tế! Rau sống kèm theo bún, phở là cơ hội tốt để áp dụng thứ tự ăn – ăn rau trước, sau đó mới ăn bún.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 92–95",
        "Imai S et al. (2013), Asia Pac J Clin Nutr",
      ],
    },
  },
  {
    id: 10,
    slug: "khong-chi-nhin-calo",
    title: "Không chỉ nhìn calo: hãy nhìn cả cơm, bánh và đồ ngọt",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 5,
    icon: "Eye",
    previewText:
      "Tại sao hai bữa ăn cùng calo có thể ảnh hưởng rất khác nhau đến đường huyết.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Nhiều cô chú cẩn thận đếm calo nhưng vẫn thấy đường huyết không ổn định. Lý do là calo không nói lên tất cả.",
      simpleSummary:
        "Calo quan trọng cho cân nặng, nhưng với đường huyết, loại và chất lượng carbohydrate ăn vào quan trọng hơn tổng số calo.",
      actionToday:
        "Hôm nay nhìn vào bữa sáng của mình: bên cạnh calo, có bao nhiêu phần là cơm/bánh/đồ ngọt, và bao nhiêu phần là rau và đạm?",
      illustrationPlaceholder: "/images/placeholder-calories-vs-carbs.svg",
      illustrationAlt:
        "Hình so sánh: bữa ăn 400 calo toàn tinh bột vs bữa ăn 400 calo gồm rau, đạm và ít tinh bột",
      body: [
        "**Calo là gì?** Calo đo lường năng lượng tổng cộng trong thức ăn. Nó không cho biết thức ăn đó ảnh hưởng đến đường huyết như thế nào.",
        "Ví dụ: 400 calo từ một tô cơm trắng sẽ làm đường huyết tăng rất khác so với 400 calo từ một bữa có rau, trứng và một chén cơm nhỏ.",
        "**Điều quan trọng hơn calo cho đường huyết:**\n- Loại carbohydrate (tinh bột trắng hay ngũ cốc nguyên hạt)\n- Lượng chất xơ trong bữa ăn\n- Có rau và đạm đi kèm không\n- Thứ tự ăn trong bữa",
        "**Không có nghĩa là calo không quan trọng** – calo vẫn liên quan đến cân nặng, và cân nặng ảnh hưởng đến tiểu đường. Nhưng cô chú cần nhìn thêm vào chất lượng carbohydrate.",
        "**Thực hành đơn giản:** Với mỗi bữa ăn, hỏi: 'Tôi có đủ rau không? Tôi có đạm (thịt/cá/đậu) không? Phần cơm/bánh có quá nhiều không?'",
      ],
      quiz: [
        {
          id: "q10-1",
          question: "Hai bữa ăn cùng calo có ảnh hưởng đường huyết giống nhau không?",
          options: [
            "Không nhất thiết – loại thức ăn và tỉ lệ carbohydrate mới quyết định đường huyết",
            "Có, cùng calo thì tác động đến đường huyết luôn giống nhau",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Một bữa 400 calo toàn tinh bột sẽ gây đường huyết tăng cao hơn nhiều so với bữa 400 calo gồm rau, đạm và ít tinh bột.",
        },
        {
          id: "q10-2",
          question: "Điều gì quan trọng hơn khi xem xét ảnh hưởng đến đường huyết?",
          options: [
            "Chất lượng và loại carbohydrate, lượng chất xơ và đạm trong bữa",
            "Chỉ cần giảm tổng lượng calo xuống dưới 1200 là đủ",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Với người tiểu đường, chất lượng carbohydrate – không chỉ số calo – mới là yếu tố then chốt ảnh hưởng đến đường huyết sau ăn.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 55–70",
        "Ludwig DS et al. (2018), The carbohydrate-insulin model, BMJ Open",
      ],
    },
  },
  {
    id: 11,
    slug: "bua-sang-no-lau",
    title: "Bữa sáng no lâu, đường huyết êm hơn",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 6,
    icon: "Sunrise",
    previewText:
      "Xây dựng bữa sáng cân đối giúp duy trì năng lượng và hạn chế cơn đói giữa buổi.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Buổi sáng cô chú hay ăn gì? Một ổ bánh mì, tô cháo hay một bát phở? Bữa sáng ảnh hưởng đến đường huyết cả ngày.",
      simpleSummary:
        "Bữa sáng có nhiều đạm và chất xơ, ít tinh bột đơn giản giúp đường huyết ổn định hơn và no lâu hơn trong buổi sáng.",
      actionToday:
        "Hôm nay thử thêm một quả trứng hoặc miếng đậu phụ vào bữa sáng của mình, bên cạnh phần tinh bột đã có.",
      illustrationPlaceholder: "/images/placeholder-breakfast.svg",
      illustrationAlt:
        "Hình minh họa bữa sáng cân đối: trứng, rau, một phần nhỏ tinh bột",
      body: [
        "**Bữa sáng nhiều tinh bột đơn giản** (bánh mì trắng, cháo trắng, phở, bún bò...): glucose vào máu nhanh → đường huyết tăng cao buổi sáng → nhanh đói trở lại sau 2–3 tiếng.",
        "**Bữa sáng cân đối hơn** (có thêm đạm và chất béo lành mạnh): glucose tăng từ từ → no lâu hơn → ít thèm ăn vặt buổi sáng.",
        "**Gợi ý bữa sáng cân đối hơn cho người Việt:**\n- Bánh mì + trứng ốp la + rau sống (giảm bớt mứt và bơ ngọt)\n- Cháo + đậu phụ hoặc thịt nạc xay + rau\n- Phở + thêm nhiều giá đỗ, rau, ăn rau trước khi ăn bún/phở\n- Xôi lạc/xôi đậu xanh (lạc và đậu có đạm) thay vì xôi gà mỡ ngọt",
        "**Bữa sáng nên tránh (hoặc hạn chế):**\n- Bánh ngọt, bánh mì kẹp mứt/kem\n- Cháo đường, cháo đậu xanh ngọt nhiều đường\n- Nước trái cây đóng hộp thay cho bữa sáng\n- Ngũ cốc ăn sáng ngọt",
        "**Nếu sáng cô chú không có nhiều thời gian:** Hai quả trứng luộc sẵn từ tối hôm trước kết hợp với rau sống là bữa sáng nhanh và tốt.",
        "**Nhắc nhở quan trọng:** Không bỏ bữa sáng, đặc biệt khi đang uống thuốc tiểu đường vì có thể gây hạ đường huyết.",
      ],
      safetyAlerts: [
        {
          type: "medication",
          message:
            "Người đang dùng insulin hoặc thuốc có nguy cơ gây hạ đường huyết cần trao đổi với bác sĩ trước khi thay đổi nhiều trong chế độ ăn hoặc vận động.",
        },
      ],
      quiz: [
        {
          id: "q11-1",
          question: "Bữa sáng có đạm (trứng, đậu phụ...) so với bữa sáng toàn tinh bột thì?",
          options: [
            "No lâu hơn và đường huyết tăng chậm hơn",
            "Không khác gì nhau về đường huyết",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Đạm và chất xơ làm chậm tiêu hóa, giúp glucose vào máu từ từ hơn và cảm giác no kéo dài hơn.",
        },
        {
          id: "q11-2",
          question: "Người đang uống thuốc tiểu đường có nên bỏ bữa sáng để giảm đường huyết không?",
          options: [
            "Không – bỏ bữa khi uống thuốc có thể gây nguy hiểm (hạ đường huyết)",
            "Có – nhịn sáng giúp đường huyết ổn định hơn",
          ],
          correctIndex: 0,
          explanation:
            "Rất quan trọng! Một số thuốc tiểu đường (đặc biệt là insulin và sulfonylurea) có thể gây hạ đường huyết nếu bỏ bữa. Hỏi bác sĩ về lịch uống thuốc khi thay đổi bữa ăn.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 110–130",
        "Jakubowicz D et al. (2015), High-energy breakfast with low-energy dinner, Diabetologia",
      ],
    },
  },
  {
    id: 12,
    slug: "mat-ong-duong-phen-van-la-duong",
    title: "Mật ong, đường phèn hay đường nâu vẫn là đường",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 4,
    icon: "Honey",
    previewText:
      "Làm rõ sự thật về mật ong, đường phèn, đường nâu và các chất ngọt 'tự nhiên' khác.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Nhiều người nghĩ mật ong hay đường phèn là 'đường tốt, không hại' cho người tiểu đường. Điều này không hoàn toàn đúng.",
      simpleSummary:
        "Mật ong, đường phèn, đường nâu, đường dừa đều chứa đường và làm tăng đường huyết. Chúng có thể có thêm một số dưỡng chất nhưng tác động lên đường huyết tương tự đường trắng.",
      actionToday:
        "Kiểm tra trong bếp xem cô chú đang dùng loại ngọt gì – mật ong, đường phèn hay đường cát – và nhớ rằng tất cả đều cần dùng tiết kiệm.",
      illustrationPlaceholder: "/images/placeholder-sweeteners.svg",
      illustrationAlt:
        "Hình so sánh các loại đường: đường trắng, đường nâu, đường phèn, mật ong – tất cả có chỉ số đường huyết tương đương",
      body: [
        "**Mật ong**: chứa fructose và glucose, chỉ số đường huyết (GI) khoảng 55–65, cao hơn một số loại đường. Có thêm một số enzyme và khoáng chất nhỏ, nhưng lượng quá ít để có ý nghĩa y khoa.",
        "**Đường phèn (đường thô, đường nâu)**: gần giống đường trắng về mặt hóa học, chỉ có thêm ít mật mía. GI tương tự đường trắng.",
        "**Đường dừa, siro agave**: cũng là đường, ảnh hưởng đến đường huyết tương tự.",
        "**Điều này không có nghĩa là không bao giờ dùng mật ong**: cô chú vẫn có thể dùng một lượng nhỏ mật ong – nhưng cần biết rằng nó CŨNG làm tăng đường huyết, và không phải là 'đường an toàn' đặc biệt cho người tiểu đường.",
        "**Gợi ý thực tế:**\n- Thay vì dùng nhiều đường, hãy làm quen với vị ngọt nhẹ hơn\n- Khi nấu ăn, giảm dần lượng đường trong công thức\n- Nếu cần ngọt, dùng lượng rất nhỏ bất kỳ loại nào và theo dõi đường huyết",
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
          id: "q12-1",
          question: "Mật ong có an toàn để người tiểu đường dùng thoải mái không?",
          options: [
            "Không – mật ong vẫn làm tăng đường huyết và cần dùng tiết kiệm",
            "Có – mật ong là đường tự nhiên nên không ảnh hưởng đến đường huyết",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Mật ong chứa đường và làm tăng đường huyết giống đường trắng. Có thể dùng lượng rất nhỏ nhưng không phải là lựa chọn 'tự do'.",
        },
        {
          id: "q12-2",
          question: "Đường phèn so với đường trắng thì ảnh hưởng đến đường huyết như thế nào?",
          options: [
            "Tương đương nhau về mặt tác động lên đường huyết",
            "Đường phèn hoàn toàn không làm tăng đường huyết",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Đường phèn chủ yếu là sucrose – giống đường trắng về cấu tạo hóa học và tác động lên đường huyết.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 145–155",
        "American Diabetes Association, Sweeteners and Diabetes (2023)",
      ],
    },
  },
  {
    id: 13,
    slug: "neu-an-mon-ngot",
    title: "Nếu ăn món ngọt, ăn ít và ăn sau bữa chính",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 5,
    icon: "Cookie",
    previewText:
      "Cách thưởng thức đồ ngọt mà không gây đột biến đường huyết lớn.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Cô chú không nhất thiết phải từ bỏ hoàn toàn đồ ngọt – nhưng thời điểm và lượng ăn rất quan trọng.",
      simpleSummary:
        "Ăn đồ ngọt sau bữa chính (không phải lúc đói hay thay bữa), với lượng nhỏ, giúp giảm mức độ tăng đường huyết so với ăn đồ ngọt lúc bụng đói.",
      actionToday:
        "Nếu muốn ăn chút bánh hay trái cây ngọt, hãy ăn sau bữa cơm – không phải lúc đói hay thay bữa.",
      illustrationPlaceholder: "/images/placeholder-dessert-timing.svg",
      illustrationAlt:
        "Hình minh họa: ăn bánh lúc bụng đói vs ăn bánh sau bữa cơm – đường cong đường huyết khác nhau",
      body: [
        "**Tại sao thời điểm quan trọng?**\nKhi bụng đói, không có gì trong ruột để làm chậm hấp thu glucose. Đồ ngọt ăn lúc này sẽ làm đường huyết tăng vọt rất nhanh.",
        "**Sau bữa chính**, ruột đã có rau, đạm và chất béo – những thứ này làm chậm tốc độ hấp thu glucose từ đồ ngọt ăn thêm.",
        "**Lượng nhỏ**: Một miếng bánh nhỏ, vài viên kẹo, hay một ít trái cây sau bữa ăn tác động ít hơn nhiều so với ăn cả đĩa bánh lúc đói.",
        "**Trái cây**: Trái cây chứa đường fructose và glucose tự nhiên, cùng với chất xơ. Ăn cả trái (không ép nước) sau bữa ăn là cách tốt hơn ăn lúc đói hay uống nước ép.",
        "**Không nên:**\n- Ăn đồ ngọt như bữa sáng thay cơm\n- Ăn bánh kẹo lúc đói giữa buổi\n- Uống nước ngọt cùng bữa ăn (làm đường huyết tăng rất nhanh)\n- Coi đây là thói quen hằng ngày",
        "**Nhấn mạnh:** Bài học này không khuyến khích cô chú ăn đồ ngọt nhiều hơn. Đây là hướng dẫn cho những dịp đặc biệt khi không thể tránh.",
      ],
      safetyAlerts: [
        {
          type: "diet",
          message:
            "Nội dung này nhằm mục đích giáo dục sức khỏe. Không tự ý ngưng thuốc, đổi liều thuốc hoặc thay đổi insulin khi chưa trao đổi với bác sĩ điều trị.",
        },
      ],
      quiz: [
        {
          id: "q13-1",
          question: "Khi nào nên ăn đồ ngọt để giảm ảnh hưởng lên đường huyết?",
          options: [
            "Sau bữa ăn chính, với lượng nhỏ",
            "Lúc đói để không còn thèm nữa",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Sau bữa ăn chính, ruột đã có rau và đạm giúp hấp thu đường chậm hơn. Lúc đói, không có gì cản trở glucose đổ thẳng vào máu.",
        },
        {
          id: "q13-2",
          question: "Bài học này có nghĩa là cô chú có thể ăn đồ ngọt hằng ngày không?",
          options: [
            "Không – đây là hướng dẫn cho dịp đặc biệt, không phải khuyến khích ăn ngọt nhiều hơn",
            "Có, chỉ cần ăn sau bữa cơm là được",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Bài học này giúp cô chú biết cách xử lý khi không thể tránh đồ ngọt – không phải để ăn ngọt nhiều hơn mỗi ngày.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 155–170",
        "Goff LM et al. (2013), Meal sequence impacts blood sugar, Nutrition & Metabolism",
      ],
    },
  },
  {
    id: 14,
    slug: "giam-trong-bua-an",
    title: "Giấm trong bữa ăn: lựa chọn phụ, không bắt buộc",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 5,
    icon: "Flask",
    previewText:
      "Sự thật về giấm, tác dụng có giới hạn và cách dùng đúng nếu muốn thử.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Cô chú có nghe nhiều người nói uống giấm trước bữa ăn để giảm đường huyết không? Có phần đúng, nhưng cần hiểu rõ hơn.",
      simpleSummary:
        "Axit acetic trong giấm có thể giúp làm chậm hấp thu glucose một chút. Đây là lựa chọn phụ, không thay thế thuốc hay phương pháp chính.",
      actionToday:
        "Nếu muốn thử, cho thêm một thìa giấm gạo vào nước chấm hoặc trộn salad – không uống giấm nguyên chất.",
      illustrationPlaceholder: "/images/placeholder-vinegar.svg",
      illustrationAlt: "Hình minh họa giấm gạo được dùng trong bữa ăn Việt",
      body: [
        "Nghiên cứu cho thấy axit acetic trong giấm có thể làm chậm enzyme tiêu hóa tinh bột, giúp glucose hấp thu chậm hơn một chút.",
        "**Tác dụng là có thật nhưng khiêm tốn**: Giấm không thay thế được thuốc điều trị, không thay thế được chế độ ăn tốt hay vận động.",
        "**Cách dùng an toàn:**\n- Pha loãng trong nước (1 thìa cà phê + 1 ly nước) uống trước bữa ăn 10–15 phút\n- Dùng làm nước chấm (giấm pha nước mắm, chanh)\n- Trộn vào rau sống (giấm + dầu ô liu + rau)\n- Cho vào canh chua",
        "**Không nên:**\n- Uống giấm nguyên chất – gây kích ứng thực quản và dạ dày\n- Dùng nhiều hơn 2 thìa mỗi ngày\n- Coi giấm là 'thuốc' điều trị tiểu đường\n- Dùng giấm để thay thuốc",
        "**Ai không nên dùng:** Người có vấn đề về dạ dày (viêm loét), người dùng thuốc làm loãng máu cần hỏi bác sĩ trước.",
        "Nếu cô chú không thích mùi giấm, hoàn toàn không cần dùng. Những thói quen khác trong khóa học này quan trọng hơn nhiều.",
      ],
      safetyAlerts: [
        {
          type: "default",
          message:
            "Nội dung này nhằm mục đích giáo dục sức khỏe. Không tự ý ngưng thuốc, đổi liều thuốc hoặc thay đổi insulin khi chưa trao đổi với bác sĩ điều trị.",
        },
        {
          type: "medication",
          message:
            "Người dùng thuốc làm loãng máu hoặc có vấn đề dạ dày cần hỏi bác sĩ trước khi thêm giấm vào chế độ ăn thường xuyên.",
        },
      ],
      quiz: [
        {
          id: "q14-1",
          question: "Giấm trong bữa ăn có thể thay thế thuốc điều trị tiểu đường không?",
          options: [
            "Không – giấm chỉ là lựa chọn phụ, không thay thế thuốc",
            "Có – nếu dùng đủ giấm mỗi ngày thì không cần thuốc nữa",
          ],
          correctIndex: 0,
          explanation:
            "Tuyệt đối không! Giấm chỉ có tác dụng rất nhỏ và không thay thế được thuốc điều trị. Không bao giờ tự ý ngưng thuốc.",
        },
        {
          id: "q14-2",
          question: "Cách dùng giấm an toàn nhất là gì?",
          options: [
            "Pha loãng trong nước hoặc dùng làm nước chấm, không uống nguyên chất",
            "Uống thẳng từ chai giấm mỗi sáng để hiệu quả nhất",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Uống giấm nguyên chất gây kích ứng thực quản và dạ dày. Pha loãng hoặc dùng trong nấu ăn là cách an toàn.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 169–175",
        "Johnston CS et al. (2004), Vinegar improves insulin sensitivity, Diabetes Care",
      ],
    },
  },
  {
    id: 15,
    slug: "sau-an-van-dong-nhe",
    title: "Sau ăn vận động nhẹ 10 phút",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 7,
    icon: "PersonStanding",
    previewText:
      "Vì sao đi bộ hoặc vận động nhẹ 10 phút sau ăn giúp giảm đường huyết sau bữa một cách đáng kể.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Không cần đến phòng gym, không cần đổ mồ hôi – chỉ 10 phút đi bộ nhẹ sau bữa ăn đã có thể tạo ra sự khác biệt.",
      simpleSummary:
        "Vận động nhẹ sau ăn giúp cơ bắp sử dụng glucose trực tiếp mà không cần insulin, làm giảm đường huyết sau bữa ăn một cách hiệu quả và an toàn.",
      actionToday:
        "Sau bữa cơm tối hôm nay, thử đi bộ nhẹ 10 phút quanh nhà hoặc ra sân trước. Ghi lại cảm nhận.",
      illustrationPlaceholder: "/images/placeholder-walk-after-meal.svg",
      illustrationAlt:
        "Hình minh họa người cao tuổi đi bộ nhẹ nhàng sau bữa ăn trong sân nhà",
      body: [
        "**Tại sao vận động sau ăn lại hiệu quả?**\nKhi cơ bắp hoạt động, chúng có thể hấp thu glucose trực tiếp từ máu mà **không cần insulin**. Điều này giúp hạ đường huyết nhanh hơn và hiệu quả hơn.",
        "Nghiên cứu cho thấy chỉ 10–15 phút đi bộ nhẹ sau ăn có thể giảm đường huyết sau bữa ăn đáng kể so với ngồi yên.",
        "**Tốt nhất là bắt đầu trong vòng 30 phút sau khi ăn xong** – đây là khoảng thời gian đường huyết bắt đầu tăng.",
        "**Hình thức vận động phù hợp:**\n- Đi bộ nhẹ trong nhà hoặc quanh sân\n- Làm việc nhà nhẹ nhàng (rửa bát, tưới cây)\n- Đứng và đi lại thay vì nằm ngay sau ăn\n- Đạp xe đạp tại chỗ nhẹ nhàng\n- Bài tập ngồi (chair exercises) nếu khó đi lại",
        "**Không cần mạnh hay vội vàng**: Đi bộ chậm, thoải mái là đủ. Không cần đổ mồ hôi.",
        "**Lưu ý thực tế**: Nhiều cô chú có thể tranh thủ sau bữa cơm trưa hoặc tối đi bộ nhẹ xung quanh nhà 1–2 vòng.",
      ],
      safetyAlerts: [
        {
          type: "exercise",
          message:
            "Người đang dùng insulin hoặc thuốc có nguy cơ gây hạ đường huyết cần trao đổi với bác sĩ trước khi thay đổi nhiều trong chế độ ăn hoặc vận động.",
        },
        {
          type: "medication",
          message:
            "Nếu dùng insulin hoặc thuốc sulfonylure, hãy đo đường huyết trước khi vận động. Mang theo đường hoặc kẹo trong người đề phòng hạ đường huyết. Nếu thấy run rẩy, vã mồ hôi hoặc chóng mặt khi đang vận động, hãy dừng ngay và ăn/uống gì đó có đường.",
        },
      ],
      quiz: [
        {
          id: "q15-1",
          question: "Vận động nhẹ sau ăn giúp giảm đường huyết như thế nào?",
          options: [
            "Cơ bắp hấp thu glucose trực tiếp mà không cần insulin",
            "Vận động đốt cháy toàn bộ đường đã ăn trong bữa",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Khi cơ bắp đang hoạt động, chúng có thể nhận glucose từ máu mà không cần chờ insulin – giúp hạ đường huyết tự nhiên và hiệu quả.",
        },
        {
          id: "q15-2",
          question:
            "Người dùng insulin khi cảm thấy run rẩy hoặc chóng mặt lúc đang đi bộ nên làm gì?",
          options: [
            "Dừng vận động ngay và ăn/uống gì có đường (kẹo, nước ngọt)",
            "Tiếp tục đi nhanh hơn để làm ấm người",
          ],
          correctIndex: 0,
          explanation:
            "Rất quan trọng! Các triệu chứng trên có thể là dấu hiệu hạ đường huyết. Phải dừng lại và bổ sung đường ngay. Nếu không đỡ sau 15 phút, cần đến cơ sở y tế.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 178–185",
        "DiPietro L et al. (2013), Three 15-min bouts of moderate postmeal walking, Diabetes Care",
        "Reynolds AN et al. (2020), Advice to walk after meals, Diabetologia",
      ],
    },
  },
  {
    id: 16,
    slug: "bua-phu-thong-minh",
    title: "Bữa phụ thông minh: ưu tiên món mặn, ít đường",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 5,
    icon: "UtensilsCrossed",
    previewText:
      "Cách chọn bữa phụ giữa các bữa chính mà không làm đường huyết tăng vọt.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Bữa phụ giữa buổi của cô chú thường là gì? Bánh, kẹo, trái cây hay cốc trà đá?",
      simpleSummary:
        "Bữa phụ tốt nhất là loại có đạm, chất béo lành mạnh hoặc chất xơ – không phải bánh ngọt hay trái cây ngọt một mình.",
      actionToday:
        "Thay vì bánh quy hay kẹo vào buổi chiều, thử ăn một quả trứng luộc, miếng phô mai nhỏ hoặc một nắm hạt nhỏ.",
      illustrationPlaceholder: "/images/placeholder-snack.svg",
      illustrationAlt:
        "Hình minh họa bữa phụ lành mạnh: trứng luộc, hạt, rau củ nhỏ",
      body: [
        "**Bữa phụ nguy hiểm cho đường huyết:**\n- Bánh quy ngọt, bánh kem\n- Kẹo, chocolate (nếu nhiều đường)\n- Trái cây ngọt ăn một mình lúc đói (xoài, chuối, nho)\n- Nước ép trái cây, nước ngọt\n- Bánh mì ngọt",
        "**Bữa phụ ít ảnh hưởng đến đường huyết:**\n- Trứng luộc\n- Phô mai (cheese) lượng nhỏ\n- Hạt (hạnh nhân, hạt điều, hạt bí) một nắm nhỏ\n- Dưa leo, cà rốt nhỏ\n- Đậu phụ trắng\n- Sữa chua không đường",
        "**Tại sao 'mặn hơn ngọt' cho bữa phụ?**\nThực phẩm mặn thường có đạm và chất béo, ít đường đơn. Chúng tiêu hóa chậm hơn và không gây đột biến đường huyết.",
        "**Khi nào nên ăn bữa phụ?**\nKhi thực sự đói giữa các bữa – không ăn vặt theo thói quen hay do chán.",
        "**Lưu ý:** Một số người tiểu đường cần ăn bữa phụ để tránh hạ đường huyết – hỏi bác sĩ xem cô chú có cần ăn bữa phụ bắt buộc không.",
      ],
      quiz: [
        {
          id: "q16-1",
          question: "Loại bữa phụ nào ít ảnh hưởng đến đường huyết nhất?",
          options: [
            "Trứng luộc hoặc một nắm hạt nhỏ",
            "Một ly nước ép trái cây tươi",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Trứng và hạt có đạm + chất béo, tiêu hóa chậm và ổn định. Nước ép trái cây không có chất xơ, glucose vào máu rất nhanh.",
        },
        {
          id: "q16-2",
          question: "Tại sao không nên ăn trái cây ngọt một mình lúc đói?",
          options: [
            "Vì không có rau/đạm đi kèm, đường từ trái cây hấp thu nhanh hơn vào máu",
            "Vì trái cây không tốt cho người tiểu đường và không nên ăn bao giờ",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Trái cây vẫn tốt cho sức khỏe nhưng nên ăn sau bữa cơm. Ăn trái cây ngọt lúc bụng đói có thể làm đường huyết tăng nhanh.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 190–200",
        "American Diabetes Association, Snacking Guidelines (2023)",
      ],
    },
  },
  {
    id: 17,
    slug: "dung-an-tinh-bot-mot-minh",
    title: "Đừng ăn tinh bột một mình",
    chapter: "thuc-hanh-bua-an",
    estimatedMinutes: 5,
    icon: "Combine",
    previewText:
      "Phối hợp tinh bột với rau, đạm và chất béo giúp đường cong ổn định hơn nhiều.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Một bát cơm trắng không với bất kỳ thứ gì khác sẽ làm đường huyết tăng nhanh hơn rất nhiều so với cùng lượng cơm đó ăn cùng rau và thịt.",
      simpleSummary:
        "Khi ăn tinh bột kết hợp với chất xơ (rau), đạm (thịt/cá/đậu) và chất béo tốt, tốc độ hấp thu glucose sẽ chậm lại đáng kể.",
      actionToday:
        "Hôm nay đừng ăn cơm không – luôn kết hợp với ít nhất một loại rau và một món đạm.",
      illustrationPlaceholder: "/images/placeholder-balanced-plate.svg",
      illustrationAlt:
        "Hình minh họa đĩa ăn cân đối: rau xanh chiếm nửa đĩa, đạm một phần tư, tinh bột một phần tư",
      body: [
        "**Tinh bột một mình**: Tốc độ tiêu hóa cực nhanh, glucose tràn vào máu rất nhanh.",
        "**Tinh bột + rau (chất xơ)**: Chất xơ tạo độ nhớt trong ruột, làm chậm hấp thu glucose.",
        "**Tinh bột + đạm**: Đạm làm chậm tốc độ tiêu hóa chung của bữa ăn.",
        "**Tinh bột + chất béo tốt**: Chất béo làm chậm quá trình làm rỗng dạ dày.",
        "**Khi ba yếu tố cùng có mặt**: Đường huyết tăng chậm nhất và ổn định nhất.",
        "**Ứng dụng trong bữa ăn Việt:**\n- Luôn có canh rau hoặc đĩa rau trong bữa\n- Luôn có một món đạm: thịt, cá, đậu phụ, trứng\n- Không ăn cơm hoặc bún không (không có gì đi kèm)\n- Có thể thêm một ít chất béo tốt: dầu ăn khi xào rau, cá có omega-3",
        "**Mô hình đĩa ăn gợi ý:**\n- ½ đĩa: rau xanh và rau củ\n- ¼ đĩa: đạm (thịt, cá, đậu)\n- ¼ đĩa: tinh bột (cơm, khoai)",
      ],
      quiz: [
        {
          id: "q17-1",
          question:
            "Tại sao ăn cơm kèm rau và thịt tốt hơn ăn cơm một mình?",
          options: [
            "Vì rau và thịt làm chậm hấp thu glucose từ cơm vào máu",
            "Vì cơm một mình có nhiều calo hơn",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! Sự phối hợp của chất xơ (từ rau) và đạm làm chậm tốc độ tiêu hóa và hấp thu glucose – đường cong sau ăn sẽ phẳng hơn nhiều.",
        },
        {
          id: "q17-2",
          question: "Trong mô hình đĩa ăn cân đối, tinh bột nên chiếm bao nhiêu phần đĩa?",
          options: [
            "Khoảng ¼ đĩa – phần còn lại dành cho rau và đạm",
            "½ đĩa – tinh bột cần nhiều để đủ năng lượng",
          ],
          correctIndex: 0,
          explanation:
            "Chính xác! Mô hình gợi ý: ½ đĩa rau xanh, ¼ đĩa đạm, ¼ đĩa tinh bột. Cơ thể vẫn có đủ năng lượng nhưng đường huyết ổn định hơn.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 190–205",
        "USDA MyPlate Method, diabetes adaptation",
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn dinh dưỡng cho người tiểu đường",
      ],
    },
  },
  {
    id: 18,
    slug: "lich-7-ngay-thuc-hanh",
    title: "Lịch 7 ngày thực hành ổn định đường huyết",
    chapter: "ke-hoach-ca-nhan",
    estimatedMinutes: 6,
    icon: "CalendarDays",
    previewText:
      "Kế hoạch 7 ngày kết hợp tất cả những thói quen đã học vào cuộc sống hằng ngày.",
    hasSafetyAlert: true,
    content: {
      openingLine:
        "Bây giờ cô chú đã có đủ kiến thức – hãy cùng đặt kế hoạch 7 ngày đầu tiên.",
      simpleSummary:
        "Một kế hoạch 7 ngày thực tế giúp cô chú áp dụng từng thói quen một cách có hệ thống mà không quá áp lực.",
      actionToday:
        "Đọc kế hoạch 7 ngày dưới đây và bắt đầu từ Ngày 1 vào bữa ăn hôm nay.",
      illustrationPlaceholder: "/images/placeholder-7day-plan.svg",
      illustrationAlt: "Hình minh họa lịch 7 ngày với các ngày được đánh dấu",
      body: [
        "**Ngày 1–2: Tập ăn rau trước**\nMỗi bữa ăn, ăn phần rau (bất kỳ loại nào) trước khi ăn cơm hoặc tinh bột. Chỉ cần tập trung vào một thói quen này.",
        "**Ngày 3–4: Cải thiện bữa sáng**\nThêm một quả trứng hoặc một ít đạm vào bữa sáng. Giảm bớt một nửa phần bánh ngọt hoặc đường trong đồ uống sáng.",
        "**Ngày 5: Thêm đi bộ sau ăn**\nSau bữa cơm tối, đi bộ nhẹ 10 phút. Chỉ một bữa trong ngày là đủ để bắt đầu.",
        "**Ngày 6: Không ăn tinh bột một mình**\nMỗi khi ăn cơm/bún/bánh, đảm bảo có rau và đạm đi kèm. Nhớ quy tắc ¼ đĩa tinh bột.",
        "**Ngày 7: Tổng kết và ghi nhật ký**\nNhìn lại 6 ngày: cô chú đã làm được những gì? Cảm thấy thế nào? Đường huyết có thay đổi không? Ghi vào nhật ký.",
        "**Tuần tiếp theo:** Lặp lại và thêm thói quen bữa phụ thông minh (bài 16) và không ăn tinh bột một mình (bài 17).",
        "**Nhắc nhở:** Không cần hoàn hảo 100%. Làm được 5 trong 7 ngày là tốt. Mỗi bữa cải thiện một chút là đang tiến về phía trước.",
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
          id: "q18-1",
          question: "Trong kế hoạch 7 ngày, thói quen nào được bắt đầu trước tiên?",
          options: ["Ăn rau trước mỗi bữa ăn chính", "Nhịn ăn để giảm đường huyết"],
          correctIndex: 0,
          explanation:
            "Đúng! Ăn rau trước là thói quen đơn giản, không cần thay đổi món ăn, dễ duy trì nhất và là nền tảng cho các thói quen khác.",
        },
        {
          id: "q18-2",
          question: "Nếu trong 7 ngày có 2 ngày không làm được, cô chú nên làm gì?",
          options: [
            "Tiếp tục với những ngày còn lại – 5/7 ngày đã là rất tốt",
            "Bỏ cuộc vì không hoàn thành được kế hoạch",
          ],
          correctIndex: 0,
          explanation:
            "Hoàn toàn đúng! Thay đổi thói quen không cần phải hoàn hảo. Mỗi bữa cải thiện một chút là đang tạo ra sự khác biệt thực sự.",
        },
      ],
      sources: [
        "Jessie Inchauspé (2022), Glucose Revolution, tr. 200–220",
        "Dựa trên khuyến cáo của Hội Nội tiết - Đái tháo đường Việt Nam",
      ],
    },
  },
  {
    id: 19,
    slug: "tai-kham-hoi-bac-si",
    title: "Tái khám và hỏi bác sĩ điều gì?",
    chapter: "ke-hoach-ca-nhan",
    estimatedMinutes: 5,
    icon: "Stethoscope",
    previewText:
      "Danh sách câu hỏi nên hỏi bác sĩ trong lần tái khám tiếp theo để quản lý tốt hơn.",
    hasSafetyAlert: false,
    content: {
      openingLine:
        "Sau khi học xong khóa này, cô chú có thêm nhiều câu hỏi để hỏi bác sĩ – và điều đó rất tốt!",
      simpleSummary:
        "Tái khám định kỳ là cơ hội quý giá để cô chú cập nhật tình trạng sức khỏe và điều chỉnh kế hoạch điều trị cùng bác sĩ.",
      actionToday:
        "Ghi ra giấy hoặc điện thoại những câu hỏi cô chú muốn hỏi bác sĩ trong lần tái khám tới.",
      illustrationPlaceholder: "/images/placeholder-doctor-visit.svg",
      illustrationAlt:
        "Hình minh họa bệnh nhân và bác sĩ ngồi nói chuyện thân thiện tại phòng khám",
      body: [
        "**Câu hỏi về chỉ số mục tiêu:**\n- Chỉ số HbA1c của tôi hiện tại là bao nhiêu và mục tiêu là bao nhiêu?\n- Đường huyết lúc đói và sau ăn của tôi nên ở mức nào?\n- Tôi có cần đo đường huyết tại nhà không? Nếu có, đo khi nào?",
        "**Câu hỏi về thuốc:**\n- Thuốc tôi đang uống có nguy cơ gây hạ đường huyết không?\n- Nếu tôi thay đổi chế độ ăn, thuốc có cần điều chỉnh không?\n- Tôi có cần tiêm insulin không? Tiêu chí nào để quyết định?",
        "**Câu hỏi về lối sống:**\n- Tôi có thể đi bộ sau ăn không? Cường độ và thời gian bao nhiêu là phù hợp?\n- Tôi nên hạn chế thực phẩm gì cụ thể với tình trạng của mình?\n- Tôi có cần gặp chuyên gia dinh dưỡng không?",
        "**Câu hỏi về theo dõi:**\n- Ngoài đường huyết, tôi cần xét nghiệm gì khác mỗi năm (mắt, thận, tim, thần kinh)?\n- Tôi nên tái khám bao lâu một lần?\n- Khi nào tôi cần gọi ngay cho bác sĩ?",
        "**Mẹo nhỏ:** Ghi câu hỏi ra giấy trước khi vào phòng khám – khi gặp bác sĩ dễ quên vì lo lắng hoặc vội vàng.",
      ],
      quiz: [
        {
          id: "q19-1",
          question: "HbA1c là gì?",
          options: [
            "Chỉ số phản ánh mức đường huyết trung bình trong 2–3 tháng qua",
            "Chỉ số đo đường huyết lúc đói buổi sáng",
          ],
          correctIndex: 0,
          explanation:
            "Đúng! HbA1c (Hemoglobin A1c) cho biết đường huyết trung bình trong 2–3 tháng – đây là chỉ số quan trọng nhất trong quản lý tiểu đường lâu dài.",
        },
        {
          id: "q19-2",
          question: "Nếu thay đổi chế độ ăn nhiều, cô chú có cần báo bác sĩ không?",
          options: [
            "Có – thay đổi ăn uống có thể ảnh hưởng đến hiệu quả thuốc",
            "Không cần – chế độ ăn không liên quan đến thuốc",
          ],
          correctIndex: 0,
          explanation:
            "Rất quan trọng! Đặc biệt với người dùng insulin hoặc thuốc hạ đường huyết, thay đổi chế độ ăn cần được bác sĩ biết để điều chỉnh thuốc nếu cần.",
        },
      ],
      sources: [
        "Hội Nội tiết - Đái tháo đường Việt Nam, Hướng dẫn bệnh nhân tái khám (2023)",
        "American Diabetes Association, Standards of Medical Care (2024), Section 4: Comprehensive Medical Evaluation",
      ],
    },
  },
];

export const chapters = {
  "hieu-duong-huyet": {
    title: "Hiểu đường huyết",
    description: "Cơ bản về glucose và cách cơ thể hoạt động",
    color: "#237A57",
    lessonIds: [0, 1, 2, 3, 4, 5],
  },
  "nguy-co-va-theo-doi": {
    title: "Hiểu nguy cơ và theo dõi",
    description: "Nhận biết dấu hiệu và theo dõi đường huyết",
    color: "#D97745",
    lessonIds: [6, 7],
  },
  "thuc-hanh-bua-an": {
    title: "Thực hành trong bữa ăn",
    description: "10 thói quen ăn uống có thể áp dụng ngay",
    color: "#153D32",
    lessonIds: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  "ke-hoach-ca-nhan": {
    title: "Kế hoạch của cô chú",
    description: "Lên kế hoạch và làm việc cùng bác sĩ",
    color: "#237A57",
    lessonIds: [18, 19],
  },
} as const;

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
