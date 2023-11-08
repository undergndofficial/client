import axios from './config';
import { ResponseType } from 'types/common';
import {
  IAward,
  IFilmpeople,
  IMovieBasicInfo,
  IMovieDistributor,
  IMovieFilmPeople,
  IMovieGerne,
  IMovieInfo,
  IMovieTag,
  IRequestMovie,
  IVideoInfo,
} from 'types/db';

const PREFIX_URL = '/movie';

/**
 * 영화 등록을 요청한다.
 */
export function requestMovie(params: IRequestMovie): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/request`, params);
}

/**
 * 영화 기본 정보를 조회한다.
 */
export function getMovieInfo(movSeq: string): Promise<{
  data: ResponseType<IMovieBasicInfo>;
}> {
  return axios.get(`${PREFIX_URL}/${movSeq}`);
}

/**
 * 영화 장르 정보를 조회한다.
 */
export function getGerneInfo(movSeq: string): Promise<{
  data: ResponseType<IMovieGerne[]>;
}> {
  return axios.get(`${PREFIX_URL}/${movSeq}/gerne`);
}

/**
 * 영화 배급사 정보를 조회한다.
 */
export function getDistributorInfo(movSeq: string): Promise<{
  data: ResponseType<IMovieDistributor[]>;
}> {
  return axios.get(`${PREFIX_URL}/${movSeq}/distributors`);
}

/**
 * 영화 태그 정보를 조회한다.
 */
export function getMovieTagInfo(movSeq: string): Promise<{
  data: ResponseType<IMovieTag[]>;
}> {
  return axios.get(`${PREFIX_URL}/${movSeq}/tags`);
}

/**
 * 영화 기본 정보를 등록한다.
 */
export function registerMovieInfo(params: IMovieInfo): Promise<{
  data: ResponseType<{ movSeq: number }>;
}> {
  return axios.put(`${PREFIX_URL}`, params);
}

/**
 * 영화 기본 정보를 수정한다.
 */
export function updateMovieInfo({
  movSeq,
  movieInfo,
}: {
  movSeq: number;
  movieInfo: IMovieInfo;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.post(`${PREFIX_URL}/${movSeq}`, movieInfo);
}

/**
 * 영화에 장르를 추가한다.
 */
export function addMovieGerne({
  movSeq,
  gernSeq,
}: {
  movSeq: number;
  gernSeq: number;
}) {
  return axios.put(`${PREFIX_URL}/${movSeq}/gerne`, { gernSeq });
}

/**
 * 영화에 장르를 삭제한다.
 */
export function deleteMovieGerne({
  movSeq,
  gmSeq,
}: {
  movSeq: number;
  gmSeq: number;
}) {
  return axios.delete(`${PREFIX_URL}/${movSeq}/gerne`, { data: { gmSeq } });
}

/**
 * 영화에 태그를 추가한다.
 */
export function addMovieTag({
  movSeq,
  tagName,
}: {
  movSeq: number;
  tagName: string;
}) {
  return axios.put(`${PREFIX_URL}/${movSeq}/tags`, { tagName });
}

/**
 * 영화 태그를 삭제한다.
 */
export function deleteMovieTag({
  movSeq,
  tmSeq,
}: {
  movSeq: number;
  tmSeq: number;
}) {
  return axios.delete(`${PREFIX_URL}/${movSeq}/tags`, { data: { tmSeq } });
}

/**
 * 영화 배급사를 추가한다.
 */
export function addMovieDistributor({
  movSeq,
  distName,
}: {
  movSeq: number;
  distName: string;
}) {
  return axios.put(`${PREFIX_URL}/${movSeq}/distributors`, { distName });
}

/**
 * 영화 배급사를 삭제한다.
 */
export function deleteMovieDistributor({
  movSeq,
  dmSeq,
}: {
  movSeq: number;
  dmSeq: number;
}) {
  return axios.delete(`${PREFIX_URL}/${movSeq}/distributors`, {
    data: { dmSeq },
  });
}

/**
 * 영화 파일을 등록한다.
 */
export function registerMovieFile({
  movSeq,
  formData,
}: {
  movSeq: number;
  formData: FormData;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/${movSeq}/movfile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 영화 커버 파일을 등록한다.
 */
export function registerCoverFile({
  movSeq,
  formData,
}: {
  movSeq: number;
  formData: FormData;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/${movSeq}/coverfile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 영화 커버 파일을 삭제한다.
 */
export function deleteCoverFile(movSeq: number): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/${movSeq}`);
}

