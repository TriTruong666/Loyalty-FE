"use client";

export default function ThanhtoanPolicyPage() {
  return (
    <div className="flex flex-col relative font-open w-full border-r border-neutral-700 p-4">
      <div className="flex justify-center">
        <p className="text-[32px] font-bold">Chính sách thanh toán</p>
      </div>
      <div className="flex flex-col mt-[40px] text-neutral-300">
        <p>Picare hỗ trợ các hình thức thanh toán sau:</p>
        <ul className="list-disc list-inside space-y-2 ml-[20px] mt-[15px]">
          <li>
            Thanh toán bằng tiền mặt khi nhận hàng{" "}
            <span className="font-bold text-primary">(COD)</span>
          </li>
          <li>
            Thanh toán bằng{" "}
            <span className="font-bold text-primary">Chuyển khoản</span>:{" "}
          </li>
          <ul className="list-disc pl-5 space-y-3 mt-[10px] ml-[30px]">
            <li>
              Ngân hàng thụ hưởng:{" "}
              <span className="font-bold">Ngân hàng ACB</span>
            </li>
            <li>
              Tài khoản thụ hưởng:{" "}
              <span className="font-bold">CTY TNHH PICARE VIET NAM</span>
            </li>
            <li>
              Số tài khoản:{" "}
              <span className="font-bold">PICMS + mã đơn hàng</span>
            </li>
            <li>
              Nội dung:{" "}
              <span className="font-bold">PicareVN Loyalty + mã đơn hàng</span>
            </li>
          </ul>
          <li>
            Thanh toán bằng hình thức{" "}
            <span className="font-bold text-primary">Công nợ</span>
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 text-foreground">
          Đối hình thức công nợ
        </h3>
        <p>
          Đối với khách hàng tham gia Loyalty có ký hợp đồng, được gia hạn tối
          đa <span className="font-bold text-primary">21 ngày</span> và không
          quá <span className="font-bold text-primary">30 triệu đồng</span>.
        </p>
      </div>
    </div>
  );
}
