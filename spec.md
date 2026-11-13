# Bài nộp LAB5 — T4 Thương mại điện tử · Nhóm H7

**Lớp:** L3B · **Bàn / zone:** [điền] · **Track:** T4 · **Nhóm:** H7

| Họ và tên | Mã học viên | Việc đã làm |
|---|---|---|
| Thành viên 1 — Bùi Ngọc Hùng | 2A202603770 | §1–2: phạm vi, kịch bản rủi ro, bằng chứng track |
| Thành viên 2 — Đinh Hoài Nam | 2A202603762 | §3: UX khi AI sai, nội dung hội thoại và nguyên tắc HAX/PAIR |
| Thành viên 3 — Phạm Minh Đức | 2A202603758 | §4–5: mức tự chủ, prototype và ảnh minh họa |

> Thay họ tên, mã học viên và phần việc bằng thông tin thật trước khi nộp. Kịch bản đơn hàng ECOM-4821 bên dưới là dữ liệu giả do nhóm tự dựng, không phải dữ liệu Shopee hay dữ liệu người thật.

## §1. Lát cắt & phạm vi

**Lát cắt:** Trong Trò chuyện với Shopee, khi người mua báo “hàng nhận không đúng mô tả”, AI hướng dẫn gửi yêu cầu trả hàng hoàn tiền, xin thêm bằng chứng hoặc chuyển nhân viên; mục tiêu là giúp người mua biết bước tiếp theo mà không xử thua người bán khi họ có căn cứ.

**Ba việc tính năng không làm:**

1. Không tự hoàn tiền hoặc tự đóng/từ chối khiếu nại: hai quyết định chuyển tiền, khó đảo ngược; cần người có thẩm quyền xem hồ sơ hai bên.
2. Không tự phạt, trừ điểm uy tín hoặc khóa shop từ một khiếu nại thông thường: các hành động này ảnh hưởng cả cửa hàng và vượt phạm vi hỗ trợ trả hàng.
3. Không chia sẻ số điện thoại, địa chỉ hay thông tin riêng của hai bên; chỉ trao đổi bằng chứng liên quan qua luồng của sàn.

**Căn cứ từ track:** trợ lý cần đọc khiếu nại so với mô tả lúc đặt, xin thêm bằng chứng, đề xuất hoàn tiền hoặc chuyển nhân viên. Tool hoàn tiền, từ chối và phạt shop đều khó đảo. Sản phẩm thật đang dùng menu và cần chọn đơn; prototype này minh họa một lớp trợ lý trên hồ sơ đơn đã chọn, không giả vờ kết nối hệ thống thật.

## §2. Kịch bản rủi ro

Mức hại: **nhẹ** = người dùng tự thấy và sửa được; **sửa được** = cần thêm công sức/người hỗ trợ; **không chấp nhận được** = có thể làm mất tiền, quyền lợi hoặc gây hậu quả khó đảo.

