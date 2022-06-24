import React, { useState, useEffect } from "react";
import addons, { types } from "@storybook/addons";
import {
  Icons,
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from "@storybook/components";
import { styled } from "@storybook/theming";
import { STORY_RENDERED } from "@storybook/core-events";
import { BREAKPOINTS as defaultConfig } from "../../src/constants";
import { useParameter } from "@storybook/api";
// import styled from "styled-components";
import { ACTION_NAME } from "./constants";

const Checkbox = styled.input`
  border: 1px solid;
`;

const getMoreOptions = (breakPoint, onChange) => {
  const otherOptions = ["none", "all"];
  return otherOptions.map((option) => ({
    id: option,
    title: option.toUpperCase(),
    onClick: () => onChange(option),
    value: option,
  }));
};

const getIsSelected = (BP, selectedBP) => {
  if (BP === "none") {
    return selectedBP.length === 0;
  }
  if (BP === "all") {
    return selectedBP.length === BREAKPOINT_KEYS.length;
  }
  return selectedBP.indexOf(BP) !== -1;
};

const SelectViewPort = (props) => {
  const [breakPoint, setBreakPoint] = useState([]);
  const [expanded, toggleTooltip] = useState(false);
  const { api } = props;

  const emitBreakPoint = () => {
    api.emit(ACTION_NAME, breakPoint);
  };

  const onChange = (value) => {
    let selectedBreakPoints = [];
    if (value === "all") {
      selectedBreakPoints = BREAKPOINT_KEYS;
    } else if (value === "none") {
      selectedBreakPoints = [];
    } else {
      const index = breakPoint.indexOf(value);
      if (index === -1) {
        selectedBreakPoints = [...breakPoint, value];
      } else {
        selectedBreakPoints = [
          ...breakPoint.slice(0, index),
          ...breakPoint.slice(index + 1),
        ];
      }
    }
    setBreakPoint(selectedBreakPoints);
    api.emit(ACTION_NAME, selectedBreakPoints);
  };

  useEffect(() => {
    api.off(STORY_RENDERED, emitBreakPoint);
    api.on(STORY_RENDERED, emitBreakPoint);
    return () => {
      api.off(STORY_RENDERED, emitBreakPoint);
    };
  }, [breakPoint]);
  const params = useParameter("responsiveContainer", {});
  const BREAKPOINTS = params.containerConfig || defaultConfig;
  const BREAKPOINT_KEYS = Object.keys(BREAKPOINTS);
  const breakPointList = BREAKPOINT_KEYS.map((BP) => {
    const isSelected = getIsSelected(BP, breakPoint);
    return {
      id: BP,
      title: BP,
      onClick: () => onChange(BP),
      right: `Width: ${BREAKPOINTS[BP]}px`,
      left: <Checkbox type="checkbox" checked={isSelected} />,
      value: BP,
      active: isSelected,
    };
  });
  const otherOptions = getMoreOptions(breakPoint, onChange);
  const finalOptions = [...otherOptions, ...breakPointList];

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltipShown={expanded}
      onVisibilityChange={(s) => toggleTooltip(s)}
      tooltip={<TooltipLinkList links={finalOptions} />}
      closeOnClick
    >
      <IconButton
        key="viewport"
        title="Show multiple viewport preview together"
        active={breakPoint.length}
      >
        <Icons icon="tablet" />
      </IconButton>
    </WithTooltip>
  );
};

// Register the addon with a unique name.
addons.register("VIEWPORTADDON", (api) => {
  addons.add("VIEWPORTADDON", {
    title: "viewport / media-queries",
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === "story",
    render: () => <SelectViewPort api={api} />,
  });
});
