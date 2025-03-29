"use client";

export default function DoitraPolicyPage() {
  return (
    <div className="flex flex-col relative font-open w-full border-r border-neutral-700 p-4">
      <div className="flex justify-center">
        <p className="text-[28px] font-bold">Chính sách đổi trả</p>
      </div>
      <div className="flex flex-col mt-[40px] text-neutral-300">
        <p>Picare cam kết cung cấp sản phẩm Chính hãng.</p>
        <br />
        <p>
          Picare đảm bảo chính sách đổi trả hàng trong vòng 7 ngày kể từ ngày
          Bạn nhận được hàng và theo những điều khoản và điều kiện sau đây:
        </p>

        <h3 className="text-xl font-semibold mt-4 text-foreground">
          Điều kiện đổi trả sản phẩm
        </h3>
        <ul className="list-disc list-inside space-y-2 ml-[20px]">
          <li>Thực hiện đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.</li>
          <li>
            Chỉ chấp nhận đổi trả với các lý do:
            <ul className="list-disc pl-5 space-y-3 mt-[10px] ml-[30px]">
              <li>Sản phẩm giao không đúng như đơn hàng.</li>
              <li>Sản phẩm lỗi từ nhà sản xuất (hỏng, lỗi kỹ thuật).</li>
              <li>Sản phẩm đã hết hoặc gần hết hạn sử dụng.</li>
              <li>Sản phẩm khác với mô tả trên website.</li>
            </ul>
          </li>
          <li>
            Điều kiện đổi trả:
            <ul className="list-disc pl-5 space-y-3 mt-[10px] ml-[20px]">
              <li>Còn hóa đơn bán hàng.</li>
              <li>Còn nguyên vẹn (trừ trường hợp bị bể vỡ).</li>
              <li>Còn nguyên vỏ hộp, tem nhãn, quà tặng kèm (nếu có).</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 text-foreground">
          Sản phẩm quà tặng, giảm giá đặc biệt
        </h3>
        <ul className="list-disc list-inside space-y-2 ml-[20px]">
          <li>
            Không áp dụng đổi trả với sản phẩm quà tặng, giảm giá đặc biệt.
          </li>
          <li>
            Không đổi trả với sản phẩm đã dùng thử hoặc sử dụng trên 1 lần.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">Cách thức đổi trả hàng</h3>
        <ul className="list-disc list-inside space-y-2 ml-[20px]">
          <li>Điền "Phiếu hoàn trả sản phẩm".</li>
          <li>Đóng gói sản phẩm kèm hóa đơn và phiếu hoàn trả.</li>
          <li>
            Gửi về địa chỉ:{" "}
            <strong>
              540/20/9 Cách Mạng Tháng Tám, Phường 11, Quận 3, TP HCM.
            </strong>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">Hình thức hoàn tiền</h3>
        <ul className="list-disc list-inside space-y-2 ml-[20px]">
          <li>Gửi sản phẩm mới thay thế.</li>
          <li>Hoàn tiền vào tài khoản ngân hàng.</li>
        </ul>
      </div>
    </div>
  );
}
