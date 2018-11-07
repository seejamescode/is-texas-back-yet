import React, { Component } from "react";
import styled from "styled-components";

const GameArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  position: relative;
`;

const Instructions = styled.h1`
  border-top: 1px solid white;
  font-size: 5vmin;
  text-align: center;
  margin: 0;
  padding: 1rem;
`;

class Round1 extends Component {
  render() {
    return (
      <React.Fragment>
        <GameArea>{this.props.children}</GameArea>
        <Instructions>{this.props.instructions}</Instructions>
      </React.Fragment>
    );
  }
}

export default Round1;
