/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import ToggleStyles from "./ToggleStyles";
import Provider from "../../Providers/ConfigProvider";

const containerConfig = {
  mobileS: 320,
  mobile: 425,
  laptop: 700,
  laptopL: 1440,
  desktop: 2560,
};

storiesOf("WithoutStyledComponents/Toggling Styles", module)
  .addDecorator(withKnobs)
  .addParameters({
    responsiveContainer: {
      containerConfig,
    },
  })
  .add("ToggleStyles View", () => {
    return (
      <Provider config={containerConfig}>
        <ResponsiveContainer>
          <ToggleStyles />
        </ResponsiveContainer>
      </Provider>
    );
  })
  .add("With Threshold knob", () => {
    const options = {
      range: true,
      min: 300,
      max: 2570,
      step: 1,
    };
    const threshold = number("Threshold", 800, options);
    return (
      <Provider config={containerConfig}>
        <ResponsiveContainer threshold={threshold}>
          <div>
            <ToggleStyles />
          </div>
        </ResponsiveContainer>
      </Provider>
    );
  })
  .add("Hierarchy View with Threshold Knob", () => {
    const options = {
      range: true,
      min: 300,
      max: 2570,
      step: 1,
    };
    const threshold = number("Threshold", 800, options);
    return (
      <Provider config={containerConfig}>
        <ResponsiveContainer threshold={threshold}>
          <ToggleStyles>
            <div style={{ display: "flex", padding: "5px" }}>
              <div style={{ flex: 1 }}>
                <ResponsiveContainer>
                  <ToggleStyles />
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 2 }}>
                <ResponsiveContainer>
                  <ToggleStyles />
                </ResponsiveContainer>
              </div>
            </div>
          </ToggleStyles>
        </ResponsiveContainer>
      </Provider>
    );
  })
  .add("ToggleStyles in Grid View", () => {
    return (
      <Provider config={containerConfig}>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 2 }}>
              <ResponsiveContainer>
                <ToggleStyles />
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 2 }}>
              <ResponsiveContainer>
                <ToggleStyles />
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 2 }}>
              <ResponsiveContainer>
                <ToggleStyles />
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer>
                <ToggleStyles />
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 2 }}>
              <ResponsiveContainer>
                <ToggleStyles />
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer>
                <ToggleStyles />
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer>
                <ToggleStyles />
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer>
                <ToggleStyles />
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Provider>
    );
  })
  ;
