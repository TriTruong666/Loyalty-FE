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
