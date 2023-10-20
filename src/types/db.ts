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
  memName: string;
  memPass: string;
  memEmail: string;
  memPhone: string;
  agreeUasges: boolean;
  agreePrivacy: boolean;
  agreeSms: boolean;
  agreeMailing: boolean;
}
