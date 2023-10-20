import axios from 'axios';
import { ResponseType } from 'types/common';
import { IAnnounce } from 'types/db';

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
 * @param param {id: number}
 */
export function getAnnounceDetail({
  id,
}: {
  id: number;
}): Promise<{ data: ResponseType<IAnnounce[]> }> {
  return axios.get(`${PREFIX_URL}/announce/${id}`);
}
