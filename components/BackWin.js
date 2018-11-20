import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
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

const GlobalStyle = createGlobalStyle`
  .emoji-styles {
    z-index: -1 !important;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: var(--orange);
  cursor: pointer;
  font-size: 1rem;
  margin-top: 2rem;
`;

const Container = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 1rem;
  position: absolute;
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
          Congrat to the players and staff! The 2018 season is the first time
          Texas Football has had 10+ wins since 2009!
        </p>
        <Button
          onClick={() => this.props.return()}
        >{`< Return to main screen`}</Button>
        <GlobalStyle />
      </Container>
    );
  }
}

export default BackWin;
