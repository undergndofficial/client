import { IMovieBasicInfo } from './db';

export interface IRegisterProp {
  step: number;
  setCurStep: React.Dispatch<React.SetStateAction<number>>;
  stepSize: number;
  movSeq: number | null;
  setMovSeq?: React.Dispatch<React.SetStateAction<number | null>>;
  movieInfo?: IMovieBasicInfo | null;
}
