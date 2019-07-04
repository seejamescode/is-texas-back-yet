import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import ReactPlayer from "react-player";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import BackWin from "../components/BackWin";
import Game from "../components/Game";
import Progress from "../components/Progress";

const GlobalStyle = createGlobalStyle`
  body {
    position: ${props => (props.startBack ? "fixed" : null)};
    overflow-y: ${props => (props.startBack ? "hidden" : null)};
    width: 100%;
  }
`;

const pulse = keyframes`
  0%{transform: scale(1)}
  50%{transform: scale(1.05)}
  100%{transform: scale(1)}
`;

const back = 10;
const Container = styled.div`
  display: grid;
  overflow-y: hidden;
  height: ${props => (props.startBack ? "100vh" : "initial")};

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
  -webkit-appearance: none;
  animation: ${pulse} 2s ease infinite;}
  background: var(--orange);
  background-size: 100% 100%;
  border-color: white;
  border-width: 4px;
  color: white;
  cursor: ${props => (props.disabled ? "disabled" : "pointer")};
  font-size: 1rem;
  outline: 2px solid var(--orange);
  outline-offset: -4px;
  padding: 1rem 2rem;
  position: relative;

  :hover {
    background: white;
    color: var(--orange);
    outline-offset: ${props => (props.disabled ? null : "-6px")};
    outline-width: ${props => (props.disabled ? null : "4px")};

    polygon {
      stroke: var(--orange) !important;
    }

    polygon, path {
      fill: var(--orange) !important;
    }
  }

  :focus {
    background: ${props => (props.disabled ? null : "#ececec")};
    color: var(--orange);
    outline-offset: ${props => (props.disabled ? null : "-8px")};
    outline-width: ${props => (props.disabled ? null : "6px")};

    polygon {
      stroke: var(--orange) !important;
    }

    polygon, path {
      fill: var(--orange) !important;
    }
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
    // const host = req ? `http://${req.headers.host}` : "";
    // const res = await fetch(`${host}/schedule`);
    // const games = await res.json();

    return {
      games: [
        {
          opponent: "Maryland",
          context: "at",
          date: "Sep 1 ",
          result: "L",
          score: "29-34"
        },
        {
          opponent: "Tulsa",
          context: "vs",
          date: "Sep 8 ",
          result: "W",
          score: "28-21"
        },
        {
          opponent: "USC",
          context: "vs",
          date: "Sep 15 ",
          result: "W",
          score: "37-14"
        },
        {
          opponent: "TCU",
          context: "vs",
          date: "Sep 22 ",
          result: "W",
          score: "31-16"
        },
        {
          opponent: "Kansas State",
          context: "at",
          date: "Sep 29 ",
          result: "W",
          score: "19-14"
        },
        {
          opponent: "Oklahoma",
          context: "vs",
          date: "Oct 6 ",
          result: "W",
          score: "48-45"
        },
        {
          opponent: "Baylor",
          context: "vs",
          date: "Oct 13 ",
          result: "W",
          score: "23-17"
        },
        {
          opponent: "Oklahoma State ",
          context: "at",
          date: "Oct 27 ",
          result: "L",
          score: "35-38"
        },
        {
          opponent: "West Virginia ",
          context: "vs",
          date: "Nov 3 ",
          result: "L",
          score: "41-42"
        },
        {
          opponent: "Texas Tech",
          context: "at",
          date: "Nov 10 ",
          result: "W",
          score: "41-34"
        },
        {
          opponent: "Iowa State",
          context: "vs",
          date: "Nov 17 ",
          result: "W",
          score: "24-10"
        },
        {
          opponent: "Kansas",
          context: "at",
          date: "Nov 23 ",
          result: "W",
          score: "24-17"
        },
        {
          opponent: "Oklahoma",
          context: "vs",
          date: "Dec 1 ",
          result: "L",
          score: "27-39"
        },
        {
          opponent: "Georgia",
          context: "vs",
          date: "Jan 1 ",
          result: "W",
          score: "28-21"
        }
      ]
    };
  };

  state = {
    persistBack: countWins(this.props.games) >= back,
    startBack: false,
    text: getText(this.props.games),
    wins: countWins(this.props.games)
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.state.wins >= back) {
        this.setState({
          startBack: true
        });
      }
    }, 2000);
  }

  return = () => {
    this.setState(
      {
        persistBack: true,
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  id="layer1"
                  width="400pt"
                  height="400pt"
                  style={{
                    height: "1rem",
                    marginLeft: "1rem",
                    transform: "translateY(.1rem)",
                    width: "1rem"
                  }}
                  viewBox="0 0 75 75"
                >
                  <g id="g1">
                    <polygon
                      id="polygon1"
                      points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
                      style={{
                        stroke: "#fff",
                        strokeWidth: 5,
                        strokeLinejoin: "round",
                        fill: "#fff"
                      }}
                    />
                    <path
                      id="path1"
                      d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577"
                      style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeWidth: 5,
                        strokeLinecap: "round"
                      }}
                    />
                    <path
                      id="path2"
                      d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076"
                      style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeWidth: 5,
                        strokeLinecap: "round"
                      }}
                    />
                    <path
                      id="path1"
                      d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01"
                      style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeWidth: 5,
                        strokeLinecap: "round"
                      }}
                    />
                  </g>
                </svg>
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
          <ReactPlayer
            height={0}
            playing={this.state.startBack}
            url="./static/eyes-of-texas.mp3"
            width={0}
          />
        </Scores>
        {this.state.startBack || this.state.persistBack ? (
          <BackWin return={this.return} />
        ) : null}
      </Container>
    );
  }
}

export default Index;
