import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import Game from "../components/Game";
import Progress from "../components/Progress";

const back = 10;
const Container = styled.div`
  display: grid;

  @media (orientation: landscape) {
    grid-template-columns: 1fr minmax(20rem, min-content);
    align-items: center;
    min-height: 100vh;
    width: 100%;
  }
`;

const Description = styled.p`
  justify-content: center;
  margin: 2rem 0;
  position: relative;
  text-align: center;

  @media (orientation: landscape) {
    :before {
      background: #a75414;
      content: "";
      height: calc(100% + 3rem);
      left: -2rem;
      position: absolute;
      top: -1.5rem;
      width: 1px;
    }
  }
`;

const Hero = styled.section`
  flex: 1;
  top: 0;
  width: 100%;

  @media (orientation: landscape) {
    -webkit-box-pack: center;
    -webkit-box-align: center;
    display: -webkit-inline-box;
    height: 100%;
    padding-right: 0;
    position: sticky;

    > * {
      align-items: center;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`;

const P = styled.p`
  font-size: ${props => 25 - props.size * 2}vmin;
  text-align: center;
`;

class Index extends Component {
  static getInitialProps = async function({ req }) {
    const host = req ? `http://${req.headers.host}` : "";
    const res = await fetch(`${host}/schedule`);
    const games = await res.json();

    return { games };
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

    return (
      <Container>
        <Hero>
          <div>
            <P size={text.length}>
              <strong>{text}</strong>
            </P>
            <Progress back={back} wins={wins} />
          </div>
        </Hero>
        <section>
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
        </section>
      </Container>
    );
  }
}

export default Index;
