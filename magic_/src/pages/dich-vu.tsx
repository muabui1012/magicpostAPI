import styled from "@emotion/styled";
import { MasterLayout } from "../components/templates/MasterLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import Button from "../components/atoms/Button";
import Image from "next/image";

const ContactPageStyled = styled.div`
  .col-6 {
    padding: 40px 80px;
  }
  .serviceCard {
    background-color: white;
    border-radius: 15px;
    padding: 20px;
  }
`;

const ContactPage = () => {
  return (
    <MasterLayout activeButton="dichvu">
      <ContactPageStyled>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="serviceCard">
                  <div className="d-flex align-items-end">
                    <div className="me-3">
                      <Image
                        className="navbar_logo"
                        src="/images/empty-image.png"
                        alt=""
                        width={50}
                        height={50}
                      />
                    </div>
                    <h4 className="fw-bold">Chuyển phát nhanh</h4>
                  </div>
                  <p>
                    <i>
                      Dịch vụ nhận gửi, vận chuyển và phát các loại thư, tài
                      liệu, thư từ trong nước theo chỉ tiêu thời gian tiêu
                      chuẩn, Không áp dụng với các đơn hàng có thu hộ COD [..]
                    </i>
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="serviceCard">
                  <div className="d-flex align-items-end">
                    <div className="me-3">
                      <Image
                        className="navbar_logo"
                        src="/images/empty-image.png"
                        alt=""
                        width={50}
                        height={50}
                      />
                    </div>
                    <h4 className="fw-bold">Chuyển phát hỏa tốc</h4>
                  </div>
                  <p>
                    <i>
                      Dịch vụ nhận gửi, vận chuyển và phát nhanh chứng từ hàng
                      hóa, vật phẩm có độ ưu tiên cao nhất với chỉ tiêu thời
                      gian toàn trình không quá 24 giờ [...]
                    </i>
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="serviceCard">
                  <div className="d-flex align-items-end">
                    <div className="me-3">
                      <Image
                        className="navbar_logo"
                        src="/images/empty-image.png"
                        alt=""
                        width={50}
                        height={50}
                      />
                    </div>
                    <h4 className="fw-bold">Chuyển phát tiết kiệm</h4>
                  </div>
                  <p>
                    <i>
                      Dịch vụ nhận gửi, vận chuyển và phát các loại hàng hóa,
                      bưu kiện không giới hạn mức trọng lượng, theo chỉ tiêu
                      thời gian tiêu chuẩn, giá cước hợp lý [...]
                    </i>
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="serviceCard">
                  <div className="d-flex align-items-end">
                    <div className="me-3">
                      <Image
                        className="navbar_logo"
                        src="/images/empty-image.png"
                        alt=""
                        width={50}
                        height={50}
                      />
                    </div>
                    <h4 className="fw-bold">Chuyển phát đặc biệt</h4>
                  </div>
                  <p>
                    <i>
                      Dịch vụ nhận gửi, vận chuyển và phát các loại hàng hóa đặc
                      biệt, quá trình tiếp nhận, đóng gói, quy định về tem nhãn
                      cảnh báo riêng cho từng loại [...]
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContactPageStyled>
    </MasterLayout>
  );
};
export default ContactPage;
