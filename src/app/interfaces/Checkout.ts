import { Cart } from "./Cart";

interface ShippingAddress {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  street: string;
}

interface LineItem {
  productID: string;
  amount: number;
}

export interface Checkout {
  customer: Customer;
  shippingAddress: ShippingAddress;
  note?: string;
  gateway: string;
  lineItems: LineItem[];
}

interface Customer {
  customerId: string;
  customerName: string;
  customerPhone: string;
}
