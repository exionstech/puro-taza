import { ProtectedRouteLayoutProps } from "@/types";


const PublicRouteLayout = ({ children }: ProtectedRouteLayoutProps) => {
  return (
    <main className="scroll-smooth min-h-screen overflow-x-hidden">
        {children}
    </main>
  );
};

export default PublicRouteLayout;
