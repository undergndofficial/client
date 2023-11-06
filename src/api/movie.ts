import axios from './config';
import { ResponseType } from 'types/common';
import {
  IAward,
  IMovieBasicInfo,
  IMovieDistributor,
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
 * 상영/수상 내역 순서 변경한다..
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
