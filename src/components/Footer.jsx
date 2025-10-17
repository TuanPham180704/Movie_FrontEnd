import {
  FaTelegramPlane,
  FaDiscord,
  FaTimes,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0C] text-gray-300 border-t border-[#171717]">
      <div className="w-full flex justify-center py-2">
        <div className="flex items-center gap-2 bg-[#b91c1c] text-white px-4 py-1.5 rounded-md font-semibold text-sm shadow-md animate-banner">
          <div
            className="w-6 h-4 rounded-sm overflow-hidden flex items-center justify-center"
            aria-hidden
          >
            <svg
              viewBox="0 0 30 20"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-4"
            >
              <rect width="30" height="20" fill="#DA1212" />
              <polygon
                points="15,3 17,9 23,9 18,12.5 20,18 15,14.5 10,18 12,12.5 7,9 13,9"
                fill="#FFEB3B"
              />
            </svg>
          </div>
          <span>Hoàng Sa & Trường Sa là của Việt Nam!</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <div className="bg-[#F5C400] rounded-full p-2 flex items-center justify-center shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="white"
                  aria-hidden
                >
                  <path d="M3 22v-2a7 7 0 0 1 14 0v2H3Zm7-10a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg leading-tight">
                  🎬DevChill
                </h2>
                <p className="text-sm text-gray-400 -mt-0.5">Phim hay cá rỗ</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400 max-w-sm leading-relaxed">
              🎬DevChill — xem phim online miễn phí, Vietsub & thuyết minh, chất
              lượng cao. Kho phim cập nhật liên tục: phim chiếu rạp, phim bộ,
              phim lẻ từ VN, Hàn, Trung, Thái, Nhật, Âu-Mỹ.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[
                { Icon: FaTelegramPlane, label: "Telegram" },
                { Icon: FaDiscord, label: "Discord" },
                { Icon: FaTimes, label: "X" },
                { Icon: FaFacebookF, label: "Facebook" },
                { Icon: FaTiktok, label: "TikTok" },
                { Icon: FaYoutube, label: "YouTube" },
                { Icon: FaInstagram, label: "Instagram" },
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="group bg-[#151515] hover:bg-[#222] p-2 rounded-full transition transform duration-150"
                >
                  <Icon className="w-4 h-4 text-gray-200 group-hover:scale-110 transition-transform duration-150" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:items-center">
            <div className="w-full flex justify-between gap-6">
              <div>
                <h3 className="text-sm text-gray-400 font-medium mb-3">
                  Trang
                </h3>
                <ul className="space-y-2 text-sm">
                  {["Hỏi-Đáp", "Chính sách bảo mật", "Điều khoản sử dụng"].map(
                    (text, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          {text}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 font-medium mb-3">
                  Danh mục
                </h3>
                <ul className="space-y-2 text-sm">
                  {["Dongphim", "Ghienphim", "Motphim", "Subnhanh"].map(
                    (text, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          {text}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-sm text-gray-400 font-medium mb-3">Liên hệ</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              {["Liên hệ quảng cáo", "Gửi link phim", "Báo lỗi nội dung"].map(
                (text, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors">
                      {text}
                    </a>
                  </li>
                )
              )}
            </ul>

            {/* <div className="mt-6 text-xs text-gray-500 text-right max-w-xs">
              <p>Trang web chỉ tổng hợp link phim có sẵn trên Internet.</p>
              <p className="mt-3">
                © {new Date().getFullYear()} 🎬DevChill — Bản quyền nội dung thuộc
                về tác giả tương ứng.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-full border-t border-[#161616]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-3 text-[12px] text-gray-500 text-center">
          <p className="mt-3">
            © {new Date().getFullYear()} 🎬DevChill — Bản quyền nội dung thuộc
            về tác giả tương ứng.
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes wave {
            0% { transform: perspective(200px) rotateY(0deg); }
            50% { transform: perspective(200px) rotateY(15deg); }
            100% { transform: perspective(200px) rotateY(0deg); }
          }
          .animate-wave {
            animation: wave 2.5s ease-in-out infinite;
            transform-origin: left center;
          }
        `}
      </style>
    </footer>
  );
}
