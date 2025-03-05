import { atom } from "jotai";
import { User } from "../interfaces/Account";

export const userInfoState = atom<User>();

export const dataCreateAccountState = atom({
  userName: "",
  email: "",
  phoneNumber: "",
  birthday: "",
  address: {
    provinceCode: "",
    districtCode: "",
    wardCode: "",
    street: "",
  },
  mst: "",
  type: "",
});

export const dataCreateSalesAccountState = atom({
  userName: "",
  phoneNumber: "",
  salePersonID: "",
});
