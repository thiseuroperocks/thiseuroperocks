import styled from 'styled-components';

import media from 'Utils/style-media';


export default styled.div`
  width: 100%;
  maxWidth: 64rem;
  padding: 0 3rem;
  margin: 0 auto;

  ${media.m`
    padding: 0 4rem;
  `}
`;
