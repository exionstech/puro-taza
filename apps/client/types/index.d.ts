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




type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: { url: string }[];
  category: string;
  qty: number;
};

type AboutItem = {
  title: string;
  description: string;
};

type AboutProduct = {
  categoryName: string;
  aboutItems: AboutItem[];
  customerSay: string;
  rating: string;
};

interface ProductDetailsProps {
  prodcut: Product;
  aboutProduct?: AboutProduct;
}

export interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: { url: string }[];
  category: string;
  qty: number;
}

export interface Category {
  id: string;
  billboardId: string;
  billboardLabel: string;
  name: string;
  description: string;
  banner: string;
  categoryDesc: { video: string; desc: string }[];
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Orders {
  id: string;
  userId: string;
  name: string;
  email: string;
  isPaid: boolean;
  phone: string;
  orderItems: Products[];
  address: string;
  order_status: string;
  session_id: string;
  amount: number;
  isCancelled: boolean;
  isReturned: boolean;
  return_or_refund: string;
  returnImages: { url: string }[];
  cancelled_items: Products[];
  returned_items: Products[];
  refundableamount: number;
  sent_email: boolean;
  paymentId: string;
  return_reason: string;
}
