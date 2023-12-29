import { cx } from "@emotion/css";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { useState } from "react";
import { MasterLayout } from "../components/templates/MasterLayout";

const ResultSearchPageStyled = styled.div`
  padding: 30px 0;
  .buttonList .btn {
    font-size: 1.5rem;
    color: white;
    border: 3px solid white;
    &:not(:last-child) {
      border-right: 0;
    }
    &.-active {
      background-color: #7c7fe4;
    }
  }
  .content {
    margin-top: 50px;
    padding: 20px;
    border-radius: 10px;
    background-color: #7c7fe4;
  }
`;

const ResultSearchPage = () => {
  const [buttonChosen, setButtonChosen] = useState<string>("tcvd");
  return (
    <MasterLayout activeButton="tracuu">
      <ResultSearchPageStyled>
        <div className="container">
          <div className="buttonList btn-group d-flex">
            <button
              onClick={() => setButtonChosen("tcvd")}
              type="button"
              className={cx("btn w-100", {
                "-active": buttonChosen == "tcvd",
              })}
            >
              Tra cứu vận đơn
            </button>
            <button
              onClick={() => setButtonChosen("utcp")}
              type="button"
              className={cx("btn w-100", {
                "-active": buttonChosen == "utcp",
              })}
            >
              Ước tính cước phí
            </button>
            <button
              onClick={() => setButtonChosen("tdgd")}
              type="button"
              className={cx("btn w-100", {
                "-active": buttonChosen == "tdgd",
              })}
            >
              Tìm điểm giao dịch
            </button>
          </div>
          {buttonChosen == "tcvd" && (
            <div className="content">
              <div className="d-flex">
                <input
                  className="form-control form-control-sm me-4 px-3"
                  type="text"
                  placeholder="Nhập mã vận đơn"
                />
                <button className="btn btn-dark fw-bold" style={{ width: "150px" }}>
                  Tra cứu
                </button>
              </div>
              <div className="bg-white mt-4 rounded p-3">
                <ol type="I">
                  <li>
                    <h6 className="fw-bold">Thông tin đơn hàng</h6>

                    <div className="container">
                      <div className="row">
                        <div className="col-6">
                          <ul className="mb-0">
                            <li>
                              Mã đơn hàng: <b>1234567</b>
                            </li>
                            <li>
                              Loại hàng: <b>Tài liệu</b>
                            </li>
                          </ul>
                        </div>

                        <div className="col-6">
                          <ul className="mb-0">
                            <li>
                              Chi phí: <b>500k</b>
                            </li>
                            <li>
                              Khối lượng: <b>5g</b>
                            </li>
                            <li>
                              Ngày tạo: <b>{"22/12/2022"}</b>
                            </li>
                            <li>
                              Ngày giao/Dự kiến/Ngày hủy: <b>{"Chưa có thông tin"}</b>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h6 className="fw-bold">Thông tin người gửi</h6>

                    <div className="container">
                      <div className="row">
                        <div className="col-6">
                          <ul className="mb-0">
                            <li>
                              Họ và tên: <b>Nguyễn Văn A</b>
                            </li>
                          </ul>
                        </div>
                        <div className="col-6">
                          <ul className="mb-0">
                            <li>
                              SĐT: <b>0999978622</b>
                            </li>
                            <li>
                              Địa chỉ: <b>P. Dịch Vọng Hậu - Q. Cầu Giấy - TP. Hà Nội</b>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h6 className="fw-bold">Thông tin người nhận</h6>

                    <div className="container">
                      <div className="row">
                        <div className="col-6">
                          <ul className="mb-0">
                            <li>
                              Họ và tên: <b>Nguyễn Văn B</b>
                            </li>
                          </ul>
                        </div>
                        <div className="col-6">
                          <ul className="mb-0">
                            <li>
                              SĐT: <b>0918273654</b>
                            </li>
                            <li>
                              Địa chỉ: <b>P. Mai Dịch - Q. Cầu Giấy - TP. Hà Nội</b>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          )}
          {buttonChosen == "utcp" && (
            <div className="content">
              <div className="row">
                <div className="col-6">
                  <select className="form-select mb-4" aria-label="Default select example">
                    <option selected>Tỉnh gửi</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-6">
                  <select className="form-select mb-4" aria-label="Default select example">
                    <option selected>Tỉnh nhận</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-6">
                  <select className="form-select mb-4" aria-label="Default select example">
                    <option selected>Huyện gửi</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-6">
                  <select className="form-select mb-4" aria-label="Default select example">
                    <option selected>Huyện nhận</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-6">
                  <select className="form-select mb-4" aria-label="Default select example">
                    <option selected>Loại hàng</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-6">
                  <select className="form-select mb-4" aria-label="Default select example">
                    <option selected>Khối lượng</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <button className="btn w-100 btn-dark fw-bold">Tra cứu</button>
              <div className="bg-white mt-4 rounded p-3">
                <div>Ước tính chi phí:</div>
                <ul className="mb-0">
                  <li>
                    Điểm giao dịch gửi: <b>{"Cầu Giấy - Hà Nội"}</b>
                  </li>
                  <li>
                    Điểm giao dịch nhận: <b>{"Quận 5 - Hồ Chí Minh"}</b>
                  </li>
                  <li>
                    Chi phí: <b>{"20000 VND"}</b>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {buttonChosen == "tdgd" && (
            <div className="content">
              <div className="d-flex">
                <input
                  className="form-control form-control-sm me-4 px-3"
                  type="text"
                  placeholder="Nhập địa chỉ (Tỉnh)"
                />
                <button className="btn btn-dark fw-bold" style={{ width: "150px" }}>
                  Tra cứu
                </button>
              </div>
              <div className="bg-white mt-4 rounded p-3">
                <div>Bưu cục Cầu Giấy: 20 - Ngõ 20 - Hồ Tùng Mậu</div>
                <div>Bưu cục Thanh Xuân: 2 - Ngõ 2 - xxx</div>
              </div>
            </div>
          )}
        </div>
      </ResultSearchPageStyled>
    </MasterLayout>
  );
};
export default ResultSearchPage;
