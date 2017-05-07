import React, { Component } from 'react';

import HeroSection from './HeroSection';


class Hero extends Component {
  render() {
    return (
      <HeroSection fill={1}>
        This Europe Rocks! 💪🇪🇺
      </HeroSection>
    );
  }
}


export default Hero;
