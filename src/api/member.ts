import axios from './config';
import { ResponseType } from 'types/common';
import { IUser, IUserSession } from 'types/db';

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
  data: ResponseType<{ memSeq: number }>;
}> {
  return axios.put(`${PREFIX_URL}/signup`, params);
}

/**
 * 회원가입 시 영화인으로 등록한다.
 */
export function signupFilmpeople(params: FormData): Promise<{
  data: ResponseType<never>;
}> {
  return axios.put(`${PREFIX_URL}/signup-with-filmpeople`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
 * 현재 로그인한 사용자의 세션 정보를 불러온다
 */
export function getUserInfo(): Promise<{ data: ResponseType<IUserSession> }> {
  return axios.get(`${PREFIX_URL}`);
}
