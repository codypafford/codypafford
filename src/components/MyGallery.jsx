import React, { Component, Fragment } from "react";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
} from "react-bootstrap";

import galleryImg1 from "../images/gallery/gallery1.JPG";
import galleryImg2 from "../images/gallery/gallery2.jpg";
import galleryImg3 from "../images/gallery/gallery3.JPEG";
import galleryImg4 from "../images/gallery/gallery4.jpg";
import galleryImg5 from "../images/gallery/gallery5.JPG";
import galleryImg6 from "../images/gallery/gallery6.JPEG";
import galleryImg7 from "../images/gallery/gallery7.jpg";
import galleryImg8 from "../images/gallery/gallery8.JPG";
import galleryImg9 from "../images/gallery/gallery9.jpg";
import galleryImg10 from "../images/gallery/gallery10.JPEG";
// import galleryImg11 from "../images/gallery/gallery11.jpg";

const images = [
  {
    original: galleryImg1,
    thumbnail: galleryImg1,
  },
  {
    original: galleryImg2,
    thumbnail: galleryImg2,
  },
  {
    original: galleryImg3,
    thumbnail: galleryImg3,
  },
  {
    original: galleryImg4,
    thumbnail: galleryImg4,
  },
  {
    original: galleryImg5,
    thumbnail: galleryImg5,
  },
  {
    original: galleryImg6,
    thumbnail: galleryImg6,
  },
  {
    original: galleryImg7,
    thumbnail: galleryImg7,
  },
  {
    original: galleryImg8,
    thumbnail: galleryImg8,
  },
  {
    original: galleryImg9,
    thumbnail: galleryImg9,
  },
  {
    original: galleryImg10,
    thumbnail: galleryImg10,
  },
  // {
  //   original: galleryImg11,
  //   thumbnail: galleryImg11,
  // },
];

class MyGallery extends React.Component {
  render() {
    return (
      <Fragment>
        <Container>
          <div style={{}}>
            <ImageGallery items={images} />
          </div>
        </Container>
      </Fragment>
    );
  }
}

export default MyGallery;
