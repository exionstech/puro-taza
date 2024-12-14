import { PublicRouteLayoutProps } from "@/types";

const PublicRouteLayout = ({ children }: PublicRouteLayoutProps) => {
  return (
  <main className="scroll-smooth min-h-screen">
    {children}
  </main>
  );
};

export default PublicRouteLayout;
