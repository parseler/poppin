import '@css/Layout.css';
import { ReactNode } from 'react';
import Header from "./Header";
import Menu from "./Menu";

type LayoutProps = {
    children: ReactNode;
}

const Layout03 = (props: LayoutProps) => {
  return (
    <div>
      <Header leftIcon={"취소"} rightIcon={"완료"} />
      <main>{props.children}</main>
      <Menu />
    </div>
  );
};

export default Layout03;
