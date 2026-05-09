interface IRole {
  ADMIN: "admin";
  DOCTOR: "doctor";
  PATIENT: "patient";
  SECRETARY: "secretary";
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: keyof IRole;
}