/**
 * 영화 자막 파일을 등록한다.
 */
export function registerSubtitleFile({
  movSeq,
  formData,
}: {
  movSeq: number;
  formData: FormData;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/${movSeq}/subtitle`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 영화 특정 자막을 삭제한다.
 */
export function deleteSubtitle({
  movSeq,
  lang,
}: {
  movSeq: number;
  lang: string;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.delete(`${PREFIX_URL}/${movSeq}/subtitle`, { data: { lang } });
}

/**
 * 영상 정보를 조회한다.
 */
export function getVideoinfo(movSeq: number): Promise<{
  data: ResponseType<IVideoInfo[]>;
}> {
  return axios.get(`${PREFIX_URL}/${movSeq}/videoinfo`);
}

/**
 * 영상 정보를 등록한다.
 */
export function registerVideoinfo({
  movSeq,
  videoInfo,
}: {
  movSeq: number;
  videoInfo: IVideoInfo;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.post(`${PREFIX_URL}/${movSeq}/videoinfo`, videoInfo);
}

/**
 * 해당 영화의 영화 관계인을 조회한다
 */
export function getMovieFilmPeople(movSeq: number): Promise<{
  data: ResponseType<IMovieFilmPeople[]>;
}> {
  return axios.patch(`${PREFIX_URL}/${movSeq}/peoples`);
}

/**
 * 영화 관계인을 검색한다
 */
export function searchFilmPeople({
  movSeq,
  keyword,
}: {
  movSeq: number;
  keyword: string;
}): Promise<{
  data: ResponseType<IFilmpeople[]>;
}> {
  return axios.get(`${PREFIX_URL}/${movSeq}/peoples?q=${keyword}`);
}

/**
 * 해당 영화의 영화 관계인을 추가한다
 */
export function addMovieFilmPeople({
  movSeq,
  peopleInfo,
}: {
  movSeq: number;
  peopleInfo: Pick<IMovieFilmPeople, 'rolesSeq' | 'filmoRole' | 'fpSeq'>[];
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/${movSeq}/peoples`, peopleInfo);
}

/**
 * 해당 영화의 영화 관계인을 삭제
 */
export function deleteMovieFilmPeople({
  movSeq,
  mfpSeq,
}: {
  movSeq: number;
  mfpSeq: number;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.delete(`${PREFIX_URL}/${movSeq}/peoples`, { data: { mfpSeq } });
}

/**
 * 상영/수상 내역을 조회한다.
 */
export function getAwardList({
  movSeq,
}: {
  movSeq: number;
  awardContent: string;
}): Promise<{
  data: ResponseType<IAward[]>;
}> {
  return axios.get(`${PREFIX_URL}/${movSeq}/awards`);
}

/**
 * 상영/수상 내역을 추가한다.
 */
export function registerAward({
  movSeq,
  awardContent,
}: {
  movSeq: number;
  awardContent: string;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/${movSeq}/awards`, { awardContent });
}

/**
 * 상영/수상 내역을 삭제한다.
 */
export function deleteAward({
  movSeq,
  awSeq,
}: {
  movSeq: number;
  awSeq: number;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.delete(`${PREFIX_URL}/${movSeq}/awards`, { data: { awSeq } });
}

/**
 * 상영/수상 내역 순서 변경한다.
 */
export function updateOrderAward({
  movSeq,
  awSeq,
  inorder,
}: {
  movSeq: number;
  awSeq: number;
  inorder: number;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.post(`${PREFIX_URL}/${movSeq}/awards`, { awSeq, inorder });
}

/**
 * 문의를 등록한다.
 */
export function registerRemark({
  movSeq,
  remark,
}: {
  movSeq: number;
  remark: string;
}): Promise<{
  data: ResponseType<never>;
}> {
  return axios.post(`${PREFIX_URL}/${movSeq}/remark`, { remark });
}
