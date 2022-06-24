import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@storybook/theming";
// import styled from "styled-components";
import addons, { makeDecorator } from "@storybook/addons";
import ResponsiveContainer from "../../src/components/ResponsiveContainer";
import WindowDimensionsProvider from "../../src/Providers/WindowDimensionsProvider";
import { BREAKPOINTS as defaultConfig } from "../../src/constants";
import { ACTION_NAME } from "./constants";

const Title = styled.div`
  font-size: 20px;
  margin: 30px 10px 10px 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ViewWrapper = styled.div`
  border: 1px solid #dedede;
  padding: 30px;
  margin: 30px;
`;

let viewport = [];
const AllBreakPointView = (props) => {
  const { children, viewport, channel, containerConfig } = props;
  const [breakPoint, setBreakPoint] = useState(viewport);
  const onChange = (data) => {
    setBreakPoint(data);
  };
  const BREAKPOINTS = containerConfig;
  useEffect(() => {
    channel.addListener(ACTION_NAME, onChange);
    return () => {
      channel.removeListener(ACTION_NAME, onChange);
    };
  }, []);
  if (breakPoint.length === 0) {
    return (
      <WindowDimensionsProvider>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </WindowDimensionsProvider>
    );
  }
  const VIEWPORT_SEQ = Object.keys(BREAKPOINTS).sort(
    (a, b) => BREAKPOINTS[a] > BREAKPOINTS[b]
  );
  return (
    <WindowDimensionsProvider>
      <Wrapper>
        {VIEWPORT_SEQ.map((BP) => {
          if (
            VIEWPORT_SEQ.length === breakPoint.length ||
            breakPoint.indexOf(BP) !== -1
          ) {
            return (
              <ViewWrapper key={BP}>
                <Title>
                  {BP} (Width: {BREAKPOINTS[BP]}px)
                </Title>
                <div style={{ width: `${BREAKPOINTS[BP]}px` }}>
                  <ResponsiveContainer>{children}</ResponsiveContainer>
                </div>
              </ViewWrapper>
            );
          }
          return null;
        })}
      </Wrapper>
    </WindowDimensionsProvider>
  );
};

AllBreakPointView.propTypes = {
  children: PropTypes.node.isRequired,
  threshold: PropTypes.number,
};

AllBreakPointView.defaultProps = {
  threshold: null,
};

export default makeDecorator({
  name: "withAllViewPorts",
  parameterName: "responsiveContainer",
  wrapper: (storyFn, context, { parameters }) => {
    console.log("parameters: ", parameters);
    const channel = addons.getChannel();
    channel.on(ACTION_NAME, (data) => {
      viewport = data;
    });
    const containerConfig =
      parameters && parameters.containerConfig
        ? parameters.containerConfig
        : defaultConfig;
    return (
      <AllBreakPointView
        viewport={viewport}
        containerConfig={containerConfig}
        channel={channel}
      >
        {storyFn(context)}
      </AllBreakPointView>
    );
  },
});
