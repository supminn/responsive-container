import React from "react";
import { useContainerMedia } from "../../Providers/ContainerMediaProvider";

const TestComponent = ({ children }) => {
  const media = useContainerMedia();
  let backgroundColor;
  // Starting to test from the biggest Screensize first
  if (media.desktop()) {
    backgroundColor = "#f71010";
  } else if (media.laptopL()) {
    backgroundColor = "#f54646";
  } else if (media.laptop()) {
    backgroundColor = "#f38686";
  } else if (media.mobile()) {
    backgroundColor = "#f7bfbf";
  } else {
    // mobileS
    backgroundColor = "#f9e0e0";
  }
  const style = { backgroundColor, border: "1px solid #000", textAlign: "center" };
  return (
    <div style={style}>
      <span>{media.containerType}</span>
      {children}
    </div>
  );
};

export default TestComponent;
