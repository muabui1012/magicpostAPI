import styled from "@emotion/styled";
import type { NextPage } from "next";
import Image from "next/image";
import NextLink from "next/link";
import "swiper/css";
import "swiper/css/bundle";
import { MasterLayout } from "../components/templates/MasterLayout";
import { ToastContainer } from "react-toastify";

const HomePageStyled = styled.div`
  button {
    border: 4px solid;
    padding: 10px 50px;
    border-radius: 30px;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    background-color: #7c7fe4;
  }
  .homeContent {
    h1 {
      font-size: 3rem;
      margin: 0;
    }
    h1,
    h3 {
      color: white;
      font-weight: 700;
    }
  }
`;

const Home: NextPage = () => {
  return (
    <MasterLayout>
      <HomePageStyled>
        <div className="container">
          <div className="homeContent d-flex justify-content-between align-items-center">
            <div className="position-relative flex-fill">
              <Image
                className="navbar_logo"
                src="/images/homepage_1.png"
                alt=""
                width={350}
                height={350}
              />
              <div className="position-absolute" style={{ top: "130px", left: "200px" }}>
                <h1>Magic Post</h1>
                <h3>Giao Siêu Nhanh, Giá Siêu Tốt</h3>
              </div>
            </div>
            <div>
              <Image
                className="navbar_logo"
                src="/images/homepage_2.png"
                alt=""
                width={450}
                height={450}
              />
            </div>
          </div>
          <div className="text-center">
            <NextLink href="/tra-cuu">
              <button>Tra cứu đơn</button>
            </NextLink>
          </div>
        </div>
      </HomePageStyled>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </MasterLayout>
  );
};

export default Home;
