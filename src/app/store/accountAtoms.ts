import { atom } from "jotai";
import { User } from "../interfaces/Account";

export const userInfoState = atom<User>();

export const dataCreateAccountState = atom({
  userName: "",
  email: "",
  phoneNumber: "",
  address: {
    provinceCode: "",
    districtCode: "",
    wardCode: "",
    street: "",
  },
  mst: "",
  type: "",
  teamID: "",
});

export const dataCreateSalesAccountState = atom({
  userName: "",
  phoneNumber: "",
  mst: "",
  salesTeamID: "",
});

export const blockAccountState = atom("");

export const unlockAccountState = atom("");
