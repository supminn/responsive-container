/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";
import StyledResponsiveContainer from "../../styled-components/StyledResponsiveContainer";
import Details from "./Details";

storiesOf("WithStyledComponents", module)
  .addDecorator(withKnobs)
  .add("Basic View", () => {
    return (
      <StyledResponsiveContainer>
        <Details conceptsCount={9} questionsCount={20} />
      </StyledResponsiveContainer>
    );
  })
  .add("With Threshold", () => {
    return (
      <>
        <div>
          <b>
            Threshold: 700px - max container type as per 700px width even if
            width is greater than 700px
          </b>
        </div>
        <StyledResponsiveContainer threshold={700}>
          <Details conceptsCount={9} questionsCount={20} />
        </StyledResponsiveContainer>
      </>
    );
  })
  .add("With Threshold knob", () => {
    const options = {
      range: true,
      min: 300,
      max: 1300,
      step: 1,
    };
    const threshold = number("Threshold", 800, options);
    return (
      <StyledResponsiveContainer threshold={threshold}>
        <Details conceptsCount={9} questionsCount={20} />
      </StyledResponsiveContainer>
    );
  })
  .add("Multiple Details View", () => {
    return (
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: 2, border: "1px solid #000" }}>
            <StyledResponsiveContainer>
              <Details conceptsCount={9} questionsCount={20} />
            </StyledResponsiveContainer>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: 2, border: "1px solid #000" }}>
            <StyledResponsiveContainer>
              <Details conceptsCount={9} questionsCount={20} />
            </StyledResponsiveContainer>
          </div>
          <div style={{ flex: 2, border: "1px solid #000" }}>
            <StyledResponsiveContainer>
              <Details conceptsCount={9} questionsCount={20} />
            </StyledResponsiveContainer>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: 1, border: "1px solid #000" }}>
            <StyledResponsiveContainer>
              <Details conceptsCount={9} questionsCount={20} />
            </StyledResponsiveContainer>
          </div>
          <div style={{ flex: 2, border: "1px solid #000" }}>
            <StyledResponsiveContainer>
              <Details conceptsCount={9} questionsCount={20} />
            </StyledResponsiveContainer>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: 1, border: "1px solid #000" }}>
            <StyledResponsiveContainer>
              <Details conceptsCount={9} questionsCount={20} />
            </StyledResponsiveContainer>
          </div>
          <div style={{ flex: 1, border: "1px solid #000" }}>
            <StyledResponsiveContainer>
              <Details conceptsCount={9} questionsCount={20} />
            </StyledResponsiveContainer>
          </div>
          <div style={{ flex: 1, border: "1px solid #000" }}>
            <StyledResponsiveContainer>
              <Details conceptsCount={9} questionsCount={20} />
            </StyledResponsiveContainer>
          </div>
        </div>
      </div>
    );
  });
