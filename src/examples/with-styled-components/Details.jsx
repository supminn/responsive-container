import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { COLORS } from "../constants";
import DetailImg from "../images/unit_challenge_detail.svg";
import Button from "../common/Button";

const Container = styled.div`
  position: relative;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  padding: 50px 30px;
  border-radius: 2px;
  box-sizing: border-box;
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
  ${props =>
    props.theme.media.laptop`
      text-align: left;
      max-width: 470px;
    `};
  ${props =>
    props.theme.media.only.tablet`
      text-align: left;
      max-width: 400px;
    `};
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 22px;
  box-sizing: border-box;
`;

const Strong = styled.span`
  font-weight: 700;
`;

const ImageWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
  box-sizing: border-box;
  ${props =>
    props.theme.media.tablet`
      position: absolute;
      right: -42px;
      top: 30px;
      margin-top: 0px;
    `};
`;

const Stats = styled.div`
  margin-top: 22px;
  margin-bottom: 25px;
  box-sizing: border-box;
`;

const StatContainer = styled.div`
  display: inline-block;
  text-align: center;
  margin-right: 28px;
  box-sizing: border-box;
  &:last-child {
    margin-right: 0px;
  }
`;

const StatCount = styled.p`
  font-size: 55px;
  line-height: 67px;
  margin: 0;
`;

const StatTitle = styled.p`
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  font-weight: 700;
  color: #b0aca3;
  margin: 0px;
`;

const Stat = ({ count = "-", title }) => (
  <StatContainer>
    <StatCount>{count}</StatCount>
    <StatTitle>{title}</StatTitle>
  </StatContainer>
);

const Details = ({ handleStartTest, conceptsCount, questionsCount }) => {
  return (
    <Container className="unitChallenge">
      <ContentBlock>
        <Description>
          This <Strong>challenge</Strong> is a way to test your knowledge of all the concepts in
          this unit.
        </Description>
        <Stats>
          <Stat count={questionsCount} title="Questions" />
          <Stat count={conceptsCount} title="Concepts" />
        </Stats>
        <Button onClick={handleStartTest} circular backgroundColor={COLORS.primary}>
          Start Challenge
        </Button>
      </ContentBlock>
      <ImageWrapper>
        <img src={DetailImg} style={{ maxWidth: "100%" }} alt="test-bg" />
      </ImageWrapper>
    </Container>
  );
};

Details.propTypes = {
  handleStartTest: PropTypes.func.isRequired,
  conceptsCount: PropTypes.number.isRequired,
  questionsCount: PropTypes.number.isRequired
};

Stat.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default Details;
