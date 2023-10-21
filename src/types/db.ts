export interface INation {
  nationalitySeq: string;
  nation: string;
  nationEn: string;
}

export interface IAnnounce {
  seq: number;
  ann_title: string;
  ann_body: string;
  hits: number;
  created_at: Date;
}

export interface IUser {
  memId: string;
  memPass: string;
  memName?: string;
  memEmail?: string;
  memPhone?: string;
  agreeUasges?: boolean;
  agreePrivacy?: boolean;
  agreeSms?: boolean;
  agreeMailing?: boolean;
  createdAt?: string;
  isDormant?: number;
  isWithdraw?: number;
  isBanned?: number;
  lastLoginAt?: string;
}

export interface IFaq {
  seq: number;
  inqCat?: number;
  inqTxt?: string;
  faqTitle?: string;
  faqReply?: string;
}
