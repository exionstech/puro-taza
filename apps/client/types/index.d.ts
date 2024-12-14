interface RoutesLayoutProps {
  children: React.ReactNode;
}
interface PublicRouteLayoutProps {
  children: React.ReactNode;
}

interface ProtectedRouteLayoutProps {
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
  address: string;
  isDefault?: boolean;
  latitude?: number;
  longitude?: number;

  nickname?: string;
  isDefault?: boolean;
}

export type AddressInput = Omit<Address, 'id'>;