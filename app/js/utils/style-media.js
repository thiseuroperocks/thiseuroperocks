import { css } from 'styled-components';

// export const breakpointXXS = 0;
export const breakpointXS = 321;
export const breakpointS = 376;
export const breakpointM = 737;
export const breakpointL = 1025;
export const breakpointXL = 1441;

export default {
  xs: (...args) => css`
    @media (min-width: ${breakpointXS}px) {
      ${css(...args)}
    }
  `,
  s: (...args) => css`
    @media (min-width: ${breakpointS}px) {
      ${css(...args)}
    }
  `,
  m: (...args) => css`
    @media (min-width: ${breakpointM}px) {
      ${css(...args)}
    }
  `,
  l: (...args) => css`
    @media (min-width: ${breakpointL}px) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (min-width: ${breakpointXL}px) {
      ${css(...args)}
    }
  `,
};
