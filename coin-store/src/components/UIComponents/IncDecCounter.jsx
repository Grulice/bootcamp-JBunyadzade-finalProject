import React, { Component } from "react";
import { ElemContainer, SmallButton, SmallInput } from "./IncDecCounter_style";

class IncDecCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  componentDidMount() {
    if (this.props.initVal) this.setState({ count: this.props.initVal });
  }

  handleDecrement = (e) => {
    this.setState(
      {
        count: this.state.count - 1 > 0 ? this.state.count - 1 : 1,
      },
      () => this.props.onChange(this.state.count)
    );
  };
  handleIncrement = (e) => {
    this.setState({ count: this.state.count + 1 }, () => {
      this.props.onChange(this.state.count);
    });
  };

  handleInpChange = (e) => {
    this.setState({ count: parseInt(e.target.value) }, () =>
      this.props.onChange(this.state.count)
    );
  };
  render() {
    return (
      <ElemContainer>
        <SmallButton side="left" onClick={this.handleDecrement}>
          -
        </SmallButton>
        <SmallInput
          type="number"
          value={this.state.count}
          onChange={this.handleInpChange}
        />
        <SmallButton side="right" onClick={this.handleIncrement}>
          +
        </SmallButton>
      </ElemContainer>
    );
  }
}

export default IncDecCounter;
