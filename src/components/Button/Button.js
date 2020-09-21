import React, { Component } from "react";
import PropTypes from "prop-types";

import { ButtonCSS } from "./styledButton";

class LoadMore extends Component {
  static propTypes = {
    onButtonClick: PropTypes.func.isRequired,
  };

  showNext = () => {
    const { onButtonClick } = this.props;
    onButtonClick();
  };

  render() {
    return <ButtonCSS onClick={this.showNext}>Load More</ButtonCSS>;
  }
}

export { LoadMore };
