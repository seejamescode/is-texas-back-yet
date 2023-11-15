import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { createGlobalStyle } from "styled-components";
if (typeof window !== "undefined") {
  const emojisplosions = require("emojisplosion/lib/global.js");
}
import styled, { keyframes } from "styled-components";

const cowInterval = 10000;

const cowStuff = [
  "How did I get here?",
  "Watch me jump over the moon!",
  "Being back is a state of mind.",
  "I chose to go to the moon!",
  "Is heaven burnt orange?",
  "I can see the Red River from up here.",
  "I don't know how to steer.",
  "There's no gravity and OU still sucks.",
  "I'm not scared of Kansas anymore.",
  "I still can't see College Station.",
  "Nobody can see your horns down from space.",
  "How many teams are in the Big 12 now?",
  "Release the Michigan manifesto!",
  "I'm high on winning.",
  "Athletes should unionize.",
  "All gas, no brakes!",
  "Seriously, how do I stop spinning?",
  "Please don't make me explode.",
  "Do NOT click me!",
  "I spin faster than the coaching carousel.",
  "Who let the Frost Tower look like an owl?",
  "Were we ever really gone?",
  "You spin me right 'round, baby, right 'round!",
  "I'm getting P Terry's to celebrate!",
  "Elijah Wood, come back to Austin!",
  "Holy cow!",
  "I look so good.",
  "Where's the beef?",
  "Baby got back!",
  "Moosic to my ears!",
  "This calls for more conference realignment!",
  "I'm higher than Eeyore's birthday party.",
  "What happened to South Congress?!",
];

const rotateKeyFrames = keyframes`
from {
  transform: rotateZ(0deg);
}
to {
  transform: rotateZ(360deg);
}`;

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

const GlobalStyle = createGlobalStyle`
  .emoji-styles {
    z-index: 0 !important;
  }
`;

const Cow = styled.div`
  animation: ${(props) => props.keyframes} ${cowInterval}ms infinite linear;
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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const Quote = styled.p`
  transform: scaleX(${(props) => (props.$isForward ? 1 : -1)});
`;

const SplineStyled = styled(Spline)`
  animation: ${rotateKeyFrames} 5s infinite linear;
`;

const Back = () => {
  const [cat, setCat] = useState({
    catExploded: false,
    currentCowStuff: Math.floor(Math.random() * cowStuff.length),
    currentFly: Math.floor(Math.random() * flybys.length),
  });

  useEffect(() => {
    emojisplosions({
      container: document.getElementById("fun"),
      emojiCount: 10,
      emojis: ["🤘", "🐮", "🏈 ", "🧡"],
      interval: 1500,
    });
    var catInterval = setInterval(catTimer, cowInterval);
    setCat((curCat) => ({
      ...curCat,
      catInterval,
    }));
  }, []);

  const catTimer = () => {
    setCat((curCat) => ({
      catExploded: false,
      currentCowStuff:
        curCat.currentCowStuff === cowStuff.length - 1
          ? 0
          : curCat.currentCowStuff + 1,
      currentFly:
        curCat.currentFly === flybys.length - 1 ? 0 : curCat.currentFly + 1,
    }));
  };

  const explodeCat = () => {
    setCat((curCat) => ({ ...curCat, catExploded: true }));
  };

  return (
    <Container id="fun">
      <Cow
        keyframes={flybys[cat.currentFly]}
        onClick={() => explodeCat()}
        onTouchStart={() => explodeCat()}
      >
        {cat.catExploded ? (
          <img src="./static/back/explosion2.gif" />
        ) : (
          <>
            <SplineStyled scene="https://prod.spline.design/ZtkA19dp8cS1Tg6J/scene.splinecode" />
            <Quote $isForward={cat.currentFly < 2}>
              {cowStuff[cat.currentCowStuff]}
            </Quote>
          </>
        )}
      </Cow>
      <GlobalStyle />
    </Container>
  );
};

export default Back;
