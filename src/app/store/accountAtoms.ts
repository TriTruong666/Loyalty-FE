import { atom } from "jotai";
import { User } from "../interfaces/Account";

export const userInfoState = atom<User>();
