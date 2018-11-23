import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import styled, { createGlobalStyle } from "styled-components";
import BackWin from "../components/BackWin";
import Game from "../components/Game";
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
  transition: transform 2s linear;
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
  transition: transform 2s linear;
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

const countWins = games =>
  games.map(game => game.result === "W").filter(v => v).length;

const getText = games => {
  const gamesLeft = games.filter(game => game.result === null).length;
  const wins = countWins(games);

  let text = wins >= back ? "Yes!" : "No.";
  if (wins === 5 && gamesLeft >= 5) {
    text = "Halfway!";
  } else if ((wins === 8 && gamesLeft >= 2) || (wins === 9 && gamesLeft >= 1)) {
    text = "No...";
  }
  return text;
};

class Index extends Component {
  static getInitialProps = async function({ req }) {
    const host = req ? `http://${req.headers.host}` : "";
    const res = await fetch(`${host}/schedule`);
    const games = await res.json();

    return { games };
  };

  state = {
    persistBack: true,
    startBack: false,
    text: getText(this.props.games),
    wins: countWins(this.props.games)
  };

  componentDidMount() {
    if (this.state.wins >= back) {
      this.setState({
        startBack: true
      });
    }
  }

  return = () => {
    this.setState(
      {
        startBack: false
      },
      () => {
        setTimeout(() => {
          this.setState({
            persistBack: false
          });
        }, 2000);
      }
    );
  };

  render() {
    return (
      <Container startBack={this.state.startBack}>
        <GlobalStyle startBack={this.state.startBack} />
        <Hero startBack={this.state.startBack}>
          <div>
            <P size={this.state.text.length}>
              <strong>{this.state.text}</strong>
            </P>
            {this.state.wins >= back ? (
              <BackButton
                disabled={this.state.startBack}
                onClick={() => this.setState({ startBack: true })}
              >
                Celebration Mode
              </BackButton>
            ) : (
              <Progress back={back} wins={this.state.wins} />
            )}
          </div>
        </Hero>
        <Scores startBack={this.state.startBack}>
          <Description>
            Texas Football will be back
            <br />
            when it gets {back} wins.
          </Description>
          {this.props.games.map((game, index) => (
            <Game
              context={game.context}
              date={game.date}
              index={index}
              key={index}
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
        {this.state.startBack || this.state.persistBack ? (
          <BackWin return={this.return} />
        ) : null}
      </Container>
    );
  }
}

export default Index;
