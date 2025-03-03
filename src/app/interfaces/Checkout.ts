interface ShippingAddress {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  street: string;
}

export interface LineItem {
  productID: string;
  amount: number;
}
export interface Gift {
  productID: string;
  amount: number;
}
export interface Checkout {
  customer: Customer;
  shippingAddress: ShippingAddress;
  note?: string;
  gateway: string;
  lineItems: LineItem[];
  gifts: Gift[];
  discountCustom?: number;
}

interface Customer {
  customerId: string;
  customerName: string;
  customerPhone: string;
}
