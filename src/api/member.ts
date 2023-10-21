import axios from 'axios';
import { ResponseType } from 'types/common';
import { IUser } from 'types/db';

const PREFIX_URL = '/member';

/**
 * 로그인을 한다.
 */
export function signin(params: IUser): Promise<{
  data: ResponseType<never>;
}> {
  return axios.post(`${PREFIX_URL}/signin`, params);
}

/**
 * 로그아웃 한다.
 */
export function signout(): Promise<{
  data: ResponseType<never>;
}> {
  return axios.get(`${PREFIX_URL}/signout`);
}

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

/**
 * 로그인한 사용자의 정보를 불러온다
 */
// export function getMemberInfo(): Promise<{ data: ResponseType<IUser> }> {
//   return axios.patch(`${PREFIX_URL}`);
// }
