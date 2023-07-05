export interface Account {
  roles?: [];
  username?: string;
  name?: {
    firstName?: string;
    lastName?: string;
  };
  address?: {
    city?: string;
    street?: string;
    postCode?: string;
  };
  email?: string;
  phoneNumber?: number;
  dob?: string;
  password?: string;
  age?: number;
}
