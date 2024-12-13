interface PublicRouteLayoutProps {
  children: React.ReactNode;
}

interface AuthRouteLayoutProps {
  children: React.ReactNode;
}

interface LoginData {
  phone: string;
}

interface LoginReturnType {
  message: string;
  success: boolean;
  token?: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
}

interface RegisterReturnType {
  message: string;
  success: boolean;
  token?: string;
}

interface VerifyData {
  otp: string;
}

interface VerifyReturnType {
  message: string;
  success: boolean;
}

interface UseAuthReturnTypes {
  loading: boolean;
  success: boolean;
  message: string;
  isLoggedIn: boolean;
  login: (data: LoginData) => Promise<LoginReturnType>;
  register: (data: RegisterData) => Promise<RegisterReturnType>;
  verify: (data: VerifyData) => Promise<VerifyReturnType>;
  logout: () => void;
}

interface SignInFormProps {
  setNext: (next: boolean) => void;
}



export interface Address {
  id: number;
  name: string;
  address: string;
  mobileNo?: string;
  isDefault?: boolean;
  latitude?: number;
  longitude?: number;
}

// Create a type that includes all properties except 'id'
export type AddressInput = Omit<Address, 'id'>;