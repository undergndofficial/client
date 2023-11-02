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

export interface IFilmpeople {
  fpKoName: string;
  fpEnName: string;
  fpPhoto: File | null;
  fpNationalitySeq: string;
  fpSex: 'M' | 'F' | 'E';
  fpBirthYear: number;
  fpDeparts: string;
  fpRemarks: string;
  memSeq: number;
}

export interface IFaq {
  seq: number;
  inqCat?: number;
  inqTxt?: string;
  faqTitle?: string;
  faqReply?: string;
}

export interface IRequestMovie {
  movTitle: string;
  directors: string;
  reqComment?: string;
}
