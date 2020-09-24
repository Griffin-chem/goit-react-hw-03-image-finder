import React, { Component } from "react";

import imageFinder from "./service/API";

import { SearchBar } from "./components/SearchBar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { LoadMore } from "./components/Button/Button";
import { Spinner } from "./components/Loader/Loader";
import { Modal } from "./components/Modal/Modal";

import { AppCSS } from "./styledApp";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const PER_PAGE = 12;

class App extends Component {
  state = {
    request: "",
    page: 1,
    results: [],
    total: 0,
    isLoading: false,
    isModalShown: false,
    modalImg: "",
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
    this.imagesToShow();
  };

  // Determine array of images to be shown
  imagesToShow = async () => {
    this.setState({ isLoading: true });
    const { request, page, results } = this.state;
    if (!request) {
      return;
    }
    try {
      const data = await imageFinder(request, page);
      this.setState({
        results: [...results, ...data.hits],
        total: data.totalHits,
      });
    } catch {
      this.setState({ results: [] });
    } finally {
      this.setState({ isLoading: false });
      window.scrollTo({
        top: document.documentElement.scrollHeight - 120,
        behavior: "smooth",
      });
    }
  };

  //Logic of Show More button
  showMore = () => {
    const { request, page } = this.state;
    if (!request) {
      return;
    }
    this.setState({ page: page + 1 });
  };

  onGalleryClick = ({ target }) => {
    const largeImg = target.dataset.fullscreen;
    this.showModal(largeImg);
  };

  showModal = (source) => {
    window.addEventListener("keydown", this.keyPressHandle);
    this.setState({ isModalShown: true, modalImg: source });
  };

  closeModal = () => {
    this.setState({ isModalShown: false, modalImg: "" });
    document.removeEventListener("keydown", this.keyPressHandle);
  };

  keyPressHandle = ({ key }) => {
    const { isModalShown } = this.state;
    console.log(key, isModalShown);
    if (isModalShown && key === "Escape") {
      this.closeModal();
    }
  };

  render() {
    const {
      page,
      total,
      results,
      isLoading,
      isModalShown,
      modalImg,
    } = this.state;
    const isShowMoreVisible =
      !results.length || page * PER_PAGE >= total ? false : true;
    const isGalleryVisible = !!results.length;

    return (
      <AppCSS>
        <SearchBar onFormSubmit={this.newRequest} />
        {isGalleryVisible && (
          <ImageGallery onClick={this.onGalleryClick} results={results} />
        )}
        {isLoading && <Spinner />}
        {isShowMoreVisible && <LoadMore onClick={this.showMore} />}
        {isModalShown && <Modal source={modalImg} onClick={this.closeModal} />}
      </AppCSS>
    );
  }
}

export default App;
