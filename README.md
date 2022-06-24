# responsive-container

Library for Container queries Solution for Reusable and Responsive React Components

## Table of Contents

* [Installation](#installation)
* [Concept](#concept)
* [Usage](#usage)
* [Container Type Metric](#container-type-metric)
* [Media Object](#media-object)


## Installation

To install, you can use  [npm](https://npmjs.org/)  or  [yarn](https://yarnpkg.com/):

```
$ npm install --save @ck12/responsive-container
$ yarn add @ck12/responsive-container
```


## Concept

We have been using media queries to make the pages responsive based on screen resolution or browser viewport. 
While composing page layouts from small reusable components may not render correctly if it directly relies on media characteristics like screen resolution or browser viewport. 

To solve this problem instead of relying on the viewport to adjust styles, the parent container of the target element can adjust those styles.

`ResponsiveContainer` react component will calculate the `containerType` based upon the width of container and pass it on to its children component.
`containerType` can be accessed by the children components thru React Context and can render accordingly.

**![](https://lh5.googleusercontent.com/WWq9aHcHZ5O-wmeE7Mu112HrEDpQVkIJtxaY_KoZ_fOSV7A2j500vtvtmosk95Nd2fFLbUYiRhpPKLToWb3dyAiRm7TrE1lkfqT7NuTboCw7UkIStbpzpOMutMyZt-tuvaKPuuCH=s0)**


## Usage

**With Styled Component**

```jsx
// App.jsx

import ResponsiveContainer from "@ck12/responsive-container/lib/styled-components";
import TestComponent from "./TestComponent";

const App = () => {
  return (
    <div style={{ maxWidth: "1000px" }}>
      <ResponsiveContainer>
        <TestComponent />
      </ResponsiveContainer>
    </div>
  );
};
```


```jsx
// TestComponent.jsx
const Container = styled.div`
    position: relative;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.24);
    overflow: hidden;
    padding: 50px 30px;
    border-radius: 2px;
    box-sizing: border-box;
    // for container width >= tablet width
    // container type calculated using container width metric. Details below.
    ${props =>
        props.theme.media.tablet`
        padding: 70px 50px 100px 50px
        `};
`;

const ContentBlock = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  box-sizing: border-box;
  // for container width >= laptop width
  ${props =>
    props.theme.media.laptop`
      text-align: left;
      max-width: 470px;
    `};
  // for container width === tablet width
  ${props =>
    props.theme.media.only.tablet`
      text-align: left;
      max-width: 400px;
    `};
`;

const TestComponent = ({ children }) => {
  return (
    <Container>
      <ContentBlock>{children}</ContentBlock>
    </Container>
  );
};
export default TestComponent;

```

**Without Styled Component**
> **Note:** Different `ResponsiveContainer` component is imported for Without `Styled Component`

```jsx
// App.jsx
    
import ResponsiveContainer from "@ck12/responsive-container";
import TestComponent from "./TestComponent";

const App = () => {
  return (
    <div style={{ maxWidth: "1000px" }}>
      <ResponsiveContainer>
        <TestComponent />
      </ResponsiveContainer>
    </div>
  );
};
```


```jsx
    // TestComponent.jsx
    
import React from "react";
import { useContainerMedia } from "@ck12/responsive-container";

const TestComponent = ({ children }) => {
  const media = useContainerMedia();
  let backgroundColor;
  if (media.desktop()) {
    // for container width >= desktop width
    backgroundColor = "#f71010";
  } else if (media.laptopL()) {
    backgroundColor = "#f54646";
  } else {
    backgroundColor = "#f9e0e0";
  }
  const style = { backgroundColor };
  return (
    <div style={style} className={media.tablet() ? "md" : ""}>
      {/* containerType is also available in media object */}
      <span>{media.containerType}</span>
      {children}
    </div>
  );
};
export default TestComponent;
```


## Container Type Metric

Default Container Type Metric:

```js
const BREAKPOINTS = {
  mobileS: 320,
  mobile: 425,
  mobileL: 540,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560
};

```
If you wish to customize the container metric, you need to use the `ConfigProvider` component in order to inject a Custom Container Metric into your application. 

`ConfigProvider` relies on the context api of React to pass the config down to the components, so you need to make sure that `ConfigProvider` is a parent of the components you are trying to customize.

```jsx
// App.jsx

import { ConfigProvider } from "@ck12/responsive-container";

const containerConfig = {
  mobileS: 320,
  mobile: 425,
  laptop: 700,
  laptopL: 1440,
  desktop: 2560,
};

const App = () => {
  return (
    <ConfigProvider config={containerConfig}>
      <TestComponent />
    </ConfigProvider>
  )
}

```


## Media Object

`media` object will have containerType and functions to match each of the container type passed in config.
ContainerType can be accessed using `media.containerType`.

Available functions to match container type query are:
- *equal or more* - `media.tablet()` for container width more than or equal to tablet width
- *only* - `media.only.tablet()` for only tablet
- *between* - `media.between("mobileS", "tablet")` for width between `mobileS` and `tablet`

```js

// Usage
media.containerType

media.tablet() //tablet and higher
media.mobile() //mobile and higher
...
media.only.tablet() // only tablet
media.only.mobile() // only mobile
media.only.laptop() // only laptop
...
media.between("mobileS", "tablet")

```
> **Note:** For styled components, media object will be available in theme prop e.g `props.theme.media.tablet()`



## Storybook Addon

You can test your container query based components in isolation in [Storybook](https://storybook.js.org/) addon available in storybook-addon folder.
> **Note:** Addon works with Storybook 5.x

Register the addon in storybook `main.js` file
```js
// main.js

module.exports = {
  addons: [
    "@ck12/responsive-container/storybook-addons/withAllViewPorts/register.js",
  ],
  stories: ["../src/**/*.stories.js"],
};

```

Add `withAllViewPorts` decorator in storybook `preview.js`. You can also add custom container config as parameter in the `preview.js`

```js
import { addParameters, addDecorator } from "@storybook/react";
import withAllViewPorts from "@ck12/responsive-container/storybook-addons/withAllViewPorts";

addDecorator(withAllViewPorts());
addParameters({
  responsiveContainer: {
    containerConfig: {
      mobileS: 320,
      mobile: 425,
      laptop: 700,
      laptopL: 1440,
      desktop: 2560
    }
  }
});

```
You can now test your component for multiple container types in a single view.

**![](https://lh4.googleusercontent.com/JtTmF_QhdNnye6HyCKq4XJJR_W2q97ROGTfb20zWCSWIiEcAfq34FmLtZ3ziReeAg7yP8Sr57rmhizEd0GUQ-B-rNOIcIuuSJO9qrC-dDtcQgcetYPetKLD41wjHag_Eq1ukpJip=s0)**
