import axios from './config';
import { IPagingData, ResponseType } from 'types/common';
import { IAnnounce, IFaq, IQna } from 'types/db';
import { IPagingProps } from 'types/props';

const PREFIX_URL = '/customer';

/**
 * 공지사항 목록을 조회한다.
 */
export function getAnnounceList({ step, page }: IPagingProps): Promise<{
  data: ResponseType<IPagingData<IAnnounce>>;
}> {
  return axios.get(`${PREFIX_URL}/announce?step=${step}&page=${page}`);
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

/**
 * 일대일 문의 목록을 조회한다.
 */
export function getQnaList({ step, page }: IPagingProps): Promise<{
  data: ResponseType<IPagingData<IQna>>;
}> {
  return axios.get(`${PREFIX_URL}/qna?step=${step}&page=${page}`);
}

/**
 * id에 해당하는 일대일 문의 내용을 조회한다.
 * @param id
 */
export function getQnaDetail(
  id: number,
): Promise<{ data: ResponseType<IQna> }> {
  return axios.get(`${PREFIX_URL}/qna/${id}`);
}

/**
 * 일대일 문의 내용을 작성한다.
 */
export function addQna(
  params: Pick<IQna, 'inqCat' | 'inqTitle' | 'inqBody'>,
): Promise<{ data: ResponseType<never> }> {
  return axios.put(`${PREFIX_URL}/qna`, params);
}

/**
 * id에 해당하는 일대일 문의 내용을 수정한다.
 */
export function updateQna({
  params,
  id,
}: {
  params: Pick<IQna, 'inqCat' | 'inqTitle' | 'inqBody'>;
  id: number;
}): Promise<{ data: ResponseType<never> }> {
  return axios.post(`${PREFIX_URL}/qna/${id}`, params);
}
