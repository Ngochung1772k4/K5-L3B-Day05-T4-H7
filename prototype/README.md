# Prototype T4 — Case Assist

Mở file index.html bằng trình duyệt để thử luồng giả lập. Không cần cài đặt, đăng nhập hay API key; không có backend và không gọi hệ thống thật.

## Ca demo

Hồ sơ ECOM-4821 là fixture do nhóm tự dựng: bản mô tả lúc mua chỉ ghi nồi chiên 6L; sau khi mua, shop cập nhật trang để phân biệt 6L tổng và lòng nồi 5L. Cần dùng snapshot lúc đặt, ghi nhận phản hồi hai bên và chưa tự kết luận hay quyết định tài chính.

- **Yêu cầu shop xác nhận loại dung tích:** ghi trạng thái và một mục vào timeline, không tự hoàn tiền.
- **Chuyển nhân viên xem xét:** đổi trạng thái, ghi lý do chuyển và giữ quyết định hoàn/từ chối ở chế độ chờ duyệt.

Ảnh 01 và 02 minh họa trạng thái trước/sau khi chuyển người. Chúng được chụp từ prototype trong trình duyệt.

- 01 — 01-can-cu-va-trang-thai.png: snapshot lúc đặt và mô tả đã sửa được đặt cạnh nhau.
- 02 — 02-chuyen-nguoi-xu-ly.png: hồ sơ đã chuyển nhân viên, chưa quyết định hoàn/từ chối.
