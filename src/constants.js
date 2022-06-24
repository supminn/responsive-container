export const BREAKPOINTS = {
  mobileS: 320,
  mobile: 425,
  mobileL: 540,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560
};

export const SortedBreakpoints = Object.keys(BREAKPOINTS).sort(
  (a, b) => BREAKPOINTS[a] > BREAKPOINTS[b]
);

export const VIEWPORT_SEQ = SortedBreakpoints;
