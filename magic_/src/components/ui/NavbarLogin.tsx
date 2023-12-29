import Image from "next/image";
import NextLink from "next/link";
import { useCheckLogin } from "../hooks/useCheckLogin";

type Props = {};

const NavbarLogin = (props: Props) => {
  const isLogged = useCheckLogin();

  return (
    <div className="navbar_links">
      {isLogged ? (
        <NextLink href="/thong-tin-ca-nhan">
          <Image
            className="navbar_logo icon-white"
            src="/images/v1/user-is-logged.png"
            alt=""
            width={50}
            height={50}
          />
        </NextLink>
      ) : (
        <>
          <NextLink href="/dang-nhap">
            <button className="btn me-3">Đăng nhập</button>
          </NextLink>
          <NextLink href="/dang-ky">
            <button className="btn me-3">Đăng ký</button>
          </NextLink>
        </>
      )}
    </div>
  );
};

export default NavbarLogin;
