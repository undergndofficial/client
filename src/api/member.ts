import axios from 'axios';
import { ResponseType } from 'types/common';
import { IUser } from 'types/db';

const PREFIX_URL = '/member';

/**
 * 회원가입을 한다.
 */
export function signup(params: IUser): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/signup`, params);
}

/**
 * 중복체크를 한다.
 */
export function dupCheck(params: {
  ctype: 'id' | 'email' | 'phone';
  value: string;
}): Promise<{
  data: ResponseType<'not duplicated' | 'duplicated'>;
}> {
  return axios.get(
    `${PREFIX_URL}/dup-check?ctype=${params.ctype}&value=${params.value}`,
  );
}
