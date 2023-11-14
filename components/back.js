import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { createGlobalStyle } from "styled-components";
if (typeof window !== "undefined") {
  const emojisplosions = require("emojisplosion/lib/global.js");
}
import styled, { keyframes } from "styled-components";

const catGifs = [];

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
  `,
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

const Cat = styled.div`
  animation: ${(props) => props.keyframes} 5s infinite linear;
  left: 0;
  overflow: visible;
  position: absolute;
  top: 0;
  width: 50vmin;
`;

const Container = styled.div`
  align-items: center;
  box-sizing: border-box;
  cursor: url("./static/back/football.ani"), url("./static/back/football.gif"),
    url("./static/back/football.png"), auto !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 1rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const Back = ({ progress, schedule, scheduleYear, status }) => {
  const [cat, setCat] = useState({
    catExploded: false,
    currentCatGif: Math.floor(Math.random() * catGifs.length),
    currentFly: Math.floor(Math.random() * flybys.length),
  });

  useEffect(() => {
    emojisplosions({
      container: document.getElementById("fun"),
      emojiCount: 10,
      emojis: ["🤘", "🐮", "🏈 ", "🧡"],
      interval: 1500,
    });
    var catInterval = setInterval(catTimer, 5000);
    setCat((curCat) => ({
      ...curCat,
      catInterval,
    }));
  }, []);

  const catTimer = () => {
    setCat((curCat) => ({
      catExploded: false,
      currentCatGif:
        curCat.currentCatGif === catGifs.length - 1
          ? 0
          : curCat.currentCatGif + 1,
      currentFly:
        curCat.currentFly === flybys.length - 1 ? 0 : curCat.currentFly + 1,
    }));
  };

  const explodeCat = () => {
    setCat((curCat) => ({ ...curCat, catExploded: true }));
  };

  return (
    <Container id="fun">
      <Cat
        keyframes={flybys[cat.currentFly]}
        onClick={() => explodeCat()}
        onTouchStart={() => explodeCat()}
      >
        {cat.catExploded ? (
          <img src="./static/back/explosion2.gif" />
        ) : (
          <Spline scene="https://prod.spline.design/ZtkA19dp8cS1Tg6J/scene.splinecode" />
        )}
      </Cat>
      <GlobalStyle />
    </Container>
  );
};

export default Back;
