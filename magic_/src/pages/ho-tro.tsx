import styled from "@emotion/styled";
import { MasterLayout } from "../components/templates/MasterLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import Button from "../components/atoms/Button";
import Image from "next/image";

const ContactPageStyled = styled.div`
  .content {
    margin-top: 80px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
  }
  .statistics {
    font-size: 1.5rem;
    margin-top: 100px;
    color: white;
    background-color: #7c7fe4;
  }
`;

const ContactPage = () => {
  return (
    <MasterLayout activeButton="hotro">
      <ContactPageStyled>
        <div className="container">
          <div className="content">
            <p>
              <i>
                Với mong muốn đem đến cho khách hàng sự yên tâm và những trải nghiệm tuyệt vời nhất
                khi sử dụng dịch vụ chuyển phát. Magic Post luôn không ngừng thay đổi để ngày càng
                đáp ứng sự mong đợi của Khách hàng.
              </i>
            </p>
          </div>
        </div>
        <div className="statistics">
          <div className="container">
            <div className="d-flex">
              <div className="d-flex w-50 align-items-center">
                <Image src="/images/v1/group-user.png" alt="" width={100} height={100} />
                <div className="ms-4">9xxxxxxxx+ khách hàng đã tin dùng</div>
              </div>
              <div className="d-flex w-50 align-items-center">
                <Image src="/images/v1/group-box.png" alt="" width={100} height={100} />
                <div className="ms-4">9xxxxxxxx+ đơn hàng đã vận chuyển</div>
              </div>
            </div>
          </div>
        </div>
      </ContactPageStyled>
    </MasterLayout>
  );
};
export default ContactPage;
