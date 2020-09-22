import React from "react";

import { GalleryItemCSS, GalleryImageCSS } from "./styledImageGalleryItem";

const ImageGalleryItem = ({ preview, fullscreen, onClick }) => (
  <GalleryItemCSS>
    <GalleryImageCSS
      src={preview}
      alt=""
      data-fullscreen={fullscreen}
      onClick={onClick}
    />
  </GalleryItemCSS>
);

export { ImageGalleryItem };
