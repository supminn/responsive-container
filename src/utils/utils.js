import { BREAKPOINTS } from "../constants";

export const getContainerType = (breakPointConfig = BREAKPOINTS) => {
  const SortedBreakpoints = Object.keys(breakPointConfig).sort(
    (a, b) => breakPointConfig[a] > breakPointConfig[b]
  );
  return (width) => {
    let ctr = 0;
    let deviceType = SortedBreakpoints[ctr];
    let breakPointWidth = breakPointConfig[deviceType];
    while (width >= breakPointWidth) {
      deviceType = SortedBreakpoints[ctr];
      ctr += 1;
      breakPointWidth = breakPointConfig[SortedBreakpoints[ctr]];
    }
    return deviceType;
  };
};
