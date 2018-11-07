import React, { Component } from "react";
import styled from "styled-components";
import BackWin from "./BackWin";
import RoundDicker from "./RoundDicker";
import RoundNelly from "./RoundNelly";

const Container = styled.section`
  display: ${props => (props.startBack ? "flex" : "none")};
  height: 100%;
  flex-direction: column;
  left: 0;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

class GameFrame extends Component {
  roundWon = round => {
    this.setState({
      round: round + 1
    });
  };

  state = {
    round: 1,
    rounds: {
      0: <p>ready?</p>,
      // 1: <BackWin />,
      // 1: <RoundDicker roundWon={() => this.roundWon(this.state.round)} />,
      1: <RoundNelly roundWon={() => this.roundWon(this.state.round)} />,
      4: <BackWin />
    }
  };

  render() {
    return (
      <Container startBack={this.props.startBack}>
        {this.state.rounds[this.state.round]}
      </Container>
    );
  }
}

export default GameFrame;