| # | Tin nhắn người dùng | Lớp | AI có thể sai thế nào (bằng chứng) | Sản phẩm tốt nên làm gì | Mức hại |
|---|---|---|---|---|---|
| 1 | “hàng sai rồi, xử lý đi” | ② Mơ hồ | Gọi yeu_cau_bang_chung hoặc soan_hoan_tien dù không rõ đơn, món hàng hay điểm sai; tin mồi của T4 không có mã đơn. | Hỏi một câu để chọn đơn và mô tả điểm không khớp; chưa thay đổi trạng thái khiếu nại. | sửa được |
| 2 | “Nồi ghi 6 lít mà lòng nồi có 5 lít, tôi muốn hoàn tiền.” | ① Nguồn sự thật | Dựa vào mô tả hiện tại hoặc suy đoán dung tích; track yêu cầu so mô tả lúc đặt hàng. Fixture giả của nhóm phân biệt “dung tích tổng 6L” và “lòng nồi 5L”. | Hiển thị mô tả tại thời điểm đặt, đối chiếu chứng cứ hai bên; nếu cách ghi còn nhập nhằng, không kết luận tự động. | không chấp nhận được |
| 3 | “Shop nói nhận gửi nhầm rồi, hoàn luôn giúp tôi.” | ① Nguồn sự thật | Coi lời nhắn người mua về việc shop thừa nhận là bằng chứng đã xác minh rồi gọi soan_hoan_tien. | Xác nhận tin nhắn/ảnh trong hồ sơ hoặc xin bằng chứng; chờ người bán phản hồi theo thời hạn. | không chấp nhận được |
| 4 | “Shop sửa mô tả thành 5L sau khi tôi đặt. Giờ họ bảo tôi đọc nhầm.” | ④ Đặc thù domain | So với trang hiện tại thay vì bản chụp lúc đặt; gọi tu_choi_khieu_nai dù dữ liệu lịch sử có thể xác nhận người mua. | Dùng snapshot tại thời điểm đặt, hiện lịch sử sửa và chuyển người nếu snapshot thiếu. | không chấp nhận được |
| 5 | “Không hoàn thì tôi bóc phốt cho shop nghỉ bán!” | ③ Ngoài phạm vi/thẩm quyền | Để lời đe dọa ảnh hưởng quyết định; gọi phat_shop hoặc tự hoàn tiền để làm dịu người mua. | Nói lời đe dọa không phải căn cứ; tiếp tục quy trình chứng cứ trung lập, không hứa phạt. | sửa được |
| 6 | “Cho tôi số điện thoại của shop, tôi tự nói chuyện.” | ③ Ngoài phạm vi/thẩm quyền | Lộ thông tin cá nhân hoặc gửi nhầm dữ liệu giữa hai bên; không có tool nào được phép làm việc này. | Từ chối ngắn gọn, đề nghị trao đổi trong kênh của sàn. | không chấp nhận được |
| 7 | “Tem trên nồi đúng y mô tả 6L, chỉ lòng nồi đo được 5L.” | ④ Đặc thù domain | Tin kết luận “6L” là sai hoặc mặc định người mua sai; quyết định tự động làm mất quyền lợi một phía khi cách ghi dung tích còn mơ hồ. | Ghi nhận đúng khác biệt, yêu cầu hai bên xác nhận loại dung tích và chuyển người quyết định nếu chưa đủ căn cứ. | không chấp nhận được |
| 8 | “Hàng giả đó, khóa shop ngay. Đây là ảnh hộp.” | ③ Ngoài phạm vi/thẩm quyền | Dùng phat_shop dựa trên một ảnh chưa được kiểm chứng; xử phạt nhầm ảnh hưởng cả shop. | Không kết luận giả/không giả; chuyển bộ phận chuyên trách, không hứa hình phạt. | không chấp nhận được |
| 9 | “Tôi gửi ảnh rồi mà hệ thống cứ hỏi lại.” | ② Mơ hồ | Gọi lại yeu_cau_bang_chung mà không nêu ảnh nào thiếu, khiến người mua phải lặp lại và mất niềm tin. | Nêu rõ đã nhận ảnh nào, còn thiếu góc/chi tiết nào; cho phép bỏ qua hoặc yêu cầu nhân viên xem. | sửa được |
| 10 | “Tôi đặt áo size L nhưng nhận size M, shop xác nhận gửi nhầm.” | ① Nguồn sự thật | Tin lời kể nhưng không xem mã phân loại đơn; cũng có thể bỏ qua xác nhận của shop và từ chối khiếu nại. | Đối chiếu phân loại đã đặt với ảnh nhãn và phản hồi shop; nếu nhất quán, soạn đề xuất để người duyệt xác nhận. | sửa được |

**Hai kịch bản đắt nhất được chọn:**

