import React, { Component } from 'react';
import styled from 'styled-components';

import Hero from 'Components/Hero';
import Section from 'Components/Section';


const AppRoot = styled.div`
  background: black;
  color: white;
`;

class App extends Component {
  /* React lifecycle */
  componentWillMount() {
    this.logClientInfo();
  }

  /* Internal methods */
  logClientInfo = () => {
    const available = 'background: limegreen; color: white;';
    const unavailable = 'background: crimson; color: white;';
    const informational = 'background: dodgerblue; color: white;';

    console.group('Client Info');
    console.log(`%c ${this.isPortrait ? 'Portrait' : 'Landscape'} `, informational);
    console.log('%c WebGL ', window.Modernizr.webgl ? available : unavailable);
    console.log('%c Web Animation API ', window.Modernizr.webanimations ? available : unavailable);
    console.groupEnd('Client Info');
  }

  /* Render */
  render() {
    return (
      <AppRoot>
        <Hero />
        <Section fill={0.5} textAlign="center">
          Lorem ipsum dolor sit amet.
        </Section>
      </AppRoot>
    );
  }
}


export default App;
