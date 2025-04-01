"use client";

export default function ThanhtoanPolicyPage() {
  return (
    <div className="flex flex-col relative font-open w-full border-r border-neutral-700 p-4">
      <div className="flex justify-center">
        <p className="text-[32px] font-bold">Hình thức thanh toán</p>
      </div>
      <div className="flex flex-col mt-[40px] text-neutral-300">
        <p>Picare hỗ trợ các hình thức thanh toán sau:</p>
        <ul className="list-disc list-inside space-y-2 ml-[20px] mt-[15px]">
          <li>Thanh toán bằng tiền mặt khi nhận hàng (COD)</li>
          <li>Thanh toán bằng chuyển khoản: </li>
          <ul className="list-disc pl-5 space-y-3 mt-[10px] ml-[30px]"></ul>
          <li>
            Cung cấp thông tin hữu ích về sản phẩm và các Chương trình khuyến
            mãi.
          </li>
          <li>
            Picare có thể chia sẻ tên và địa chỉ của Bạn cho dịch vụ chuyển phát
            nhanh để có thể giao hàng cho Bạn.
          </li>
        </ul>
      </div>
    </div>
  );
}
