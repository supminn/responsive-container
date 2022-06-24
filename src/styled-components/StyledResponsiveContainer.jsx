import React from "react";
import PropTypes from "prop-types";
import { css } from "styled-components";
import ThemeProvider from "./ContainerMediaThemeProvider";
import ResponsiveContainer from "../components/ResponsiveContainer";

const StyledResponsiveContainer = ({ threshold, theme, children }) => (
  <ResponsiveContainer threshold={threshold} cssTransformFn={css}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </ResponsiveContainer>
);

StyledResponsiveContainer.propTypes = {
  threshold: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
  children: PropTypes.node.isRequired
};

StyledResponsiveContainer.defaultProps = {
  threshold: null,
  theme: null
};

export default StyledResponsiveContainer;
