import { ResponseType } from 'types/common';
import axios from './config';
import {
  INation,
  ILang,
  IGerne,
  IRating,
  IFaqCategory,
  IColoration,
  IScreenRatio,
} from 'types/db';

const PREFIX_URL = '/common';

/**
 * 국가명 목록을 조회한다.
 * @param param { keyword?: string }
 */
export function getNationList({
  keyword,
}: {
  keyword?: string;
} = {}): Promise<{ data: ResponseType<INation[]> }> {
  return axios.get(`${PREFIX_URL}/nationality/${keyword ? keyword : ''}`);
}

/**
 * 언어 목록을 조회한다.
 */
export function getLanguageList(): Promise<{ data: ResponseType<ILang[]> }> {
  return axios.get(`${PREFIX_URL}/lang`);
}

/**
 * 장르 목록을 조회한다.
 */
export function getGerneList(): Promise<{ data: ResponseType<IGerne[]> }> {
  return axios.get(`${PREFIX_URL}/gerne`);
}

/**
 * 시청 등급 목록을 조회한다.
 */
export function getRatingList(): Promise<{ data: ResponseType<IRating[]> }> {
  return axios.get(`${PREFIX_URL}/rating`);
}

/**
 * 화면비 목록을 조회한다.
 */
export function getScreenRatioList(): Promise<{
  data: ResponseType<IScreenRatio[]>;
}> {
  return axios.get(`${PREFIX_URL}/screen-ratio`);
}

/**
 * 색채 목록을 조회한다.
 */
export function getColorationList(): Promise<{
  data: ResponseType<IColoration[]>;
}> {
  return axios.get(`${PREFIX_URL}/coloration`);
}

/**
 * faq 카테고리를 조회한다.
 */
export function getFaqCategoryList(): Promise<{
  data: ResponseType<IFaqCategory[]>;
}> {
  return axios.get(`${PREFIX_URL}/faq-category`);
}
