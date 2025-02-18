import NormalInput from "@/app/components/NormalInput";
import { FaUserTie } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { IoMail } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";

export default function SettingPage() {
  return (
    <div className="flex flex-col px-[40px] py-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[22px] font-light select-none">
            Thông tin cá nhân
          </p>
          <p className="text-[12px] text-normal">
            Cập nhật thông tin cá nhân của bạn
          </p>
        </div>
        <div className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group">
          <FiSave className="text-[16px] text-background" />
          <p className="text-[12px] text-background">Lưu thông tin</p>
        </div>
      </div>
      <div className="flex flex-col mt-[40px] gap-y-[20px]">
        <NormalInput
          label="Địa chỉ email"
          placeholder="email123@gmail.com"
          icon={<IoMail size={20} />}
        />
        <NormalInput
          label="Tên khách hàng"
          placeholder="Nguyễn Văn A"
          icon={<FaUserTie size={20} />}
        />
        <NormalInput
          label="Số điện thoại"
          placeholder="0776003669"
          icon={<MdLocalPhone size={20} />}
          max={10}
        />
        <NormalInput
          label="Mã số thuế"
          placeholder="2803148208"
          icon={<RiBuilding2Fill size={20} />}
        />
      </div>
    </div>
  );
}
