import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { LuPen } from "react-icons/lu";
import { formatDate, formatPrice, formatTime } from "../utils/format";
import { RiFileCloseLine } from "react-icons/ri";
import { MdCheck } from "react-icons/md";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  cancelOrderModalState,
  checkTransactionModalState,
  confirmCompleteModalState,
  confirmOrderModalState,
  deliveryOrderModalState,
  orderDetailModalState,
} from "../store/modalAtoms";
import {
  cancelOrderState,
  checkTransactionOrderState,
  confirmCompleteOrderState,
  confirmOrderState,
  deliveryOrderState,
  detailOrderState,
} from "../store/orderAtomts";
import { useGetDetailOrder } from "../hooks/hook";
import { LoadingTable } from "./loading";
import { LineItem as LineItemProps } from "../interfaces/Order";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FiTruck } from "react-icons/fi";
import { FaFlagCheckered } from "react-icons/fa";
import { userInfoState } from "../store/accountAtoms";
export default function OrderDetailModal() {
  const info = useAtomValue(userInfoState);
  return (
    <>
      {info?.type === "admin" && <AdminOrderDetail />}
      {info?.type === "ceo" && <AdminOrderDetail />}
      {info?.type === "sales" && <UserOrderDetail />}
      {info?.type === "business" && <UserOrderDetail />}
      {info?.type === "personal" && <UserOrderDetail />}
    </>
  );
}

const LineItem = (props: LineItemProps) => {
  const unitProduct = (unit: string) => {
    switch (unit) {
      case "1":
        return "Tuýp";
      case "2":
        return "Hộp";
      case "3":
        return "Chai";
      case "4":
        return "Ống";
      case "5":
        return "Gói";
      case "6":
        return "Thỏi";
      case "7":
        return "Hũ";
      case "8":
        return "Miếng";
    }
  };
  return (
    <div className="flex justify-between font-open gap-x-[15px]">
      <div className="flex items-center gap-x-[10px] max-w-[65%]">
        <Image
          loading="lazy"
          quality={25}
          src={props.imageUrl}
          alt=""
          width={45}
          height={45}
          className="object-cover rounded-lg"
        />
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[11px] line-clamp-2">{props.productName}</p>
          <p className="text-[9px] text-normal">{props.brand.brandName}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-[15px]">
        <p className="text-[12px] font-light">
          {props.amount} {unitProduct(props.unit)}
        </p>
        <p className="text-[12px] font-light text-foreground">
          {formatPrice(props.price)}
        </p>
      </div>
    </div>
  );
};