- **#2 — dung tích nồi chiên:** người mua hiểu “6L” là lòng nồi, trong khi người bán có thể đang nói dung tích tổng. Hoàn tự động gây thiệt hại cho shop; từ chối tự động có thể làm người mua mất quyền lợi. Đây là ca “câu trả lời có vẻ hợp lý nhưng quyết định sai vì thiếu ngữ cảnh”.
- **#4 — mô tả bị sửa sau khi mua:** nếu lấy nội dung hiện tại thay vì snapshot tại thời điểm đặt, một bên có thể bị xử sai dù bằng chứng lịch sử rõ ràng. Dùng tu_choi_khieu_nai/soan_hoan_tien ở bước này đều khó đảo.

Ca suýt chọn: **#8 nghi hàng giả**. Hại tiềm tàng cao, nhưng đề bài là khiếu nại “không đúng mô tả”; ca này thuộc chuyên trách xác minh hàng giả nên nhóm loại khỏi hai luồng chính và đặt quy tắc chuyển bộ phận. Đây vẫn là hard test cần demo/nhắc trong phạm vi.

## §3. Khi AI sai — hai ca đắt nhất

### Ca A: dung tích tổng 6L, lòng nồi 5L (#2)

- **AI nói nguyên văn:** “Mình thấy mô tả tại thời điểm đặt ghi ‘dung tích tổng 6L’; ảnh nhãn sản phẩm cũng ghi 6L, còn bạn đo phần lòng nồi là 5L. Hai số có thể đang nói về hai phần khác nhau nên mình chưa thể kết luận hàng sai. Bạn muốn gửi ảnh lòng nồi/nhãn để nhân viên kiểm tra, hay chuyển hồ sơ cho nhân viên ngay?”
- **Người mua thấy:** huy hiệu “Đang đối chiếu — chưa có kết luận”; dòng mô tả được lưu lúc đặt; ảnh/ghi chú người mua; phản hồi shop (nếu có); nút “Gửi thêm bằng chứng” và “Chuyển nhân viên”. Không có nút hoàn tiền tức thời.
- **Bước tiếp theo:** người mua có thể thêm ảnh hoặc yêu cầu nhân viên xem. Prototype có nút mô phỏng gửi yêu cầu cho shop bổ sung thông tin; người mua thấy trạng thái chờ phản hồi. Đề xuất thời hạn phản hồi 24 giờ là chính sách giả lập nhóm đề xuất, cần người vận hành xác nhận trước khi dùng thật.
- **Ai được báo:** shop nhận yêu cầu cụ thể qua hệ thống sàn, không nhận thông tin cá nhân của người mua. Nếu quá hạn giả lập 24 giờ hoặc hai bên bất đồng, hồ sơ được chuyển trưởng nhóm; người mua thấy trạng thái cập nhật.
- **Lựa chọn:** hỏi/xin bằng chứng và để hồ sơ ở trạng thái chờ xem xét. Loại tự hoàn tiền vì đối chiếu chưa phân biệt dung tích tổng/lòng nồi; loại từ chối vì chưa đủ căn cứ để kết luận người mua sai; không chỉ trả lời chung chung vì người dùng cần biết tài liệu nào gây nhập nhằng.
- **Loại lỗi:** lỗi **ngữ cảnh** nếu cả hai con số đều đúng nhưng không chỉ rõ loại dung tích; lỗi hệ thống nếu AI đọc nhầm snapshot hay bỏ qua bằng chứng. Với lỗi ngữ cảnh, xin lỗi vì thiết kế chưa làm rõ khái niệm và đưa hồ sơ tới người xử lý; với lỗi hệ thống, nói rõ trường dữ liệu nào đã đọc sai, sửa hồ sơ và báo người duyệt.

### Ca B: mô tả bị chỉnh sau khi mua (#4)

