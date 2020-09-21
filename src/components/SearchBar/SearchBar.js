import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  SearchBarCSS,
  SearchFormCSS,
  SearchButtonCSS,
  LabelCSS,
  SearchInputCSS,
} from './styledSearchBar';


const INITIAL_STATE = {
  request: "",
};

class SearchBar extends Component {
  state = {
    request: "",
  };

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  updateRequest = () => {
    const { onFormSubmit } = this.props;
    const { request } = this.state;
    onFormSubmit(request);
  };

  handleInput = (evt) => {
    evt.preventDefault();
    this.setState({ request: evt.target.value });
  };

  resetState = () => {
    this.setState(INITIAL_STATE);
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.updateRequest();
    this.resetState();
  };

  render() {
    const { request } = this.state;
    return (
      <SearchBarCSS>
        <SearchFormCSS onSubmit={this.handleSubmit}>
          <SearchButtonCSS type="submit">
            <LabelCSS>Search</LabelCSS>
          </SearchButtonCSS>

          <SearchInputCSS
            type="text"
            autocomplete="off"
            autoFocus
            value={request}
            onChange={this.handleInput}
            placeholder="Search images and photos"
          />
        </SearchFormCSS>
      </SearchBarCSS>
    );
  }
}

export { SearchBar };
