import { addParameters, addDecorator } from "@storybook/react";
import withAllViewPorts from "../storybook-addons/withAllViewPorts";
// import { jsxDecorator } from "storybook-addon-jsx";

// addParameters({
//   responsiveContainer: {
//     containerConfig: {
//       mobileS: 320,
//       mobile: 425,
//       laptop: 700,
//       laptopL: 1440,
//       desktop: 2560
//     }
//   }
// });
// addDecorator(jsxDecorator);
addDecorator(withAllViewPorts());
