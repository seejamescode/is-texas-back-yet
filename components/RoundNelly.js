import React, { Component } from "react";
import styled from "styled-components";
import RoundTemplate from "./RoundTemplate";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  left: ${props =>
    `calc(${props.left * 100}% - ${props.left * 20}vmin - 1px + ${props.left /
      -0.5 +
      1}rem)`};
  outline: 2px solid var(--orange);
  outline-offset: -2px;
  padding: 0;
  position: absolute;
  top: ${props =>
    `calc(${props.top * 100}% - ${props.top * 20}vmin - 1px + ${props.top /
      -0.5 +
      1}rem)`};

  img {
    width: 20vmin;
  }
`;

class RoundNelly extends Component {
  state = {
    left: Math.round(Math.random() * 100) / 100,
    score: 0,
    top: Math.round(Math.random() * 100) / 100
  };

  tapNelly = () => {
    if (this.state.score < 5) {
      this.setState({
        left: Math.round(Math.random() * 100) / 100,
        score: this.state.score + 1,
        top: Math.round(Math.random() * 100) / 100
      });
    } else {
      this.props.roundWon();
    }
  };

  render() {
    return (
      <RoundTemplate instructions={"Help Nelson find his Nelly Belly!"}>
        <Button
          left={this.state.left}
          onClick={() => this.tapNelly()}
          top={this.state.top}
        >
          <img src="/static/gifs/nelly-belly.gif" alt="Nelly Belly" />
        </Button>
      </RoundTemplate>
    );
  }
}

export default RoundNelly;
