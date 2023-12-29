import React, { PropsWithChildren } from "react";

import styled from "@emotion/styled";

import LayoutHeader, { LayoutHeaderProps } from "./LayoutHeader";

import { MetaTag } from "./MetaTag";

const MasterLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MasterLayoutProps extends LayoutHeaderProps {
  className?: string;
}

export const MasterLayout = ({
  activeButton = "trangchu",
  children,
  className,
}: PropsWithChildren<MasterLayoutProps>) => (
  <React.Fragment>
    <MetaTag />
    <MasterLayoutStyled>
      <LayoutHeader activeButton={activeButton} />
      <main className={className}>{children}</main>
      {/* <LayoutFooter /> */}
    </MasterLayoutStyled>
  </React.Fragment>
);
