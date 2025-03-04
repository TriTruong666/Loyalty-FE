import { FaUserTie } from "react-icons/fa";
import NormalInput from "./NormalInput";
import { MdLocalPhone } from "react-icons/md";

export default function AddSalesAccountModal() {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[700px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <div className="flex flex-col justify-center items-center gap-y-3 w-full">
          <p className="text-[28px] font-bold font-inter">
            Nhập thông tin đăng ký
          </p>
          <p className="text-[12px] text-normal">
            Vui lòng điền đủ thông tin vào các trường dưới đây để tạo tài khoản.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <NormalInput
              name="userName"
              label="Tên người dùng"
              placeholder="Nguyễn Văn A"
              icon={<FaUserTie size={20} />}
            />
            <NormalInput
              name="phoneNumber"
              label="Số điện thoại"
              placeholder="0921191360"
              icon={<MdLocalPhone size={20} />}
              max={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
