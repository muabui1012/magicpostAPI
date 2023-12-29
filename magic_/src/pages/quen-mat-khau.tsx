import styled from "@emotion/styled";
import { MasterLayout } from "../components/templates/MasterLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import Button from "../components/atoms/Button";
import Image from "next/image";
import NextLink from "next/link";

const ContactPageStyled = styled.div`
  .loginForm {
    position: relative;
    padding: 50px 30px 20px;
    background: #4c4ec2;
    margin: 70px auto;
    width: 450px;
    border-radius: 20px;
    color: white;
    .loginField {
      color: white;
      background: unset;
      border: 3px solid white;
      border-radius: 40px;
      box-shadow: none;
      padding: 10px;
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
  return (
    <MasterLayout activeButton="">
      <ContactPageStyled>
        <div className="container">
          <div className="loginForm">
            <div
              className="position-absolute"
              style={{
                top: "-40px",
                left: "50%",
                transform: "translatex(-50%)",
              }}
            >
              <Image
                src="/images/v1/fast.png"
                className="object-fit--cover icon-white"
                alt=""
                width={70}
                height={70}
              />
            </div>
            <h2 className="text-center fw-bold mb-4">Đặt lại mật khẩu</h2>
            <p style={{ color: "#B4B4E4" }} className="text-center fw-bold">
              Nhập địa chỉ email đã được xác minh tài khoản người dùng của bạn và chúng tôi sẽ gửi
              cho bạn liên kết đặt lại mật khẩu.
            </p>
            <form className="mt-4 px-4">
              <div className="mb-4">
                <input
                  type="email"
                  className="loginField form-control text-center"
                  placeholder="Nhập địa chỉ emai của bạn"
                />
              </div>

              <button type="submit" className="btn w-100 submitButton">
                Gửi mật khẩu
              </button>
            </form>
            <div className="text-center fw-bold mt-5" style={{ fontSize: "12px" }}>
              Chưa có tài khoản?&nbsp;
              <NextLink href="/dang-ky">
                <a className="text-info">Đăng ký</a>
              </NextLink>
            </div>
          </div>
        </div>
      </ContactPageStyled>
    </MasterLayout>
  );
};
export default ContactPage;
