import axios from 'axios';
import { ResponseType } from 'types/common';
import { IRequestMovie } from 'types/db';

const PREFIX_URL = '/movie';

/**
 * 영화등록을 요청한다.
 */
export function requestMovie(params: IRequestMovie): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/request`, params);
}
