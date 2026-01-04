export type LetterVariant = 'blue' | 'pink' | 'yellow';

export interface Letter {
  id: string;
  title: string;
  date: string;
  variant?: LetterVariant;
  link: string;
}
