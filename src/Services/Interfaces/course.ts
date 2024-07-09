export interface CourseInterFace {
  id?: number | string;
  name?: string;
  subject?: string;
  description?: string;
  rate?: number;
  grade?: number;
  hours?: string;
  target?: string[];
  active?: number;
  deleted_at?: null;
  user_id?: number;
  photo?: string | Blob;
  created_from?: string;
  updated_from?: string;
  image_link?: string;
  pivot?: {
    progress?: string | undefined;
  };

  teacher?: {
    id?: 1;
    first_name?: string;
    last_name?: string;
    username?: string;
    code?: number;
    photo?: string;
  };

  reviews?: string[];
  modules?: {
    id: number;
    name: string;
    assessments: {
      name: string;
      module_id: number;
      id: number;
      course_id: number;
    } | null;
  }[];
  number_of_student?: number;
}
