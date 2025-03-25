export interface Loyalty {
  rankId: string;
  rankName: string;
  pointRange: number;
  discountBusiness: number;
  discountPersonal: number;
  discountPP: number;
  note: string;
}

export interface Ranking {
  userID: string;
  rank: Loyalty;
  currentPoint: number;
}
