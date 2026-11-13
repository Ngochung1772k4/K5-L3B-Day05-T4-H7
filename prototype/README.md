# Prototype T4 — Case Assist

Mở `index.html` trực tiếp bằng trình duyệt. Trang dùng HTML/CSS/JavaScript thuần, không cần cài đặt, đăng nhập, API key hay kết nối Shopee. Mọi đơn hàng, lời nhắn, chứng cứ và thao tác đều là dữ liệu/mô phỏng phục vụ bài học.

## Cách thử

1. Chọn một trong **7 ca mẫu**: dung tích 6L/5L, mô tả sửa sau mua, áo sai size, lời nhắn mơ hồ, nghi hàng giả, xin liên hệ riêng, hoặc hỏi lặp ảnh đã gửi.
2. Xem cột **Đề xuất xử lý**: điều đã biết, điều cần xác minh, lý do AI dừng/kết luận ở mức đó và ba mức quyền hạn.
3. Xem hai **bản xem trước** để so câu trả lời dành cho người mua và người bán. Chúng chưa được gửi cho ai.
4. Thử nút **Soạn… · chờ duyệt** (chỉ có ở ca đủ thông tin để tạo bản nháp) và **Chuyển người xem xét**. Nhật ký ghi nhận thao tác trong phiên trình duyệt; không có hoàn tiền, thông báo hay chuyển hồ sơ thật.
5. Sửa lời người mua/shop rồi bấm **Xem AI sẽ xử lý**. Văn bản tự nhập được phân loại bằng luật từ khóa đơn giản và **không** kế thừa chứng cứ của ca mẫu. Có thể đánh giá câu trả lời hoặc ghi bình luận; đánh giá chỉ lưu trong phiên xem thử.

Trang luôn đặt AI ở vai trò hỗ trợ đối chiếu: không lấy lời một phía làm kết luận, không dùng mô tả hiện tại thay bản lúc đặt, không chia sẻ dữ liệu riêng và không tự hoàn tiền, từ chối hay phạt shop. Mốc phản hồi 24 giờ là giả định của nhóm, chưa phải SLA thật.

Hai ảnh minh họa sau khi cập nhật giao diện:

- `01-can-cu-va-trang-thai.png`: ca ECOM-4821 trước khi chuyển người.
- `02-chuyen-nguoi-xu-ly.png`: cùng ca sau khi chọn chuyển nhân viên.
