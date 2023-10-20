import axios from 'axios';
import { ResponseType } from 'types/common';
import { INation } from 'types/db';

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
