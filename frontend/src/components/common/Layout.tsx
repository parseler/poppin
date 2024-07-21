import '@css/Layout.css';
import Header from "./Header";
import Menu from "./Menu";
import { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <Menu />
    </div>
  );
};

export default Layout;
