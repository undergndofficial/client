export interface IAnnounce {
  seq: number;
  annTitle: string;
  annBody: string;
  hits: number;
  createdAt: Date;
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

export interface IMovieInfo {
  movTitle?: string;
  movTitleEn: string;
  catSeq: number;
  gernes: number[];
  tags?: string[];
  ratingSeq: number;
  langCode: string;
  nationalitySeq: string;
  productionYear: number;
  releasedAt?: string;
  distributors?: string[];
  onlinePublish: string | null;
  movPlot: string;
  directorNote?: string;
}

export interface IMovieBasicInfo {
  movSeq: number;
  movFile: string;
  memSeq: number;
  coverUrl: string;
  screenRatioTxt: string;
  colorationTxt: string;
  movTitle: string;
  movTitleEn: string;
  catName: string;
  ratingTxt: string;
  langName: string;
  nation: string;
  runningTime: number;
  movPlot: string;
  directorNote: string;
  productionYear: number;
  releasedAt: string;
  onlinePublish: string;
  hitCount: number;
  viewedCount: number;
  starringStd: number;
  reviewCount: number;
  favorCount: number;
  isShow: number;
  isDeleted: number;
  isApproved: number;
  createdAt: string;
}

export interface IVideoInfo {
  screenRatio: number;
  coloration: number;
}

export interface IAward {
  awSeq: number;
  awardContent: string;
  inorder: number;
}
export interface INation {
  nationalitySeq: string;
  nation: string;
  nationEn: string;
}

export interface ILang {
  langCode: string;
  langName: string;
}

export interface IGerne {
  gernSeq: number;
  gernName: string;
  usedCound: number;
}

export interface IRating {
  ratingSeq: number;
  ratingTxt: string;
}

export interface IFaqCategory {
  inqCat: number;
  inqTxt: string;
}

export interface IScreenRatio {
  screenRatio: number;
  screenRatioTxt: string;
}

export interface IColoration {
  coloration: number;
  colorationTxt: string;
}

export interface IMovieGerne {
  gmSeq: number;
  movSeq: number;
  gernName: string;
}

export interface IMovieTag {
  tmSeq: number;
  movSeq: number;
  tagName: string;
}

export interface IMovieDistributor {
  dmSeq: number;
  distName: string;
}
