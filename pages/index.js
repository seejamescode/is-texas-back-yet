import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import styled, { createGlobalStyle } from "styled-components";
import Game from "../components/Game";
import GameFrame from "../components/GameFrame";
import Progress from "../components/Progress";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: ${props => (props.startBack ? "hidden" : null)};
  }
`;

const back = 10;
const Container = styled.div`
  display: grid;
  overflow-y: hidden;

  @media (orientation: landscape) {
    grid-template-columns: 1fr minmax(20rem, min-content);
    align-items: center;
    min-height: 100vh;
    overflow-x: hidden;
    width: 100%;
  }
`;

const Description = styled.p`
  justify-content: center;
  margin: 2rem 0;
  position: relative;
  text-align: center;
`;

const BackButton = styled.button`
  border-color: white;
  border-width: 2px;
  color: var(--orange);
  cursor: ${props => (props.disabled ? "disabled" : "pointer")};
  font-size: 1rem;
  outline: 2px solid var(--orange);
  outline-offset: -4px;
  padding: 1rem 2rem;
  position: relative;

  :hover {
    outline-offset: ${props => (props.disabled ? null : "-6px")};
    outline-width: ${props => (props.disabled ? null : "4px")};
  }

  :focus {
    background: ${props => (props.disabled ? null : "#ececec")};
    outline-offset: ${props => (props.disabled ? null : "-8px")};
    outline-width: ${props => (props.disabled ? null : "6px")};
  }
`;

const Hero = styled.section`
  background: var(--orange);
  flex: 1;
  overflow-x: hidden;
  position: relative;
  top: 0;
  transition: ${props => (props.transitioning ? "transform 2s linear" : null)};
  transform: ${props => (props.startBack ? "translateY(-100%)" : null)};
  width: 100%;
  z-index: 2;

  > * {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  :before {
    background: white;
    bottom: 0;
    content: "";
    left: calc((100vw - 100%) / -2);
    height: 1px;
    position: absolute;
    transition: box-shadow 0.1s linear;
    width: 100vw;
  }

  @media (orientation: landscape) {
    -webkit-box-pack: center;
    -webkit-box-align: center;
    display: -webkit-inline-box;
    height: 100%;
    padding-right: 0;
    position: sticky;
    transform: ${props => (props.startBack ? "translateX(-100%)" : null)};

    > * {
      align-items: center;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    :before {
      height: 100%;
      left: unset;
      right: 0;
      width: 1px;
    }
  }
`;

const P = styled.p`
  font-size: ${props => 25 - props.size * 2}vmin;
  text-align: center;
`;

const Scores = styled.section`
  background: var(--orange);
  overflow-x: hidden;
  position: relative;
  transform: ${props => (props.startBack ? "translateY(100%)" : null)};
  transition: ${props => (props.transitioning ? "transform 2s linear" : null)};
  z-index: 2;

  :before {
    background: white;
    content: "";
    left: calc((100vw - 100%) / -2);
    height: 1px;
    position: absolute;
    top: 0;
    transition: box-shadow 0.1s linear;
    width: 100vw;
  }

  @media (orientation: landscape) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    transform: ${props => (props.startBack ? "translateX(100%)" : null)};

    :before {
      left: 0;
      height: 100%;
      width: 1px;
    }
  }
`;

class Index extends Component {
  static getInitialProps = async function({ req }) {
    const host = req ? `http://${req.headers.host}` : "";
    const res = await fetch(`${host}/schedule`);
    const games = await res.json();

    return { games };
  };

  state = {
    startBack: false,
    transitioning: false
  };

  render() {
    const wins = this.props.games
      .map(game => game.result === "W")
      .filter(v => v).length;
    const gamesLeft = this.props.games.filter(game => game.result === null)
      .length;
    let text = wins >= back ? "Yes!" : "No.";
    if (wins === 5 && gamesLeft >= 5) {
      text = "Halfway!";
    } else if (
      (wins === 8 && gamesLeft >= 2) ||
      (wins === 9 && gamesLeft >= 1)
    ) {
      text = "Almost!";
    }

    if (typeof window !== "undefined" && this.state.startBack) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    return (
      <Container startBack={this.state.startBack}>
        <GlobalStyle startBack={this.state.startBack} />
        <Hero
          startBack={this.state.startBack}
          transitioning={this.state.transitioning}
        >
          <div>
            <P size={text.length}>
              <strong>{text}</strong>
            </P>
            {wins >= 10 ? (
              <Progress back={back} wins={wins} />
            ) : (
              <BackButton
                disabled={this.state.startBack}
                onClick={() =>
                  this.setState(
                    { startBack: true, transitioning: true },
                    () => {
                      setTimeout(
                        () => this.setState({ transitioning: false }),
                        2000
                      );
                    }
                  )
                }
              >
                <span>Activate Back Mode</span>
              </BackButton>
            )}
          </div>
        </Hero>
        <Scores
          startBack={this.state.startBack}
          transitioning={this.state.transitioning}
        >
          <Description>
            Texas Football will be back
            <br />
            when it gets {back} wins.
          </Description>
          {this.props.games.map(game => (
            <Game
              context={game.context}
              date={game.date}
              key={game.opponent}
              opponent={game.opponent}
              result={game.result}
              score={game.score}
            />
          ))}
          <Description>
            <small>
              Made by{" "}
              <a
                href="https://twitter.com/seejamescode"
                rel="noopener noreferrer"
                target="_blank"
              >
                @seejamescode
              </a>
            </small>
          </Description>
        </Scores>
        {this.state.startBack ? (
          <GameFrame startBack={this.state.startBack} />
        ) : null}
      </Container>
    );
  }
}

export default Index;
