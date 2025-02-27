interface ShippingAddress {
  addressId: string;
  provinceCode: string;
  provinceName: string;
  districtCode: string;
  districtName: string;
  wardCode: string;
  wardName: string;
  street: string;
  zipCode: string | null;
  defaultAddress: boolean;
}

export interface Order {
  orderId: string;
  customerId: string;
  createdAt: string;
  deliveryDate: string | null;
  cancelDate: string | null;
  confirmDate: string | null;
  updateDate: string | null;
  completeDate: string | null;
  shippingAddressId: string;
  rankName: string;
  discountDQ: number;
  discountPP: number;
  discountBusiness: number;
  discountPersonal: number;
  discountCustom: number;
  customerName: string;
  customerPhone: string;
  totalOrderValue: number;
  totalPayment: number;
  orderStatus: string;
  confirmBy: string | null;
  deliveryConfirmBy: string | null;
  cancelledBy: string | null;
  updateBy: string | null;
  completionConfirmBy: string | null;
  note: string;
  attachment: string | null;
  shippingAddress: ShippingAddress;
}