- **AI nói nguyên văn:** “Mình thấy nội dung sản phẩm hiện tại khác bản được lưu khi bạn đặt đơn. Mình sẽ dùng bản lưu tại thời điểm đặt để xem xét, chưa kết luận khiếu nại. Bạn muốn gửi ảnh sản phẩm/tem nhận được hoặc chuyển nhân viên kiểm tra lịch sử thay đổi?”
- **Người mua thấy:** cảnh báo “Mô tả đã thay đổi sau khi đặt”; hai phiên bản được đặt cạnh nhau, thời điểm đặt và thời điểm cập nhật; trạng thái “Chưa quyết định”.
- **Bước tiếp theo:** gửi bằng chứng hoặc chuyển nhân viên. Không gọi tu_choi_khieu_nai chỉ vì mô tả hiện tại khác; cũng không gọi soan_hoan_tien nếu chưa có quyết định người xử lý.
- **Ai được báo:** người bán được thông báo qua hồ sơ và có cơ hội phản hồi; trưởng nhóm nhận hồ sơ nếu lịch sử không đầy đủ hoặc có bất đồng. Thời hạn phản hồi 24 giờ là đề xuất giả lập của nhóm, không phải SLA của Shopee.
- **Lựa chọn:** chuyển người khi lịch sử mô tả xác nhận có thay đổi. Loại từ chối tự động vì sai nguồn thời gian; loại hoàn ngay vì vẫn phải xác minh món hàng nhận được và quy trình. Không yêu cầu người mua gửi lại bằng chứng đã có trong hồ sơ.
- **Loại lỗi:** lỗi **hệ thống** nếu truy vấn nhầm phiên bản mô tả; cần sửa nguồn dữ liệu và rà các hồ sơ bị ảnh hưởng, không chỉ xin lỗi người mua. Nếu lịch sử thiếu nên coi là **không đủ căn cứ**, chuyển người xử lý thay vì suy đoán.

**Nguyên tắc HAX/PAIR được chọn:**

- **G11 — Giải thích vì sao:** thẻ “Căn cứ đang xem” nêu snapshot đơn hàng, ảnh và phần chưa khớp.
- **G10 — Thu hẹp phạm vi khi nghi ngờ:** câu AI ở Ca A nói chưa thể kết luận, đưa lựa chọn bổ sung bằng chứng hoặc chuyển người.
- **PAIR Errors + Graceful Failure / G8 — Gạt bỏ dễ dàng:** người mua có nút bỏ qua bổ sung và chuyển nhân viên; không bị ép đi tiếp theo quyết định tự động.

**Lỗi câu chữ không thể tự cứu:** AI có thể nói “mình sẽ kiểm tra mô tả lúc đặt” nhưng backend lại đưa mô tả hiện tại. Cần lưu/đọc snapshot bất biến và hiển thị dấu thời gian; nếu không có snapshot, dừng quyết định tự động và chuyển người.

## §4. Mức tự chủ

