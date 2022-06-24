import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { useContainerMedia } from "../Providers/ContainerMediaProvider";

const ContainerMediaThemeProvider = ({ theme, children }) => {
  const media = useContainerMedia();
  const themeProps = {
    ...theme,
    media
  };

  return <ThemeProvider theme={{ ...themeProps }}>{children}</ThemeProvider>;
};

ContainerMediaThemeProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
  children: PropTypes.node.isRequired
};

ContainerMediaThemeProvider.defaultProps = {
  theme: {}
};

export default ContainerMediaThemeProvider;
