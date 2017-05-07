import styled from 'styled-components';

import media from 'Utils/style-media';


export default styled.section`
  width: 100%;
  ${props => (props.fill > 0 ? `minHeight: ${props.fill * 100}vh;` : '')}
  padding: 4rem 0;

  position: relative;

  background: ${props => props.background || 'white'};
  color: ${props => props.color || '#777777'};

  textAlign: ${props => props.textAlign || 'left'};

  ${media.m`
    padding: 6rem 0;
  `}
`;
