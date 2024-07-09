export interface Assignment {
  title: string;
  moduleId?: string;
  courseId?: string;
  questions?: Array<Question>;
}
export interface Question {
  question: string;
  files?: [];
  options: [{ text: string; isCorrect: boolean; selected?: boolean }];
}
