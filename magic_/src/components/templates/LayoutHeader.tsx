import React from "react";

import styled from "@emotion/styled";
import Image from "next/image";
import { cx } from "@emotion/css";
import NextLink from "next/link";

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

export const LayoutHeader = ({
  activeButton = "trangchu",
}: LayoutHeaderProps) => (
  <LayoutHeaderStyled>
    <div className="navbar px-5">
      {/* <NextLink href="/">
        <a> */}
      <Image
        className="navbar_logo"
        src="/images/empty-image.png"
        alt=""
        width={200}
        height={50}
      />
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
      <div className="navbar_links">
        <NextLink href="/dang-nhap">
          <button className="btn me-3">Đăng nhập</button>
        </NextLink>
        <NextLink href="/dang-ky">
          <button className="btn me-3">Đăng ký</button>
        </NextLink>
        <NextLink href="/thong-tin-ca-nhan">
          <Image
            className="navbar_logo"
            src="/images/empty-image.png"
            alt=""
            width={50}
            height={50}
          />
        </NextLink>
      </div>
    </div>
  </LayoutHeaderStyled>
);

export default LayoutHeader;
