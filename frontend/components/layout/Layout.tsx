//import Footer from "components/layout/Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}