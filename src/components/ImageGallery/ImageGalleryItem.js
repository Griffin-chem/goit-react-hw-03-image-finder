import React from "react";

import { GalleryItemCSS, GalleryImageCSS } from './styledImageGalleryItem';

const ImageGalleryItem = ({ preview, fullscreen }) => (
  <GalleryItemCSS>
    <GalleryImageCSS
      src={preview}
      alt=""
      data-fullscreen={fullscreen}
    />
  </GalleryItemCSS>
);

export { ImageGalleryItem };
