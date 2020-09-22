import React from "react";

import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryCSS } from "./styledImageGallery";

const ImageGallery = ({ results, onClick }) => (
  <ImageGalleryCSS>
    {results.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        preview={webformatURL}
        fullscreen={largeImageURL}
        onClick={onClick}
      />
    ))}
  </ImageGalleryCSS>
);

export { ImageGallery };
