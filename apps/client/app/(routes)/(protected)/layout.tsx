import { ProtectedRouteLayoutProps } from "@/types";


const PublicRouteLayout = ({ children }: ProtectedRouteLayoutProps) => {
  return (
    <main className="scroll-smooth min-h-screen">
        {children}
    </main>
  );
};

export default PublicRouteLayout;
