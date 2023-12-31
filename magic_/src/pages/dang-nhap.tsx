import styled from "@emotion/styled";
import Image from "next/image";
import NextLink from "next/link";
import { FormEvent, useState } from "react";
import { MasterLayout } from "../components/templates/MasterLayout";
import { BASE_URL, LOCAL_LOGIN_KEY } from "../utils/constant";
import { useRouter } from "next/router";

const ContactPageStyled = styled.div`
  .loginForm {
    padding: 30px 40px;
    background: #4c4ec2;
    margin: 60px auto;
    width: 450px;
    border-radius: 20px;
    color: white;
    .loginField {
      color: white;
      background: unset;
      border: none;
      border-bottom: 1px solid white;
      border-radius: 0;
      box-shadow: none;
      &::placeholder {
        color: white;
      }
    }
    .submitButton {
      background-color: white;
      border-radius: 40px;
      color: #150e60;
      font-weight: 700;
      padding: 10px;
    }
  }
`;

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState<"ready" | "pending" | "complete" | "failed">("ready");

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading("pending");

    const formData = new FormData(event.currentTarget);

    try {
      const url = BASE_URL + "/api/auth/login";

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      // Handle response if necessary
      const data = await response.json();

      if (data?.error === "Unauthorized") {
        alert("Wrong password or email!");
        setIsLoading("failed");
      } else {
        setIsLoading("complete");
        localStorage.setItem(LOCAL_LOGIN_KEY, data?.access_token);
        window.dispatchEvent(new Event("storage"));
        router.push('/thong-tin-ca-nhan')
      }
    } catch (error) {
      setIsLoading("failed");
      alert(error.message);
    } finally {
      setIsLoading("ready");
    }
  };

  return (
    <MasterLayout activeButton="" className="background-login">
      <ContactPageStyled>
        <div className="container">
          <div className="loginForm">
            <div className="d-flex">
              <Image src="/images/v1/logo-white.png" alt="" width={70} height={70} />
              <div className="ms-3">
                <h2 className="mb-0 fw-bold">Magic Post</h2>
                <div className="fw-bold">Giao Siêu Nhanh, Giá Siêu Tốt</div>
              </div>
            </div>
            <form className="mt-4 px-4" method="post" onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  className="loginField form-control"
                  placeholder="Nhập email"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  autoComplete="new-password"
                  className="loginField form-control"
                  placeholder="Nhập mật khẩu"
                  name="password"
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" />
                    Ghi nhớ
                  </label>
                </div>
                <NextLink href="/quen-mat-khau">
                  <a className="text-info">Quên mật khẩu</a>
                </NextLink>
              </div>
              <button
                disabled={isLoading === "pending"}
                type="submit"
                className="btn w-100 submitButton"
              >
                {isLoading === "pending" ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
              <div className="text-center fw-bold mt-2" style={{ fontSize: "12px" }}>
                Chưa có tài khoản?&nbsp;
                <NextLink href="/dang-ky">
                  <a className="text-info">Đăng ký</a>
                </NextLink>
              </div>
            </form>
          </div>
        </div>
      </ContactPageStyled>
    </MasterLayout>
  );
};
export default ContactPage;
