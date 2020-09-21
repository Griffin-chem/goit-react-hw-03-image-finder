import React, { Component } from "react";

import imageFinder from "./service/API";

import { SearchBar } from "./components/SearchBar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { LoadMore } from "./components/Button/Button";
import Loader from "react-loader-spinner";

import { AppCSS } from "./styledApp";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const PER_PAGE = 12;

class App extends Component {
  state = {
    request: "",
    page: 1,
    results: [],
    total: 0,
  };

  // Create new request
  newRequest = (request) => {
    this.setState({ request, page: 1, results: [] });
  };

  // Logic for App update on events
  componentDidUpdate = (_, prevState) => {
    const { request: prevRequest, page: prevPage } = prevState;
    const { request, page } = this.state;
    if (prevRequest === request && prevPage === page) {
      return;
    }
    console.log(prevRequest, prevPage);
    this.imagesToShow();
  };

  // Determine array of images to be shown
  imagesToShow = async () => {
    const { request, page, results } = this.state;
    if (!request) {
      return;
    }
    const data = await imageFinder(request, page);
    console.log(data);
    console.log(this.isShowMoreVisible());
    this.setState({
      results: [...results, ...data.hits],
      total: data.totalHits,
    });
  };

  // Determine if we need to show button Show More
  isShowMoreVisible = () => {
    const { page, total, results } = this.state;
    return !results.length || page * PER_PAGE >= total ? false : true;
  };

  //Logic of Show More button
  showMore = () => {
    const { request, page } = this.state;
    if (!request) {
      return;
    }
    this.setState({ page: page + 1 });
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  render() {
    return (
      <AppCSS>
        <SearchBar onFormSubmit={this.newRequest} />
        <ImageGallery {...this.state} />
        {this.isShowMoreVisible() && <LoadMore onButtonClick={this.showMore} />}
        {/* <Loader
          type="TailSpin"
          color="#3f51b5"
          height={100}
          width={100}
          timeout={3000}
        /> */}
      </AppCSS>
    );
  }
}

export default App;
