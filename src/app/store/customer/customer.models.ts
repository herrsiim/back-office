export interface Customer {
  firstName: string;
  lastName: string;
  idCode: string;
  idCountry: string;
  birthDate: string;
  birthCountry: string;
  email?: string;
  emailVerified?: boolean;
}

export interface CustomerState {
  data: Customer | null;
  loading: boolean;
  error: string | null;
}