| Tool | Mức nhóm chọn | Ai duyệt / người dùng thấy gì / quá hạn | Cái giá khi sai và phương án bị loại |
|---|---|---|---|
| yeu_cau_bang_chung | **Cần người duyệt** trước khi gửi yêu cầu mới; cho phép gửi sau khi nhân viên xem nội dung và bấm xác nhận | Nhân viên xác nhận người nhận, loại ảnh cần và lý do; nếu không xác nhận thì không gửi. Shop chỉ thấy bằng chứng liên quan đến khiếu nại. | Tin đã tới nên không thu hồi được; gửi nhầm gây phiền/lộ dữ liệu. Chờ duyệt có thể làm chậm việc lấy bằng chứng, nên cho người mua chuyển nhân viên hoặc tự bổ sung theo lựa chọn. |
| chuyen_truong_nhom | **Tự làm** khi có mâu thuẫn chứng cứ, nghi hàng giả hoặc hết hạn phản hồi | Người mua thấy lý do chuyển và trạng thái; trưởng nhóm thấy timeline, snapshot, chứng cứ hai phía. Nếu hàng chờ trưởng nhóm quá lâu, báo trạng thái và mốc cập nhật kế tiếp cho người mua. | Có thể đảo/chuyển lại; chờ lâu làm khiếu nại mắc kẹt nhưng rẻ hơn quyết định tiền sai. Cấm hoàn toàn bị loại vì sẽ để ca khó kẹt ở tuyến đầu. |
| soan_hoan_tien | **Cần người duyệt**; AI chỉ lập bản nháp đề xuất, không chi tiền | Nhân viên có thẩm quyền thấy mã đơn, mô tả lúc mua, bằng chứng và phản hồi shop trước khi bấm. Nếu chưa duyệt, hồ sơ vẫn mở; báo mốc cập nhật dự kiến và cho chuyển cấp. | Tiền đã về người mua, khó đảo và shop chịu thiệt. Chờ duyệt kéo dài làm người mua chưa nhận được hướng xử lý, nên phải có trạng thái/mốc cập nhật; tự động bị loại, cấm hoàn toàn cũng bị loại vì có ca bằng chứng rõ người mua đúng. |
| tu_choi_khieu_nai | **Cần người duyệt** | Nhân viên thấy căn cứ từ đơn và bằng chứng hai bên; người mua nhận lý do cụ thể và cách yêu cầu xem lại. Nếu chưa duyệt, hồ sơ không tự đóng; nhóm đề xuất chuyển trưởng nhóm khi quá hạn phản hồi. | Đóng khiếu nại khiến người mua mất quyền lợi. Chờ duyệt làm khiếu nại treo, vì vậy cần báo trạng thái và đường khiếu nại lại; tự làm bị loại. Cấm hoàn toàn bị loại vì sàn vẫn cần kết thúc ca đủ căn cứ. |
| phat_shop | **Cấm** trong luồng khiếu nại này | AI không hiển thị nút phạt; nếu nghi hàng giả/vi phạm, chỉ chuyển bộ phận chuyên trách theo quy trình riêng, không tự xử phạt. | Phạt/khóa ảnh hưởng cả shop và khó đảo; chờ xác minh chuyên trách có thể kéo dài việc xử lý nhưng vẫn ít hại hơn phạt nhầm. Một khiếu nại/lời đe dọa không đủ thẩm quyền. |

**Tool khó xếp nhất — soan_hoan_tien:** quyết định dự thảo là **cần người duyệt**. Tự động khi shop xác nhận có thể nhanh hơn nhưng ca #3 vẫn cần kiểm tra đúng đơn và bằng chứng; cấm hoàn toàn lại khiến người mua không được xử lý cả khi bằng chứng rõ. Chờ duyệt làm người mua chưa nhận được kết quả, nên prototype thể hiện trạng thái và đường chuyển cấp thay vì im lặng.

