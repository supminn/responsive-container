import React from "react";
import PropTypes from "prop-types";
import ContainerMediaProvider from "../Providers/ContainerMediaProvider";

const ResponsiveContainer = ({ threshold, children, cssTransformFn }) => (
  <ContainerMediaProvider threshold={threshold} cssTransformFn={cssTransformFn}>
    {children}
  </ContainerMediaProvider>
);

ResponsiveContainer.propTypes = {
  threshold: PropTypes.number,
  children: PropTypes.node.isRequired,
  cssTransformFn: PropTypes.func
};

ResponsiveContainer.defaultProps = {
  threshold: null
};

export default ResponsiveContainer;
