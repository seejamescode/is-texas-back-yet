import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    position: ${props => (props.startBack ? "fixed" : null)};
    overflow-y: ${props => (props.startBack ? "hidden" : null)};
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100vh;
  width: 100%;
`;

class Index extends Component {
  render() {
    return (
      <Container>
        <GlobalStyle />
        Ugh.
      </Container>
    );
  }
}

export default Index;
