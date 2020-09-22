import React from "react";
import PropTypes from "prop-types";

import { ButtonCSS } from "./styledButton";

function LoadMore({ onClick }) {
  return <ButtonCSS onClick={onClick}>Load More</ButtonCSS>;
}

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { LoadMore };
