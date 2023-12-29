import styled from "@emotion/styled";
import { MasterLayout } from "../components/templates/MasterLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import Button from "../components/atoms/Button";
import Image from "next/image";
import NextLink from "next/link";

const ContactPageStyled = styled.div`
  .loginForm {
    padding: 30px 40px;
    background: #4c4ec2;
    margin: 60px auto;
    width: 450px;
    border-radius: 20px;
    color: white;
    .submitButton {
      position: absolute;
      bottom: -75px;
      background-color: #150e60;
      color: white;
      font-weight: 700;
      padding: 10px;
    }
  }
`;

const ContactPage = () => {
  return (
    <MasterLayout activeButton="" className="background-login">
      <ContactPageStyled>
        <div className="container">
          <div className="loginForm">
            <div className="d-flex">
              <Image
                src="/images/v1/logo-white.png"
                className="object-fit--cover"
                alt=""
                width={"100%"}
                height={"100%"}
              />
              <div className="ms-3">
                <h2 className="mb-0 fw-bold">Magic Post</h2>
                <div className="fw-bold">Giao Siêu Nhanh, Giá Siêu Tốt</div>
              </div>
            </div>
            <form className="mt-4 px-4">
              <div className="position-relative">
                <div className="mb-3">
                  <select className="form-select" aria-label="Default select example">
                    <option selected>Chức vụ</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select className="form-select" aria-label="Default select example">
                    <option selected>Điểm giao dịch</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Nhập email" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Nhập mật khẩu" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Nhập lại mật khẩu" />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" />
                      Tôi đồng ý với điều khoản & dịch vụ
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn w-100 submitButton">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </ContactPageStyled>
    </MasterLayout>
  );
};
export default ContactPage;
