/* eslint-disable react/display-name */
import React from 'react';

import styled from '@emotion/styled';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";
import NextLink from 'next/link';

const FooterStyled = styled.footer`
  margin-top: auto;
  padding: 25px 0;
  background-color: #252525;
  color: #E2B769;
  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_content{
      ul{
        display: flex;
        list-style-type: none;
        padding: 0;
        li{
          margin-right: 40px;
          &:last-child{
            margin-right: 0;
          }
        }
      }
      hr{
        border-top: 1px solid #EAD0A1;
        opacity: 1;
        margin: 24px 0;
      }
    }
    &_contact{
      display: flex;
      .icon{
        background-color: #e2b86925;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
        border-radius: 50%;
        border: 2px solid #FFFFFF25;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
`;

export const LayoutFooter = () => (
  <FooterStyled>
    <div className='container'>
      <div className='row'>
        <div className='offset-1 col-10'>
          <div className='footer'>
            <div className='footer_logo'>
              <Image className='navbar_logo' src="/images/logofull.png" alt="" width={100} height={40} />
            </div>
            <div className='footer_content'>
              <ul>
                <li>
                  <NextLink href="/">Trang chủ</NextLink>
                </li>
                <li>
                  <NextLink href="/san-pham">Sản phẩm</NextLink>
                </li>
              </ul>
              <hr />
              <div className='text-center'>© Build by Ry. All rights reserved.</div>
            </div>
            <div className='footer_contact'>
              <div className='icon'>
                <FontAwesomeIcon icon={faTwitter} />
              </div>
              <div className='icon'>
                <FontAwesomeIcon icon={faFacebookF} />
              </div>
              <div className='icon'>
                <FontAwesomeIcon icon={faGoogle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FooterStyled>
);

export default React.memo(LayoutFooter, () => true);