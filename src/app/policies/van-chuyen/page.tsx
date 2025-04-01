"use client";

export default function VanchuyenPolicyPage() {
  return (
    <div className="flex flex-col relative font-open w-full border-r border-neutral-700 p-4">
      <div className="flex justify-center">
        <p className="text-[32px] font-bold">Chính sách Vận chuyển giao nhận</p>
      </div>
      <div className="flex flex-col mt-[40px] text-neutral-300">
        <p>Picare hỗ trợ các cách vận chuyển và giao nhận sau:</p>
        <br />
        <ul className="list-disc list-inside space-y-2 ml-[20px]">
          <li>
            Giao nhận tại Picare Bạn có thể đến tham quan và mua hàng tại Kho
            hàng của chúng tôi{" "}
            <span className="font-bold text-foreground">
              540/20/9 Cách Mạng Tháng Tám, Phường 11, Quận 3, TP HCM
            </span>{" "}
            Bạn sẽ được tư vấn về sản phẩm, lựa chọn mua sản phẩm phù hợp, thanh
            toán và nhận hàng.
          </li>
          <li>Giao hàng tận nơi bằng dịch vụ Bưu Điện VNPost, GHTK</li>
        </ul>
        <br />
        <p>
          Miễn phí giao hàng Khu vực Thành phố Hồ Chí Minh ( áp dụng với những
          sản phẩm chưa giảm giá)
        </p>
        <br />
        <ul className="list-disc list-inside space-y-2 ml-[20px]">
          <li>ĐƠN HÀNG NỘI THÀNH : Phí Ship 15,000 VND</li>
          <li>ĐƠN HÀNG NGOẠI THÀNH: Phí Ship 30,000 VND</li>
        </ul>
        <br />
        <p className="mb-[15px]">
          Picare thực hiện giao hàng tận nơi Bạn yêu cầu qua dịch vụ giao nhận
          của Bưu Điện (hoặc Đơn vị Chuyển phát nhanh). Nhân viên giao hàng sẽ
          liên lạc với Bạn để hẹn thời gian thuận tiện giao hàng. Bạn vui lòng
          trực tiếp kiểm tra hàng hóa ngay khi nhận hàng nếu có vấn đề liên quan
          đến chủng loại, chất lượng, số lượng hàng hóa không đúng như đơn đặt
          hàng, Bạn vui lòng báo ngay với Picare (0918 088 123) để phối hợp với
          Bưu Điện hoặc Đơn vị chuyển phát nhanh xử lý.
        </p>
        <p>
          Thời gian giao hàng tùy thuộc vào thời gian giao hàng của Bưu Điện
          hoặc Đơn vị Chuyển phát nhanh và phụ thuộc vào địa chỉ giao hàng Bạn
          cung cấp.
        </p>
        <br />
        <ul className="list-disc list-inside space-y-2 ml-[20px]">
          <li>
            Chúng tôi liên lạc với bạn để thống nhất thời gian giao hàng. Chúng
            tôi sẽ cố gắng giao hàng trong 1-2 ngày làm việc đối với khu vực Tp.
            Hồ Chí Minh, trong 2-3 ngày làm việc đối với các tỉnh khác. Tuy
            nhiên, vẫn có những sự chậm trễ do nguyên nhân khách quan (lễ, tết,
            địa chỉ nhận hàng khó tìm, sự chậm trễ từ dịch vụ chuyển phát…), rất
            mong bạn có thể thông cảm vì những lý do ngoài sự chi phối của chúng
            tôi.
          </li>
          <li>
            Chúng tôi sẽ báo ngay đến bạn nếu có sự chậm trễ khi giao hàng,
            nhưng trong phạm vi pháp luật cho phép, chúng tôi sẽ không chịu
            trách nhiệm cho bất cứ tổn thất nào, các khoản nợ, thiệt hại hoặc
            chi phí phát sinh từ việc giao hàng trễ.
          </li>
          <li>
            Khi nhận sản phẩm, Bạn vui lòng kiểm tra kỹ sản phẩm trước khi ký
            nhận hàng hóa. Bạn nên giữ lại Hóa đơn mua hàng để làm bằng chứng
            trong trường hợp muốn liên hệ lại về sản phẩm đã mua.
          </li>
        </ul>
      </div>
    </div>
  );
}
