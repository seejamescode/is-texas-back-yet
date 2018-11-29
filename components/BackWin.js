import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
if (typeof window !== "undefined") {
  const emojisplosions = require("emojisplosion/lib/global.js");
}
import styled, { keyframes } from "styled-components";

const backgroundGifs = [
  "bevo",
  "dicker-the-kicker",
  "lil-jordan",
  "nelly-belly"
];

const catGifs = ["beck", "herman", "orlando"];

const fly = keyframes`
  from {
    transform: translate(-100%, -100%);
  }
  to {
    transform: translate(100vw, 100vh);
  }
`;

const flybys = [
  keyframes`
    from {
      transform: translate(-100%, 100vh);
    }
    to {
      transform: translate(100vw, -100%);
    }
  `,
  keyframes`
    from {
      transform: translate(-100%, -100%);
    }
    to {
      transform: translate(100vw, 100vh);
    }
  `,
  keyframes`
    from {
      transform: translate(100vw, 100vh) scaleX(-1);
    }
    to {
      transform: translate(-100%, -100%) scaleX(-1);
    }
  `,
  keyframes`
    from {
      transform: translate(100vw, -100%) scaleX(-1);
    }
    to {
      transform: translate(-100%, 100vh) scaleX(-1);
    }
  `
];

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

const Cat = styled.img`
  animation: ${props => props.keyframes} 5s infinite linear;
  left: 0;
  position: absolute;
  top: 0;
  width: 50vmin;
`;

const Container = styled.div`
  align-items: center;
  background-image: url("./static/gifs/${props =>
    backgroundGifs[props.currentBackgroundGif]}.gif");
  box-sizing: border-box;
  cursor: url("./static/gifs/football.ani"), url("./static/gifs/football.gif"), url("./static/gifs/football.png"), auto !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  overflow: hidden;
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
  margin-top: -2rem;
  padding: 2rem;
`;

class BackWin extends Component {
  state = {
    catExploded: false,
    currentBackgroundGif: Math.floor(Math.random() * backgroundGifs.length),
    currentCatGif: Math.floor(Math.random() * catGifs.length),
    currentFly: Math.floor(Math.random() * flybys.length)
  };

  componentDidMount() {
    const { cancel } = emojisplosions({
      container: document.getElementById("fun"),
      emojiCount: 10,
      emojis: ["🤘", "🐮", "🏈 ", "🧡"],
      interval: 1500
    });

    var backgroundInterval = setInterval(this.backgroundTimer, 3000);
    var catInterval = setInterval(this.catTimer, 5000);
    this.setState({
      cancel,
      backgroundInterval,
      catInterval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.backgroundInterval);
    clearInterval(this.state.catInterval);
    this.state.cancel();
  }

  backgroundTimer = () => {
    this.setState({
      currentBackgroundGif:
        this.state.currentBackgroundGif === backgroundGifs.length - 1
          ? 0
          : this.state.currentBackgroundGif + 1
    });
  };

  catTimer = () => {
    this.setState({
      catExploded: false,
      currentCatGif:
        this.state.currentCatGif === catGifs.length - 1
          ? 0
          : this.state.currentCatGif + 1,
      currentFly:
        this.state.currentFly === flybys.length - 1
          ? 0
          : this.state.currentFly + 1
    });
  };

  explodeCat = () => {
    this.setState({
      catExploded: true
    });
  };

  render() {
    return (
      <Container
        currentBackgroundGif={this.state.currentBackgroundGif}
        id="fun"
      >
        <Content>
          <h1>Texas is finally back!</h1>
          <p>
            Congrat to the players and staff! The 2018 season is the first time
            Texas Football has had 10+ wins since 2009!
          </p>
          <Button onClick={() => this.props.return()}>{`< Return`}</Button>
        </Content>
        <Cat
          keyframes={flybys[this.state.currentFly]}
          onClick={() => this.explodeCat()}
          onTouchStart={() => this.explodeCat()}
          src={
            this.state.catExploded
              ? `./static/gifs/explosion2.gif`
              : `./static/gifs/${catGifs[this.state.currentCatGif]}.gif`
          }
        />
        <GlobalStyle />
      </Container>
    );
  }
}

export default BackWin;
