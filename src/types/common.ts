export interface ResponseType<T> {
  st: boolean;
  rs?: T;
  err?: { code: string; desc: string };
  accessToken?: string;
  refreshToken?: string;
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
