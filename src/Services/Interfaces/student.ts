export interface StudentInfoInterface {
  id?: number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  role?: string | null;
  grade?: string;
  class?: string;
  online?: number;
  active?: number;
  photo?: string;
  courses?: Array<object>;
  }
  