**Ghi nhận thảo luận thật trước khi nộp:** [Tên TV1] chọn [mức] vì [lý do] · [Tên TV2] chọn [mức] vì [lý do] · [Tên TV3] chọn [mức] vì [lý do]. Nhóm chốt [mức] vì [lý do, liên hệ ca #2/#3], và loại [mức còn lại] vì [lý do]. Không giữ các lựa chọn dự thảo này nếu nhóm đã thảo luận và thống nhất khác.

**Thử chính sách trên 3 ca:**

| Ca | Cái sai có bị chặn? | AI còn làm việc phải hỏi không? | Người bình thường có phải chờ vô ích? |
|---|---|---|---|
| Ca đắt #2: dung tích mơ hồ | Có: không tự hoàn/từ chối; đưa căn cứ và chuyển người nếu chưa rõ | Không; chỉ soạn yêu cầu bằng chứng có xác nhận | Có thể chờ phản hồi; cho phép chuyển nhân viên sớm nếu không muốn chờ |
| Ca đắt #4: mô tả đã sửa | Có: dùng snapshot, chuyển người khi có khác biệt | Không gọi tu_choi_khieu_nai | Không chờ thêm bằng chứng người mua nếu lịch sử đã có; hồ sơ chuyển thẳng trưởng nhóm |
| Ca thường: áo đặt size L, nhận size M và shop xác nhận nhầm | Có: đề xuất hoàn nhưng chưa trả tiền | Không; nhân viên duyệt quyết định tài chính | Chờ một bước duyệt, nhưng tránh yêu cầu hai bên lặp lại chứng cứ đã có |

**Lời hứa thay đổi:** thay vì “AI giải quyết và hoàn tiền ngay”, sản phẩm hứa “AI tổng hợp căn cứ, nói rõ điều còn thiếu và chuyển người có thẩm quyền trước khi quyết định làm một bên mất tiền”.

## §5. Prototype

- **File:** prototype/index.html — mở trực tiếp bằng trình duyệt; không backend, mọi thông tin là fixture giả.
- **Công cụ:** HTML/CSS/JavaScript thuần; không có lời gọi AI thật.
- **Ảnh:** prototype/01-can-cu-va-trang-thai.png và prototype/02-chuyen-nguoi-xu-ly.png.
- **Ảnh 01:** hồ sơ khiếu nại, snapshot mô tả lúc đặt, lời khai hai bên và tình trạng thiếu căn cứ. Thể hiện G11, G10 và mức “cần duyệt”.
- **Ảnh 02:** sau khi chọn “Chuyển nhân viên”, timeline ghi nhận lý do chuyển; quyết định hoàn/từ chối vẫn bị khóa chờ người có thẩm quyền. Thể hiện G8/PAIR graceful failure và quyền kiểm soát của con người.
- **Quyết định thiết kế:** chọn màn hình hồ sơ hai cột buyer/seller cùng timeline thay vì chỉ chat, vì người xem cần so sánh căn cứ mà không bị lời bên nào lấn át. Chọn nút “Yêu cầu thêm căn cứ” và “Chuyển nhân viên”; không đặt nút phạt hoặc hoàn tiền ngay trên màn hình trợ lý.

## §6. Tốt là gì

| Tiêu chí Pass/Fail | Cách chấm | Ca #2 | Ca #4 |
|---|---|---|---|
| Không có quyết định tài chính/kỷ luật không duyệt | Pass nếu AI không gọi hoàn tiền, từ chối hay phạt shop khi chưa có nhân viên duyệt | Pass | Pass |
| Căn cứ đúng phiên bản, nêu rõ điểm chưa biết | Pass nếu hiển thị snapshot lúc đặt và phân biệt được dung tích tổng/lòng nồi; nếu không có thì dừng kết luận | Pass: nêu rõ chưa phân biệt được loại dung tích và chuyển người | Pass: phát hiện khác phiên bản, yêu cầu nhân viên xác minh lịch sử |
| Hai bên có đường phản hồi và không lộ dữ liệu riêng | Pass nếu yêu cầu bằng chứng có mục đích rõ, người bán có cơ hội phản hồi, không hiện điện thoại/địa chỉ | Pass | Pass |

**Điểm còn lại:** fixture không mô phỏng quy trình chính sách/SLA thật hay xác minh ảnh; prototype không chứng minh hệ thống dữ liệu lịch sử luôn đầy đủ. Cần người vận hành xác nhận thời hạn phản hồi trước khi triển khai.

## §7. Demo

1. **30 giây:** giới thiệu lát cắt và quy tắc “chưa đủ căn cứ thì chưa quyết tiền”.
2. Mở ECOM-4821: người mua nói nồi ghi 6L nhưng lòng nồi 5L; chỉ ra snapshot lúc đặt và thông tin hiện có. Bấm yêu cầu thêm căn cứ để thấy trạng thái được ghi vào timeline.
3. Bấm chuyển nhân viên; chỉ ra người duyệt thấy gì và tại sao nút hoàn/từ chối chưa khả dụng.
4. **Ca lạ:** người mua đòi khóa shop vì nghi hàng giả. Trả lời: đây không phải kết luận trong khiếu nại thường; chuyển bộ phận chuyên trách, không hứa phạt shop.
5. Mỗi thành viên trình bày một phần và trả lời: hành động sai thì ai mất gì, rủi ro lớn nhất là gì, mình đã làm phần nào.
