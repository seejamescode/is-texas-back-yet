import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Container = styled.p`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

class Game extends Component {
  static propTypes = {
    context: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    opponent: propTypes.string.isRequired,
    result: propTypes.string,
    score: propTypes.string
  };

  render() {
    const opponent =
      this.props.opponent === "Oklahoma" ? "OU Sucks" : this.props.opponent;

    return (
      <Container result={this.props.result}>
        <span>
          {`${this.props.context} `}
          {opponent}
        </span>
        <span>
          {this.props.score && this.props.result
            ? `${this.props.result} (${this.props.score})`
            : this.props.date}
        </span>
      </Container>
    );
  }
}

export default Game;
