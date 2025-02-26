import { Checkout, LineItem } from "../interfaces/Checkout";
import axiosClient from "../utils/axiosClient";

// const transformObjectToCheckout = (data: Checkout) => {
//   return {
//     customer: {
//       customerId: data.customer.customerId,
//       customerName: data.customer.customerName,
//       customerPhone: data.customer.customerPhone,
//     },
//     shippingAddress: {
//       provinceCode: data.shippingAddress.provinceCode,
//       districtCode: data.shippingAddress.districtCode,
//       wardCode: data.shippingAddress.wardCode,
//       street: data.shippingAddress.street,
//     },
//     note: data.note || "", // Ensure the note is always a string
//     gateway: data.gateway,
//     lineItems: data.lineItems.map((item: LineItem) => ({
//       productID: item.productID,
//       amount: item.amount,
//     })),
//   };
// };

export const createOrderService = async (data: Checkout) => {
  try {
    const res = await axiosClient.post(`/api/order`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
