"use client";
import { AccountRoleMenu } from "@/app/components/AccountRoleMenu";
import { addAccountModalState } from "@/app/store/modalAtoms";
import { useSetAtom } from "jotai";
import { Suspense } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { PiExport } from "react-icons/pi";
import AccountLoadingTableLayout from "./loading";
import { useGetAllUser } from "@/app/hooks/hook";
import { mkConfig, generateCsv, download } from "export-to-csv";
import AuthComponent from "@/app/components/AuthComponent";

export default function AccountDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: allAccounts } = useGetAllUser();
  const setAddAccountModal = useSetAtom(addAccountModalState);

  const handleOnDownloadCSV = () => {
    if (!allAccounts || allAccounts.length === 0) {
      console.warn("No data available for CSV export.");
      return;
    }

    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: "Data tài khoản",
    });
    const csvData = allAccounts.map((user) => ({
      id: user.userId,
      accountName: user.userName,
      email: user.email,
      phone: user.phoneNumber,
    }));

    const csv = generateCsv(csvConfig)(csvData);
    download(csvConfig)(csv);
  };

  const handleOpenModal = () => {
    setAddAccountModal(true);
  };

  return (
    <AuthComponent allowedRoles={["ceo", "admin"]}>
      <div className="flex flex-col font-open py-[20px]">
        <div className="flex items-center justify-between px-[40px]">
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[28px] font-light select-none">
              Quản lý tài khoản
            </p>
            <p className="text-sm text-normal">
              Quản lý các người dùng của Loyalty và chỉnh sửa một số quyền.
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            {/* Download CSV button */}
            <div
              onClick={handleOnDownloadCSV}
              className="flex items-center border border-gray-400-40 px-4 py-[6px] rounded-md cursor-pointer gap-x-2"
            >
              <PiExport className="text-[16px] text-foreground" />
              <p className="text-[12px] text-foreground">Xuất CSV</p>
            </div>
            {/* Add Account button */}
            <div
              onClick={handleOpenModal}
              className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group"
            >
              <HiPlusSmall className="text-[16px] text-background" />
              <p className="text-[12px] text-background">Tạo tài khoản</p>
            </div>
          </div>
        </div>

        <AccountRoleMenu />
        <Suspense fallback={<AccountLoadingTableLayout />}>
          <div className="">{children}</div>
        </Suspense>
      </div>
    </AuthComponent>
  );
}
