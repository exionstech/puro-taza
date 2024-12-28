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

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseAuthReturnTypes {
  loading: boolean;
  success: boolean;
  message: string;
  isLoggedIn: boolean;
  user: User | null;
  login: (data: LoginData) => Promise<LoginReturnType>;
  register: (data: RegisterData) => Promise<RegisterReturnType>;
  verify: (data: VerifyData) => Promise<VerifyReturnType>;
  logout: () => void;
}

interface SignInFormProps {
  setNext: (next: boolean) => void;
}


export type LabelType = 'HOME' | 'WORK' | 'OTHER';

export interface Address {
  id: string;
  address: string;
  street: string;
  appartment: string;
  postalCode: string;
  isDefault: boolean;
  label: LabelType;
  clientId?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddressInput {
  address: string;
  street: string;
  appartment: string;
  postalCode: string;
  isDefault?: boolean;
  label: LabelType;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// types/index.ts
export interface LocationFormData {
  address: string;
  street: string;
  appartment: string;
  postalCode: string;
  label: LabelType;
  latitude?: number;
  longitude?: number;
}


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount?: number;
  image: Image[];
  subcategories: any[];
  categoryId: string;
  category: Category;
  discounted_price?: number;
}

interface Category {
  id: string;
  name: string;
  image: Image[];
  product?: Product[];
}

interface Subcategory {
  id: string;
  name: string;
  image: Image[];
}

interface Image {
  id: string;
  url: string;
  key: string;
}

interface Order {
  id: string;
  amount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'DELIVERED';
  products: any[];
  address?: Address;
  client?: Client;
}