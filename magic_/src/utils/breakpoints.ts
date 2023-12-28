/* eslint-disable @typescript-eslint/no-explicit-any */
// https://bulma.io/documentation/overview/responsiveness/
import { CSSInterpolation } from '@emotion/css';
import { css, SerializedStyles } from '@emotion/react';

interface BreakPoints {
  xxs: string | number
  xs: string | number
  sm: string | number
  md: string | number
  lg: string | number
  xlg: string | number
} 

export const breakpointsNumber: BreakPoints = {
  xxs: 320,
  xs: 480,
  sm: 769,
  md: 1024, // highlight
  lg: 1216,
  xlg: 1408
};

const breakpoints:BreakPoints = {
  xxs: `${ breakpointsNumber.xxs }px`,
  xs: `${ breakpointsNumber.xs }px`,
  sm: `${ breakpointsNumber.sm }px`,
  md: `${ breakpointsNumber.md }px`,
  lg: `${ breakpointsNumber.lg }px`,
  xlg: `${ breakpointsNumber.xlg }px`,
};

export const respondTo:{
  [key: string]: ( ...args: any)  => SerializedStyles,
} = Object.keys(breakpoints).reduce(
  (accumulator, label: string ) => {
    const breakpoint = breakpoints[ label as keyof BreakPoints ];
    const breakpointFn  = (
      ...args: Array<CSSInterpolation>) => css`
      @media (min-width: ${ breakpoint }) {
        ${ css(...args) };
      }
    `;
    return { ...accumulator, [ label ]: breakpointFn };
  },
  {}
);