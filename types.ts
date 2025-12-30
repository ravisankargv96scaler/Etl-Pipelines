export enum TabId {
  BIG_PICTURE = 'big_picture',
  EXTRACT = 'extract',
  TRANSFORM = 'transform',
  LOAD = 'load',
  ETL_VS_ELT = 'etl_vs_elt',
  QUIZ = 'quiz'
}

export interface UserRecord {
  id: string;
  name: string;
  signup_date: string;
  amount: string | number;
  status?: 'raw' | 'processed' | 'new' | 'updated';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}