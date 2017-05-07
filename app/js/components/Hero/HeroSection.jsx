import styled from 'styled-components';

import { reflexBlue, yellow } from 'Utils/style-colors';

import Section from 'Components/Section';


export default styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ${reflexBlue};
  color: ${yellow};
  textAlign: center;
`;
