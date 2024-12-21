import { ProtectedRouteLayoutProps } from "@/types";


const CartLayOut = ({ children }: ProtectedRouteLayoutProps) => {
  return (
    <main className="scroll-smooth min-h-screen overflow-x-hidden">
        {children}
    </main>
  );
};

export default CartLayOut;