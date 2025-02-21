export interface Province {
  code: string;
  name: string;
  fullName: string;
  codeName: string;
}

export interface District {
  code: string;
  name: string;
  fullName: string;
  provinceCode: string;
}
export interface Ward {
  code: string;
  name: string;
  fullName: string;
  districtCode: string;
}
