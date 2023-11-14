export interface IFestivalMovie {
  movSeq: number;
  festivalSeq: number;
  festivalName: string;
  coverUrl?: string;
  movTitle: string;
  movTitleEn: string;
  catName: string;
  ratingTxt: string;
  director: string;
  hitCount: number;
  viewedCount: number;
  createdAt: string;
}

export interface IFestivalMovieDetail {
  movSeq: number;
  festivalSeq: number;
  festivalName: string;
  movTitle: string;
  movTitleEn: string;
  movFile: string;
  coverUrl?: string;
  gerne: string;
  catName: string;
  ratingTxt: string;
  nation: string;
  nationEn: string;
  runningTime: number;
  movPlot: string;
  director: string;
  directorNote: string;
  remarks: string;
  productionYear: number;
  hitCount: number;
  viewedCount: number;
  screenRatioTxt: string;
  colorationTxt: string;
  createdAt: string;
}

export interface IFestival {
  festivalSeq: number;
  festivalId: string;
  festivalName: string;
  festivalCover: string;
  festivalState: string;
  startAt: string;
  finishAt: string;
  createdAt: string;
}
