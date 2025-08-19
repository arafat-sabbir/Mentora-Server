export interface TUser {
  email: string; // unique
  password: string; // hashed
  firstName: string;
  lastName: string;
  role: 'admin' | 'student';
  createdAt: Date;
  updatedAt: Date;
}

