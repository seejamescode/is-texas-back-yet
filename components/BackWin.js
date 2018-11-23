import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
if (typeof window !== "undefined") {
  const emojisplosions = require("emojisplosion/lib/global.js");
}
import styled, { keyframes } from "styled-components";

const gifs = ["bevo", "dicker-the-kicker", "lil-jordan", "nelly-belly"];

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
    z-index: 0 !important;
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
background-image: url("./static/gifs/${props => gifs[props.currentGif]}.gif");
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
    text-align: center;
  }

  p {
    font-size: calc(0.8rem + 1vmin);
    line-height: 1.4;
    margin-bottom: 0;
    max-width: 40ch;
  }
`;

const Content = styled.div`
  background: black;
  padding: 2rem;
`;

class BackWin extends Component {
  state = {
    currentGif: Math.floor(Math.random() * gifs.length)
  };

  componentDidMount() {
    const { cancel } = emojisplosions({
      container: document.getElementById("fun"),
      emojiCount: 10,
      emojis: ["🤘", "🐮", "🏈 ", "🧡"],
      interval: 1500
    });

    var interval = setInterval(this.timer, 3000);
    this.setState({
      cancel,
      interval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.state.cancel();
  }

  timer = () => {
    this.setState({
      currentGif:
        this.state.currentGif === gifs.length - 1
          ? 0
          : this.state.currentGif + 1
    });
  };

  render() {
    return (
      <Container currentGif={this.state.currentGif} id="fun">
        <Content>
          <h1>Texas is finally back!</h1>
          <p>
            Congrat to the players and staff! The 2018 season is the first time
            Texas Football has had 10+ wins since 2009!
          </p>
          <Button onClick={() => this.props.return()}>{`< Return`}</Button>
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default BackWin;
