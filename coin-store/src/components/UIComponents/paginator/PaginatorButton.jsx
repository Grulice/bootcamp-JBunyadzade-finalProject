import React, { Component } from "react";
import { Button } from "./PaginatorButton_style";

class PaginatorButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Button
        onClick={() => this.props.handleBtnClick(this.props.buttonNum)}
        selected={this.props.isSelected}
      >
        {this.props.buttonNum}
      </Button>
    );
  }
}

export default PaginatorButton;
