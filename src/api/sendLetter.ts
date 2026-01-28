import { axiosInstance } from './axios';

export type CreateLetterPost = {
  target: 'anon' | 'other' | 'self' | 'friend';
  title: string;
  content: string;
  isPublic: boolean;

  paperId: number;
  fontId: number;
  stampId: number;
};

export async function createLetter(body: CreateLetterPost) {
  const { data } = await axiosInstance.post('/letter/other', body);
  return data;
}
