"use client";

export default function BaomatPolicyPage() {
  return (
    <div className="flex flex-col relative font-open w-full border-r border-neutral-700 p-4">
      <div className="flex justify-center">
        <p className="text-[32px] font-bold">Chính sách bảo mật thông tin</p>
      </div>
      <div className="flex flex-col mt-[40px] text-neutral-300">
        <p>
          Mục đích và phạm vi thu thập thông tin cá nhân Picare cam kết không
          cung cấp hay chia sẻ bất cứ thông tin cá nhân nào của khách hàng cho
          bên thứ ba. Trong quá trình bán hàng, Picare thực hiện thu nhập thông
          tin cá nhân để:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-[20px] mt-[15px]">
          <li>
            Xác nhận đơn hàng và giao hàng cho Bạn khi mua hàng tại Picare.
          </li>
          <li>
            Hỗ trợ khách hàng trong suốt quá trình mua hàng và sử dụng dịch vụ
            tại Picare.
          </li>
          <li>
            Cung cấp thông tin hữu ích về sản phẩm và các Chương trình khuyến
            mãi.
          </li>
          <li>
            Picare có thể chia sẻ tên và địa chỉ của Bạn cho dịch vụ chuyển phát
            nhanh để có thể giao hàng cho Bạn.
          </li>
        </ul>
        <h3>Thông tin cá nhân thu thập</h3>
        <p>
          Khi bạn đăng ký tài khoản với Picare, thông tin cá nhân mà chúng tôi
          thu thập bao gồm: Họ và tên, email; khi Bạn đặt hàng chúng tôi thu
          thập thêm thông tin về số điện thoại, địa chỉ, địa chỉ giao hàng.
          Picare không thu thập thông tin về thẻ thanh toán, về tài khoản ngân
          hàng, tài khoản ví của Bạn cho dù Bạn thực hiện thanh toán online; khi
          Bạn thực hiện thanh toán{" "}
        </p>
        <p className="mt-[15px]">
          Online thì giao dịch sẽ diễn ra giữa Bạn và trang web của Ngân hàng
          hay Nhà cung cấp dịch vụ thanh toán.
        </p>
        <br />
        <h3>Cập nhật thông tin cá nhân</h3>
        <p className="mt-[15px]">
          Bạn có thể cập nhật thông tin cá nhân của mình bất kỳ lúc nào bằng
          cách đăng nhập vào trang web Picare.
        </p>
        <br />
        <h3>Bảo mật thông tin cá nhân</h3>
        <p>
          Picare đảm bảo rằng mọi thông tin thu thập được sẽ được lưu giữ an
          toàn. Các thông tin cá nhân của khách hàng sẽ được chúng tôi sử dụng
          đúng mục đích.
        </p>
        <p className="mt-[15px]">
          Mọi thắc mắc hay khiếu nại liên quan tới chính sách bảo mật, xin vui
          lòng liên hệ với chúng tôi qua số điện thoại 0918 088 123 hay email{" "}
          <span className="underline text-blue-600">
            myphameucerin@gmail.com
          </span>
        </p>
      </div>
    </div>
  );
}
