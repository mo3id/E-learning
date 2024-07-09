export interface MyFormValues {
  id?: number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  username?: string;
  code?: string;
  role?: string | null;
  email_verified_at?: string;
  last_active_at?: Date | null;
  access_token?: string;
  photo?: string | Blob;
  password?: string;
  password_confirmation?: string;
  checkPolicy?: boolean;
  grade?: string;
  class?: string;
  online?: number;
  courses?: [];
  isActive?: boolean;
}
