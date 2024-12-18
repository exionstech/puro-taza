import { ProtectedRouteLayoutProps } from "@/types";


const CheckoutLayOut = ({ children }: ProtectedRouteLayoutProps) => {
  return (
    <main className="scroll-smooth min-h-screen overflow-x-hidden">
        {children}
    </main>
  );
};

export default CheckoutLayOut;