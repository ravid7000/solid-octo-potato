import Header from "./Header";

type LayoutProps = { children: React.ReactNode };

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
