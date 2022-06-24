/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import ToggleComponents from "./ToggleComponents";
import Provider from "../../Providers/ConfigProvider";

const containerConfig = {
  mobileS: 320,
  mobile: 425,
  laptop: 700,
  laptopL: 1440,
  desktop: 2560,
};

storiesOf("WithoutStyledComponents/Toggling Components", module)
  .addDecorator(withKnobs)
  .addParameters({
    responsiveContainer: {
      containerConfig,
    },
  })
  .add("Example", () => {
    return (
      <Provider config={containerConfig}>
        <ResponsiveContainer>
          <ToggleComponents />
        </ResponsiveContainer>
      </Provider>
    );
  })
  ;
