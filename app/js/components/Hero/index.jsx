import React, { Component } from 'react';

import { reflexBlueAsNumber, yellowAsNumber } from 'Utils/style-colors';

import Container from 'Components/Container';
import WaveingFlag from 'Components/WaveingFlag';
import HeroSection from './HeroSection';


class Hero extends Component {
  render() {
    return (
      <HeroSection fill={1}>
        <Container>This Europe Rocks! 💪🇪🇺</Container>

        <WaveingFlag
          backgroundColor={yellowAsNumber}
          flagColor={reflexBlueAsNumber}
          fogIntensity={0}
        />
      </HeroSection>
    );
  }
}


export default Hero;
