import { cx } from "@emotion/css";
import styled from "@emotion/styled";
import Image from "next/image";
import NextLink from "next/link";
import NavbarLogin from "../ui/NavbarLogin";

const LayoutHeaderStyled = styled.header`
  background-color: #595ce2;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  .navbar {
    padding: 20px 0;
    &_logo {
      height: auto;
      cursor: pointer;
    }
    &_links {
      display: flex;
      .navbarLink {
        padding: 10px 20px;
        border-radius: 50px;
        letter-spacing: 0.05em;
        margin-left: 15px;
        &.-active {
          border: 4px solid;
          padding: 10px 50px;
          border-radius: 30px;
          background-color: #7c7fe4;
        }
      }
      button {
        border: 3px solid;
        padding: 10px 25px;
        border-radius: 30px;
        font-size: 1.25rem;
        font-weight: 700;
        color: white;
      }
    }
  }
`;

export interface LayoutHeaderProps {
  activeButton?: "trangchu" | "dichvu" | "hotro" | "tracuu" | "";
}

export const LayoutHeader = ({ activeButton = "trangchu" }: LayoutHeaderProps) => {
  return (
    <LayoutHeaderStyled>
      <div className="navbar px-5 align-items-center">
        {/* <NextLink href="/">
          <a> */}
        <div>
          <Image
            className="navbar_logo navbar-logo--header"
            src="/images/v1/logo-header.png"
            alt=""
            width={200}
            height={40}
            loading="lazy"
          />
        </div>
        {/* </a>
        </NextLink> */}
        <div className="navbar_links">
          <div
            className={cx("navbarLink", {
              "-active": activeButton == "trangchu",
            })}
          >
            <NextLink href="/">Trang chủ</NextLink>
          </div>
          <div
            className={cx("navbarLink", {
              "-active": activeButton == "tracuu",
            })}
          >
            <NextLink href="/tra-cuu">Tra cứu</NextLink>
          </div>
          <div
            className={cx("navbarLink", {
              "-active": activeButton == "dichvu",
            })}
          >
            <NextLink href="/dich-vu">Dịch vụ</NextLink>
          </div>
          <div
            className={cx("navbarLink", {
              "-active": activeButton == "hotro",
            })}
          >
            <NextLink href="/ho-tro">Hỗ trợ</NextLink>
          </div>
        </div>

        <NavbarLogin />
      </div>
    </LayoutHeaderStyled>
  );
};

export default LayoutHeader;
