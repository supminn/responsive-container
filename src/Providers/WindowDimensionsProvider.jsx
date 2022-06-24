import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";
// import debounce from "lodash/debounce";

const WindowDimensionsCtx = createContext(null);

const WindowDimensionsProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const handleResize = useCallback(
    // TODO: consider using debounce
    throttle(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 300),
    []
  );
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <WindowDimensionsCtx.Provider value={dimensions}>{children}</WindowDimensionsCtx.Provider>;
};

WindowDimensionsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default WindowDimensionsProvider;
export const useWindowDimensions = () => useContext(WindowDimensionsCtx);
