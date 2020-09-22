import React, { Component } from "react";
import Loader from "react-loader-spinner";

class Spinner extends Component {
  render() {
    return <Loader type="TailSpin" color="#3f51b5" height={300} width={300} />;
  }
}

export { Spinner };