function AdminOrderDetail() {
  const info = useAtomValue(userInfoState);
  const setCancelModalId = useSetAtom(cancelOrderState);
  const setCancelModal = useSetAtom(cancelOrderModalState);
  const setConfirmModalId = useSetAtom(confirmOrderState);
  const setConfirmModal = useSetAtom(confirmOrderModalState);
  const setDeliveryModal = useSetAtom(deliveryOrderModalState);
  const setConfirmCompleteModalId = useSetAtom(confirmCompleteOrderState);
  const setConfirmCompleteModal = useSetAtom(confirmCompleteModalState);
  const setDeliveryModalId = useSetAtom(deliveryOrderState);
  const setCheckTransactionModal = useSetAtom(checkTransactionModalState);
  const setCheckTransactionModalId = useSetAtom(checkTransactionOrderState);
  const [detailModal, setDetailModal] = useAtom(orderDetailModalState);
  const orderId = useAtomValue(detailOrderState);
  const { data: detail, isLoading } = useGetDetailOrder(orderId);
  const handleModalOff = () => {
    setDetailModal(false);
  };

  const handleOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "text-warning-600 border border-warning-600";
      case "confirmed":
        return "text-blue-500 border-blue-500";
      case "exported":
        return "text-secondary border-secondary";
      case "complete":
        return "text-success border-success";
      case "cancelled":
        return "text-danger border-danger";
      default:
        return "";
    }
  };
  const handleOrderStatusName = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "exported":
        return "Đang giao hàng";
      case "complete":
        return "Giao thành công";
      case "cancelled":
        return "Đã huỷ";
      default:
        return "";
    }
  };
  const handleFinanceStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-700";
      case "cancelled":
        return "bg-danger-50 text-red-600";
      case "confirmed":
        return "bg-success-200";
      default:
        return "";
    }
  };
  const handleFinanceStatusName = (status: string) => {
    switch (status) {
      case "pending":
        return "Chưa thanh toán";
      case "cancelled":
        return "Đã huỷ đơn";
      case "confirmed":
        return "Đã thanh toán";
      default:
        return "";
    }
  };
  const handlePaymentMethod = (method: string) => {
    switch (method) {
      case "cod":
        return "COD";
      case "bank_transfer":
        return "Chuyển khoản";
      case "debt":
        return "Công nợ";
      default:
        return "";
    }
  };
  const handleCancelStatusByRole = (role: string) => {
    return ["admin", "ceo"].includes(role);
  };
  const handleToggleCancelOrderModalOn = (orderId: string) => {
    setCancelModalId(orderId);
    setCancelModal(true);
  };
  const handleToggleModalConfirmOn = (orderId: string) => {
    setConfirmModalId(orderId);
    setConfirmModal(true);
  };
  const handleToggleDeliveryConfirmOn = (orderId: string) => {
    setDeliveryModalId(orderId);
    setDeliveryModal(true);
  };
  const handleToggleCheckTransactionOn = (transactionId: string) => {
    setCheckTransactionModalId(transactionId);
    setCheckTransactionModal(true);
  };
  const handleToggleModalConfirmCompleteOn = (orderId: string) => {
    setConfirmCompleteModalId(orderId);
    setConfirmCompleteModal(true);
  };
  return (
    <AnimatePresence>
      {detailModal && (
        <motion.div
          className="fixed w-screen h-screen flex justify-end bg-black bg-opacity-70 z-[40] font-open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* DETAIL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="w-[500px] h-full max-h-full overflow-auto bg-[#111111] shadow-md absolute right-0 flex flex-col"
          >
            {isLoading ? (
              <>
                <LoadingTable className="!h-screen w-full flex justify-center items-center" />
              </>
            ) : (
              <>
                <div className="flex justify-between bg-[#090909] w-full px-[15px] py-[20px] sticky top-0 left-0 z-10">
                  <div className="flex flex-col gap-y-[5px]">
                    <p className="text-[18px]">#{detail?.orderId}</p>
                    <p className="text-[12px] text-normal">Chi tiết hoá đơn</p>
                  </div>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={handleModalOff}
                  >
                    <IoCloseSharp className="text-[20px] text-normal" />
                  </Button>
                </div>
                {detail?.transaction.transactionStatus === "pending" && (
                  <div className="flex items-center px-[15px] py-[20px] gap-x-[10px] bg-gray-700 bg-opacity-30">
                    <IoIosInformationCircleOutline className="text-[20px]" />
                    <p className="text-[12px]">
                      Đơn hàng này hiện chưa được thanh toán.{" "}
                      {detail.orderStatus !== "cancelled" && (
                        <span
                          className="text-primary font-semibold cursor-pointer hover:underline"
                          onClick={() =>
                            handleToggleCheckTransactionOn(
                              detail.transaction.id
                            )
                          }
                        >
                          Nhấp vào đây để xác nhận
                        </span>
                      )}
                    </p>
                  </div>
                )}
                {detail?.transaction.transactionStatus === "confirmed" && (
                  <div className="flex items-center px-[15px] py-[20px] gap-x-[10px] bg-success-300 bg-opacity-30">
                    <IoIosInformationCircleOutline className="text-[20px]" />
                    <p className="text-[12px]">
                      Đơn hàng này đã được xác nhận thanh toán
                    </p>
                  </div>
                )}
                {detail?.transaction.transactionStatus === "cancelled" && (
                  <div className="flex items-center px-[15px] py-[20px] gap-x-[10px] bg-danger-300 bg-opacity-30">
                    <IoIosInformationCircleOutline className="text-[20px]" />
                    <p className="text-[12px]">
                      Thanh toán thất bại do đơn hàng đã bị huỷ
                    </p>
                  </div>
                )}
                {/* Order Details Section */}
                <div className="flex px-[15px] py-[25px] gap-x-[25px] border-b border-gray-400-40">
                  <div className="flex flex-col gap-y-[10px]">
                    <p className="text-[11px] text-normal">Ngày tạo</p>
                    <p className="text-[13px]">
                      {formatDate(detail?.createdAt as string)} lúc{" "}
                      {formatTime(detail?.createdAt as string)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-[10px]">
                    <p className="text-[11px] text-normal">
                      Trạng thái thanh toán
                    </p>
                    <p
                      className={`text-[10px] py-[2px] px-[10px] rounded-lg ${handleFinanceStatus(
                        detail?.transaction.transactionStatus as string
                      )} w-fit`}
                    >
                      {handleFinanceStatusName(
                        detail?.transaction.transactionStatus as string
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-[10px]">
                    <p className="text-[11px] text-normal">Trạng thái</p>
                    <p
                      className={`text-[10px] py-[2px] px-[10px] border w-fit rounded-lg ${handleOrderStatus(
                        detail?.orderStatus as string
                      )}`}
                    >
                      {handleOrderStatusName(detail?.orderStatus as string)}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                  <div className="flex justify-between">
                    <p className="text-[11px] text-normal">Thông tin cá nhân</p>
                    <Button variant="light" size="sm" isIconOnly>
                      <LuPen className="text-normal" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-y-[8px]">
                    <p className="text-[13px]">{detail?.customerName}</p>
                    <p className="text-[13px] text-[#467AB9]">
                      {detail?.customerEmail}
                    </p>
                    <p className="text-[13px]">{detail?.customerPhone}</p>
                  </div>
                </div>
                {/* Sales Customer Info */}
                {detail?.salesCustomer !== null && (
                  <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                    <div className="flex justify-between">
                      <p className="text-[11px] text-normal">Khách của Sales</p>
                      <Button variant="light" size="sm" isIconOnly>
                        <LuPen className="text-normal" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-y-[8px]">
                      <p className="text-[13px]">
                        {detail?.salesCustomer.userName}
                      </p>
                      <p className="text-[13px]">
                        {detail?.salesCustomer.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}

                {/* Shipping Address */}
                <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                  <div className="flex justify-between">
                    <p className="text-[11px] text-normal">Địa chỉ giao hàng</p>
                    <Button variant="light" size="sm" isIconOnly>
                      <LuPen className="text-normal" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-y-[8px]">
                    <p className="text-[13px]">
                      {detail?.shippingAddress.street},{" "}
                      {detail?.shippingAddress.wardName},{" "}
                      {detail?.shippingAddress.districtName},{" "}
                      {detail?.shippingAddress.provinceName}
                    </p>
                  </div>
                </div>
                {/* Order Items */}
                <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                  <p className="text-[11px] text-normal mb-[15px]">Sản phẩm</p>
                  <div className="flex flex-col gap-y-[15px] mb-[15px]">
                    {detail?.lineItems.slice(0, 3).map((item) => (
                      <LineItem key={item.productId} {...item} />
                    ))}
                  </div>
                  {(detail?.lineItems ?? []).length > 3 && (
                    <p className="text-[11px] text-normal">
                      +{(detail?.lineItems ?? []).length - 3} sản phẩm khác
                    </p>
                  )}
                </div>
                {/* Invoice Summary */}
                <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                  <p className="text-[11px] text-normal mb-[15px]">Hoá đơn</p>
                  <div className="flex flex-col gap-y-[10px]">
                    <div className="flex justify-between">
                      <p className="text-[13px] font-light text-normal">
                        Mã thanh toán
                      </p>
                      <p className="text-[13px]">#{detail?.transaction.id}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[13px] font-light text-normal">
                        Phương thức thanh toán
                      </p>
                      <p className="text-[13px]">
                        {handlePaymentMethod(
                          detail?.transaction.gateway as string
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[13px] font-light text-normal">
                        Tạm tính hoá đơn
                      </p>
                      <p className="text-[13px]">
                        {formatPrice(detail?.totalOrderValue as number)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[13px] font-light text-normal">
                        Giá trị chiết khấu
                      </p>
                      <p className="text-[13px]">
                        {formatPrice(
                          (detail?.totalOrderValue ?? 0) -
                            (detail?.totalPayment ?? 0)
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between mt-[10px]">
                      <p className="text-[13px] font-semibold">Tổng</p>
                      <p className="text-[13px] font-semibold">
                        {formatPrice(detail?.totalPayment as number)}
                      </p>
                    </div>
                  </div>
                </div>
                {detail?.note && (
                  <div className="flex flex-col px-[15px] py-[25px]">
                    <p className="text-[11px] text-normal mb-[15px]">
                      Ghi chú của khách hàng
                    </p>
                    <p className="text-sm">{detail?.note}</p>
                  </div>
                )}

                {/* Footer Buttons */}

                <div className="sticky left-0 bottom-0 flex justify-between px-[15px] gap-x-[15px] py-[25px] bg-[#111111] border-t border-gray-400-40">
                  {detail?.orderStatus !== "cancelled" && (
                    <Button
                      onPress={() =>
                        handleToggleCancelOrderModalOn(
                          detail?.orderId as string
                        )
                      }
                      size="sm"
                      variant="flat"
                      className="flex w-full"
                      color="danger"
                    >
                      <RiFileCloseLine />
                      <p>Huỷ đơn hàng</p>
                    </Button>
                  )}

                  {detail?.orderStatus === "cancelled" &&
                    handleCancelStatusByRole(info?.type as string) && (
                      <p className="text-[13px] text-normal font-light">
                        Lưu ý: Đối với đơn hàng{" "}
                        <span className="font-semibold text-danger-400">
                          Đã Huỷ
                        </span>{" "}
                        nếu trạng thái thanh toán là{" "}
                        <span className="font-semibold text-success-400">
                          Đã thanh toán
                        </span>{" "}
                        thì hãy liên hệ với khách hàng để hoàn tiền.
                      </p>
                    )}

                  {detail?.orderStatus === "pending" && (
                    <Button
                      onPress={() =>
                        handleToggleModalConfirmOn(detail?.orderId as string)
                      }
                      size="sm"
                      variant="flat"
                      color="success"
                      className="flex w-full"
                    >
                      <MdCheck />
                      <p>Xác nhận đơn</p>
                    </Button>
                  )}
                  {detail?.orderStatus === "confirmed" && (
                    <Button
                      onPress={() =>
                        handleToggleDeliveryConfirmOn(detail?.orderId as string)
                      }
                      size="sm"
                      variant="flat"
                      color="success"
                      className="flex w-full"
                    >
                      <FiTruck />
                      <p>Giao đơn hàng</p>
                    </Button>
                  )}
                  {detail?.orderStatus === "exported" && (
                    <Button
                      onPress={() =>
                        handleToggleModalConfirmCompleteOn(
                          detail?.orderId as string
                        )
                      }
                      size="sm"
                      variant="flat"
                      color="success"
                      className="flex w-full"
                    >
                      <FaFlagCheckered />
                      <p>Giao thành công</p>
                    </Button>
                  )}
                </div>
              </>
            )}
            {/* header */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function UserOrderDetail() {
  const info = useAtomValue(userInfoState);
  const setCancelModalId = useSetAtom(cancelOrderState);
  const setCancelModal = useSetAtom(cancelOrderModalState);
  const setCheckTransactionModal = useSetAtom(checkTransactionModalState);
  const setCheckTransactionModalId = useSetAtom(checkTransactionOrderState);
  const [detailModal, setDetailModal] = useAtom(orderDetailModalState);
  const orderId = useAtomValue(detailOrderState);
  const { data: detail, isLoading } = useGetDetailOrder(orderId);
  const handleModalOff = () => {
    setDetailModal(false);
  };

  const handleOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "text-warning-600 border border-warning-600";
      case "confirmed":
        return "text-blue-500 border-blue-500";
      case "exported":
        return "text-secondary border-secondary";
      case "complete":
        return "text-success border-success";
      case "cancelled":
        return "text-danger border-danger";
      default:
        return "";
    }
  };
  const handleOrderStatusName = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "exported":
        return "Đang giao hàng";
      case "complete":
        return "Giao thành công";
      case "cancelled":
        return "Đã huỷ";
      default:
        return "";
    }
  };
  const handleFinanceStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-700";
      case "cancelled":
        return "bg-danger-50 text-red-600";
      case "confirmed":
        return "bg-success-200";
      default:
        return "";
    }
  };
  const handleFinanceStatusName = (status: string) => {
    switch (status) {
      case "pending":
        return "Chưa thanh toán";
      case "cancelled":
        return "Đã huỷ đơn";
      case "confirmed":
        return "Đã thanh toán";
      default:
        return "";
    }
  };
  const handlePaymentMethod = (method: string) => {
    switch (method) {
      case "cod":
        return "COD";
      case "bank_transfer":
        return "Chuyển khoản";
      case "debt":
        return "Công nợ";
      default:
        return "";
    }
  };
  const handleButtonRole = (role: string) => {
    switch (role) {
      case "admin":
        return true;
      case "ceo":
        return true;
      case "sales":
        return true;
      default:
        return false;
    }
  };
  const handleCancelStatusByRole = (role: string) => {
    return ["admin", "ceo"].includes(role);
  };
  const handleToggleCancelOrderModalOn = (orderId: string) => {
    setCancelModalId(orderId);
    setCancelModal(true);
  };
  const handleToggleCheckTransactionOn = (transactionId: string) => {
    setCheckTransactionModalId(transactionId);
    setCheckTransactionModal(true);
  };

  return (
    <AnimatePresence>
      {detailModal && (
        <motion.div
          className="fixed w-screen h-screen flex justify-end bg-black bg-opacity-70 z-[40] font-open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* DETAIL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="w-[500px] h-full max-h-full overflow-auto bg-[#111111] shadow-md absolute right-0 flex flex-col"
          >
            {isLoading ? (
              <>
                <LoadingTable className="!h-screen w-full flex justify-center items-center" />
              </>
            ) : (
              <>
                <div className="flex justify-between bg-[#090909] w-full px-[15px] py-[20px] sticky top-0 left-0 z-10">
                  <div className="flex flex-col gap-y-[5px]">
                    <p className="text-[18px]">#{detail?.orderId}</p>
                    <p className="text-[12px] text-normal">Chi tiết hoá đơn</p>
                  </div>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={handleModalOff}
                  >
                    <IoCloseSharp className="text-[20px] text-normal" />
                  </Button>
                </div>
                {detail?.transaction.transactionStatus === "pending" && (
                  <div className="flex items-center px-[15px] py-[20px] gap-x-[10px] bg-gray-700 bg-opacity-30">
                    <IoIosInformationCircleOutline className="text-[20px]" />
                    <p className="text-[12px]">
                      Đơn hàng này hiện chưa được thanh toán.{" "}
                      {detail.orderStatus !== "cancelled" &&
                        handleButtonRole(info?.type as string) && (
                          <span
                            className="text-primary font-semibold cursor-pointer hover:underline"
                            onClick={() =>
                              handleToggleCheckTransactionOn(
                                detail.transaction.id
                              )
                            }
                          >
                            Nhấp vào đây để xác nhận
                          </span>
                        )}
                    </p>
                  </div>
                )}
                {detail?.transaction.transactionStatus === "confirmed" && (
                  <div className="flex items-center px-[15px] py-[20px] gap-x-[10px] bg-success-300 bg-opacity-30">
                    <IoIosInformationCircleOutline className="text-[20px]" />
                    <p className="text-[12px]">
                      Đơn hàng này đã được xác nhận thanh toán
                    </p>
                  </div>
                )}
                {detail?.transaction.transactionStatus === "cancelled" && (
                  <div className="flex items-center px-[15px] py-[20px] gap-x-[10px] bg-danger-300 bg-opacity-30">
                    <IoIosInformationCircleOutline className="text-[20px]" />
                    <p className="text-[12px]">
                      Thanh toán thất bại do đơn hàng đã bị huỷ
                    </p>
                  </div>
                )}
                {/* Order Details Section */}
                <div className="flex px-[15px] py-[25px] gap-x-[25px] border-b border-gray-400-40">
                  <div className="flex flex-col gap-y-[10px]">
                    <p className="text-[11px] text-normal">Ngày tạo</p>
                    <p className="text-[13px]">
                      {formatDate(detail?.createdAt as string)} lúc{" "}
                      {formatTime(detail?.createdAt as string)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-[10px]">
                    <p className="text-[11px] text-normal">
                      Trạng thái thanh toán
                    </p>
                    <p
                      className={`text-[10px] py-[2px] px-[10px] rounded-lg ${handleFinanceStatus(
                        detail?.transaction.transactionStatus as string
                      )} w-fit`}
                    >
                      {handleFinanceStatusName(
                        detail?.transaction.transactionStatus as string
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-[10px]">
                    <p className="text-[11px] text-normal">Trạng thái</p>
                    <p
                      className={`text-[10px] py-[2px] px-[10px] border w-fit rounded-lg ${handleOrderStatus(
                        detail?.orderStatus as string
                      )}`}
                    >
                      {handleOrderStatusName(detail?.orderStatus as string)}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                  <div className="flex justify-between">
                    <p className="text-[11px] text-normal">Thông tin cá nhân</p>
                    <Button variant="light" size="sm" isIconOnly>
                      <LuPen className="text-normal" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-y-[8px]">
                    <p className="text-[13px]">{detail?.customerName}</p>
                    <p className="text-[13px] text-[#467AB9]">
                      {detail?.customerEmail}
                    </p>
                    <p className="text-[13px]">{detail?.customerPhone}</p>
                  </div>
                </div>
                {/* Sales Customer Info */}
                {detail?.salesCustomer !== null && (
                  <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                    <div className="flex justify-between">
                      <p className="text-[11px] text-normal">Khách của Sales</p>
                      <Button variant="light" size="sm" isIconOnly>
                        <LuPen className="text-normal" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-y-[8px]">
                      <p className="text-[13px]">
                        {detail?.salesCustomer.userName}
                      </p>
                      <p className="text-[13px]">
                        {detail?.salesCustomer.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}

                {/* Shipping Address */}
                <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                  <div className="flex justify-between">
                    <p className="text-[11px] text-normal">Địa chỉ giao hàng</p>
                    <Button variant="light" size="sm" isIconOnly>
                      <LuPen className="text-normal" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-y-[8px]">
                    <p className="text-[13px]">
                      {detail?.shippingAddress.street},{" "}
                      {detail?.shippingAddress.wardName},{" "}
                      {detail?.shippingAddress.districtName},{" "}
                      {detail?.shippingAddress.provinceName}
                    </p>
                  </div>
                </div>
                {/* Order Items */}
                <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                  <p className="text-[11px] text-normal mb-[15px]">Sản phẩm</p>
                  <div className="flex flex-col gap-y-[15px] mb-[15px]">
                    {detail?.lineItems.slice(0, 3).map((item) => (
                      <LineItem key={item.productId} {...item} />
                    ))}
                  </div>
                  {(detail?.lineItems ?? []).length > 3 && (
                    <p className="text-[11px] text-normal">
                      +{(detail?.lineItems ?? []).length - 3} sản phẩm khác
                    </p>
                  )}
                </div>
                {/* Invoice Summary */}
                <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
                  <p className="text-[11px] text-normal mb-[15px]">Hoá đơn</p>
                  <div className="flex flex-col gap-y-[10px]">
                    <div className="flex justify-between">
                      <p className="text-[13px] font-light text-normal">
                        Mã thanh toán
                      </p>
                      <p className="text-[13px]">#{detail?.transaction.id}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[13px] font-light text-normal">
                        Phương thức thanh toán
                      </p>
                      <p className="text-[13px]">
                        {handlePaymentMethod(
                          detail?.transaction.gateway as string
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[13px] font-light text-normal">
                        Tạm tính hoá đơn
                      </p>
                      <p className="text-[13px]">
                        {formatPrice(detail?.totalOrderValue as number)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[13px] font-light text-normal">
                        Giá trị chiết khấu
                      </p>
                      <p className="text-[13px]">
                        {formatPrice(
                          (detail?.totalOrderValue ?? 0) -
                            (detail?.totalPayment ?? 0)
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between mt-[10px]">
                      <p className="text-[13px] font-semibold">Tổng</p>
                      <p className="text-[13px] font-semibold">
                        {formatPrice(detail?.totalPayment as number)}
                      </p>
                    </div>
                  </div>
                </div>
                {detail?.note && (
                  <div className="flex flex-col px-[15px] py-[25px]">
                    <p className="text-[11px] text-normal mb-[15px]">
                      Ghi chú của khách hàng
                    </p>
                    <p className="text-sm">{detail?.note}</p>
                  </div>
                )}

                {/* Footer Buttons */}

                <div className="sticky left-0 bottom-0 flex justify-between px-[15px] gap-x-[15px] py-[25px] bg-[#111111] border-t border-gray-400-40">
                  {detail?.orderStatus !== "cancelled" && (
                    <Button
                      onPress={() =>
                        handleToggleCancelOrderModalOn(
                          detail?.orderId as string
                        )
                      }
                      size="sm"
                      variant="flat"
                      className="flex w-full"
                      color="danger"
                    >
                      <RiFileCloseLine />
                      <p>Huỷ đơn hàng</p>
                    </Button>
                  )}

                  {detail?.orderStatus === "cancelled" &&
                    handleCancelStatusByRole(info?.type as string) && (
                      <p className="text-[13px] text-normal font-light">
                        Lưu ý: Đối với đơn hàng{" "}
                        <span className="font-semibold text-danger-400">
                          Đã Huỷ
                        </span>{" "}
                        nếu trạng thái thanh toán là{" "}
                        <span className="font-semibold text-success-400">
                          Đã thanh toán
                        </span>{" "}
                        thì hãy liên hệ với khách hàng để hoàn tiền.
                      </p>
                    )}
                </div>
              </>
            )}
            {/* header */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
