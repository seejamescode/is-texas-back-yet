import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;

  @media (orientation: landscape) {
    padding-right: 2rem;
  }

  span {
    text-align: right;
    width: 3rem;

    :nth-child(1) {
      text-align: left;
      width: 5rem;
    }

    @media (orientation: landscape) {
      width: 5rem;
    }
  }
`;

const Bar = styled.div`
  background: linear-gradient(
    to right,
    white,
    white ${props => props.progress}%,
    transparent ${props => props.progress}%
  );
  border: 0.25rem solid white;
  flex: 1;
  height: 3rem;
  position: relative;

  :after {
    color: var(--orange);
    content: ${props => (props.progress > 0 ? `"${props.progress}%"` : "")};
    position: absolute;
    right: calc(${props => 100 - props.progress}% + 0.5rem);
    text-align: right;
    top: 0.85rem;
  }
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
`;

class Progress extends Component {
  static propTypes = {
    back: propTypes.number.isRequired,
    wins: propTypes.number.isRequired
  };

  render() {
    return (
      <Container>
        <Bar
          progress={
            this.props.wins / this.props.back > 1
              ? 100
              : (this.props.wins / this.props.back) * 100
          }
        />
        <br />
        <Labels>
          <span>Not Back</span>
          <span>Back</span>
        </Labels>
      </Container>
    );
  }
}

export default Progress;
