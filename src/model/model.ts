export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age?: string;
  website?: string;
  userId: string;
  id: string;
}
