import { ResponseType } from 'types/common';
import axios from './config';
import {
  IFestival,
  IFestivalMovie,
  IFestivalMovieDetail,
} from 'types/festival';

const PREFIX_URL = '/festival';

/**
 * 영화제 정보를 조회한다.
 */
export function getFestivalInfo(festId: string): Promise<{
  data: ResponseType<IFestival[]>;
}> {
  return axios.get(`${PREFIX_URL}/${festId}/info`);
}

/**
 * 영화제 영화 목록을 조회한다.
 */
export function getFestivalMovieList(festId: string): Promise<{
  data: ResponseType<{ totalcount: number; rs: IFestivalMovie[] }>;
}> {
  return axios.get(`${PREFIX_URL}/${festId}`);
}

/**
 * 영화제 영화 상세 정보를 조회한다.
 */
export function getFestivalMovieDetail({
  festId,
  movSeq,
}: {
  festId: string;
  movSeq: number;
}): Promise<{ data: ResponseType<IFestivalMovieDetail[]> }> {
  return axios.get(`${PREFIX_URL}/${festId}/${movSeq}`);
}

/**
 * 영화제 영화 url을 조회한다.
 */
export function getFestivalMovieUrl({
  festId,
  movSeq,
}: {
  festId: string;
  movSeq: number;
}): Promise<{ data: { st: boolean; url: string } }> {
  return axios.get(`${PREFIX_URL}/${festId}/${movSeq}/movieurl`);
}
