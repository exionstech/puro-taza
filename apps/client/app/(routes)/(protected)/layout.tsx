import { ProtectedRouteLayoutProps } from "@/types";


const PublicRouteLayout = ({ children }: ProtectedRouteLayoutProps) => {
  return (
    <main className="scroll-smooth overflow-x-hidden">
        {children}
    </main>
  );
};

export default PublicRouteLayout;
