export interface IUserForm {
  id: string;
  email: string;
  password: string;
  passwordRe: string;
  name: string;
  phone: string;
}

export interface IFilmForm {
  enName: string;
  photo: File | null;
  nation: string;
  gender: 'M' | 'F' | 'E';
  birthDate: Date | null;
  debutDate: Date | null;
  belong: string;
  notes: string;
}
