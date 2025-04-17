"use client";

export default function MientruPolicyPage() {
  return (
    <div className="flex flex-col relative font-open w-full border-r border-neutral-700 p-4">
      <div className="flex justify-center">
        <p className="text-[32px] font-bold">Tuyên bố miễn trừ trách nhiệm</p>
      </div>
      <div className="flex flex-col mt-[40px] text-neutral-300">
        <p>
          Picare cam kết cung cấp sản phẩm chính hãng và cung cấp thông tin
          trung thực về sản phẩm theo như thông tin của Nhà sản xuất sản phẩm.
          Picare Không chịu trách nhiệm với các trường hợp sau đây:
        </p>
        <ul className="list-disc list-inside space-y-4 ml-[20px] mt-[15px]">
          <li className="leading-8">
            Các sản phẩm có công dụng đặc trị cụ thể như: kem dưỡng, tinh
            chất,... sẽ cho ra các kết quả khác nhau tùy thuộc vào cơ địa của
            từng người khác nhau. Vì vậy, Picare không cam kết một kết quả cụ
            thể nào đối với những sản phẩm này. Khách hàng có thể tham khảo các
            tư vấn của Picare trước khi quyết định chọn mua sản phẩm phù hợp với
            khách hàng.
          </li>
          <li className="leading-8">
            Đối với các hình ảnh minh họa{" "}
            <span className="font-bold">Trước khi dùng - Sau khi dùng</span>,
            khách hàng lưu ý đây là những hình ảnh dựa trên số đông người dùng
            có các cơ địa hoàn toàn khác nhau, bên cạnh đó, phải kết hợp với
            việc sử dụng đúng cách. Vì vậy, Picare không cam kết một kết quả cụ
            thể như hình ảnh <span className="font-bold">Trước - Sau</span>, mà
            thay vào đó chỉ dùng để tham khảo.
          </li>
          <li className="leading-8">
            Các sản phẩm có nội dung chống chỉ định đi kèm như: không dùng cho
            phụ nữ mang thai, trẻ em dưới 3 tháng tuổi, người quá mẫn cảm với
            thành phần xyz,.... khách hàng vui lòng đọc kỹ trong nội dung bài
            viết. Picare không chịu trách nhiệm trong trường hợp khách hàng
            không làm theo yêu cầu hướng dẫn của nhà sản xuất chỉ định.
          </li>
        </ul>
      </div>
    </div>
  );
}
