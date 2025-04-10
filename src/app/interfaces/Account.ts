export interface User {
  addressId: string | null;
  birthday: string | null;
  email: string;
  mst: string | null;
  note: string | null;
  phoneNumber: string;
  status: string;
  type: string;
  userId: string;
  userName: string;
  code: string;
  address: Address;
  rank: Rank;
  inDebt: boolean;
  currentPoint: number;
  teamID?: string;
}

interface Address {
  addressId: string;
  provinceCode: string;
  provinceName: string;
  districtCode: string;
  districtName: string;
  wardCode: string;
  wardName: string;
  street: string;
  zipCode: string;
  defaultAddress: boolean;
}

interface Rank {
  rankId: string;
  rankName: string;
  pointRange: number;
  discountBusiness?: number;
  discountPersonal?: number;
  discountPP: number;
  discountCustom?: number;
  note: string;
}

export interface Welcome {
  name: string;
  type: string;
}
