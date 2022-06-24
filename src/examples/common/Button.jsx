import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Container = styled.button`
  padding: 9px 19px;
  background: ${props => props.backgroundColor};
  font-family: ProximaNova, "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: ${p => p.color};
  font-weight: bold;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: ${props => (props.circular ? "25px" : "2px")};
  font-size: 18px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;
  width: ${props => (props.width ? `${props.width}px` : "auto")};
  transition: all 0.08s cubic-bezier(0.4, 0, 0.2, 1);
  ${props =>
    props.disabled &&
    css`
      background: rgba(0, 0, 0, 0.12);
      pointer-events: none;
      color: rgba(0, 0, 0, 0.26);
    `};
  &:focus,
  &:hover {
    outline: none;
  }
  &:focus {
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302), 0 4px 8px 3px rgba(60, 64, 67, 0.149);
  }
`;

const Button = props => {
  const {
    onClick,
    children,
    backgroundColor,
    className,
    disabled,
    circular,
    width,
    color,
    type,
    tabIndex
  } = props;
  return (
    <Container
      className={`${className}`}
      onClick={onClick}
      backgroundColor={backgroundColor}
      disabled={disabled}
      width={width}
      color={color}
      circular={circular}
      role="button"
      type={type}
      tabIndex={tabIndex}
    >
      {children}
    </Container>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  circular: PropTypes.bool,
  width: PropTypes.number,
  tabIndex: PropTypes.number,
  type: PropTypes.string
};

Button.defaultProps = {
  onClick: () => {},
  children: <span>Button</span>,
  backgroundColor: "#19ABA3",
  color: "#ffffff",
  className: "",
  disabled: false,
  circular: false,
  adsEvent: {},
  width: null,
  type: "",
  tabIndex: null
};

export default Button;
