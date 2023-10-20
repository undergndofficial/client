import axios from 'axios';
import { ResponseType } from 'types/common';
import { IAnnounce, IFaq } from 'types/db';

const PREFIX_URL = '/customer';

/**
 * 공지사항 목록을 조회한다.
 */
export function getAnnounceList(): Promise<{
  data: ResponseType<IAnnounce[]>;
}> {
  return axios.get(`${PREFIX_URL}/announce`);
}

/**
 * id에 해당하는 공지사항을 조회한다.
 * @param id
 */
export function getAnnounceDetail(
  id: number,
): Promise<{ data: ResponseType<IAnnounce[]> }> {
  return axios.get(`${PREFIX_URL}/announce/${id}`);
}

/**
 * faq 목록을 조회한다.
 */
export function getFaqList(): Promise<{
  data: ResponseType<IFaq[]>;
}> {
  return axios.get(`${PREFIX_URL}/faq`);
}

/**
 * id에 해당하는 faq를 조회한다.
 * @param id
 */
export function getFaqDetail(
  id: number,
): Promise<{ data: ResponseType<IFaq[]> }> {
  return axios.get(`${PREFIX_URL}/faq/${id}`);
}
