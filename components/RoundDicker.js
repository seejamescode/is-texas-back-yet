import React, { Component } from "react";
import styled from "styled-components";
import RoundTemplate from "./RoundTemplate";

const velocity = 200;

const Button = styled.button`
  background: linear-gradient(
    to right,
    rgba(255, 38, 0, 1) 0%,
    rgba(255, 140, 0, 1) 25%,
    rgba(229, 245, 12, 1) 53%,
    rgba(96, 240, 24, 1) 82%,
    rgba(96, 240, 24, 1) 100%
  );
  border: none;
  bottom: 0;
  cursor: pointer;
  height: 10vmin;
  outline: 2px solid var(--orange);
  outline-offset: -2px;
  padding: 0;
  position: relative;
  width: 100%;

  :after {
    color: white;
    content: "↓ Click when charged";
    font-size: 1rem;
    position: absolute;
    left: 70%;
    bottom: calc(100% + 1rem);
  }
`;

const Graphic = styled.div`
  flex: 1;
`;

const Progress = styled.div`
  background: black;
  content: "";
  height: calc(100% - 4px);
  position: absolute;
  right: 2px;
  top: 2px;
  transition: width ${velocity}ms linear;
`;

class RoundDicker extends Component {
  state = {
    level: 0
  };

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), velocity);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tapLevel = () => {
    if (this.state.level > 7 && this.state.level < 13) {
      this.props.roundWon();
    }
  };

  tick() {
    this.setState(state => ({
      level: state.level >= 20 ? 0 : state.level + 1
    }));
  }

  render() {
    return (
      <RoundTemplate instructions={"Help Dicker the Kicker beat OU!"}>
        <Graphic>{this.state.level}</Graphic>
        <Button onClick={() => this.tapLevel()}>
          <Progress
            style={{
              width: `calc(${Math.abs(this.state.level - 10) * 10}% - 4px)`
            }}
          />
        </Button>
      </RoundTemplate>
    );
  }
}

export default RoundDicker;
