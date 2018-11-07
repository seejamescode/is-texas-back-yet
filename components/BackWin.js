import React, { Component } from "react";
if (typeof window !== "undefined") {
  const emojisplosions = require("emojisplosion/lib/global.js");
}
import styled, { keyframes } from "styled-components";

const hue = keyframes`
  from {
    -webkit-filter: hue-rotate(0deg);
  }
  to {
    -webkit-filter: hue-rotate(-360deg);
  }
`;

const Container = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 1rem;
  width: 100%;

  h1 {
    background-image: -webkit-linear-gradient(92deg, var(--orange), white);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: ${hue} 10s infinite linear;
    font-size: calc(2rem + 1vmin);
    margin-top: 0;
  }

  p {
    font-size: calc(0.8rem + 1vmin);
    line-height: 1.4;
    margin-bottom: 0;
    max-width: 40ch;
  }
`;

class BackWin extends Component {
  componentDidMount() {
    console.log("here");
    const { cancel } = emojisplosions({
      emojiCount: 10,
      emojis: ["🤘", "🐮", "🏈 ", "🧡"],
      interval: 1500
    });

    this.setState({
      cancel
    });
  }

  componentWillUnmount() {
    this.state.cancel();
  }

  render() {
    return (
      <Container>
        <h1>Texas is finally back!</h1>
        <p>
          Congrats on the 2018 season being the first 10+ win season since 2009!
          50,000 of ya weirdos checked the site leading up to this moment. Are
          you happy? Now let’s stay back forever. Hook 'em Horns!
        </p>
      </Container>
    );
  }
}

export default BackWin;
