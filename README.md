# Stayora Hotel Platform — Mockup UI (HTML/CSS/JS thuần)

Bản Mockup UI tương tác hoàn chỉnh được xây dựng bằng **HTML5, CSS3, JavaScript thuần (Zero dependencies)**, sẵn sàng để deploy trực tiếp lên **GitHub Pages** hoặc bất kỳ nền tảng static hosting nào (Vercel, Netlify, Cloudflare Pages).

---

## 🚀 Hướng dẫn kích hoạt GitHub Pages trong 1 phút

1. Đẩy code lên GitHub:
   ```bash
   git add docs/
   git commit -m "feat: add pure HTML/CSS/JS mockup UI for GitHub Pages"
   git push origin main
   ```

2. Truy cập vào Repository trên trình duyệt GitHub:
   - Vào **Settings** của repository.
   - Chọn mục **Pages** ở thanh menu bên trái.

3. Cấu hình **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`.
   - **Branch**: Chọn `main` (hoặc nhánh chính của bạn) và chọn thư mục `/docs`.
   - Nhấn **Save**.

4. Sau khoảng 30 - 60 giây, GitHub Pages sẽ tạo cho bạn một đường link HTTPS trực tiếp:
   ```
   https://<ten-to-chuc-hoac-user>.github.io/<ten-repo>/
   ```
   Ví dụ: `https://689cloud-llc.github.io/mini-project-booking-hotel/`

---

## 🖥️ Hướng dẫn xem trước trên máy cục bộ (Local Preview)

Bạn chỉ cần mở trực tiếp file `docs/index.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox), hoặc dùng một static server đơn giản:

```bash
# Sử dụng Python (nếu có):
python -m http.server 8080 --directory docs

# Hoặc sử dụng extension 'Live Server' trong VS Code / Antigravity IDE.
```

---

## 🌟 Các tính năng và luồng tương tác trong bản Mockup UI

### 1. Thanh chuyển đổi vai trò (Role Switcher - Demo bar trên cùng)
- **Guest Storefront**: Trải nghiệm giao diện đặt phòng của khách hàng.
- **Hotel Owner**: Không gian làm việc của chủ khách sạn (Dashboard, Doanh thu, Cài đặt thông tin, Room Types, Phòng vật lý, Nhân viên, Payouts).
- **Hotel Staff**: Phân hệ của nhân viên lễ tân (Check-in, Check-out, Cập nhật trạng thái phòng).
- **System Admin**: Phân hệ quản trị sàn (Dashboard toàn hệ thống, Phê duyệt khách sạn & gán % hoa hồng 8% - 15%, Cấu hình phí sàn theo hạng 3/4/5 sao, Tạo khách sạn & tài khoản chủ).

### 2. Luồng Guest (Khách hàng)
- **Trang chủ (`#home`)**: Hero tìm kiếm điểm đến, ngày đến/đi, số khách; danh sách khách sạn đặc sắc (Azure Bay Resort, The Lantern Hoi An, Urban Nest Saigon).
- **Kết quả tìm kiếm (`#search`)**: Bộ lọc giá, tiện nghi; các nút demo chuyển trạng thái (Results, Loading skeleton, Empty state, Error state).
- **Chi tiết khách sạn (`#hotels/azure-bay`)**: Thư viện ảnh, thông tin tổng quan, danh sách tiện ích, chọn hạng phòng (Ocean Suite, Garden Deluxe), xem modal tiện ích chi tiết & chính sách hoàn hủy.
- **Quy trình Đặt phòng 4 bước (`#booking`)**:
  - Bước 1: Điền thông tin cá nhân & thời gian dự kiến đến.
  - Bước 2: Xem lại thông tin đặt phòng và chính sách hoàn tiền.
  - Bước 3: Giả lập thanh toán thẻ Stripe an toàn với hiệu ứng xử lý thẻ.
  - Bước 4: Màn hình xác nhận thành công mã `STY-48291`, hóa đơn tóm tắt, nút tải hóa đơn.
- **Tra cứu đặt phòng (`#lookup`)**: Nhập mã đặt phòng `STY-48291` và email để tra cứu thông tin đặt phòng ngay lập tức.
- **Quản lý đặt phòng (`#my-bookings`)**: Xem danh sách đặt phòng, yêu cầu hủy phòng.
- **Đánh giá kỳ nghỉ (`#review`)**: Đánh giá 5 sao và viết nhận xét sau khi hoàn thành kỳ nghỉ.
"# booking-hotel-FE" 
