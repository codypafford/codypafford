import React, { Component, Fragment } from "react";

import LogoImage from "../images/bg_img.JPEG";
import LogoImageMobile from "../images/bg_img_mobile.JPEG";
import AnimatedText from "react-animated-text-content";
import { isMobile } from "react-device-detect";

var bgImage = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  overflow: "hidden",
  borderRadius: 150,
  borderWidth: 10,
};

var bgImageMobile = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  overflow: "hidden",
  borderRadius: 50,
  borderWidth: 10,
};

var imgParent = {
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
};

var imgParentMobile = {
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
  width: "100%",
  height: "100%",
};

var container = {
  textAlign: "center",
};

class Home extends Component {
  componentDidMount() {
    document.title = "Cody Pafford";
  }
  render() {
    return (
      <Fragment>
        <div style={container}>
          <AnimatedText
            type="words" // animate words or chars
            animation={{
              x: "200px",
              y: "-20px",
              scale: 1.1,
              ease: "ease-in-out",
            }}
            animationType="float"
            interval={0.06}
            duration={0.8}
            tag="p"
            className="animated-paragraph"
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
          >
            Hi, I'm Cody Pafford. Welcome to my page!
          </AnimatedText>
        </div>
        <div
          style={isMobile ? imgParentMobile : imgParent}
          className="head-text"
        >
          <img
            src={isMobile ? LogoImageMobile : LogoImage}
            style={isMobile ? bgImageMobile : bgImage}
          />
        </div>
      </Fragment>
    );
  }
}
export default Home;
