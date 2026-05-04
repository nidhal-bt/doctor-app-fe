export type Role = 'doctor' | 'patient' | 'secretary';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}
