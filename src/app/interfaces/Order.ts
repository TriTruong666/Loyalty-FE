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

interface Transaction {
  id: string;
  orderId: string;
  transactionStatus: string;
  gateway: string;
  transactionDate: string | null;
  createdBy: string;
  createdDate: string;
  updatedBy: string | null;
  updatedDate: string | null;
  url: string | null;
  note: string | null;
}
export interface LineItem {
  productId: string;
  productName: string;
  unit: string;
  price: number;
  brandId: string;
  handle: string;
  imageUrl: string;
  description: string;
  createdBy: string;
  createdDate: string;
  updateBy: string;
  updateDate: string;
  status: string;
  amount: number;
  brand: Brand;
}
interface Brand {
  brandId: string;
  brandName: string;
  handle: string;
  type: string;
}

interface SalesCustomer {
  customerIDOfSales: string;
  userName: string;
  phoneNumber: string;
  status: boolean;
  salePersonID: string;
  note: string;
  mst: string;
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
  customerEmail: string;
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
  transaction: Transaction;
  lineItems: LineItem[];
  salesCustomer: SalesCustomer;
}
